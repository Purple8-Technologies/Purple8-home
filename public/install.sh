#!/usr/bin/env bash
#
# Purple8 Developer edition — one-click installer.
#
#   curl -fsSL https://www.purple8.ai/install.sh | bash
#
# What this does, in order:
#   1. Detects your OS + CPU architecture.
#   2. Checks that Docker is installed. If it is missing, it prints the official
#      Docker install link and exits — install Docker Desktop (macOS/Windows) or
#      Docker Engine (Linux) yourself, then re-run this script. We do NOT
#      auto-download Docker: the installer is large, needs a GUI licence step,
#      and silent background downloads were hanging installs.
#   3. Waits for the Docker daemon to be ready.
#   4. Pulls the Purple8 Developer image from GHCR.
#   5. Asks for your license key (or reads $PURPLE8_LICENSE_JWT).
#   6. Starts the container on port 8100 with a persistent data volume.
#   7. Opens the admin console at http://localhost:8100/lcnc
#
# The script is safe to re-run: it recreates the container and never deletes
# your data volume. Nothing here phones home — it only pulls the public image.
#
# Windows users: run the PowerShell installer instead:
#   irm https://www.purple8.ai/install.ps1 | iex
#
set -euo pipefail

# ─── Config ───────────────────────────────────────────────────────────────────
IMAGE="ghcr.io/purple8-technologies/purple8-graph:developer"
CONTAINER="purple8"
PORT="8100"
VOLUME="purple8-data"
CONSOLE_URL="http://localhost:${PORT}/lcnc"
HEALTH_URL="http://localhost:${PORT}/health"

# Docker invocation for daemon-access commands (pull/run/ps/info/logs). Normally
# just "docker", but on a fresh Linux install where we just added the user to
# the 'docker' group, that membership is NOT active in the current shell (it
# needs a logout/login or `newgrp docker`). To let a fresh one-click install
# finish in a single invocation, resolve_docker_cmd() transparently falls back
# to "sudo docker" for THIS run. Subsequent logins work sudo-free.
DOCKER="docker"

# ─── Pretty output ────────────────────────────────────────────────────────────
if [ -t 1 ]; then
  BOLD=$'\033[1m'; DIM=$'\033[2m'; PURPLE=$'\033[35m'; GREEN=$'\033[32m'
  YELLOW=$'\033[33m'; RED=$'\033[31m'; RESET=$'\033[0m'
else
  BOLD=""; DIM=""; PURPLE=""; GREEN=""; YELLOW=""; RED=""; RESET=""
fi
step() { printf "\n%s▸ %s%s\n" "$BOLD$PURPLE" "$1" "$RESET"; }
info() { printf "  %s%s%s\n" "$DIM" "$1" "$RESET"; }
ok()   { printf "  %s✓ %s%s\n" "$GREEN" "$1" "$RESET"; }
warn() { printf "  %s! %s%s\n" "$YELLOW" "$1" "$RESET"; }
die()  { printf "\n%s✗ %s%s\n" "$RED" "$1" "$RESET" >&2; exit 1; }

banner() {
  printf "%s\n" "$PURPLE$BOLD"
  cat <<'ART'
  ██████  ██    ██ ██████  ██████  ██      ███████  █████
  ██   ██ ██    ██ ██   ██ ██   ██ ██      ██      ██   ██   8
  ██████  ██    ██ ██████  ██████  ██      █████   ███████
  ██      ██    ██ ██   ██ ██      ██      ██      ██   ██
  ██       ██████  ██   ██ ██      ███████ ███████ ██   ██
ART
  printf "%s  Developer edition — one-click installer%s\n" "$RESET$DIM" "$RESET"
}

# ─── 1. Detect platform ───────────────────────────────────────────────────────
detect_platform() {
  OS="$(uname -s)"
  ARCH="$(uname -m)"
  case "$OS" in
    Darwin) PLATFORM="macos" ;;
    Linux)  PLATFORM="linux" ;;
    *) die "Unsupported OS '$OS'. On Windows, run: irm https://www.purple8.ai/install.ps1 | iex" ;;
  esac
}

