import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Modal } from './Modal/Modal.jsx';
import { Stepper } from './Stepper/Stepper.jsx';

import { SnapbrilliaProvider } from '../context/SnapbrilliaContext.jsx';
import { WalletProvider } from '../context/WalletContext.jsx';

import './style.css'

const SnapbrilliaElement = ({ settings, children }) => {

  return (
    <SnapbrilliaProvider settings={settings}>
      <WalletProvider settings={settings}>
        <Modal >
          <Stepper />
        </Modal>
        {children}
        <ToastContainer />
      </WalletProvider>
    </SnapbrilliaProvider>
  );
};

export { SnapbrilliaElement };
