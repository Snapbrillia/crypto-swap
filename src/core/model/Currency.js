export class Currency {
    constructor({
        name,
        ticker,
        image,
        network,
        buy,
        sell,
        supportsFixedRate,
        tokenContract,
        isStable,
        isFiat
    }) {
        this.name = name;
        this.ticker = ticker;
        this.image = image;
        this.network = network;
        this.buy = buy;
        this.sell = sell;
        this.supportsFixedRate = supportsFixedRate;
        this.tokenContract = tokenContract;
        this.isStable = isStable;
        this.isFiat = isFiat;
    }
}
