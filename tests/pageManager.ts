import { Page, expect } from "@playwright/test";
import { Dashboard } from "../page-objects/dashboard";
import { HelperBase } from "../page-objects/helperBase";
import { LoginPage } from "../page-objects/loginPage";
import { TestSuiteAndCases } from "../page-objects/testSuites&Cases";
import { FakerUtility } from "../utilities/faker";

export class PageManager {

    readonly page: Page
    readonly loginPage: LoginPage
    readonly dashboardPage: Dashboard
    readonly helperBase: HelperBase
    readonly testSuiteCase: TestSuiteAndCases
    readonly fakerUtility: FakerUtility

    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPage(page)
        this.dashboardPage = new Dashboard(page)
        this.helperBase = new HelperBase(page)
        this.testSuiteCase = new TestSuiteAndCases(page)
        this.fakerUtility = new FakerUtility()
    }

    onLoginPage(){
        return this.loginPage
    }

    onDashboardPage(){
        return this.dashboardPage
    }

    onhelperBase(){
        return this.helperBase
    }

    onTestSuitePage(){
        return this.testSuiteCase
    }
    
    onFaker(){
        return this.fakerUtility
    }
}