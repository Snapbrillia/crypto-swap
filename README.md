# meta-eth-ada
For dev
```
   npm install
   cd examples/simple
   npm install
   npm start
```

For test from git
```
npm install "https://github.com/Snapbrillia/meta-eth-ada.git#dev" --save


import {SnapbrilliaElement, useSnapbrilliaContext} from 'meta-eth-ada';

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
