import test, { expect, test as setup } from "@playwright/test";
import { PageManager } from "./pageManager";

const authFile = ".auth/user.json";

setup("authentication", async ({ page }) => {
  
  test.slow()
  await page.goto("/login");
  await page.waitForLoadState();

  const pm = new PageManager(page);

  await pm.onLoginPage().performLogin(process.env.EMAIL, process.env.PASSWORD);
  await expect(page).toHaveURL(process.env.DASHBOARD_URL);
  await page.context().storageState({ path: authFile });

});