# ─── 2. Ensure Docker ─────────────────────────────────────────────────────────
have_docker() { command -v docker >/dev/null 2>&1; }

# We deliberately do NOT auto-download/-install Docker. Silently pulling a
# multi-hundred-MB Docker Desktop DMG/EXE over the user's connection is slow,
# opaque, and was hanging installs with no feedback. Docker Desktop also needs
# a GUI licence acceptance + reboot on macOS/Windows that a shell script cannot
# drive cleanly. Instead we detect it and hand the user the one official link.
docker_install_hint() {
  case "$PLATFORM" in
    macos)
      warn "Docker Desktop is required and was not found."
      info "Install it (2 minutes), then re-run this installer:"
      info "  ${BOLD}https://www.docker.com/products/docker-desktop/${RESET}${DIM}"
      info "  1. Download Docker Desktop for Mac (Apple Silicon or Intel)."
      info "  2. Open the .dmg and drag Docker to Applications."
      info "  3. Launch Docker Desktop and wait for the whale icon to settle."
      ;;
    linux)
      warn "Docker Engine is required and was not found."
      info "Install it, then re-run this installer:"
      info "  ${BOLD}https://docs.docker.com/engine/install/${RESET}${DIM}"
      info "  Most distros:  ${BOLD}curl -fsSL https://get.docker.com | sudo sh${RESET}${DIM}"
      info "  Then:          ${BOLD}sudo systemctl enable --now docker${RESET}${DIM}"
      ;;
    *)
      warn "Docker is required and was not found."
      info "Install Docker Desktop: ${BOLD}https://www.docker.com/products/docker-desktop/${RESET}"
      ;;
  esac
}

ensure_docker() {
  if have_docker; then
    ok "Docker is already installed ($(docker --version 2>/dev/null | head -n1))."
    return
  fi
  docker_install_hint
  die "Docker is not installed. Install it using the link above, then re-run this installer."
}

# Decide whether daemon-access docker commands need `sudo` for THIS run. On a
# fresh Linux install the new 'docker' group membership isn't active yet, so an
# unprivileged `docker info` fails even though the daemon is up. Rather than
# time out, fall back to `sudo docker` for this session only. macOS (Docker
# Desktop) never needs this — the socket is owned by the user.
resolve_docker_cmd() {
  [ "$PLATFORM" = "linux" ] || return 0
  # Direct access works (existing install, or group already active) — done.
  if docker info >/dev/null 2>&1; then
    DOCKER="docker"
    return 0
  fi
  # No direct access. If the daemon is reachable via sudo, use sudo this run.
  if sudo -n docker info >/dev/null 2>&1 || sudo docker info >/dev/null 2>&1; then
    DOCKER="sudo docker"
    warn "Using 'sudo docker' for this install — the new 'docker' group membership"
    warn "activates after you log out and back in (or run: newgrp docker)."
    return 0
  fi
  # Neither worked (daemon still booting or truly down); leave DOCKER=docker and
  # let wait_for_daemon report a clear message.
  DOCKER="docker"
}

wait_for_daemon() {
  step "Waiting for the Docker engine to start"
  local tries=0 max=90
  until $DOCKER info >/dev/null 2>&1; do
    tries=$((tries + 1))
    if [ "$tries" -ge "$max" ]; then
      die "Docker engine did not start in time. Open Docker Desktop, wait for it to say 'running', then re-run this script."
    fi
    if [ "$PLATFORM" = "macos" ] && [ "$tries" -eq 1 ]; then
      info "Docker Desktop can take 20–40s to boot the first time…"
      open -a Docker >/dev/null 2>&1 || true
    fi
    printf "  %s… still starting (%ss)%s\r" "$DIM" "$tries" "$RESET"
    sleep 1
  done
  printf "\n"
  ok "Docker engine is running."
}

