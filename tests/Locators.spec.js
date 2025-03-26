import { test, expect } from '@playwright/test';


test('Playwright Special locators', async ({ page }) => {
  

    // Special Locators 

    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").click()
    await page.getByLabel("Employed").check()
    await page.getByLabel("Gender").selectOption("Female")
    



});