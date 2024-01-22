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
    readonly testSuiteNegative: Locator

    constructor(page: Page){
        this.page = page
        this.testSuite = page.getByRole('link', { name: 'Playwright' })
        this.testSuiteNegative = page.getByRole('link', { name: 'Negative' })
        this.addTestCaseBtn = page.getByRole('button', {name: 'Add Test Case'})
        this.testCaseTitle = page.locator('#Title')
        this.testCaseStep = page.frameLocator('iframe[title="Rich Text Editor\\, CustomSteps_0"]').locator('body')
        this.saveTestCase = page.getByRole('button', { name: 'Save Test Case' })
        this.editIcon = page.locator('#editLink')
        this.saveEditBtn = page.locator('#btnUpdateCase')
        this.sectionLink = page.getByRole('link', { name: 'Playwright Section', exact:true })
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
        await this.testCaseTitle.clear()
        await this.testCaseTitle.fill(tcTitle)
        await this.saveEditBtn.click()
    }

    async deleteTestCase(){
        await this.sectionLink.click()
        await this.delRow.last().hover()   
        await this.deleteIcon.last().click();
        await this.confirmDeleteBtn.click()
    }

    async getCreatedTestCaseTitle(): Promise<string> {
        const titleElement = await this.page.waitForSelector('div.textcaseid-content__text span');
        const createdTestCaseTitle = await titleElement.textContent();
        return createdTestCaseTitle;
    }

    async isTestCaseVisible(title: string): Promise<boolean> {
        return await this.page.waitForSelector(`:text("${title}")`, { state: 'visible' }) !== null;
    }

    async createNegativeTestCase(): Promise<void> {
           
        await this.moveToAddTestCasePage();

        try {
        await this.testCaseTitle.fill('')
        await this.testCaseStep.fill('')       
       await this.saveTestCase.click()
    }  catch (error) {
       
        console.error('Error creating negative test case:', error.message);
    }
}

    async moveToNegativeTestCasePage(){
        await this.testSuiteNegative.click()
        await this.addTestCaseBtn.click()
    }

    async moveToTestSuitePage(){
        await this.testSuite.click()
    }

}
