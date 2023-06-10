export class EstimateAmount {
  constructor({
    fromAmount,
    toAmount,
    validUntil,
    rateId,
    type,
    transactionSpeedForecast,
    depositFee,
    withdrawalFee,
  }) {
    this.fromAmount = fromAmount;
    this.toAmount = toAmount;
    this.validUntil = validUntil;
    this.rateId = rateId;
    this.type = type;
    this.transactionSpeedForecast = transactionSpeedForecast;
    this.depositFee = depositFee;
    this.withdrawalFee = withdrawalFee;
  }
}
