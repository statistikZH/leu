# Contributing

We welcome contributions!

To submit a contribution:

    1. Fork the repository and make your changes.

    2. Submit a pull request.

## Collaboration guidelines

We don't want to enforce to many rules on how to collaborate on this project. But there are a few things that should be considered when contributing to this project.

### Commit messages

We enforce [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) messages with [commitlint](https://commitlint.js.org/#/). This way we can automatically generate a changelog and version the project with Release Please accordingly.

If you're working on a component, please use its name as the scope of the commit message.
For example:

You've added a new feature to the `leu-radio` component. Your commit message should look like this:

```bash
git commit -m "feat(leu-radio): add new feature"
```

### Branching

All new features should be developed in a feature branch that is branched off from the `main` branch. Each branch can then be linked to the respective issue on GitHub. Please do not merge feature branches into each other. Try to merge into the `main` branch as soon as possible. This way we can keep the `main` branch up to date and avoid having dependencies between feature branches.
The feature branch should always be prefixed with the issue number (e.g. `48-dropdown`).
