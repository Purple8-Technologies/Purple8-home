<#
  Purple8 Developer edition - one-click installer for Windows.

    irm https://www.purple8.ai/install.ps1 | iex

  What this does, in order:
    1. Checks for Docker; if missing, downloads & installs Docker Desktop.
    2. Waits for the Docker engine to be ready.
    3. Pulls the Purple8 Developer image from GHCR.
    4. Asks for your license key (or reads $env:PURPLE8_LICENSE_JWT).
    5. Starts the container on port 8100 with a persistent data volume.
    6. Opens the admin console at http://localhost:8100/lcnc

  Safe to re-run: it recreates the container and never deletes your data volume.
  macOS / Linux users: run   curl -fsSL https://www.purple8.ai/install.sh | bash
#>

$ErrorActionPreference = 'Stop'

# --- Config -------------------------------------------------------------------
$Image      = 'ghcr.io/purple8-technologies/purple8-graph:developer'
$Container  = 'purple8'
$Port       = '8100'
$Volume     = 'purple8-data'
$ConsoleUrl = "http://localhost:$Port/lcnc"
$HealthUrl  = "http://localhost:$Port/health"

function Step($m) { Write-Host "`n> $m" -ForegroundColor Magenta }
function Info($m) { Write-Host "  $m" -ForegroundColor DarkGray }
function Ok($m)   { Write-Host "  [ok] $m" -ForegroundColor Green }
function Warn($m) { Write-Host "  [!] $m" -ForegroundColor Yellow }
function Die($m)  { Write-Host "`n[x] $m" -ForegroundColor Red; exit 1 }

function Test-Docker { $null -ne (Get-Command docker -ErrorAction SilentlyContinue) }

Write-Host @'

  ██████  ██    ██ ██████  ██████  ██      ███████  █████
  ██   ██ ██    ██ ██   ██ ██   ██ ██      ██      ██   ██   8
  ██████  ██    ██ ██████  ██████  ██      █████   ███████
  ██      ██    ██ ██   ██ ██      ██      ██      ██   ██
  ██       ██████  ██   ██ ██      ███████ ███████ ██   ██
'@ -ForegroundColor Magenta
Write-Host "  Developer edition - one-click installer`n" -ForegroundColor DarkGray

# --- 1. Ensure Docker ---------------------------------------------------------
function Install-Docker {
    Step 'Installing Docker Desktop for Windows'
    $arch = $env:PROCESSOR_ARCHITECTURE
    if ($arch -eq 'ARM64') {
        $url = 'https://desktop.docker.com/win/main/arm64/Docker%20Desktop%20Installer.exe'
    } else {
        $url = 'https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe'
    }
    $installer = Join-Path $env:TEMP 'DockerDesktopInstaller.exe'
    Info "Downloading $url"
    try { Invoke-WebRequest -Uri $url -OutFile $installer -UseBasicParsing }
    catch { Die 'Download failed. Install Docker Desktop manually: https://www.docker.com/products/docker-desktop/' }
    Info 'Running the installer (this may prompt for admin rights)...'
    Start-Process -FilePath $installer -ArgumentList 'install','--quiet','--accept-license' -Wait
    Remove-Item $installer -ErrorAction SilentlyContinue
    Ok 'Docker Desktop installed.'
    Warn 'Windows may require a sign-out or reboot before Docker can run. If the next step fails, reboot and re-run this installer.'
    $dockerExe = Join-Path $env:ProgramFiles 'Docker\Docker\Docker Desktop.exe'
    if (Test-Path $dockerExe) { Start-Process $dockerExe }
}

function Ensure-Docker {
    if (Test-Docker) { Ok "Docker is already installed ($((docker --version)))."; return }
    Warn 'Docker not found - installing it for you.'
    Install-Docker
}

function Wait-Daemon {
    Step 'Waiting for the Docker engine to start'
    $dockerExe = Join-Path $env:ProgramFiles 'Docker\Docker\Docker Desktop.exe'
    if (Test-Path $dockerExe) { Start-Process $dockerExe -ErrorAction SilentlyContinue }
    for ($i = 1; $i -le 120; $i++) {
        try { docker info *> $null; if ($LASTEXITCODE -eq 0) { Write-Host ''; Ok 'Docker engine is running.'; return } } catch {}
        Write-Host "  ... still starting ($i s)`r" -NoNewline -ForegroundColor DarkGray
        Start-Sleep -Seconds 1
    }
    Die "Docker engine did not start in time. Open Docker Desktop, wait for 'running', then re-run this script."
}

