import { Locator, Page } from "@playwright/test";

export class HelperBase{

    readonly page: Page
    readonly tabName: Locator
    readonly pageHeading: Locator

    constructor(page: Page){
        this.page = page
        this.tabName = page.getByRole('link')
        this.pageHeading = page.getByRole('heading')
    }

    async clickTabOnProjectOverview(tabTitle: string){
        await this.tabName.filter({hasText: tabTitle}).click()
    }
}