import React, { createContext, useContext, useState, useEffect } from 'react';

import arrow from '../../assets/arrow.svg';
import spinner from '../../assets/spinner.gif';

import { useSnapbrilliaContext } from '../../context/SnapbrilliaContext.jsx';

export const StepTwo = ({ nextStep }) => {
  const { values, submitForm } = useSnapbrilliaContext();
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    await submitForm();
    setLoading(false);
      nextStep();
  }

  const [accepted, setAccepted] = useState(false);
  return <div className="second-step__info">
    <div className="tx-amount-info">
      <div className="tx-amount-info__from">
        <span className="tx-ticker">{values.fromCurrency?.toUpperCase()}</span>
        {/* <img src={btc} className="tx-amount-info__coin-icon" /> */}
        {values.amount}
      </div>
      {/* <img className="tx-amount-info__arrow" src={arrow} /> */}
      <div className="tx-amount-info__to">~ {values.toAmount}
        {/* <img src={eth} className="tx-amount-info__coin-icon" /> */}
        <span className="tx-ticker">{values.toCurrency?.toUpperCase()}</span>
      </div>
    </div>
    <div className="second-step__main-info">
      <div className="main-info__block main-info__block-address">
        <div className="info-block__title">Recipient Wallet Address</div>
        <div className="info-block__text">{values.toAddress}</div>
      </div>
      <div className="main-info__block main-info__block-time">
        <div className="info-block__title">Estimated Arrival</div>
        <div className="info-block__text">~ {values.transactionSpeedForecast} minutes</div>
      </div>
      <div className="main-info__block main-info__block-unit-price">
        <div className="info-block__title">Exchange Rate</div>
        <div className="unit-price-container">
          <span className="unit-price-rate__text unit-price-rate__text_from">1 {values.toCurrency?.toUpperCase()}</span>
          <span className="unit-price-rate__text">~ {values.toAmount && values.amount && values.toAmount / values.amount} {values.fromCurrency?.toUpperCase()} </span>
        </div>
      </div>
    </div>
    <div className="second-step__next-button">
      <button className="custom-button" type="button" disabled={!accepted || loading} onClick={submit} style={{
        "display": "flex",
        "justifyContent": "center"
      }}>
        {loading && <img src={spinner} width={'45'} height={'45'}/>} <span style={{margin: "12px"}}>Exchange</span>
      </button>
    </div>
    <div className="second-step__agreement">
      <label className="second-step__agreement-checkbox" htmlFor="changenow-terms-of-use">
        <input id="changenow-terms-of-use" name="agreement" type="checkbox" checked={accepted} onChange={() => setAccepted((accepted) => !accepted)} />
        <span className="label__text">
          I've read and agree to the provider's
          <a href="#" target="_blank" rel="noopener noreferrer">Terms of use</a> and
          <a href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        </span>
      </label>
    </div>
  </div>
}
