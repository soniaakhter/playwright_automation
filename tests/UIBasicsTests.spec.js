const { test, expect } = require("@playwright/test")


test('Browser Context Playwright Test', async ({ browser }) => {



    // chorme - plugins / cookies

    const context = await browser.newContext();
    const page = await context.newPage();

    //await page.route('**/*.css',route=>route.abort())   // abort the Network calls
    //await page.route('**/*.{jpg,png,jpeg}',route=>route.abort())  //abort the Network calls

    const userName = page.locator('#username');
    const signIN = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    page.on('request',request=>console.log(request.url()))
    page.on('response',response=>console.log(response.url(),response.status()))

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    // CSS

    await page.locator('#username').fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await page.locator("#signInBtn").click();
    // wait until this locator shown up page
    const alertMsg = await page.locator("[style*='block']").textContent();
    console.log(alertMsg);
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    // fill

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIN.click();
    console.log(await cardTitles.first().textContent())
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles);








});



test('UI Controls', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const userName = page.locator('#username');
    const signIN = page.locator("#signInBtn");
    const documentLink =page.locator("[href*='documents-request']")
    const dropdown = page.locator("select.form-control")
    await dropdown.selectOption("consult")
    await page.locator(".radiotextsty").last().click()
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked()
    await page.locator("#terms").click()
    await expect(page.locator("#terms")).toBeChecked()
    await page.locator("#terms").uncheck()
    expect(await page.locator("#terms").isChecked()).toBeFalsy()
    await expect(documentLink).toHaveAttribute("class","blinkingText")

    // assertion
    //await page.pause();



});




test('@Child windows handle', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const documentLink =page.locator("[href*='documents-request']")


    const [newPage] =await Promise.all([
    context.waitForEvent('page'), // listen for any new page pending, rejected, fulfilled
    documentLink.click(),  // new page is opened
]) 

const text = await newPage.locator(".red").textContent()
const arrayText = text.split("@")
const domain = arrayText[1].split(" ")[0]
console.log(text)
console.log(domain)
await page.locator("#username").fill(domain)
//await page.pause()
console.log(await page.locator("#username").textContent())
    



});
