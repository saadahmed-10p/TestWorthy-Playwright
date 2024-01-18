import { expect, Locator, Page } from "@playwright/test";


export class Dashboard {

    readonly page: Page
    readonly projectTitle: Locator

    constructor(page: Page){
        this.page = page
        this.projectTitle = page.getByRole('link')
    }

    async clickProjectTitle(projectName: string){
    await this.projectTitle.filter({hasText:projectName}).click();
  }
}