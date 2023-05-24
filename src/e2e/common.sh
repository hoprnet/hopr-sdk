#!/bin/bash

# path to this file
DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# stop sandbox
stop() {
    echo Stopping 'nodes'
    docker compose -f "$DIR"/nodes.yml -p sandbox-nodes down -v
    rm -f "$DIR"/logs
    echo "Sandbox has stopped!"
}

# start sandbox
start() {
    # stop if already running
    stop

    echo "Starting 'nodes'"

    #  Run docker compose as daemon
    docker compose -f "$DIR/nodes.yml" -p sandbox-nodes \
        up -d --remove-orphans --build --force-recreate --renew-anon-volumes

    logs_pluto=""
    logs_error=""
    segmentation_error=""
    pluto=false

    echo ""
    echo -e "${GREEN}The script is still running. Don't worry, you need to wait.${NC}"
    sleep 10

    until [[ $pluto == true ]]; do
        docker logs sandbox-nodes-pluto-1 &>"$DIR/logs"
        tail -n 1 "$DIR/logs"
        logs_pluto=$(grep "Terminating this script will clean up the running local cluster" "$DIR/logs" | head -1)
        logs_error=$(grep "Cleaning up processes" "$DIR/logs" | head -1)
        segmentation_error=$(grep "Segmentation fault" "$DIR/logs" | head -1)
        # Check for a segmentation fault or if the retries are over
        if [[ -n "$logs_error" || -n "$segmentation_error" ]]; then
            echo "Unrecoverable error"
            echo "Exiting..."
            stop
            exit
        fi

        [[ -n "$logs_pluto" ]] && pluto=true
    done

    echo "Done 'nodes-docker-compose'"

    echo "Sandbox has started!"
}
