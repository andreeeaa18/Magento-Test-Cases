import { test, expect } from "@playwright/test";

test("Select Job Title and Location", async ({ page }) => {
  await page.goto("https://magento.softwaretestingboard.com/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  const signInLink = page.locator('a:has-text("Sign In")').nth(0);
  await signInLink.click();

  const emailInput = page.getByLabel("Email").nth(0);
  await emailInput.fill("emilia@exho.com");

  const passwordInput = page.getByLabel("Password").nth(0);
  await passwordInput.fill("123455432122334455Ew");

  const signInButton = page.locator("button.action.login.primary");
  await signInButton.click();

  const goToAccount = page.locator("button.action.switch").nth(0);
  await goToAccount.click();

  const myAccount = page.locator("a").nth(1);
  await myAccount.click();

  const changePassword = page.locator("a.action.change-password");
  await changePassword.click();

  const currentPasswordInput = page.getByLabel("Current Password").nth(0);
  await currentPasswordInput.fill("123455432122334455Ew");

  const newPasswordInput = page.getByLabel("New Password").nth(0);
  await newPasswordInput.fill("123455432122334455EWew");

  const confirmPasswordInput = page.getByLabel("Confirm New Password");
  await confirmPasswordInput.fill("123455432122334455EWew");

  const saveButton = page.locator("button.action.save.primary");
  await saveButton.click();

  await page
    .locator("text= You saved the account information.")
    .waitFor({ state: "visible" });

  await emailInput.fill("emilia@exho.com");

  await passwordInput.fill("123455432122334455Ew");

  await signInButton.click();
});
