export const calcItemPrice = (item) => {
  if (item.discount && item.discount > 0) {
    const discountedPrice = item.price * (1 - item.discount / 100);
    return parseFloat(discountedPrice).toFixed(2);
  } else {
    return item.price.toFixed(2);
  }
};

export const calcPriceQty = (qty, item) => {
  return (qty * calcItemPrice(item)).toFixed(2);
};
