const {test,expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({page})=>{
    const productName = 'Zara Coat 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("leandro.pereiracr@gmail.com");
    await page.locator("#userPassword").fill("x85.2eRYwab6BY");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    //Zara Coat 4
    const count = await products.count();
    for(let i=0; i < count; i++){
        if (await products.nth(i).locator("b").textContent()=== productName)
        {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
});
