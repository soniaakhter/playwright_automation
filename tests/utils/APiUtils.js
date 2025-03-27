class APiUtils {

    constructor(apiContext, loginPayLoad) {

        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }


    async getToken() {

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad
            })

        // Parse the API response to extract the token
        const loginResponseJson = await loginResponse.json()
        const userToken = loginResponseJson.token
        console.log(userToken)
        return userToken;
    }


    async createOrder(orderPayLoad) {

        let response = {}
        response.userToken = await this.getToken()

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: {
                    'Authorization': response.userToken,
                    'Content-Type': 'application/json'
                },
            })

        const orderResponseJson = await orderResponse.json()
        console.log(orderResponseJson)
        const orderId = orderResponseJson.orders[0]
        response.orderId = orderId;
        return response;

    }

}

module.exports = { APiUtils }