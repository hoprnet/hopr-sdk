# Contributing to Hopr SDK

Thank you for investing your time in contributing to our project!

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

## Getting started

To get an overview of the project, read the [README](README.md) file.

### Issues

#### Create a new issue

If you spot a problem with the docs, [search if an issue already exists](https://github.com/hoprnet/hopr-sdk/issues). If a related issue doesn't exist, you can open a new issue using a relevant [issue form](https://github.com/hoprnet/hopr-sdk/issues/new/choose).

#### Solve an issue

Scan through our [existing issues](https://github.com/hoprnet/hopr-sdk/issues) to find one that interests you. As a general rule, we don’t assign issues to anyone. If you find an issue to work on, you are welcome to open a PR with a fix.

### Make Changes

1. Fork the repository.
2. Install or update to **Node.js**, at the version specified in `package.json` engines section.
3. Run `yarn`.
4. Create a working branch and start with your changes!

#### More documentation for your changes

- [hopr-sdk project setup](./src/README.md)
- [type system](./src/types/README.md)
- [e2e setup](./e2e/README.md)

### Pull Request

When you're finished with the changes, create a pull request, also known as a PR.

- Fill the "Ready for review" template so that we can review your PR. This template helps reviewers understand your changes as well as the purpose of your pull request.
- Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.
  Once you submit your PR, a team member will review your proposal. We may ask questions or request additional information.
- We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
- As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
- If you run into any merge issues, checkout this [git tutorial](https://github.com/skills/resolve-merge-conflicts) to help you resolve merge conflicts and other issues.
