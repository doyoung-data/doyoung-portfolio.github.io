[CmdletBinding()]
param(
    [string]$RepoPath,
    [switch]$NoPush
)

$ErrorActionPreference = "Stop"
if ([string]::IsNullOrWhiteSpace($RepoPath)) {
    $RepoPath = Split-Path -Parent $PSScriptRoot
}
$dataPath = "data/codex-activity.json"
$builderPath = Join-Path $RepoPath "scripts/build_codex_activity.py"
$logDirectory = Join-Path $env:LOCALAPPDATA "DoyoungPortfolio"
$logPath = Join-Path $logDirectory "codex-activity.log"

New-Item -ItemType Directory -Path $logDirectory -Force | Out-Null

function Write-ActivityLog {
    param([string]$Message)
    $line = "{0} KST | {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $Message
    Add-Content -LiteralPath $logPath -Value $line -Encoding UTF8
    Write-Host $line
}

Push-Location -LiteralPath $RepoPath
try {
    $branch = (& git branch --show-current).Trim()
    if ($LASTEXITCODE -ne 0 -or $branch -ne "main") {
        throw "Automatic publishing only runs from the main branch. Current branch: $branch"
    }

    $initialChanges = @(git status --porcelain)
    if ($LASTEXITCODE -ne 0) {
        throw "Unable to read the Git worktree state."
    }
    if ($initialChanges.Count -gt 0) {
        throw "Worktree is not clean. Activity publishing was skipped to protect local changes."
    }

    & git pull --ff-only
    if ($LASTEXITCODE -ne 0) {
        throw "git pull --ff-only failed."
    }

    & python $builderPath --output (Join-Path $RepoPath $dataPath)
    if ($LASTEXITCODE -ne 0) {
        throw "Codex activity aggregation failed."
    }

    & python -m json.tool (Join-Path $RepoPath $dataPath) *> $null
    if ($LASTEXITCODE -ne 0) {
        throw "Generated activity JSON is invalid."
    }

    $changes = @(git status --porcelain)
    $unexpected = @($changes | Where-Object { $_ -notmatch '^ M data/codex-activity\.json$' })
    if ($unexpected.Count -gt 0) {
        throw "Unexpected files changed. No commit was created: $($unexpected -join ', ')"
    }

    if ($changes.Count -eq 0) {
        Write-ActivityLog "No new Codex activity. Nothing to publish."
        exit 0
    }

    & git add -- $dataPath
    if ($LASTEXITCODE -ne 0) {
        throw "Unable to stage the activity JSON."
    }

    & git commit -m ("chore: refresh Codex activity ({0})" -f (Get-Date -Format "yyyy-MM-dd"))
    if ($LASTEXITCODE -ne 0) {
        throw "Unable to commit the activity JSON."
    }

    if (-not $NoPush) {
        & git push origin main
        if ($LASTEXITCODE -ne 0) {
            throw "Unable to push the activity update."
        }
    }

    Write-ActivityLog $(if ($NoPush) { "Activity committed locally." } else { "Activity published to GitHub Pages." })
}
catch {
    Write-ActivityLog "FAILED: $($_.Exception.Message)"
    throw
}
finally {
    Pop-Location
}
