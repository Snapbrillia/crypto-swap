import React, { createContext, useContext, useState, useEffect } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { FLOW_TYPES } from '../utils/constant';
import { Exchange, Crypto } from '../core';

const SnapbrilliaContext = createContext();
const useSnapbrilliaContext = () => useContext(SnapbrilliaContext);

const SnapbrilliaProvider = ({ settings, children }) => {
  const [isOpenModal, setShowModal] = useState(false);
  const [supportedCurrencies, setSupportedCurrencies] = useState([]);
  const [isStarted, setIsStarted] = useState(false);

  if (!settings.CHANGE_NOW_API_KEY) {
    console.error("INVALID CHANGE NOW API KEY");
  }

  const exchangeSDK = new Exchange({
    apiKey: settings.CHANGE_NOW_API_KEY
  });
  const cryptoSDK = new Crypto({
    apiKey: settings.CHANGE_NOW_API_KEY
  });

  const defaultTransaction = {
    id: '',
    payinAddress: '',
    payoutAddress: '',
    transactionSpeedForecast: '',

    fromCurrency: 'eth',
    fromNetwork: 'eth',
    toCurrency: 'ada',
    toNetwork: 'ada',
    fromAddress: '',
    toAddress: '',
    amount: 0.1,
    toAmount: 0,
    flow: FLOW_TYPES.STANDARD,
  };

  const transactionForm = useFormik({
    enableReinitialize: true,
    initialValues: defaultTransaction,
    validationSchema: Yup.object({
      fromCurrency: Yup.string(),
      fromNetwork: Yup.string(),
      toCurrency: Yup.string(),
      toNetwork: Yup.string(),
      fromAddress: Yup.string(),
      toAddress: Yup.string(),
    }),
    onSubmit: async (values) => {
      const body = {
        ...values,
      };
      const newTransaction = await exchangeSDK.createTransaction(body);
      transactionForm.handleChange({
        target: { name: 'id', value: newTransaction.id },
      });
      transactionForm.handleChange({
        target: { name: 'payinAddress', value: newTransaction.payinAddress },
      });
    },
  });

  const showModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const resetTransaction = () => {
    transactionForm.resetForm();
  };

  const getListCurrencies = async () => {
    const currencies = await exchangeSDK.getCurrencies({});
    setSupportedCurrencies(currencies);
    setIsStarted(true);
  };

  const getTransaction = async () => {
    if (transactionForm.values.id) {
      const data = await exchangeSDK.getTransaction(transactionForm.values.id);
      return data;
    }
  };

  useEffect(() => {
    getListCurrencies();
  }, []);

  useEffect(() => {
    if (isStarted) {
      if (settings.onReady && typeof settings.onReady === 'function') {
        settings.onReady({
          showModal,
          closeModal,
        });
      }
    }
  }, [isStarted])

  return (
    <SnapbrilliaContext.Provider
      value={{
        ...transactionForm,
        exchangeSDK,
        cryptoSDK,
        showModal,
        closeModal,
        isOpenModal,
        resetTransaction,
        supportedCurrencies,
        getTransaction,
      }}
    >
      {isStarted && children}
    </SnapbrilliaContext.Provider>
  );
};

export { SnapbrilliaProvider, useSnapbrilliaContext };
