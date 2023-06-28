# crypto-swap

# Table of Contents

<!-- TOC -->
* [Introduction](#introduction)
* [Prerequisite](#prerequisite)
* [Dev Setup](#dev-setup)
* [React Use](#react-use)
* [Vanilla-JS Use](#vanilla-js-use)
* [Build](#build)

<!-- TOC -->

# Introduction
With Crypto Swap, you can effortlessly exchange one cryptocurrency for another within your website. We support React and vanila-js. 

# Prerequisite
Before using this library you should register some services.

1. [Wallet Connect](https://docs.walletconnect.com/2.0/cloud/explorer)
2. [Change Now](https://changenow.io/affiliate)

# Dev Setup

1. Clone this project and run `npm install`

2. Go to `examples` folder

- For React developer 
  - Go to `simple` folder, run `npm install`
  - In `App.jsx` file, fill `WALLET_CONNECT_PROJECT_ID` and `CHANGE_NOW_API_KEY` with your key .
  - Run `npm start`
  - Go to `localhost:3000` in your browser.

- For Javascript developer
  - Go to `vanilla-website` folder
  - In `index.html`, fill `WALLET_CONNECT_PROJECT_ID` and `CHANGE_NOW_API_KEY` with your key.
  - Use `serve` module to serve this html file.

# React Use

- Install our `node_module` from github.

```bash
npm install "https://github.com/Snapbrillia/crypto-swap.git" --save
```

- Create a simple ExchangeForm like this. Remember to replace your `WALLET_CONNECT_PROJECT_ID` and `CHANGE_NOW_API_KEY`.

```javascript
import {SnapbrilliaElement, useSnapbrilliaContext} from 'crypto-swap';

const ExchangeForm = () => {
  const {showModal} = useSnapbrilliaContext();
  return (
    <form>
      <button type="button" onClick={showModal}>
        Exchange
      </button>
    </form>
  );
};

const App = () => {
  const settings = {
    WALLET_CONNECT_PROJECT_ID: 'xxxxxx',
    CHANGE_NOW_API_KEY: 'xxxx'
  }
  return (
    <SnapbrilliaElement settings={settings}>
      <ExchangeForm />
    </SnapbrilliaElement>
  );
};

```

# Vanilla-JS Use

- Include our `dist/bundle.js` in your html.
- Define a button in your html.
```html
  <button id="exchange-button" style="display: none;">
    Exchange
  </button>
```
- Link your button with library.

```javascript
const snapbrilliaExchange = window.initSnapbrilliaExchange({
  WALLET_CONNECT_PROJECT_ID: 'xxxx',
  CHANGE_NOW_API_KEY: 'xxxx',
  onReady: function ({
    showModal,
    closeModal
  }) {
    var x = document.getElementById("exchange-button");
    x.style.display = "block";
    x.onclick = showModal;
  }
});
```    

# Build
 To build your custom version
 - Fork our repo.
 - Change our code.
 - Run 
```bash
npm run build
```
