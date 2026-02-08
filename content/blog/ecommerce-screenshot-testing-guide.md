---
title: "Screenshot Testing for E-commerce: Cart, Checkout, and Product Pages"
description: "Implement comprehensive screenshot testing for e-commerce sites. Covers product galleries, cart flow, checkout process, and dynamic pricing verification."
excerpt: "Ensure your e-commerce site looks perfect across all customer touchpoints with automated visual testing."
author: "asad-ali"
publishedAt: "2025-10-28"
category: "guide"
tags: ["e-commerce", "testing", "visual testing", "automation"]
keywords: ["e-commerce screenshot testing", "checkout visual testing", "product page testing", "cart testing", "screenshot automation"]
featured: false
readingTime: 7
---

E-commerce sites have unique visual testing challenges—product images, dynamic pricing, cart states, and checkout flows all need verification. This guide covers screenshot strategies for comprehensive e-commerce testing.

## E-commerce Testing Challenges

### Dynamic Content

- Product prices change
- Stock levels fluctuate
- Personalized recommendations
- Sale banners and promotions
- Cart quantities and totals

### Critical Pages

| Page | Testing Priority |
|------|------------------|
| Product detail page | High |
| Category/listing page | High |
| Cart | Critical |
| Checkout | Critical |
| Order confirmation | Critical |
| Homepage | Medium |
| Account pages | Medium |

## Product Page Testing

### Capture Product Galleries

```javascript
async function testProductPage(productUrl) {
  // Main product image
  const mainImage = await captureScreenshot(productUrl, {
    viewport: { width: 1440, height: 900 },
    waitFor: '.product-image',
  });
  
  // Test image gallery navigation
  const galleryImages = await captureWithInteraction(productUrl, [
    { action: 'click', selector: '.gallery-thumbnail:nth-child(2)' },
    { action: 'wait', duration: 500 },
    { action: 'screenshot', name: 'gallery-image-2' },
    { action: 'click', selector: '.gallery-thumbnail:nth-child(3)' },
    { action: 'wait', duration: 500 },
    { action: 'screenshot', name: 'gallery-image-3' },
  ]);
  
  return { mainImage, galleryImages };
}
```

### Test Product Variants

```javascript
async function testProductVariants(productUrl, variants) {
  const screenshots = {};
  
  for (const variant of variants) {
    // Select variant (size, color, etc.)
    const screenshot = await captureWithInteraction(productUrl, [
      { action: 'click', selector: `[data-variant="${variant}"]` },
      { action: 'wait', duration: 300 },
      { action: 'screenshot' },
    ]);
    
    screenshots[variant] = screenshot;
  }
  
  return screenshots;
}

// Usage
const variants = ['red', 'blue', 'black'];
const variantScreenshots = await testProductVariants(
  'https://store.com/product/t-shirt',
  variants
);
```

### Out of Stock States

```javascript
const OUT_OF_STOCK_TEST_PRODUCTS = [
  'https://store.com/product/out-of-stock-item',
  'https://store.com/product/low-stock-item',
];

async function testStockStates() {
  const results = [];
  
  for (const url of OUT_OF_STOCK_TEST_PRODUCTS) {
    const screenshot = await captureScreenshot(url);
    
    // Verify out of stock styling is visible
    const hasOutOfStockLabel = await checkElement(url, '.out-of-stock-label');
    const buyButtonDisabled = await checkElement(url, 'button[disabled]');
    
    results.push({
      url,
      screenshot,
      hasLabel: hasOutOfStockLabel,
      buttonDisabled: buyButtonDisabled,
    });
  }
  
  return results;
}
```

## Cart Testing

### Empty Cart

```javascript
async function testEmptyCart() {
  // Clear any existing cart
  await clearCart();
  
  const screenshot = await captureScreenshot('https://store.com/cart', {
    waitFor: '.empty-cart',
  });
  
  return screenshot;
}
```

### Cart with Items

```javascript
async function testCartWithItems() {
  // Add items to cart
  await addToCart([
    { product: 'SKU-001', quantity: 1 },
    { product: 'SKU-002', quantity: 2 },
  ]);
  
  const screenshot = await captureScreenshot('https://store.com/cart', {
    waitFor: '.cart-items',
  });
  
  // Verify quantities and totals are visible
  return screenshot;
}
```

### Cart Updates

