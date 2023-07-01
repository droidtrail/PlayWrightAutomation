const { test, expect, request } = require('@playwright/test');
const {apiUtils} = require('../utils/apiUtils');
const loginPayLoad = { userEmail: "leandro.pereiracr@gmail.com", userPassword: "x85.2eRYwab6BY" };
const orderPayLoad = {orders:[{country:"United States",productOrderedId:"6262e9d9e26b7e1a10e89c04"}]};
const fakePayLoadOrders = {data:[],message:"No Orders"}
let response;
test.beforeAll(async () => 
{
    const apiContext = await request.newContext();
    const api_utils = new apiUtils(apiContext, loginPayLoad);
    response = await api_utils.createOrder(orderPayLoad);
});
test('Place the order', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token );
    //Acessando a página de ordens
    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/647109b6568c3e9fb1776fa0",
    async route=>{
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayLoadOrders);
        route.fulfill({
            response,
            body,
        })
    })
    await page.locator("[routerlink*='myorders']").first().click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/647109b6568c3e9fb1776fa0");
    await expect(page.locator(".mt-4")).toHaveText(' You have No Orders to show at this time. Please Visit Back Us ');
    // await page.pause();
});