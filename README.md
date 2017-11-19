# PreTTY

> PreTTY is prettier than PuTTY

<img src="./artwork/icon-draft-1/flat.png" width="200" style="margin: auto; display: block" />

## Development Setup

### Install

```bash
# clone this repo
git clone git@github.com:Jack-Q/PreTTY.git
cd PreTTY

# install dependencies
# requires a node version >= 6 and an npm version >= 3
npm install
```

> **Important Note**:
> The xterm module used here is an pre-release version that fetched directly from GitHub
> which is in lack of proper building process
> Please download/clone the full repo of xterm from GitHub and build using `npm install`
> in `node_modules/xterm`

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

note: Package process done by `electro-builder`


--- 

Licensed under [MIT](./LICENSE).