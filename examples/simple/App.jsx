import React, {useEffect} from 'react';

import {SnapbrilliaElement, useSnapbrilliaContext ,Crypto} from '../../src';

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
    WALLET_CONNECT_PROJECT_ID: 'xxxx',
    CHANGE_NOW_API_KEY: 'xxxx'
  }
  return (
    <SnapbrilliaElement settings={settings}>
      <ExchangeForm />
    </SnapbrilliaElement>
  );
};

export default App;
