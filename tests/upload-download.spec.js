const ExcelJS = require('exceljs');
const { test, expect } = require("@playwright/test")



async function writeExcelTest(searchText, replaceText, change, filePath) {


    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet('Sheet1');

    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;  // Replace the value 
    await workbook.xlsx.writeFile(filePath)
}

async function readExcel(worksheet, searchText) {

    let output = { row: -1, column: -1 }

    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {

            //console.log(cell.value)

            if (cell.value === searchText) {
                //console.log(rowNumber);
                //console.log(colNumber)

                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;
}

// Update Mango Price to 350

//writeExcelTest("Mango", 350, {rowChange:0,colChange:2} ,"F:/Udemy Playwright Course/Playwright_Automation/exceldownloadTest.xlsx")


// test('Upload download excel validation', async({page})=>{

//     await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html")
//     const downloadPromise = page.waitForEvent('download')
//     await page.getByRole('button',{name:'Download'}).click()
//     await downloadPromise;

//     writeExcelTest("Mango", 350, {rowChange:0,colChange:2} ,"Downloads/download.xlsx")

//     await page.locator("#fileinput").click()
//     await page.locator("#fileinput").setInputFiles("Downloads/download.xlsx")
// })


test('Upload download excel validation', async ({ page }) => {

    const textSearch = 'Mango';
    const updateValue = '350'

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();

    const download = await downloadPromise;
    const filePath = await download.path(); // Get actual downloaded file path

    if (!filePath) {
        throw new Error("Download path is null. Try using Chromium browser.");
    }

    await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);

    await page.locator("#fileinput").setInputFiles(filePath); // Upload the updated file

    const textlocator = await page.getByText(textSearch)
    const desiredRow = await page.getByRole('row').filter({ has: textlocator })

    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue)
});