```javascript
async function testCartQuantityChange() {
  await addToCart([{ product: 'SKU-001', quantity: 1 }]);
  
  const screenshots = await captureWithInteraction('/cart', [
    { action: 'screenshot', name: 'initial' },
    { action: 'click', selector: '.quantity-increase' },
    { action: 'wait', duration: 500 },
    { action: 'screenshot', name: 'after-increase' },
    { action: 'type', selector: '.quantity-input', text: '5' },
    { action: 'wait', duration: 500 },
    { action: 'screenshot', name: 'quantity-5' },
  ]);
  
  return screenshots;
}
```

## Checkout Flow Testing

### Multi-Step Checkout

```javascript
async function testCheckoutFlow() {
  // Set up cart
  await addToCart([{ product: 'SKU-001', quantity: 1 }]);
  
  const checkoutScreenshots = [];
  
  // Step 1: Cart review
  checkoutScreenshots.push(await captureScreenshot('/checkout', {
    waitFor: '.checkout-step-1',
    name: 'step-1-cart',
  }));
  
  // Step 2: Shipping info
  await fillForm('.shipping-form', TEST_SHIPPING_INFO);
  checkoutScreenshots.push(await captureScreenshot('/checkout/shipping', {
    waitFor: '.checkout-step-2',
    name: 'step-2-shipping',
  }));
  
  // Step 3: Payment
  checkoutScreenshots.push(await captureScreenshot('/checkout/payment', {
    waitFor: '.checkout-step-3',
    name: 'step-3-payment',
  }));
  
  // Step 4: Review
  checkoutScreenshots.push(await captureScreenshot('/checkout/review', {
    waitFor: '.checkout-step-4',
    name: 'step-4-review',
  }));
  
  return checkoutScreenshots;
}
```

### Guest vs Logged-In Checkout

```javascript
async function testCheckoutStates() {
  const results = {};
  
  // Guest checkout
  await clearSession();
  results.guest = await captureScreenshot('/checkout', {
    waitFor: '.guest-checkout',
  });
  
  // Logged-in checkout
  await login(TEST_USER);
  results.loggedIn = await captureScreenshot('/checkout', {
    waitFor: '.user-checkout',
  });
  
  // Saved address loaded
  await selectSavedAddress();
  results.savedAddress = await captureScreenshot('/checkout', {
    waitFor: '.saved-address',
  });
  
  return results;
}
```

### Error States

```javascript
async function testCheckoutErrors() {
  const errorScreenshots = [];
  
  // Invalid card
  await fillPaymentForm({
    cardNumber: '4000000000000002', // Decline test card
  });
  await submitCheckout();
  errorScreenshots.push(await captureScreenshot('/checkout/payment', {
    waitFor: '.payment-error',
    name: 'payment-declined',
  }));
  
  // Expired card
  await fillPaymentForm({
    expiry: '01/20',
  });
  await submitCheckout();
  errorScreenshots.push(await captureScreenshot('/checkout/payment', {
    waitFor: '.expiry-error',
    name: 'card-expired',
  }));
  
  // Invalid shipping
  await fillShippingForm({
    zipCode: '00000',
  });
  errorScreenshots.push(await captureScreenshot('/checkout/shipping', {
    waitFor: '.shipping-error',
    name: 'invalid-shipping',
  }));
  
  return errorScreenshots;
}
```

## Mobile Testing

### Mobile Product Pages

```javascript
const MOBILE_PRODUCTS = [
  '/product/featured-item',
  '/product/best-seller',
];

async function testMobileProductPages() {
  const results = [];
  
  for (const url of MOBILE_PRODUCTS) {
    results.push({
      url,
      portrait: await captureScreenshot(url, {
        viewport: { width: 375, height: 812 },
      }),
      landscape: await captureScreenshot(url, {
        viewport: { width: 812, height: 375 },
      }),
    });
  }
  
  return results;
}
```

### Mobile Checkout

```javascript
async function testMobileCheckout() {
  await addToCart([{ product: 'SKU-001', quantity: 1 }]);
  
  const screenshots = [];
  const steps = ['/cart', '/checkout', '/checkout/shipping', '/checkout/payment'];
  
  for (const step of steps) {
    screenshots.push(await captureScreenshot(step, {
      viewport: { width: 375, height: 812 },
      fullPage: true,
    }));
  }
  
  return screenshots;
}
```

## Price Verification

