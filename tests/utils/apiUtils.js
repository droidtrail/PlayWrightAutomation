class apiUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }
    async getToken(loginPayLoad) {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad
            }
        )
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        token = loginResponseJson.token;
        console.log('orderId >>>>>> ' + token);
        return token;
    }

    async createOrder(orderPayLoad) {
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: {
                    'Authorization': this.getToken,
                    'Content-Type': 'application/json'
                },
            })
        const orderResponseJson = await orderResponse.json();
        orderId = orderResponseJson.orders[0];
        console.log('orderId >>>>>> ' + orderId);
        return orderId;
    }
}
module.exports = {apiUtils};