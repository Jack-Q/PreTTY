# PreTTY

> PreTTY is prettier than PuTTY

<img src="./artwork/icon-draft-1/flat.png" width="200" style="margin: auto; display: block" />

## Project Management & Documentation

Most document for this project should be managed via Git and hosted centrally on GitHub.

Project Wiki contains project management relevant documents.
Please refer to [Project Wiki](https://github.com/Jack-Q/PreTTY/wiki)
(follow the instructions in Wiki pages for updating project document).

Detailed tasks for current project is briefly listed in [Projects Section](https://github.com/Jack-Q/PreTTY/projects).
For functionality that requires further discussion and planning, create an
issue in [Issues Section](https://github.com/Jack-Q/PreTTY/issues).

## Development Setup

### Install

```bash
# clone this repo
git clone https://github.com/Jack-Q/PreTTY.git
cd PreTTY

# install dependencies
# requires a node version >= 6 and an npm version >= 3
npm install
```

### Execute

```bash
# execute in development mode
# Chrome DevTools can be enable via F12 / Ctrl+Shift+I / Cmd+Alt+I
npm run dev

# execute in production-ready mode
npm run build && npm run start
```

note: on the first time of execution in development mode, it will try to install
several DevTools extension from Chrome Extension Store.

### Test

```bash
# unit test
npm run test

# e2e test
npm run build && npm run test-e2e
```

A simple SSH server is provide in this repo with extremely limited functionality, which 
can be used to test part of functionality of main program.

```bash
npm run ssh-server
```

### Build / Package

```bash
# package for current platform
npm run package
```

note: Package process done by `electron-builder`

---

Licensed under [MIT](./LICENSE).