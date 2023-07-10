#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

test -z "${HOPR_GIT_MSG:-}" && (
    echo "Missing environment variable HOPR_GIT_MSG"
    exit 1
)
test -z "${HOPR_GITHUB_REF:-}" && (
    echo "Missing environment variable HOPR_GITHUB_REF"
    exit 1
)

git diff --name-only origin/docs -- docs/

# Check if there are changes in the docs/ directory from docs generated steps before
if [ -n "$(git diff --name-only origin/docs -- docs/)" ]; then
    git add --all docs/
    git status
    git diff
    # git commit -m "${HOPR_GIT_MSG}"

    # # must get the latest version of the branch from origin before pushing
    # git pull origin docs --rebase --strategy-option recursive -X ours # NB! when pull rebasing, ours is the incoming change (see https://stackoverflow.com/a/3443225)
    # git push origin HEAD:refs/heads/docs                              # Push changes to the 'docs' branch
else
    echo "No changes found in the docs/ directory. Skipping commit and push."
fi