# ─── 3. License key ───────────────────────────────────────────────────────────
# A Developer JWT (RS256/RSA-4096) can run 800-1000+ chars — long enough to hit
# the terminal's canonical-mode line limit, which is what made pasting "hang"
# (the paste half-lands, the shell keeps waiting for a newline that never
# cleanly arrives). read_key_raw() fixes this the simple way: turn OFF
# canonical mode (no line-length limit) and read one char at a time until
# Enter. Echo stays ON — you see exactly what you typed/pasted, which is also
# just simpler than pretending a license key is a secret that needs masking.
read_key_raw() {
  REPLY_KEY=""
  local old_stty c timeout_s
  timeout_s="${P8_KEY_TIMEOUT:-120}"
  old_stty="$(stty -g </dev/tty 2>/dev/null || true)"

  # Disable bracketed paste so a pasted key isn't wrapped in literal
  # ESC[200~ … ESC[201~ marker bytes by the terminal.
  printf '\e[?2004l' >/dev/tty 2>/dev/null || true
  stty -icanon echo min 1 time 0 </dev/tty 2>/dev/null || true

  while IFS= read -r -n1 -t "$timeout_s" c </dev/tty 2>/dev/null; do
    [ -z "$c" ] && break   # Enter pressed → done (also true if skipped immediately)
    REPLY_KEY="${REPLY_KEY}${c}"
  done

  [ -n "$old_stty" ] && stty "$old_stty" </dev/tty 2>/dev/null || true
  printf '\e[?2004h' >/dev/tty 2>/dev/null || true
  printf "\n"

  # Defensive: strip bracketed-paste markers if any leaked through.
  REPLY_KEY="${REPLY_KEY#$'\e'\[200~}"
  REPLY_KEY="${REPLY_KEY%$'\e'\[201~}"
}

get_license() {
  step "License key"
  if [ -n "${PURPLE8_LICENSE_JWT:-}" ]; then
    ok "Using PURPLE8_LICENSE_JWT from your environment."
    return
  fi
  info "Your free Developer license (PURPLE8_LICENSE_JWT) is on your activation"
  info "screen and in your email. Don't have one yet? Get it in one click:"
  info "  ${BOLD}https://www.purple8.ai/register${RESET}${DIM}"
  info ""
  info "Tip: the most reliable way is to pass the key up-front, no pasting:"
  info "  ${BOLD}curl -fsSL https://www.purple8.ai/install.sh | PURPLE8_LICENSE_JWT=\"eyJ...\" bash${RESET}${DIM}"
  printf "\n  Paste your license key (or press Enter to run unlicensed for now): "
  # Read from the terminal even when the script is piped from curl. Uses the
  # raw reader so long pastes aren't truncated by the canonical line limit.
  if [ -r /dev/tty ]; then
    read_key_raw
    PURPLE8_LICENSE_JWT="${REPLY_KEY}"
  else
    # No tty (fully non-interactive) — nothing to read; run unlicensed.
    PURPLE8_LICENSE_JWT=""
  fi
  # Strip any stray whitespace/newlines a paste may have introduced.
  PURPLE8_LICENSE_JWT="$(printf '%s' "${PURPLE8_LICENSE_JWT:-}" | tr -d '[:space:]')"
  if [ -z "${PURPLE8_LICENSE_JWT:-}" ]; then
    warn "No key entered — starting without a license. Add one later by re-running this script."
    PURPLE8_LICENSE_JWT=""
  else
    # Sanity check: a JWT has exactly two dots. Warn (don't block) if it looks off.
    local dots
    dots="$(printf '%s' "$PURPLE8_LICENSE_JWT" | tr -cd '.' | wc -c | tr -d ' ')"
    if [ "$dots" != "2" ]; then
      warn "That doesn't look like a complete JWT (expected 2 dots, got ${dots})."
      warn "Continuing anyway — if licensing fails, re-run with PURPLE8_LICENSE_JWT set."
    fi
    ok "License key captured (${#PURPLE8_LICENSE_JWT} chars)."
  fi
}

