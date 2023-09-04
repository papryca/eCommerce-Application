const calculateDiscount = (
  originalPrice: number,
  discountPrice?: number
): number => {
  if (discountPrice) {
    const discountAmount = originalPrice - discountPrice;
    return Math.round((discountAmount / originalPrice) * 100);
  }

  return 0;
};

export default calculateDiscount;
