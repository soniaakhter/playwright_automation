const { test, expect } = require("@playwright/test")


test('@Website Client App login', async ({ page }) => {

    //js file- Login js, DashboardPage

    const email = "anshika@gmail.com"
    const productName = 'ZARA COAT 3'
    const products = page.locator(".card-body")

    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").fill(email)
    await page.locator("#userPassword").fill("Iamking@000")
    await page.locator("[value='Login']").click()

    //await page.waitForLoadState('networkidle') // If this line does not work, then you need to skip this line and work on the next line.
    await page.locator(".card-body b").first().waitFor()

    const titles = await page.locator(".card-body b").allTextContents()
    console.log(titles);


    // Zara Coat 3

    const count = await products.count()
    console.log(count)
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {

            // Add To Cart

            await products.nth(i).locator("text= Add To Cart").click()
            break;
        }
    }

    // CART 

    await page.locator("[routerlink*='cart']").click()
    await page.locator("div li").first().waitFor()
    const bool = page.locator(`h3:has-text("${productName}")`).isVisible()
    expect(bool).toBeTruthy()

    // CHECKOUT - DROP DOWN

    await page.locator("text=Checkout").click()
    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 100 })
    const dropdown = page.locator(".ta-results")
    await dropdown.waitFor()
    const optionsCount = await dropdown.locator("button").count()
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent()
        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click()
            break;
        }
    }

    // Placing the order and grab the orderID

    await expect(page.locator(".user__name  [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click()
    await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.")
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    console.log(orderId)

    // Dynamically find the order from orderHistory

    await page.locator("button[routerlink*='myorders']").click()
    await page.locator("tbody").waitFor()
    const rows = await page.locator("tbody tr")
    
    for(let i=0;i<await rows.count();++i){
        const rowOrderId = await rows.nth(i).locator("th").textContent()
        console.log(rowOrderId)
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click()
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent()
    expect(orderId.includes(orderIdDetails)).toBeTruthy()
    await page.pause()

});



