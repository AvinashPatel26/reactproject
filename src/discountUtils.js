// discountUtils.js

/* ================================
   1. CALCULATE CART TOTAL
================================ */
export function calculateTotal(cartItems = []) {
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );
  return +total.toFixed(2); // The + cleanly converts the string back to a Number
}

/* ================================
   2. BUTTON DISCOUNT (SLAB)
================================ */
export function calculateButtonDiscount(total, discountPercent = 0) {
  if (!discountPercent || discountPercent <= 0) return 0;
  const discount = total * (discountPercent / 100);
  return +discount.toFixed(2);
}

/* ================================
   3. COUPON DISCOUNT
================================ */
export function getCouponDiscount(coupon, currentPrice) {
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

  // Calculates discount based on the price passed in
  const discountAmount = discountPercent > 0
    ? +(currentPrice * (discountPercent / 100)).toFixed(2)
    : 0;

  return {
    isValid: discountPercent > 0,
    discountPercent,
    discountAmount,
  };
}

/* ================================
   4. COMBINED DISCOUNT (Sequential)
================================ */
export function calculateCombinedDiscount(
  totalPrice,
  slabDiscountPercent,
  couponCode
) {
  // Step 1: Calculate the first discount (Button/Slab)
  const slabDiscountAmount = calculateButtonDiscount(totalPrice, slabDiscountPercent);

  // Step 2: Determine the intermediate price
  const priceAfterSlab = totalPrice - slabDiscountAmount;

  // Step 3: Apply the coupon to the REMAINING balance (protects your margins!)
  const couponResult = getCouponDiscount(couponCode, priceAfterSlab);
  const couponDiscountAmount = couponResult.isValid ? couponResult.discountAmount : 0;

  // Step 4: Final Calculations
  const totalDiscount = +(slabDiscountAmount + couponDiscountAmount).toFixed(2);
  const finalAmount = Math.max(0, +(totalPrice - totalDiscount).toFixed(2));

  return {
    slabDiscountAmount,
    couponDiscountAmount,
    totalDiscount,
    finalAmount,
    couponResult,
  };
}