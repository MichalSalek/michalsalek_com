#!/usr/bin/env bash
set -euo pipefail
root="$1"
action="$2"
release="${3:-}"
[[ "$root" == /* && "$root" != / && "$root" != *..* ]] || exit 2
[[ "$release" =~ ^[a-zA-Z0-9_-]+$ ]] || exit 2
[[ "$action" == activate || "$action" == rollback || "$action" == verify ]] || exit 2
cd "$root"
if [[ "$action" == activate ]]; then
    mkdir .deploy-lock 2>/dev/null || { echo 'Another release operation holds the deployment lock.' >&2; exit 3; }
    printf '%s\n' "$release" > .deploy-lock/owner
else
    [[ -f .deploy-lock/owner && "$(cat .deploy-lock/owner)" == "$release" ]] || {
        # A manual rollback may follow an already verified release.
        if [[ "$action" == rollback && ! -e .deploy-lock ]]; then
            mkdir .deploy-lock
            printf '%s\n' "$release" > .deploy-lock/owner
        else echo 'This operation does not own the deployment lock.' >&2; exit 3; fi
    }
fi
swap_link() {
    local target="$1" name="$2"
    rm -f "${name}.next"
    ln -s "$target" "${name}.next"
    if [[ "$(uname -s)" == FreeBSD ]]; then mv -hf "${name}.next" "$name";
    else mv -Tf "${name}.next" "$name"; fi
}
unlock() { rm -f .deploy-lock/owner; rmdir .deploy-lock; }
on_exit() {
    local status=$?
    trap - EXIT
    if [[ "$action" == activate && "$status" != 0 ]]; then
        if [[ "$(readlink public_html 2>/dev/null || true)" == "releases/$release" && -L previous ]]; then
            swap_link "$(readlink previous)" public_html
        elif [[ ! -e public_html && -n "${previous:-}" && -d "$previous" ]]; then
            mv "$previous" public_html
        fi
        unlock
    elif [[ "$action" != activate ]]; then
        unlock
    fi
    exit "$status"
}
trap on_exit EXIT
case "$action" in
    activate)
        [[ -s "releases/$release/index.html" && -s "releases/$release/release.json" ]] || exit 4
        touch "releases/$release/UNVERIFIED"
        if [[ -L public_html ]]; then previous="$(readlink public_html)";
        elif [[ -d public_html ]]; then
            # One-time adoption preserves the entire original export.
            previous="legacy-$release"
            mv public_html "$previous"
            ln -s "$previous" public_html
        else echo 'No existing public_html to preserve.' >&2; exit 5; fi
        swap_link "$previous" previous
        swap_link "releases/$release" public_html
        # Keep the lock until verification or rollback completes.
        ;;
    rollback)
        [[ -L public_html && "$(readlink public_html)" == "releases/$release" && -L previous ]] || exit 6
        swap_link "$(readlink previous)" public_html
        ;;
    verify)
        [[ "$(readlink public_html)" == "releases/$release" ]] || exit 6
        rm -f "releases/$release/UNVERIFIED"
        ;;
esac
printf '%s\n' "public_html -> $(readlink public_html)"
