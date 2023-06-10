export class ExchangeRange {
    constructor({maxAmount, minAmount, fromCurrency, toCurrency}) {
        this.maxAmount = maxAmount;
        this.minAmount = minAmount;
        this.fromCurrency = fromCurrency;
        this.toCurrency = toCurrency;
    }
}