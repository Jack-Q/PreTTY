# PreTTY

> PreTTY is prettier than PuTTY



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

### Build / Package

```bash
# package for current platform
npm run package
```

note: Package process done by `electro-builder`


--- 

Licensed under [MIT](./LICENSE).