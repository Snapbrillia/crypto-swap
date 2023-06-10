import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { toast } from 'react-toastify';
import { bech32 } from 'bech32';

import { Web3Modal as Web3ModalReact } from '@web3modal/react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
// import { configureChains, createClient, WagmiConfig } from 'wagmi'
// import { goerli } from 'wagmi/chains'

import { SUPPORTED_CARDANO_WALLETS } from '../utils/constant.js';
const WalletContext = createContext();
const useWalletContext = () => useContext(WalletContext);

const WalletProvider = ({ settings, children }) => {
  const [cardanoWalletConnected, setCardanoWalletConnected] = useState(false);
  const [cardanoWalletName, setCardanoWalletName] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [cardanoAddress, setCardanoAddress] = useState('');

  const getCardanoWalletApi = useCallback(async (walletName) => {
    const walletFound = !!window?.cardano?.[walletName];
    if (!walletFound) {
      toast('Wallet not found');
      return;
    }
    const walletApi = await window.cardano[walletName].enable();
    return walletApi;
  }, []);

  const connectCardanoWallet = useCallback(async (walletName) => {
    setConnecting(true);
    try {
      const walletApi = await getCardanoWalletApi(walletName);
      await getCardanoWalletInfo(walletApi, walletName);
    } catch (error) {
      toast('Failed to connect to wallet');
    }
    setConnecting(false);
  }, []);

  const getCardanoWalletInfo = async (walletApi, walletName) => {
    const changeHexAddress = await walletApi.getChangeAddress();
    const buff = Buffer.from(changeHexAddress, 'hex')
    const words = bech32.toWords(buff)

    const addr = bech32.encode('addr', words, 1000);
    setCardanoWalletConnected(true);
    setCardanoWalletName(walletName);
    setCardanoAddress(addr);
  };

  // const chains = [goerli];

  // const { provider } = configureChains(chains, [w3mProvider({ projectId: settings.projectId })]);
  // const wagmiClient = createClient({
  //   connectors: w3mConnectors({ projectId: settings.projectId, version: 1, chains }),
  //   provider
  // });
  // const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <WalletContext.Provider value={{
      cardanoWalletConnected,
      cardanoWalletName,
      connecting,
      cardanoAddress,
      connectCardanoWallet,
      settings,
    }}>
      {children}
      {/* <WagmiConfig client={wagmiClient}>
      </WagmiConfig>
      <Web3ModalReact projectId={settings.projectId} ethereumClient={ethereumClient} /> */}
    </WalletContext.Provider>
  );
};

export { WalletProvider, useWalletContext };
