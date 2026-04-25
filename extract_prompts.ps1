$blogsDir = "I:\AGNAA\Enthalpy Labs 05-04-2026\Files\Blogs";
$promptsDir = Join-Path $blogsDir "prompts";
$outputFile = Join-Path $promptsDir "all_prompts.txt";
$results = @();
Get-ChildItem -Path $blogsDir -Filter "topic*_complete.md" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw;
    $titleLine = $content.Split("`n") | Where-Object { $_ -match "^title:" } | Select-Object -First 1;
    $title = $titleLine -replace "^title:\s*['""]?", "" -replace "['""]?\s*`r?$", "";
    if (-not $title) { $title = $_.Name }
    
    # Simple search for prompts
    $prompts = @();
    $foundPrompts = $false;
    $content.Split("`n") | ForEach-Object {
        $line = $_.Trim();
        if ($line -match "\*\*NANO PROMPTS:\*\*") {
            $foundPrompts = $true;
        } elseif ($foundPrompts -and $line -match "^\d+\.") {
            $p = $line -replace "^\d+\.\s*['""]?", "" -replace "['""]?\s*`r?$", "";
            if ($p) { $prompts += $p }
        } elseif ($foundPrompts -and $line -match "^$|^\*\*") {
            if ($prompts.Count -ge 3) { $foundPrompts = $false }
        }
    };
    
    if ($prompts.Count -gt 0) {
        $results += "$title = $($prompts -join ', ')"
    }
};
$results | Out-File -FilePath $outputFile -Encoding utf8;
Write-Output "Successfully extracted prompts from $($results.Count) blogs to $outputFile";
