$dir = "I:/AGNAA/Enthalpy Labs 05-04-2026/Files/Blogs"
$outputFile = Join-Path $dir "MEGA.md"

if (-not (Test-Path $dir)) {
    Write-Error "Directory not found: $dir"
    exit 1
}

$files = Get-ChildItem -Path $dir -Filter "*.md" | Where-Object { $_.Name -ne "MEGA.md" }
# Sort numerically by extracting digits
$files = $files | Sort-Object { 
    $val = $_.Name -replace '\D', ''
    if ($val) { [int]$val } else { 0 }
}

Write-Host "Found $($files.Count) files to merge."

if ($files.Count -eq 0) {
    Write-Host "No files found."
    exit 0
}

$content = ""
foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..."
    $content += "<!-- FILE: $($file.Name) -->`n"
    $content += Get-Content -Path $file.FullName -Raw
    $content += "`n`n---`n`n"
}

$content | Out-File -FilePath $outputFile -Encoding utf8
Write-Host "Successfully merged into $outputFile"
