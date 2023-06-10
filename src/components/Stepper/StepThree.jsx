import React, { useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import { utils } from 'ethers'
import { toast } from 'react-toastify';
import copy from '../../assets/copy.svg';

import spinner from '../../assets/spinner.gif';
import WalletConnectBtn from '../../assets/walletconnect_btn.png';
import { useSnapbrilliaContext } from '../../context/SnapbrilliaContext.jsx';
import { useWalletContext } from '../../context/WalletContext.jsx';

import { SignClient } from '@walletconnect/sign-client'
import { Web3Modal } from '@web3modal/standalone'
import { TRANSACTION_STATUS } from '../../utils/constant.js';
import { useIntervalAsync } from '../../hook/useIntervalAsync';

export const StepThree = () => {
  const { values, getTransaction } = useSnapbrilliaContext();
  const { settings } = useWalletContext();
  const [isConnected, setConnected] = useState(false);
  const [isFinishCalled, setIsFinishCalled] = useState(false);
  const [status, setStatus] = useState(TRANSACTION_STATUS.WAITING);

  const [signClient, setSignClient] = useState();
  const [txnUrl, setTxnUrl] = useState();

  const chainIds = ["eip155:1"];
  const projectId = settings.WALLET_CONNECT_PROJECT_ID;

  if (!settings.WALLET_CONNECT_PROJECT_ID) {
    console.error("INVALID WALLET CONNECT PROJECT ID");
  }

  const web3Modal = new Web3Modal({
    walletConnectVersion: 2,
    projectId: projectId,
    standaloneChains: chainIds
  })

  async function createClient() {
    try {
      const signClient = await SignClient.init({
        projectId: projectId,
      });
      setSignClient(signClient);
    } catch (e) {
      if (settings.onError) {
        settings.onError(e);
      }
    }
  }

  async function handleConnect() {
    try {
      if (!signClient) throw Error("Client is not set");
      const proposalNamespace = {
        eip155: {
          methods: ["eth_sendTransaction"],
          chains: chainIds,
          events: ["accountsChanged"],
        },
      };

      const { uri, approval } = await signClient.connect({
        requiredNamespaces: proposalNamespace,
      });

      if (uri) {
        web3Modal.openModal({ uri, standaloneChains: chainIds });
        const session = await approval();
        const account = session.namespaces.eip155.accounts[0].slice(9);
        await handleSend(account, session);
        web3Modal.closeModal();
      }
    } catch (e) {
      if (settings.onError) {
        settings.onError(e);
      }
    }
  }

  async function handleSend(account, session) {
    if (!account.length) throw Error("No account found");
    const tx = {
      from: account,
      to: values.payinAddress,
      data: "0x",
      gasPrice: "0x029104e28c",
      gasLimit: "0x5208",
      value: utils.parseUnits(`${values.amount}`, 'ether'),
    };

    const result = await signClient.request({
      topic: session.topic,
      chainId: chainIds[0],
      request: {
        method: "eth_sendTransaction",
        params: [tx],
      },
    });
    setTxnUrl(result);
  }

  useEffect(() => {
    if (!signClient) {
      createClient();
    }
  }, [signClient]);

  const checkTransaction = useCallback(async () => {
    const data = await getTransaction();
    if (data.status) {
      setStatus(data.status);
      if (data.status === TRANSACTION_STATUS.FINISHED) {
        if (settings.onFinish && !isFinishCalled) {
          setIsFinishCalled(true);
          settings.onFinish(values);
          removeInterval();
          toast('Success');
        }
      }
    }
  }, [isFinishCalled]);

  const [removeInterval] = useIntervalAsync(checkTransaction, 2000);

  return (
    <div className="third-step__info">
      <div className="deposit-address">
        <div className="address-wrapper">
          <div className="address-header">
            <span className="address-header">Amount</span>
          </div>
          <span className="address-value">{values.amount} {values.fromCurrency?.toUpperCase()} </span>
        </div>
        <div className="deposit-address__content">
          <div className="deposit-address__addresses">
            <div className="address-wrapper">
              <div className="address-header">To this address</div>
              <div className="address-value">
                {values.payinAddress}
                <button className="copy-button" type="button" onClick={() => navigator.clipboard.writeText(values.payinAddress)}>
                  <img src={copy} alt="copy" />
                </button>
              </div>
            </div>
          </div>
          <div className="address-qr-code deposit-address__qr-code">
            <div className="collapse-panel collapse-panel_open">
              <div className="collapse-panel__content">
                <div className="address-qr-code__collapse">
                  <QRCode value={values.payinAddress} size={160} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        or continue with
        <div className="ada-button-groups">
          <button type="button" onClick={handleConnect} disabled={!signClient} >
            <img src={WalletConnectBtn} alt="" height={'40'} />
          </button>
        </div>
      </div>
      <div className="tx-step--status">
        <div className="tx-step--status-item">
          <div className="tx-step--status-content">
            <div className="tx-step--status-progress-wrap">
              {
                status === TRANSACTION_STATUS.WAITING &&
                <img src={spinner} alt="spinner" width={'60'} height={'60'} />
              }
            </div>
            <span className="tx-step--status-text tx-step--status-text__active">
              Awaiting deposit
            </span>
            <div className="progress-line progress-inactive"></div>
          </div>
        </div>
        <div className="tx-step--status-item">
          <div className="tx-step--status-content">
            <div className="tx-step--status-progress-wrap">
              {
                status === TRANSACTION_STATUS.CONFIRMING &&
                <img src={spinner} alt="spinner" width={'60'} height={'60'} />
              }
            </div>
            <span className="tx-step--status-text tx-step--status-text__inactive">
              Confirming
            </span>
            <div className="progress-line progress-inactive"></div>
          </div>
        </div>
        <div className="tx-step--status-item">
          <div className="tx-step--status-content">
            <div className="tx-step--status-progress-wrap">
              {
                status === TRANSACTION_STATUS.EXCHANGING &&
                <img src={spinner} alt="spinner" width={'60'} height={'60'} />
              }
            </div>
            <span className="tx-step--status-text tx-step--status-text__inactive">
              Exchanging
            </span>
            <div className="progress-line progress-inactive"></div>
          </div>
        </div>
        <div className="tx-step--status-item">
          <div className="tx-step--status-content">
            <div className="tx-step--status-progress-wrap">
              {
                status === TRANSACTION_STATUS.SENDING &&
                <img src={spinner} alt="spinner" width={'60'} height={'60'} />
              }
            </div>
            <span className="tx-step--status-text tx-step--status-text__inactive">
              Sending to you
            </span>
          </div>
        </div>
      </div>
      <div className="tx-info-stepper">
        <div className="tx-info-stepper__info-block">You will get result to wallet</div>
        <div className="tx-info-stepper__info-block truncate-middle">
          <div className="tx-info-stepper__wallet">{values.toAddress}</div>
        </div>
        <div className="tx-info-id tx-info-stepper__tx-id">
          <div className="tx-info-id__title">Exchange ID</div>
          <div className="tx-info-id__value">{values.id}</div>
          <button className="copy-button" type="button" onClick={() => navigator.clipboard.writeText(values.id)}>
          </button>
        </div>
      </div>
      <div className="third-step__other-info"></div>
    </div>
  );
};
