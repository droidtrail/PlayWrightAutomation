const { test, expect, request } = require('@playwright/test');
const loginPayLoad = { userEmail: "leandro.pereiracr@gmail.com", userPassword: "x85.2eRYwab6BY" };
const orderPayLoad = {orders:[{country:"United States",productOrderedId:"6262e9d9e26b7e1a10e89c04"}]};
let token;
let orderId;
//Login e obter o token via api.
test.beforeAll(async () => 
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayLoad
        }
    )
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log('orderId >>>>>> ' + token);
    //Criando a ordem via api.
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data:orderPayLoad,
        headers:{
                    'Authorization': token,
                    'Content-Type' : 'application/json'
        },
    })
    const orderResponseJson = await orderResponse.json();
    orderId = orderResponseJson.orders[0];
    console.log('orderId >>>>>> ' + orderId);
});

test.beforeEach(() => {

});

test('Place the order', async ({ page }) => {
    //Passando o token para o local storage.
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);

    }, token );
    //Acessando a página de ordens
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("tbody").waitFor();
    //Busca pela ordem que foi criada via api
    const rows = await page.locator("tbody tr");
    for (let i = 0; i <= await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("[scope='row']").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator(".btn-primary").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator("div  .col-text").textContent();
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});