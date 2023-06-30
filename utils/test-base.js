const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            username: "leandro.pereiracr@gmail.com",
            password: "x85.2eRYwab6BY",
            productName: "zara coat 3"
        }
    }
)