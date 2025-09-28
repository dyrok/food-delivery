export const stripeProducts = [
  {
    priceId: 'price_1SCG4xRpIzFDHyuvafVsJVjn',
    name: 'Food Order',
    description: 'Complete your food delivery order',
    mode: 'payment' as const
  }
];

export const getProductByPriceId = (priceId: string) => {
  return stripeProducts.find(product => product.priceId === priceId);
};