# --- 2. License ---------------------------------------------------------------
function Get-License {
    Step 'License key'
    if ($env:PURPLE8_LICENSE_JWT) { Ok 'Using PURPLE8_LICENSE_JWT from your environment.'; return $env:PURPLE8_LICENSE_JWT }
    Info 'Your free Developer license (PURPLE8_LICENSE_JWT) is on your activation'
    Info 'screen and in your email. Get one in one click: https://www.purple8.ai/register'
    Info ''
    Info 'Tip: the most reliable way is to set it first, no pasting:'
    Info '  $env:PURPLE8_LICENSE_JWT="eyJ..."; irm https://www.purple8.ai/install.ps1 | iex'
    $key = Read-Host "`n  Paste your license key (or press Enter to run unlicensed for now)"
    # Strip any stray whitespace/newlines a paste may introduce.
    if ($key) { $key = ($key -replace '\s', '') }
    if ([string]::IsNullOrWhiteSpace($key)) { Warn 'No key entered - starting without a license. Re-run later to add one.'; return '' }
    # Sanity check: a JWT has exactly two dots. Warn (don't block) if it looks off.
    $dots = ([regex]::Matches($key, '\.')).Count
    if ($dots -ne 2) {
        Warn "That doesn't look like a complete JWT (expected 2 dots, got $dots)."
        Warn 'Continuing anyway - if licensing fails, re-run with $env:PURPLE8_LICENSE_JWT set.'
    }
    Ok "License key captured ($($key.Length) chars)."
    return $key
}

# --- 3. Deploy ----------------------------------------------------------------
function Deploy($license) {
    Step 'Pulling the Purple8 Developer image'
    Info $Image
    docker pull $Image; if ($LASTEXITCODE -ne 0) { Die 'Could not pull the image. Check your connection and try again.' }
    Ok 'Image ready.'

    Step 'Starting Purple8'
    $exists = docker ps -a --format '{{.Names}}' | Select-String -SimpleMatch $Container
    if ($exists) { Info "Removing the previous '$Container' container (data volume kept)..."; docker rm -f $Container *> $null }
    docker run -d --name $Container -p "$($Port):$($Port)" -e "PURPLE8_LICENSE_JWT=$license" -v "$($Volume):/data" $Image *> $null
    if ($LASTEXITCODE -ne 0) { Die "Container failed to start. Run 'docker logs $Container' to see why." }
    Ok "Container '$Container' is up."
}

function Wait-Health {
    Step 'Waiting for Purple8 to become healthy'
    for ($i = 1; $i -le 120; $i++) {
        try { $r = Invoke-WebRequest -Uri $HealthUrl -UseBasicParsing -TimeoutSec 2; if ($r.StatusCode -eq 200) { Write-Host ''; Ok 'Purple8 is healthy.'; return } } catch {}
        # If the container already exited, stop waiting and show why.
        $running = docker ps --format '{{.Names}}' | Select-String -SimpleMatch $Container
        if (-not $running) {
            Write-Host ''
            Warn "The '$Container' container stopped unexpectedly. Last log lines:"
            docker logs --tail 20 $Container 2>&1 | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkGray }
            Die "Purple8 exited during startup. See the logs above, then re-run this script."
        }
        Write-Host "  ... warming up ($i s)`r" -NoNewline -ForegroundColor DarkGray
        Start-Sleep -Seconds 1
    }
    Write-Host ''
    Warn "Health check timed out after 120s. Last log lines:"
    docker logs --tail 20 $Container 2>&1 | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkGray }
    Warn "Follow live logs with: docker logs -f $Container"
}

# --- Run ----------------------------------------------------------------------
Ensure-Docker
Wait-Daemon
$license = Get-License
Deploy $license
Wait-Health
Step 'Opening the admin console'
Info $ConsoleUrl
Start-Process $ConsoleUrl

Write-Host "`n[ok] Purple8 is running." -ForegroundColor Green
Write-Host @"

  What's next
    - Admin console   $ConsoleUrl
    - REST API + MCP  http://localhost:$Port/mcp
    - Health          $HealthUrl

  Handy commands
    docker logs -f $Container      # follow the logs
    docker stop $Container         # stop the engine
    docker start $Container        # start it again
    docker rm -f $Container        # remove (keeps the $Volume volume)

  Docs & quickstart: https://www.purple8.ai/quickstart
"@ -ForegroundColor Gray
