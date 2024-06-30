import { test, expect, Browser, chromium, Page } from '@playwright/test';


test("Browser Open Test", async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const page: Page = await browser.newPage();
    await page.goto("http://localhost:5173/");

    await page.waitForTimeout(30000);
})