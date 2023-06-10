import httpClient from '../net/http';
import {Currency, Network, Wallet} from '../model';
const BASE_URL = "https://api.changenow.io/v1";

export class Crypto {
    constructor(options) {
        this.apiKey = options?.apiKey;
        this.httpClient = httpClient(BASE_URL, {
            'x-changenow-api-key': this.apiKey
        });
    }
    async getAvailablePairs({}) {
        const response = await this.httpClient('/market-info/available-pairs/');
        let result = await response.json();
        return result;
    }

    async getCurrencyDetail(currency) {
        const response = await this.httpClient('/market-info/currencies/' + currency);
        let result = await response.json();
        return result;
    }

    async getNetworks({limit}) {
        const response = await this.httpClient('/networks?' + new URLSearchParams({
            limit: limit,
        }));
        let results = await response.json();
        results = results?.map((x) => {
            return new Network({
                name: x.name,
                symbol: x.symbol
            })
        })
        return results;
    }
    async getWallets({limit}) {
        const response = await this.httpClient('/wallets?' + new URLSearchParams({
            _limit: limit,
        }));
        let results = await response.json();
        results = results?.map((x) => {
            return new Wallet({
                name: x.name,
                anonimity: x.anonimity,
                currencies: x.currencies,
                platforms: x.platforms,
                networks: x.networks,
                logo: x.logo
            })
        })
        return results;
    }
}
