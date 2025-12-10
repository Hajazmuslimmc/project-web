# Master Client installer (PowerShell)
# Downloads a ZIP, extracts to C:\MasterClientGame, creates desktop shortcut.
$zipUrl = "https://example.com/masterclient.zip"   # <-- REPLACE with your hosted ZIP
$installDir = "$env:SystemDrive\MasterClientGame"
$tempZip = Join-Path $env:TEMP "masterclient_download.zip"

Write-Host "Downloading installer..."
try {
    Invoke-WebRequest -Uri $zipUrl -OutFile $tempZip -UseBasicParsing -ErrorAction Stop
} catch {
    Write-Host "Failed to download: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

if (Test-Path $installDir) {
    Write-Host "Existing install detected at $installDir"
} else {
    New-Item -Path $installDir -ItemType Directory -Force | Out-Null
}

Write-Host "Extracting..."
try {
    Expand-Archive -Path $tempZip -DestinationPath $installDir -Force
} catch {
    Write-Host "Extraction failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Normalize top-level folder (if ZIP put everything inside a single folder)
$children = Get-ChildItem -Path $installDir
if ($children.Count -eq 1 -and $children[0].PSIsContainer) {
    $single = $children[0].FullName
    Write-Host "Normalizing folder structure..."
    Get-ChildItem -Path $single -Force | Move-Item -Destination $installDir -Force
    Remove-Item -Path $single -Recurse -Force
}

# Create desktop shortcut (points to an .exe or .bat inside the install dir)
$target = Get-ChildItem -Path $installDir -Filter *.exe -Recurse | Select-Object -First 1
if ($null -eq $target) {
    Write-Host "No .exe found in install directory. Skipping shortcut creation."
} else {
    $WshShell = New-Object -ComObject WScript.Shell
    $desktop = [Environment]::GetFolderPath("Desktop")
    $lnk = $WshShell.CreateShortcut((Join-Path $desktop "Master Client.lnk"))
    $lnk.TargetPath = $target.FullName
    $lnk.WorkingDirectory = (Split-Path $target.FullName)
    $lnk.Save()
    Write-Host "Shortcut created on desktop."
}

# Cleanup
Remove-Item -Path $tempZip -Force -ErrorAction SilentlyContinue

Write-Host "Installation complete. Files are in $installDir"
