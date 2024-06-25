# Contributing

Thanks for your interest in contributing to our project. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to our team.

## About this repository

This repository follows a monorepo structure..

- Development is managed using [pnpm](https://pnpm.io) and it's [`workspaces`](https://pnpm.io/workspaces).
- The build system is powered by [Turborepo](https://turbo.build/repo).
- We handle releases using [changesets](https://github.com/changesets/changesets).

## Structure

```bash
apps
└── web
    ├── script
    ├── test
    └── src
        ├── utils

          ├── example.ts
packages
└── cli

```

| Path              | Description                                  |
| ----------------- | -------------------------------------------- |
| `apps/web/src/utils`  | Utility functions                        |
| `apps/web/src/test`   | Utility tests                            |
| `packages/cli`     | Command Line Interface (CLI) package        |

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/Saifurrahmanemon/utils-kit
```

### Navigate to project directory

```bash
cd utils-kit
```

### Create a new Branch

```bash
git checkout -b new-branch
```

### Install dependencies

```bash
pnpm install
```

### To Run the Project

```bash
pnpm dev
```

## Utilities

We maintain a set of utility functions in the `apps/web/src/utils` directory. Utility tests are located in `apps/web/src/test`.


### Create the Utility Function

Add your utility function file in `apps/web/src/utils`. For example, if you are adding a new utility `exampleUtil`, create a file named `exampleUtil.ts` in the utils directory.

```typescript
// apps/web/src/utils/exampleUtil.ts
export const exampleUtil = () => {
  // Your utility code here
};

```

### Write Tests

Add tests for your utility function in apps/web/src/test. Create a file named exampleUtil.test.ts.

```typescript
// apps/web/test/exampleUtil.test.ts
import { exampleUtil } from '../utils/exampleUtil';

describe('exampleUtil', () => {
  it('should perform its function correctly', () => {
    // Your test code here
  });
});
```

### Write Documents

Write details about utility in [Available Utils](available-utils.md)

### Testing

Tests are written using Vitest. You can run all the tests from the root of the repository.

```bash
pnpm test
```

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories.

Thank you for contributing!
