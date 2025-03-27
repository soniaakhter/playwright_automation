const { test, expect, request } = require("@playwright/test")

const { APiUtils } = require("./utils/APiUtils")




const loginPayLoad =
{
    userEmail: "anshika@gmail.com",
    userPassword: "Iamking@000"
}

const orderPayLoad =
{
    orders:
        [{
            country: "India",
            productOrderedId: "67a8dde5c0d3e6622a297cc8"
        }]
}
let response; // Access all variable thats why use let



test.beforeAll(async () => {

    const apiContext = await request.newContext()
    const apiUtils = new APiUtils(apiContext, loginPayLoad)
    response = await apiUtils.createOrder(orderPayLoad)




})








test('@Place Order via API and Bypass UI Flow', async ({ page }) => {

    // Set the token in browser localStorage
    page.addInitScript(value => {  // page.addInitScript method is used to inject JavaScript code that will run before the page is loaded
        window.localStorage.setItem('token', value)
    }, response.userToken)

    await page.goto("https://rahulshettyacademy.com/client/")




    await page.locator("button[routerlink*='myorders']").click()
    await page.locator("tbody").waitFor()
    const rows = await page.locator("tbody tr")

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent()
        console.log(rowOrderId)
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click()
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent()
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy()
    await page.pause()

});



