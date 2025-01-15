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

  const addCart = page.locator(".minicart-wrapper");
  await addCart.click();

  const deleteButton = page.locator("a.action.delete");
  await deleteButton.click();

  const okButton = page.locator('button:has-text("OK")');
  await okButton.click();

  await page
    .locator("text=You have no items in your shopping cart. ")
    .waitFor({ state: "visible" });

  const xButton = page.locator(".action.close");
  await xButton.click();
});
