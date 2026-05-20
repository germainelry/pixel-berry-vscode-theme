#!/usr/bin/env bash
# 09-shell.sh — variables, heredocs, control flow, redirections.
set -euo pipefail
IFS=$'\n\t'

# Constants
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly LOG_FILE="${LOG_FILE:-/tmp/pixel-berry.log}"
readonly MAX_RETRIES=3

log() {
  local level="$1"; shift
  printf '[%s] %s: %s\n' "$(date +%FT%T)" "$level" "$*" | tee -a "$LOG_FILE"
}

retry() {
  local n=0
  until "$@"; do
    n=$((n + 1))
    if (( n >= MAX_RETRIES )); then
      log ERROR "giving up after $n attempts"
      return 1
    fi
    log WARN "retry $n/$MAX_RETRIES"
    sleep $((2 ** n))
  done
}

cleanup() {
  local exit_code=$?
  log INFO "cleanup (exit=$exit_code)"
  rm -f -- "${SCRIPT_DIR}/.lock"
  exit "$exit_code"
}
trap cleanup EXIT INT TERM

main() {
  local mode="${1:-default}"
  case "$mode" in
    default|run) log INFO "running in $mode" ;;
    test)        log INFO "running tests" ;;
    *)           log ERROR "unknown mode: $mode"; return 2 ;;
  esac

  cat <<EOF >> "$LOG_FILE"
=== heredoc block ===
mode=$mode
pid=$$
EOF

  cat <<'EOF' >> "$LOG_FILE"
no interpolation here: $not_expanded
EOF

  if [[ -d "$SCRIPT_DIR" && -w "$LOG_FILE" ]]; then
    for file in "$SCRIPT_DIR"/*.sh; do
      [[ -f "$file" ]] || continue
      log INFO "found: $file"
    done
  fi

  retry curl --fail --silent --output /dev/null "https://example.com" \
    && log INFO "fetch ok" \
    || log ERROR "fetch failed"
}

main "$@"
