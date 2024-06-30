import { test, expect, Browser, chromium, Page } from '@playwright/test';

const UI_URL = "http://localhost:5173/";


test('test case 1: Should allow to all the users to sign in', async () => {
  const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
  const page: Page = await browser.newPage();

  await page.goto(UI_URL);

  //get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("u1@gmail.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Sign in Successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();

});


test('test case 2: Should allow users to register', async () => {
  const testEmail = `test_register_${Math.floor(Math.random() * 90000) + 1000}@test.com`;
  console.log(testEmail);
  const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
  const page: Page = await browser.newPage();

  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();

  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("u2");
  await page.locator("[name=lastName]").fill("2");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("123456");
  await page.locator("[name=confirmPassword]").fill("123456");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration Success!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();


})