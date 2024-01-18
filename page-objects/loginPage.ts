import { Locator, Page } from "@playwright/test";

export class LoginPage {

    readonly page: Page
    readonly email: Locator
    readonly password: Locator
    readonly loginBtn: Locator

    constructor(page: Page){
        this.page = page
        this.email = page.locator('#Email')
        this.password = page.locator('#Password')
        this.loginBtn = page.getByRole('button', {name:'Log In'})
    }

    /**
     * This function is used to log in user
     * @param userEmail - should be email to login
     * @param userPassword - should be password to login
     */
    async performLogin(userEmail: string, userPassword: string){
        await this.email.fill(userEmail)
        await this.password.fill(userPassword)
        await this.loginBtn.click()
    }
}