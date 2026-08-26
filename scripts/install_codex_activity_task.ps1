[CmdletBinding()]
param(
    [string]$RepoPath,
    [string]$TaskName = "DoyoungPortfolioCodexActivity",
    [string]$DailyAt = "23:55"
)

$ErrorActionPreference = "Stop"
if ([string]::IsNullOrWhiteSpace($RepoPath)) {
    $RepoPath = Split-Path -Parent $PSScriptRoot
}
$publisherPath = Join-Path $RepoPath "scripts/publish_codex_activity.ps1"
if (-not (Test-Path -LiteralPath $publisherPath)) {
    throw "Publisher script not found: $publisherPath"
}

$runAt = [datetime]::ParseExact($DailyAt, "HH:mm", [System.Globalization.CultureInfo]::InvariantCulture)
$arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$publisherPath`" -RepoPath `"$RepoPath`""
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument $arguments -WorkingDirectory $RepoPath
$trigger = New-ScheduledTaskTrigger -Daily -At $runAt
$settings = New-ScheduledTaskSettingsSet `
    -StartWhenAvailable `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 30)
$principal = New-ScheduledTaskPrincipal `
    -UserId "$env:USERDOMAIN\$env:USERNAME" `
    -LogonType Interactive `
    -RunLevel Limited

Register-ScheduledTask `
    -TaskName $TaskName `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Principal $principal `
    -Description "Refresh the privacy-safe Codex activity summary used by Kwon Doyoung's portfolio." `
    -Force | Out-Null

Write-Host "Scheduled task '$TaskName' installed for $DailyAt KST."
Write-Host "Rollback: Unregister-ScheduledTask -TaskName '$TaskName' -Confirm:`$false"
