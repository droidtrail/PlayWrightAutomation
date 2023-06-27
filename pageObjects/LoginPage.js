class LoginPage 
{
    constructor(page) 
    {
        this.page = page;
        this.signUserEmail = page.locator("#userEmail");
        this.userPassword = page.locator("#userPassword");
        this.signInbutton = page.locator("[value='Login']");
    }
    async goTo () 
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
    async validLogin(username, password) 
    {
        await this.signUserEmail.type(username);
        await this.userPassword.type(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = {LoginPage};