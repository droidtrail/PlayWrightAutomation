const { test, expect, request } = require('@playwright/test');
const {apiUtils} = require('../utils/apiUtils');
const loginPayLoad = { userEmail: "leandro.pereiracr@gmail.com", userPassword: "x85.2eRYwab6BY" };
const orderPayLoad = {orders:[{country:"United States",productOrderedId:"6262e9d9e26b7e1a10e89c04"}]};
let response;
test.beforeAll(async () => 
{
    const apiContext = await request.newContext();
    const api_utils = new apiUtils(apiContext, loginPayLoad);
    response = await api_utils.createOrder(orderPayLoad);
});
test('@API Place the order', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token );
    //Acessando a página de ordens
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("tbody").waitFor();
    //Busca pela ordem que foi criada via api
    const rows = await page.locator("tbody tr");
    for (let i = 0; i <= await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("[scope='row']").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator(".btn-primary").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator("div  .col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});