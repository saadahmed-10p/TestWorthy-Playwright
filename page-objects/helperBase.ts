import { Locator, Page } from "@playwright/test";
import { PageManager } from "../tests/pageManager";

export class HelperBase {
    readonly page: Page;
    readonly tabName: Locator;
    readonly pageHeading: Locator;
    readonly pageManager: PageManager;

    constructor(pageManager: PageManager) {
        this.page = pageManager.page;
        this.tabName = pageManager.page.getByRole('link');
        this.pageHeading = pageManager.page.getByRole('heading');
        this.pageManager = pageManager;
    }

    async clickTabOnProjectOverview(tabTitle: string) {
        await this.tabName.filter({ hasText: tabTitle }).click();
    }

    async createTestCase(): Promise<string> {
        const testCaseTitle = this.pageManager.onFaker().faker5Words();
        const testCaseSteps = this.pageManager.onFaker().faker5To10Words();

        await this.pageManager.onTestSuitePage().moveToAddTestCasePage();
        await this.pageManager.onTestSuitePage().enterTestCaseDetails(testCaseTitle, testCaseSteps);

        // Assuming there is a method to get the created test case title from the page
        const createdTestCaseTitle = await this.pageManager.onTestSuitePage().getCreatedTestCaseTitle();

        return createdTestCaseTitle;
    }
}