#!/bin/bash

# prevent sourcing of this script, only allow execution
(return >/dev/null 2>&1)
test "$?" -eq "0" && {
    echo "This script should only be executed." >&2
    exit 1
}

# path to this file
DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)

# load sandbox's start & stop functions
# shellcheck source=/dev/null
source "$DIR/common.sh"

# If there's a fatal error or users Ctrl+C it will tear down setup
trap 'stop; exit 1' SIGINT SIGTERM ERR

# start sandbox
start

# Run tests with env variables
npx jest --ci "$DIR"/
# echo "Started"

# After tests exit tear down setup
stop
