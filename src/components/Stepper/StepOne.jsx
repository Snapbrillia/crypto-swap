import React, { createContext, useContext, useState, useEffect } from 'react';

import qrcode from '../../assets/qrcode.svg';
import lock from '../../assets/lock.svg';
import swapIcon from '../../assets/swap.svg';
import spinner from '../../assets/spinner.gif';
import EtrnlButton from '../../assets/etrnl_btn.png';
import FlintButton from '../../assets/flint_btn.png';
import GeroButton from '../../assets/gero_btn.png';
import NamiButton from '../../assets/nami_btn.png';
import NufiButton from '../../assets/nufi_btn.png';
import TyphoonButton from '../../assets/typhoon_btn.png';

import { useWalletContext } from '../../context/WalletContext.jsx';
import { useSnapbrilliaContext } from '../../context/SnapbrilliaContext.jsx';

import { Dropdown } from '../Dropdown/Dropdown';
import { useDebouncedCallback } from '../../hook/useDebouncedCallback';

export const StepOne = ({ nextStep }) => {
  const {
    cardanoWalletConnected,
    connectCardanoWallet,
    cardanoAddress,
    connecting,
  } = useWalletContext();
  const {
    exchangeSDK,
    values,
    handleChange,
    supportedCurrencies,
    setValues,
    setFieldValue,
  } = useSnapbrilliaContext();
  const [toAmount, setToAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cardanoAddress) {
      handleChange({
        target: { name: 'toAddress', value: cardanoAddress },
      });
    }
  }, [cardanoWalletConnected]);

  const swap = () => {
    setValues({
      ...values,
      fromCurrency: values.toCurrency,
      fromNetwork: values.toNetwork,
      toCurrency: values.fromCurrency,
      toNetwork: values.fromNetwork,
    });
  };

  const debouncedChangeAmount = useDebouncedCallback(
    (field, value) => setFieldValue(field, value),
    500
  );

  const getEstimateAmount = ({
    fromCurrency,
    fromNetwork,
    toCurrency,
    toNetwork,
    flow,
    fromAmount,
    toAmount,
  }) => {
    setLoading(true);
    return exchangeSDK
      .estimateAmount({
        fromCurrency,
        fromNetwork,
        toCurrency,
        toNetwork,
        flow,
        fromAmount,
        toAmount,
      })
      .then((data) => {
        setLoading(false);
        if (!data.toAmount) {
          setToAmount(0);
          return;
        }
        setToAmount(data.toAmount);
        handleChange({
          target: {
            name: 'transactionSpeedForecast',
            value: data.transactionSpeedForecast,
          },
        });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   getEstimateAmount({
  //     fromCurrency: values.fromCurrency,
  //     fromNetwork: values.fromNetwork,
  //     toCurrency: values.toCurrency,
  //     toNetwork: values.toNetwork,
  //     flow: values.flow,
  //     fromAmount: values.amount
  //   })
  // }, []);

  useEffect(() => {
    getEstimateAmount({
      fromCurrency: values.fromCurrency,
      fromNetwork: values.fromNetwork,
      toCurrency: values.toCurrency,
      toNetwork: values.toNetwork,
      flow: values.flow,
      fromAmount: values.amount,
    });
  }, [
    values.amount,
    values.fromCurrency,
    values.toCurrency,
    values.fromNetwork,
    values.toNetwork,
  ]);

  return (
    <div className="first-step__data-exchange data-exchange">
      <div className="data-exchange__settings data-exchange__settings_desktop">
        <div className="settings__rates"></div>
        <div className="settings__selectors">
          <div className="selectors__select-box select-box select-box_big">
            <div className="select-box__input">
              <label className="select-box__input-comment">You send</label>
              <input
                name="amount"
                className="select-box__input-field"
                autoComplete="off"
                inputMode="decimal"
                disabled={loading}
                defaultValue={values.amount}
                onChange={(e) => {
                  const { name, value } = e.target;
                  debouncedChangeAmount(name, value);
                }}
              />
            </div>
            <Dropdown
              value={values.fromCurrency}
              currencies={supportedCurrencies}
              onChange={(e) => {
                setValues({
                  ...values,
                  fromCurrency: e.ticker,
                  fromNetwork: e.network,
                });
              }}
              disabled={loading}
            />
          </div>
          <button
            type="button"
            className="swap-button selectors__swap-button"
            onClick={swap}
          >
            <img alt="" src={swapIcon} className="swap-button_horizontal" />
          </button>
          <div className="selectors__select-box select-box select-box_big">
            <div className="select-box__input">
              <label className="select-box__input-comment">You get</label>
              {loading ? (
                <div className="select-box__input-field">
                  <img alt="" src={spinner} className="loading_spinner" />
                </div>
              ) : (
                <input
                  className="select-box__input-field"
                  disabled={true}
                  value={toAmount}
                />
              )}

              {/* <div className="select-box__input-lock-icon">
                <button className="select-box__lock lock-button" type="button">
                  <img alt="" src={lock} />
                </button>
                <div className="lock-button__tooltip tooltip tooltip_horizontal tooltip_white">
                  <div className="tooltip__content" style={{ display: 'none' }}>
                    <div className="tooltip__header">
                      <div className="tooltip__title">Fixed rate mode</div>
                    </div>
                    <div className="tooltip__body">
                      If mode on: the exchange is completed regardless of the
                      rate fluctuations. We guarantee you will receive the
                      agreed amount.
                    </div>
                  </div>
                  <div className="tooltip__tail_right"></div>
                </div>
              </div> */}
            </div>
            <Dropdown
              value={values.toCurrency}
              currencies={supportedCurrencies}
              onChange={(e) => {
                setValues({
                  ...values,
                  toCurrency: e.ticker,
                  toNetwork: e.network,
                });
              }}
              disabled={loading}
            />
          </div>
        </div>
        <div className="settings__hints">
          <div className="hints">
            <div className="hint-items hints-items_horizontal">
              <div className="hint-item hint-item_not-dot">
                <div className="universal-tooltip">
                  <div className="hint-item__title hint-item__title_pointer hint-item_not-dot">
                    <span className="hint-item__title-text hint-item__title_link">
                      No extra fee
                    </span>
                  </div>
                  <span className="hint-item__rate"></span>
                </div>
              </div>
              <div className="hint-item hint-item_not-dot">
                <div className="universal-tooltip">
                  <div className="hint-item__title hint-item__title_pointer hint-item_not-dot">
                    <span className="hint-item__title-text hint-item__title_link">
                      Estimated rate
                    </span>
                  </div>
                  <span className="hint-item__rate">
                    1 {values.fromCurrency?.toUpperCase()} ~{' '}
                    {toAmount && values.amount && toAmount / values.amount}{' '}
                    {values.toCurrency?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="data-exchange__wallets">
        <div className="wallets__address-and-extra">
          <div className="custom-input-field wallets__custom-input-address">
            <div className="custom-input-field__header">
              <label className="header__label">
                <div className="header__label-text">Recipient Wallet</div>
              </label>
              {/* <button className="header__hint">Don’t have a wallet yet?</button> */}
            </div>
            <div className="custom-input-field__input-wrapper">
              <input
                type="text"
                name="toAddress"
                className="custom-input-field__input"
                placeholder={`Enter ${values.toCurrency?.toUpperCase()} payout address`}
                onChange={handleChange}
                value={values.toAddress}
              />
              {connecting && (
                <button
                  type="button"
                  className="custom-input-field__icon custom-input-field__button_qr"
                >
                  <img src={spinner} alt="qrcode" width={'40'} height={'40'} />
                </button>
              )}
            </div>
            <div className="collapse-panel">
              <div className="custom-input-field__hint collapse-panel__content"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="data-exchange__button">
        {values.toCurrency === 'ada' && (
          <div className="ada-button-groups">
            <button
              type="button"
              disabled={loading}
              onClick={() => connectCardanoWallet('eternl')}
            >
              <img src={EtrnlButton} alt="" />
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => connectCardanoWallet('flint')}
            >
              <img src={FlintButton} alt="" />
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => connectCardanoWallet('gerowallet')}
            >
              <img src={GeroButton} alt="" />
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => connectCardanoWallet('nami')}
            >
              <img src={NamiButton} alt="" />
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => connectCardanoWallet('nufi')}
            >
              <img src={NufiButton} alt="" />
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => connectCardanoWallet('typhoncip30')}
            >
              <img src={TyphoonButton} alt="" />
            </button>
          </div>
        )}
        <button
          className="custom-button"
          type="button"
          disabled={loading || !values.toAddress || toAmount <= 0}
          onClick={() => {
            setFieldValue('toAmount', toAmount), nextStep();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
