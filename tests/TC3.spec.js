import { test, expect } from "@playwright/test";

test("Verify cart updates correctly when the quantity of a product is changed", async ({
  page,
}) => {
  await page.goto("https://magento.softwaretestingboard.com/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  await page.locator(".block-search input").fill("bag");
  await page.locator(".block-search input").press("Enter");
  await page.locator(".product-image-photo").nth(0).click();
  await page.locator("#product-addtocart-button").click();
  await page
    .locator("text=You added Push It Messenger Bag to your shopping cart.")
    .waitFor();

  const cartQuantity = page.locator("span.counter.qty");
  await expect(cartQuantity.first()).toContainText("1");
  console.log("Initial Quantity in Cart: 1");

  await page.goBack();
  await page.locator(".product-image-photo").nth(1).click();
  await page.locator("#product-addtocart-button").click();
  await page
    .locator("text=You added Voyage Yoga Bag to your shopping cart.")
    .waitFor();

  await expect(cartQuantity.first()).toContainText("2");
  console.log("Updated Quantity in Cart: 2");

  console.log("Cart updated successfully!");
});