# ─── 3b. First admin account (optional) ───────────────────────────────────────
# A fresh install has no accounts. The operator can either create the first
# admin here (passed to the container as P8G_ADMIN_EMAIL/P8G_ADMIN_PASSWORD and
# created on first boot), or skip and use the in-console /lcnc/setup wizard.
# Honours pre-set env vars for fully non-interactive installs.
get_admin() {
  step "First administrator account"
  if [ -n "${P8G_ADMIN_EMAIL:-}" ] && [ -n "${P8G_ADMIN_PASSWORD:-}" ]; then
    ok "Using P8G_ADMIN_EMAIL / P8G_ADMIN_PASSWORD from your environment."
    return
  fi
  info "Create your admin login now, or press Enter to skip and set it up in the"
  info "browser at ${CONSOLE_URL} on first launch."
  if [ ! -r /dev/tty ]; then
    # No tty — skip; the LCNC setup wizard will handle it.
    P8G_ADMIN_EMAIL=""; P8G_ADMIN_PASSWORD=""
    warn "Non-interactive run — skipping. Create your admin at ${CONSOLE_URL}."
    return
  fi
  printf "\n  Admin email (or press Enter to skip): "
  IFS= read -r P8G_ADMIN_EMAIL </dev/tty || P8G_ADMIN_EMAIL=""
  P8G_ADMIN_EMAIL="$(printf '%s' "${P8G_ADMIN_EMAIL:-}" | tr -d '[:space:]')"
  if [ -z "${P8G_ADMIN_EMAIL:-}" ]; then
    P8G_ADMIN_PASSWORD=""
    info "Skipped — create your admin at ${CONSOLE_URL} on first launch."
    return
  fi
  # Read the password in plain sight (no stty -echo). This is a local,
  # single-user install script — hiding the password just hid whether typing
  # was even registering, which is what made it look "broken". The server
  # enforces a strict policy on first-boot admin creation
  # (auth.py:validate_password_strength): 12+ chars AND upper AND lower AND
  # digit AND special. If the password fails ANY rule, the container silently
  # skips admin creation and you can't log in — so we validate the SAME rules
  # here and refuse to continue until it would actually be accepted.
  info "(Your password will be shown as you type — this is a local install.)"
  while :; do
    printf "  Admin password (min 12 chars, incl. upper, lower, digit & symbol): "
    IFS= read -r P8G_ADMIN_PASSWORD </dev/tty || P8G_ADMIN_PASSWORD=""
    if [ "${#P8G_ADMIN_PASSWORD}" -lt 12 ]; then
      warn "Too short — please use at least 12 characters."
      continue
    fi
    case "$P8G_ADMIN_PASSWORD" in *[A-Z]*) : ;; *) warn "Must include an uppercase letter."; continue ;; esac
    case "$P8G_ADMIN_PASSWORD" in *[a-z]*) : ;; *) warn "Must include a lowercase letter."; continue ;; esac
    case "$P8G_ADMIN_PASSWORD" in *[0-9]*) : ;; *) warn "Must include a digit."; continue ;; esac
    case "$P8G_ADMIN_PASSWORD" in *[\!\@\#\$\%\^\&\*\(\)\-_=+\[\]\{\}\|\;:\'\",.\<\>?/\`~]*) : ;; *) warn "Must include a special character (e.g. ! @ # \$ % ^ & *)."; continue ;; esac
    printf "  Confirm password: "
    IFS= read -r _pw_confirm </dev/tty || _pw_confirm=""
    if [ "$P8G_ADMIN_PASSWORD" != "$_pw_confirm" ]; then
      warn "Passwords did not match — try again."
      continue
    fi
    break
  done
  ok "Admin account will be created on first boot: ${P8G_ADMIN_EMAIL}"
}

