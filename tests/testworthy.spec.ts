import { expect, test } from '@playwright/test'
import { PageManager } from './pageManager'

let pm: PageManager;


test.beforeEach(async ({page})=>{
    await page.goto('/Dashboard/Index')
    await page.waitForLoadState()
    pm = new PageManager(page)
    test.slow()
})

test('User should be able to create test case in the specified suite', async({page})=>{
    
    await pm.onDashboardPage().clickProjectTitle('Finstreet')
    await pm.onhelperBase().clickTabOnProjectOverview('Test Suites & Cases')
    expect(pm.onhelperBase().pageHeading.filter({hasText: 'Test Suites & Cases'}))

    // Use HelperBase to create a test case
    const createdTestCaseTitle = await pm.onhelperBase().createTestCase()

    // Check if the created test case is visible on the page
    const isTestCaseVisible = await pm.onTestSuitePage().isTestCaseVisible(createdTestCaseTitle);

    // Assert that the test case is visible
    expect(isTestCaseVisible).toBe(true);

    //await page.pause()
})

test('user should be able to update the created test case', async({page}) => {

    const updatetestCaseTitle = pm.onFaker().faker5Words()
    
    await pm.onDashboardPage().clickProjectTitle('Finstreet')
    await pm.onhelperBase().clickTabOnProjectOverview('Test Suites & Cases')
        
    await pm.onhelperBase().createTestCase()

    await pm.onTestSuitePage().editTestCase(updatetestCaseTitle)
    expect(page.getByText(updatetestCaseTitle, {exact: true}))
})

test('User should be able to delete the created test case', async({page}) => {
   
    await pm.onDashboardPage().clickProjectTitle('Finstreet')
    await pm.onhelperBase().clickTabOnProjectOverview('Test Suites & Cases')
    expect(pm.onhelperBase().pageHeading.filter({hasText: 'Test Suites & Cases'}))

    await pm.onhelperBase().createTestCase()
    await pm.onTestSuitePage().deleteTestCase()
    
    expect(page.getByText('Test Case Deleted')).toBeVisible()

})

test('User should not be able to create an empty testcase', async({page}) => {

    await pm.onDashboardPage().clickProjectTitle('Finstreet')
    await pm.onhelperBase().clickTabOnProjectOverview('Test Suites & Cases')

    await pm.onTestSuitePage().createNegativeTestCase()
    expect(page.getByText('The Title field is required.')).toBeVisible()
})

test('User should not be able to delete when no testcase is present', async({page}) => {
    
    await pm.onDashboardPage().clickProjectTitle('Finstreet')
    await pm.onhelperBase().clickTabOnProjectOverview('Test Suites & Cases')
    
    await pm.onTestSuitePage().moveToNegativeTestCasePage()
    
    await expect(pm.onTestSuitePage().deleteIcon).not.toBeVisible()
   
    if(await pm.onTestSuitePage().deleteIcon.isVisible()){
        console.log('Delete icon is visible!');
    }
})

test('User should not be able to see Next Test Case button when its the last testcase', async({page}) => {
    
    await pm.onDashboardPage().clickProjectTitle('Finstreet')
    await pm.onhelperBase().clickTabOnProjectOverview('Test Suites & Cases')
    
    await pm.onTestSuitePage().moveToTestSuitePage()

    await expect(page.locator('.card-content').first()).toBeVisible()
    await expect(page.locator('.col600.table-cell').last()).toBeVisible()

    // Select the first .card-content
    const firstCardContent = await page.locator('.card-content').first();

    // Select the last .col600.table-cell within the first .card-content
    const lastCol600TableCell = await firstCardContent.locator('.col600.table-cell').last();

    // Click on the last .col600.table-cell
    await lastCol600TableCell.click();

    await expect(page.getByRole('button', {name: 'Next Test Case'})).not.toBeVisible()

})