# Workflows

Documentation of the github workflows for Hopr SDK.

- check formatting: runs a prettier check
- docs: generates docs automatically from main changes
- lint: runs typescript lint check
- tests: runs all the unit tests and e2e tests

## Docs

### Fix docs workflow

The docs workflow can sometimes fail due to conflicts. If this is the case then run the following steps to fix it manually:

1. git fetch origin main
2. git fetch origin docs
3. git checkout docs
4. git reset --hard origin/main
5. yarn docs
6. git push origin docs --force-with-lease

This will be an quick and easy solution to fixing docs, the reason behind it is that the actual code that docs should document will always be up to date with main.
