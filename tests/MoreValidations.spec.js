const {test, expect}=require("@playwright/test")


test.only("PopUp Validations",async({page})=>{


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")

    // await page.goto("https://www.google.com/")
    // await page.goBack()
    // await page.goForward()

    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("#hide-textbox").click()
    await expect(page.locator("#displayed-text")).toBeHidden()
    //await page.pause()

    // if we have no locators and html tag and this popup using java thats why its call "dialog"

    page.on('dialog',dialog=>dialog.accept()) // 1. dismiss() for close dialog  2. accept() for okay dialog
    await page.locator("#confirmbtn").click()
    await page.locator("#mousehover").hover() // hover method

    // Handle iframes (child page on the main page)

    const framesPage=page.frameLocator("#courses-iframe")
    await framesPage.locator("li a[href*='lifetime-access']:visible").click() // :visible only for visible item not hidden item 
    const textCheck=await framesPage.locator(".text h2").textContent()
    console.log(textCheck.split(" ")[1]);


})