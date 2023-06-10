import httpClient from '../net/http';
import { EstimateAmount, Currency } from '../model';

import { FLOW_TYPES } from '../../utils/constant';
const BASE_URL = 'https://api.changenow.io/v2/exchange';

export class Exchange {
  constructor(options) {
    this.apiKey = options?.apiKey;
    this.httpClient = httpClient(BASE_URL, {
      'x-changenow-api-key': this.apiKey
    });
  }
  async getRange({ from, to, flow }) {
    const response = await this.httpClient(
      '/range?' +
      new URLSearchParams({
        fromCurrency: from,
        fromNetwork: from,
        toCurrency: to,
        toNetwork: to,
        flow: flow,
      })
    );
    let result = await response.json();
    return new ExchangeRange({
      minAmount: result.minAmount,
      maxAmount: result.maxAmount,
    });
  }
  async estimateAmount({ fromCurrency = '', fromNetwork = '', toCurrency = '', toNetwork = '', flow = '', fromAmount = '', toAmount = '' }) {
    const response = await this.httpClient(
      '/estimated-amount?' +
      new URLSearchParams({
        fromCurrency: fromCurrency,
        fromNetwork: fromNetwork,
        toCurrency: toCurrency,
        toNetwork: toNetwork,
        flow: flow,
        fromAmount: fromAmount,
        toAmount: toAmount
      })
    );
    let result = await response.json();

    return new EstimateAmount({
      fromAmount: result.fromAmount,
      toAmount: result.toAmount,
      validUntil: result.validUntil,
      rateId: result.rateId,
      type: result.type,
      withdrawalFee: result.withdrawalFee,
      depositFee: result.depositFee,
      transactionSpeedForecast: result.transactionSpeedForecast,
    });
  }

  async validateAddress({ currency, address }) {
    const response = await this.httpClient(
      '/validate/address?' +
      new URLSearchParams({
        currency: currency,
        address: address,
      })
    );
    const result = await response.json();
    return result;
  }
  async createTransaction({ fromCurrency, fromNetwork, toCurrency, toNetwork, toAddress, flow, amount }) {
    const response = await this.httpClient('', {
      method: 'post',
      body: JSON.stringify({
        "fromCurrency": fromCurrency,
        "toCurrency": toCurrency,
        "fromNetwork": fromNetwork,
        "toNetwork": toNetwork,
        "fromAmount": amount,
        "address": toAddress,
        "userId": "",
        "payload": "",
        "contactEmail": "",
        "source": "",
        "flow": flow,
        "type": "direct",
        "rateId": ""
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let result = await response.json();
    return result;
  }

  async getTransaction(id) {
    const response = await this.httpClient(
      '/by-id?' +
      new URLSearchParams({
        id: id,
      })
    );
    let result = await response.json();
    return result;
  }
  async getCurrencies({ active = '', flow = FLOW_TYPES.STANDARD, buy = '', sell = '' }) {
    const response = await this.httpClient('/currencies?' + new URLSearchParams({
      active: active,
      flow: flow,
      buy: buy,
      sell: sell,
    }));
    let results = await response.json();
    results = results?.map((x) => {
      return new Currency({
        name: x.name,
        ticker: x.ticker,
        image: x.image,
        network: x.network,
        buy: x.buy,
        sell: x.sell,
        supportsFixedRate: x.supportsFixedRate,
        tokenContract: x.tokenContract,
        isStable: x.isStable,
        isFiat: x.isFiat
      })
    })
    return results;
  }
}
