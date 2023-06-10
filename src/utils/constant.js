export const FLOW_TYPES = {
  STANDARD: 'standard',
  FIXED: 'fixed-rate',
};

export const SUPPORTED_CARDANO_WALLETS = [
  {
    name: 'Nami',
    value: 'nami',
  },
  {
    name: 'Eternl',
    value: 'eternl',
  },
  {
    name: 'Flint',
    value: 'flint',
  },
  {
    name: 'NuFi',
    value: 'nufi',
  },
  {
    name: 'Typhon',
    value: 'typhoncip30',
  },
  {
    name: 'Gero',
    value: 'gerowallet',
  },
];


export const TRANSACTION_STATUS = {
  NEW: 'new',
  WAITING: 'waiting',
  CONFIRMING: 'confirming',
  EXCHANGING: 'exchanging',
  SENDING: 'sending',
  FINISHED: 'finished',
  FAILED: 'failed',
  REFUNDED: 'refunded',
  VERIFYING: 'verifying',
};
