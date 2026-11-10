param([string]$BaselineRoot='tmp/memory-latency-control',[string]$OutputRoot='reports/memory-investigation-2026-11-10/interleaved',[ValidateSet('standard','agent-idle')][string]$ObserverPolicy='standard')
$ErrorActionPreference='Stop'
$projectRoot=(Get-Location).Path
$baselineDirectory=(Resolve-Path -LiteralPath $BaselineRoot).Path
$outputDirectory=[IO.Path]::GetFullPath((Join-Path $projectRoot $OutputRoot))
if(Test-Path -LiteralPath $outputDirectory){throw 'Choose a fresh interleaved output directory'}
New-Item -ItemType Directory -Path $outputDirectory | Out-Null
$order=@('A1','B1','A2','B2')
$runs=@()
foreach($label in $order){
 $candidate=$label.StartsWith('B')
 $location=if($candidate){$projectRoot}else{$baselineDirectory}
 $power=Get-CimInstance Win32_Battery | Select-Object BatteryStatus,EstimatedChargeRemaining
 if($power -and $power.BatteryStatus -eq 1){throw 'Final interleaved acceptance requires the agreed external-power condition'}
 $directory=Join-Path $outputDirectory $label
 $env:PERF_OUT=$directory;$env:PERF_MODES='indexed';$env:PERF_TRACE='full'
 @{label=$label;startedAt=(Get-Date).ToUniversalTime().ToString('o');battery=$power}|ConvertTo-Json -Depth 4|Set-Content -LiteralPath (Join-Path $outputDirectory "$label-power.json")
 Push-Location $location
 try{node scripts/performance.mjs *> (Join-Path $outputDirectory "$label-console.log");$code=$LASTEXITCODE}finally{Pop-Location}
 if($code -ne 0){throw "$label process failed: $code"}
 $runs+=@{label=$label;kind=if($candidate){'candidate'}else{'previous release'};result=(Join-Path $directory results.json);exitCode=$code}
 @{order=$order;runs=$runs;observerPolicy=$ObserverPolicy;scope='Fixed A/B/A/B full workloads on external power; same CPU4 main,30 interactions and original endpoint. Not randomized; all results retained. Agent-idle means no report processing/long response streaming during recording, except short bounded progress checks.'}|ConvertTo-Json -Depth 6|Set-Content -LiteralPath (Join-Path $outputDirectory manifest.json)
 Write-Output "Completed interleaved $label"
}
$env:PERF_OUT=Join-Path $outputDirectory 'without-recording';$env:PERF_TRACE='off'
node scripts/performance.mjs *> (Join-Path $outputDirectory 'without-recording-console.log')
if($LASTEXITCODE -ne 0){throw 'Separate no-recording process failed'}