### Capture Price Display

```javascript
async function testPriceDisplay(productUrl) {
  const screenshot = await captureScreenshot(productUrl, {
    waitFor: '.product-price',
  });
  
  // Also verify specific price elements
  const priceElement = await captureElement(productUrl, '.product-price');
  const salePrice = await captureElement(productUrl, '.sale-price');
  const regularPrice = await captureElement(productUrl, '.regular-price');
  
  return { full: screenshot, priceElement, salePrice, regularPrice };
}
```

### Sale/Promotion States

```javascript
async function testPromotionalPricing() {
  // Regular price
  const regular = await captureScreenshot('/product/item', {
    name: 'regular-price',
  });
  
  // With promo code
  await applyPromoCode('SAVE20');
  const withPromo = await captureScreenshot('/cart', {
    name: 'with-promo',
  });
  
  // Flash sale styling
  const flashSale = await captureScreenshot('/product/flash-sale-item', {
    name: 'flash-sale',
  });
  
  return { regular, withPromo, flashSale };
}
```

## Category/Listing Pages

### Grid vs List View

```javascript
async function testListingViews(categoryUrl) {
  const screenshots = {};
  
  // Grid view
  screenshots.grid = await captureScreenshot(`${categoryUrl}?view=grid`, {
    fullPage: true,
  });
  
  // List view
  screenshots.list = await captureScreenshot(`${categoryUrl}?view=list`, {
    fullPage: true,
  });
  
  return screenshots;
}
```

### Filters and Sorting

```javascript
async function testFiltersAndSort(categoryUrl) {
  const screenshots = [];
  
  // Apply price filter
  screenshots.push(await captureScreenshot(`${categoryUrl}?price=0-50`, {
    name: 'price-filter',
  }));
  
  // Apply size filter
  screenshots.push(await captureScreenshot(`${categoryUrl}?size=large`, {
    name: 'size-filter',
  }));
  
  // Sort by price low to high
  screenshots.push(await captureScreenshot(`${categoryUrl}?sort=price-asc`, {
    name: 'sort-price-asc',
  }));
  
  return screenshots;
}
```

## Test Organization

### Page Object Pattern

```javascript
class ProductPageTest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  
  async captureMain() {
    return captureScreenshot(this.baseUrl);
  }
  
  async captureVariant(variant) {
    return captureWithInteraction(this.baseUrl, [
      { action: 'click', selector: `[data-variant="${variant}"]` },
      { action: 'screenshot' },
    ]);
  }
  
  async captureZoom() {
    return captureWithInteraction(this.baseUrl, [
      { action: 'hover', selector: '.product-image' },
      { action: 'screenshot' },
    ]);
  }
}

class CheckoutFlowTest {
  async runFullFlow() {
    const screenshots = {};
    screenshots.cart = await captureScreenshot('/cart');
    screenshots.checkout = await captureScreenshot('/checkout');
    // ... more steps
    return screenshots;
  }
}
```

## Best Practices

### 1. Use Test Data

```javascript
const TEST_PRODUCTS = {
  simple: '/product/basic-tshirt',
  variants: '/product/multicolor-jacket',
  outOfStock: '/product/sold-out-item',
  onSale: '/product/clearance-item',
};
```

### 2. Handle Dynamic Content

```javascript
async function captureWithMasking(url) {
  const screenshot = await captureScreenshot(url, {
    maskElements: [
      '.recommended-products',
      '.recently-viewed',
      '.shipping-eta',
    ],
  });
  return screenshot;
}
```

### 3. Test Critical Paths Daily

```javascript
// Priority testing schedule
const DAILY_TESTS = ['cart', 'checkout', 'product-detail'];
const WEEKLY_TESTS = ['category', 'search', 'account'];
```

## Conclusion

E-commerce screenshot testing requires:

1. **Product pages** - Variants, galleries, pricing
2. **Cart** - Empty, populated, quantity changes
3. **Checkout** - All steps, error states, guest/logged-in
4. **Mobile** - Critical flow on mobile devices
5. **Dynamic content** - Mask or exclude changing elements

Automated visual testing catches layout issues before customers encounter them, protecting conversion rates and brand perception.

---

**Ready to test your e-commerce site?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

See also:
- [Visual Regression Testing →](/blog/visual-regression-testing-guide)
- [Website Monitoring →](/blog/website-monitoring-screenshots-guide)
