import { test, expect } from "@playwright/test";

test("Select Job Title and Location", async ({ page }) => {
  await page.goto("https://magento.softwaretestingboard.com/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  const itemSearch = page.locator(".block-search input");
  await itemSearch.fill("pants");
  await itemSearch.press("Enter");

  const productCard = page.locator(".product-image-photo ").nth(0);
  await productCard.click();

  const wishListButton = page.locator("a.action.towishlist");
  await wishListButton.click();

  await page
    .locator("text= You must login or register to add items to your wishlist. ")
    .waitFor({ state: "visible" });

  const createAccountLink = page.locator("a.action.create.primary");
  await createAccountLink.click();

  await page.waitForSelector(".loading-spinner", {
    state: "hidden",
    timeout: 5000,
  });

  const firstNameInput = page.getByLabel("First Name");
  await firstNameInput.fill("Emilia");

  const lastNameInput = page.getByLabel("Last Name");
  await lastNameInput.fill("Williams");

  const emailInput = page.getByLabel("Email").nth(0);
  await emailInput.fill("emilia@exho.com");

  const passwordInput = page.getByLabel("Password").nth(0);
  await passwordInput.fill("123455432122334455EWew");

  const confirmPasswordInput = page.getByLabel("Confirm Password");
  await confirmPasswordInput.fill("123455432122334455EWew");

  const createAccountButton = page.locator("button.action.submit.primary");
  await createAccountButton.click();

  await page.goto("https://magento.softwaretestingboard.com/");

  const goToWishlistLink = page.locator("a.action.details");
  await goToWishlistLink.click();
});
