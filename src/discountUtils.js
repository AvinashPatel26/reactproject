// discountUtils.js

/* ================================
   CALCULATE CART TOTAL
================================ */

export function calculateTotal(cartItems = []) {

  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  return +total.toFixed(2);

}

/* ================================
   BUTTON DISCOUNT (SLAB)
================================ */

export function calculateButtonDiscount(total, discountPercent = 0) {

  if (!discountPercent || discountPercent <= 0) return 0;

  const discount = total * (discountPercent / 100);

  return +discount.toFixed(2);

}

/* ================================
   COUPON DISCOUNT
================================ */

export function getCouponDiscount(coupon, totalPrice) {

  if (!coupon) {
    return {
      isValid: false,
      discountPercent: 0,
      discountAmount: 0,
    };
  }

  const COUPONS = {
    RATAN10: 10,
    RATAN20: 20,
    RATAN30: 30,
  };

  const code = coupon.trim().toUpperCase();

  const discountPercent = COUPONS[code] || 0;

  const discountAmount =
    discountPercent > 0
      ? +(totalPrice * discountPercent / 100).toFixed(2)
      : 0;

  return {
    isValid: discountPercent > 0,
    discountPercent,
    discountAmount,
  };

}

/* ================================
   COMBINED DISCOUNT
================================ */

export function calculateCombinedDiscount(
  totalPrice,
  slabDiscountPercent,
  couponCode
) {

  const slabDiscountAmount =
    calculateButtonDiscount(totalPrice, slabDiscountPercent);

  const couponResult =
    getCouponDiscount(couponCode, totalPrice);

  const couponDiscountAmount =
    couponResult.isValid ? couponResult.discountAmount : 0;

  const totalDiscount =
    +(slabDiscountAmount + couponDiscountAmount).toFixed(2);

  const finalAmount =
    Math.max(
      0,
      +(totalPrice - totalDiscount).toFixed(2)
    );

  return {
    slabDiscountAmount,
    couponDiscountAmount,
    totalDiscount,
    finalAmount,
    couponResult,
  };

}