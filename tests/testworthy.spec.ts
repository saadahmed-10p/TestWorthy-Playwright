import { expect, test } from '@playwright/test'
import { PageManager } from './pageManager'

test.beforeEach(async ({page})=>{
    await page.goto('/Dashboard/Index')
    await page.waitForLoadState()
})

test('User should be able to create test case in the specified suite', async({page})=>{
    test.slow()
    
    const pm = new PageManager(page)
    
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
    test.slow()
    const pm = new PageManager(page)

    const updatetestCaseTitle = pm.onFaker().faker5Words()
    
    await pm.onDashboardPage().clickProjectTitle('Finstreet')
    await pm.onhelperBase().clickTabOnProjectOverview('Test Suites & Cases')
        
    await pm.onhelperBase().createTestCase()

    await pm.onTestSuitePage().editTestCase(updatetestCaseTitle)
    expect(page.getByText(updatetestCaseTitle, {exact: true}))
})

test('User should be able to delete the created test case', async({page}) => {
    test.slow()
    
    const pm = new PageManager(page)
    
    await pm.onDashboardPage().clickProjectTitle('Finstreet')
    await pm.onhelperBase().clickTabOnProjectOverview('Test Suites & Cases')
    expect(pm.onhelperBase().pageHeading.filter({hasText: 'Test Suites & Cases'}))

    await pm.onhelperBase().createTestCase()
    await pm.onTestSuitePage().deleteTestCase()
    
    expect(page.getByText('Test Case Deleted')).toBeVisible()

})