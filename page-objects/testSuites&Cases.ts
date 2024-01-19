import { FrameLocator, Locator, Page } from "@playwright/test";

export class TestSuiteAndCases {

    readonly page: Page
    readonly testSuite: Locator
    readonly addTestCaseBtn: Locator
    readonly testCaseTitle: Locator
    readonly testCaseStep: Locator
    readonly saveTestCase: Locator
    readonly editIcon: Locator
    readonly saveEditBtn: Locator
    readonly sectionLink: Locator
    readonly confirmDeleteBtn: Locator
    readonly delRow: Locator
    readonly deleteIcon: Locator

    constructor(page: Page){
        this.page = page
        this.testSuite = page.getByRole('link', { name: 'Playwright' })
        this.addTestCaseBtn = page.getByRole('button', {name: 'Add Test Case'})
        this.testCaseTitle = page.locator('#Title')
        this.testCaseStep = page.frameLocator('iframe[title="Rich Text Editor\\, CustomSteps_0"]').locator('body')
        this.saveTestCase = page.getByRole('button', { name: 'Save Test Case' })
        this.editIcon = page.locator('#editLink')
        this.saveEditBtn = page.locator('#btnUpdateCase')
        this.sectionLink = page.getByRole('link', { name: 'Playwright Section' })
        this.confirmDeleteBtn = page.getByRole('button', { name: 'Delete Test Case' })
        this.delRow = page.locator('.display-table')
        this.deleteIcon = page.locator('div.test-suites-table .delete-icon a .icon-trash')
    }

    async moveToAddTestCasePage(){
        await this.testSuite.click()
        await this.addTestCaseBtn.click()
    }

    async enterTestCaseDetails(tcTitle: string, tcStep: string){
        await this.testCaseTitle.fill(tcTitle)
        await this.testCaseStep.fill(tcStep)
        await this.saveTestCase.click()
    }

    async editTestCase(tcTitle: string){
        await this.editIcon.click()
        await this.testCaseTitle.fill(tcTitle)
        await this.saveEditBtn.click()
    }

    async deleteTestCase(){
        await this.sectionLink.click()
        await this.delRow.last().hover()   
        await this.deleteIcon.last().click();
        await this.confirmDeleteBtn.click()
    }
}