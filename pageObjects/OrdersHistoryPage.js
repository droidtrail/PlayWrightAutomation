class OrdersHistoryPage {
    constructor(page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderIdDetails = page.locator("div  .col-text");

    }
    async searchOrderAndSelect(orderId) {
        await this.ordersTable.waitFor();
        // const rows = await this.rows;
        for (let i = 0; i <= await this.rows.count(); ++i) {
            const rowOrderId = await this.rows.nth(i).locator("[scope='row']").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator(".btn-primary").first().click();
                break;
            }
        }
        
    }
    async getOrderId() {

        return await this.orderIdDetails.textContent();
    }

}
module.exports = { OrdersHistoryPage };