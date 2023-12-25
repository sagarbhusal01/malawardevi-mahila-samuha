export const CalculateAmountAfterInterest = (
  Amount: number,
  InterestRate: number,
  Duration: number
) => {
  var RateInPercentage = (100 * InterestRate) / (100 * (1 / 12));
  return Amount + (Amount * (Duration / 12) * RateInPercentage) / 100;
};
