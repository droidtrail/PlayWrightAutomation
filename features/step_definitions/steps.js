const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager');
const { test, expect, playwright } = require('@playwright/test');

Given('a login to Ecommerce application with {username} and {password}', async function (username, password) {
    const browser = playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
});

When('Add {string} to Cart', async function (string) {
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in Cart', async function (string) {
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();
});

When('Enter valid details and place the Order', async function () {
    await ordersReviewPage.searchCountryAndSelect(countryCode, countryName);
    await ordersReviewPage.verifyEmailId(data.username);
    const orderId = await ordersReviewPage.submitAndGetOrderId();
    console.log('orderId >>>>>> ' + orderId);
});

Then('Verify order in present in the OrderHistory', async function () {
    await expect(page.locator(".em-spacer-1 .ng-star-inserted")).toHaveText(orderId);
    await dashboardPage.navigateToOrders()
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});