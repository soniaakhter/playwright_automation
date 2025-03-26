const { test, expect } = require("@playwright/test")


test('@Website Client App login', async ({ page }) => {

    //js file- Login js, DashboardPage

    const email = "anshika@gmail.com"
    const productName = 'ZARA COAT 3'
    const products = page.locator(".card-body")

    await page.goto("https://rahulshettyacademy.com/client")
    await page.getByPlaceholder("email@example.com").fill(email)
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000")
    await page.getByRole("button", { name: 'Login' }).click()

    //await page.waitForLoadState('networkidle') // If this line does not work, then you need to skip this line and work on the next line.
    await page.locator(".card-body b").first().waitFor();


    // Find the product and add to cart Zara Coat 3

     await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();

   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();

    // CART 

    await page.locator("div li").first().waitFor()
    await expect(page.getByText("ZARA COAT 3")).toBeVisible()
    await page.getByRole("button", { name: 'Checkout' }).click()

    // CHECKOUT - DROP DOWN

    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 100 })
    await page.getByRole("button",{name:'India'}).nth(1).click()
    await page.getByText("PLACE ORDER").click()

    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible()
});