# ─── 4. Pull + run ────────────────────────────────────────────────────────────
deploy() {
  step "Pulling the Purple8 Developer image"
  info "$IMAGE"
  $DOCKER pull "$IMAGE" || die "Could not pull the image. Check your internet connection and try again."
  ok "Image ready."

  step "Starting Purple8"
  if $DOCKER ps -a --format '{{.Names}}' | grep -qx "$CONTAINER"; then
    info "Removing the previous '$CONTAINER' container (your data volume is kept)…"
    $DOCKER rm -f "$CONTAINER" >/dev/null 2>&1 || true
  fi
  $DOCKER run -d \
    --name "$CONTAINER" \
    -p "${PORT}:${PORT}" \
    -e PURPLE8_LICENSE_JWT="${PURPLE8_LICENSE_JWT:-}" \
    -e P8G_ADMIN_EMAIL="${P8G_ADMIN_EMAIL:-}" \
    -e P8G_ADMIN_PASSWORD="${P8G_ADMIN_PASSWORD:-}" \
    -e P8G_DATA_PATH="/data" \
    -v "${VOLUME}:/data" \
    "$IMAGE" >/dev/null || die "Container failed to start. Run 'docker logs $CONTAINER' to see why."
  ok "Container '$CONTAINER' is up."
}

wait_for_health() {
  step "Waiting for Purple8 to become healthy"
  local tries=0 max=120
  until curl -fsS "$HEALTH_URL" >/dev/null 2>&1; do
    tries=$((tries + 1))
    # If the container has already exited, stop waiting and show why.
    if ! $DOCKER ps --format '{{.Names}}' | grep -qx "$CONTAINER"; then
      warn "The '$CONTAINER' container stopped unexpectedly. Last log lines:"
      printf "%s" "$DIM"
      $DOCKER logs --tail 20 "$CONTAINER" 2>&1 | sed 's/^/    /'
      printf "%s" "$RESET"
      die "Purple8 exited during startup. See the logs above, then re-run this script."
    fi
    if [ "$tries" -ge "$max" ]; then
      warn "Health check timed out after ${max}s. Last log lines:"
      printf "%s" "$DIM"
      $DOCKER logs --tail 20 "$CONTAINER" 2>&1 | sed 's/^/    /'
      printf "%s" "$RESET"
      warn "Follow live logs with: docker logs -f $CONTAINER"
      return
    fi
    printf "  %s… warming up (%ss)%s\r" "$DIM" "$tries" "$RESET"
    sleep 1
  done
  printf "\n"
  ok "Purple8 is healthy."
}

open_console() {
  step "Opening the admin console"
  info "$CONSOLE_URL"
  case "$PLATFORM" in
    macos) open "$CONSOLE_URL" >/dev/null 2>&1 || true ;;
    linux) (command -v xdg-open >/dev/null 2>&1 && xdg-open "$CONSOLE_URL" >/dev/null 2>&1) || true ;;
  esac
}

done_message() {
  printf "\n%s%s Purple8 is running.%s\n" "$GREEN$BOLD" "✓" "$RESET"
  cat <<EOF

  ${BOLD}What's next${RESET}
    • Admin console   ${CONSOLE_URL}
    • REST API + MCP  http://localhost:${PORT}/mcp
    • Health          ${HEALTH_URL}

  ${BOLD}Handy commands${RESET}
    docker logs -f ${CONTAINER}      # follow the logs
    docker stop ${CONTAINER}         # stop the engine
    docker start ${CONTAINER}        # start it again
    docker rm -f ${CONTAINER}        # remove (keeps the ${VOLUME} volume)

  Docs & quickstart: https://www.purple8.ai/quickstart
EOF
}

main() {
  banner
  detect_platform
  step "Detected ${PLATFORM} (${ARCH})"
  ensure_docker
  resolve_docker_cmd
  wait_for_daemon
  get_license
  get_admin
  deploy
  wait_for_health
  open_console
  done_message
}

main "$@"
