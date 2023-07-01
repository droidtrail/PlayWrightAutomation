const { test, expect, request } = require('@playwright/test');
const {apiUtils} = require('../utils/apiUtils');
const loginPayLoad = { userEmail: "leandro.pereiracr@gmail.com", userPassword: "x85.2eRYwab6BY" };
const orderPayLoad = { orders: [{ country: "United States", productOrderedId: "6262e9d9e26b7e1a10e89c04" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" }
let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const api_utils = new apiUtils(apiContext, loginPayLoad);
    response = await api_utils.createOrder(orderPayLoad);
});
test('Place the order', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token)
    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('button[routerlink*=\'myorders\']').click()
    console.log('orderId: ', response.orderId)
    await page.route(`https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=${response.orderId}`,
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' })
    )
    await page.locator('button:has-text(\'View\')').last().click()
    const message = await page.locator('p.blink_me').textContent()
    expect(message).toBe('You are not authorize to view this order')
})
