const { test, expect, request } = require("@playwright/test")

const { APiUtils } = require("./utils/APiUtils")

const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" }
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] }
const fakePayLoadOrders = { data: [], message: "No Orders" };

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

    // intercept network responses in Playwright

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request())
            let body = JSON.stringify(fakePayLoadOrders)
            route.fulfill({
                response,
                body
            })



            //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end

        }
    )


    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

    console.log(await page.locator(".mt-4").textContent());



});



