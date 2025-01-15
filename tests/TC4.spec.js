import { test, expect } from "@playwright/test";

test("Verify the cart displays the correct subtotal, tax, total amount", async ({
  page,
}) => {
  await page.goto("https://magento.softwaretestingboard.com/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  const itemSearch = page.locator(".block-search input");
  await itemSearch.fill("bag");
  await itemSearch.press("Enter");

  const productCard = page.locator(".product-image-photo ").nth(0);
  await productCard.click();

  const addToCartButton = page.locator("#product-addtocart-button");
  await addToCartButton.click();

  await page
    .locator("text=You added Push It Messenger Bag to your shopping cart. ")
    .waitFor({ state: "visible" });

  const showCartButton = page.locator("a.action.showcart");
  await showCartButton.click();

  const proceedToCheckoutButton = page.locator("#top-cart-btn-checkout");
  await proceedToCheckoutButton.click();

  const emailInput = page.locator(
    '.field .control._with-tooltip input[type="email"]'
  );
  await emailInput.fill("emilia@exho.com");

  await page.waitForSelector(".loading-spinner", {
    state: "hidden",
    timeout: 5000,
  });

  const firstNameInput = page.getByLabel("First Name");
  await firstNameInput.fill("Emilia");

  const lastNameInput = page.getByLabel("Last Name");
  await lastNameInput.fill("Williams");

  const companyInput = page.getByLabel("Company");
  await companyInput.fill("EXHO SRL");

  const adressInput = page.getByLabel("Street Address").nth(0);
  await adressInput.fill("Baker St 222");

  const cityInput = page.getByLabel("City");
  await cityInput.fill("Los Angeles");

  const stateDropdown = page.locator('select[name="region_id"]');
  await stateDropdown.selectOption({ label: "California" });

  const zipCodeInput = page.getByLabel("Zip/Postal Code");
  await zipCodeInput.fill("1234-8765");

  const phoneInput = page.getByLabel("Phone Number");
  await phoneInput.fill("2222-9854-332");

  const shippingTax = page.locator('input[type="radio"]').nth(0);
  await shippingTax.click();

  const nextButton = page.locator("text=Next");
  await nextButton.click();

  const subtotalSelector = page.locator(
    'tr:has-text("Cart Subtotal") td.amount'
  );
  const shippingSelector = page.locator('tr:has-text("Shipping") td.amount');
  const totalSelector = page.locator('tr:has-text("Order Total") td.amount');

  await expect(subtotalSelector).toHaveText("$45.00");
  await expect(shippingSelector).toHaveText("$5.00");
  await expect(totalSelector).toHaveText("$50.00");

  console.log("Subtotal, shipping și total sunt afișate corect");

  const placeOrderButton = page.locator("text=Place Order");
  await placeOrderButton.click();
});
