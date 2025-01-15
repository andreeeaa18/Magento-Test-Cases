import { test, expect } from "@playwright/test";

test("Select Job Title and Location", async ({ page }) => {
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
    .waitFor({ state: "visible", timeout: 5000 });

  const showCartButton = page.locator("a.action.showcart");
  await showCartButton.waitFor({ state: "visible", timeout: 5000 });
  await showCartButton.click();

  const proceedToCheckoutButton = page.locator("#top-cart-btn-checkout");
  await proceedToCheckoutButton.waitFor({ state: "visible", timeout: 5000 });
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

  const shippingMethods = page.locator('input[type="radio"]').nth(0);
  await shippingMethods.click();

  const nextButton = page.locator("text=Next");
  await nextButton.click();

  const placeOrderButton = page.locator("text=Place Order");
  await placeOrderButton.click();
});
