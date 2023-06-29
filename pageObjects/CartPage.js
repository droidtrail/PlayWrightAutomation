const {test, expect} = require('@playwright/test');
class CartPage 
{
    constructor(page) 
    {
        this.page = page;
        this.waitCartPageLoad = page.locator("div li").first();
        this.clickCheckout = page.locator("button[type='button']");
    }
    getProductLocator(productName)
    {
        return this.page.locator("h3:has-text('"+productName+"')");
    }
    async VerifyProductIsDisplayed(productName)
    {
        await this.waitCartPageLoad.first().waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }
    async Checkout()
    {
        await this.clickCheckout.last().click();
    }
    
}
module.exports = {CartPage};