const calcDiscountedPrice = (price, discount) => {
  return Number((price * (1 - discount / 100)).toFixed(2));
};

export default calcDiscountedPrice;
