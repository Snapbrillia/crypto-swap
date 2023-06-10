export class Wallet {
    constructor({name, anonimity, currencies, platforms, networks, logo}) {
        this.name = name;
        this.anonimity = anonimity;
        this.currencies = currencies;
        this.platforms = platforms;
        this.networks = networks;
        this.logo = logo;
    }
}