import { expect, test } from '@playwright/test'
import { PageManager } from './pageManager'
import { faker } from '@faker-js/faker'

test.beforeEach(async ({page})=>{
    await page.goto('/Dashboard/Index')
    await page.waitForLoadState()
})

test('Create Test Case', async({page})=>{
    const pm = new PageManager(page)
    
    const testCaseTitle = pm.onFaker().faker5Words()
    const testCaseSteps = pm.onFaker().faker5To10Words()
    
    await pm.onDashboardPage().clickProjectTitle('Finstreet')
    await pm.onhelperBase().clickTabOnProjectOverview('Test Suites & Cases')
    expect(pm.onhelperBase().pageHeading.filter({hasText: 'Test Suites & Cases'}))
    
    await pm.onTestSuitePage().moveToAddTestCasePage()
    await pm.onTestSuitePage().enterTestCaseDetails(testCaseTitle, testCaseSteps)
    expect(page.getByText(testCaseTitle, {exact: true}))
    expect(page.getByText(testCaseSteps, {exact: true}))

    //await page.pause()
})

test('Update Test Case', async({page}) => {
    const pm = new PageManager(page)
    
    const testCaseTitle = pm.onFaker().faker5Words()
    const testCaseSteps = pm.onFaker().faker5To10Words()
    const updatetestCaseTitle = pm.onFaker().faker5Words()
    
    await pm.onDashboardPage().clickProjectTitle('Finstreet')
    await pm.onhelperBase().clickTabOnProjectOverview('Test Suites & Cases')
    
    await pm.onTestSuitePage().moveToAddTestCasePage()
    await pm.onTestSuitePage().enterTestCaseDetails(testCaseTitle, testCaseSteps)
    
    await pm.onTestSuitePage().editTestCase(updatetestCaseTitle)
    expect(page.getByText(testCaseTitle, {exact: true}))
})
