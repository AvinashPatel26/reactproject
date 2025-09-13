// discountUtils.js

// Calculate subtotal without tax
export function calculateTotal(cartItems) {
  return +cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ).toFixed(2);
}

// Calculate discount amount from a percentage
export function calculateButtonDiscount(total, discountPercentage) {
  return +(total * (discountPercentage / 100)).toFixed(2);
}

// Get coupon discount details
export function getCouponDiscount(coupon, totalPrice) {
  let discountPercent = 0;
  switch (coupon) {
    case "RATAN10":
      discountPercent = 10;
      break;
    case "RATAN20":
      discountPercent = 20;
      break;
    case "RATAN30":
      discountPercent = 30;
      break;
    default:
      discountPercent = 0; // invalid coupon
  }
  const discountAmount = +(totalPrice * discountPercent / 100).toFixed(2);
  return {
    isValid: discountPercent > 0,
    discountPercent,
    discountAmount
  };
}

// ✅ Combined discount helper
export function calculateCombinedDiscount(totalPrice, slabDiscountPercent, couponCode) {
  const slabDiscountAmount = calculateButtonDiscount(totalPrice, slabDiscountPercent);
  const couponResult = getCouponDiscount(couponCode, totalPrice);
  const couponDiscountAmount = couponResult.isValid ? couponResult.discountAmount : 0;

  return {
    slabDiscountAmount,
    couponDiscountAmount,
    totalDiscount: +(slabDiscountAmount + couponDiscountAmount).toFixed(2),
    finalAmount: +(totalPrice - slabDiscountAmount - couponDiscountAmount).toFixed(2),
    couponResult
  };
}