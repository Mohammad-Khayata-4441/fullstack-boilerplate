import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test("redirects to default locale", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en/);
  });

  test("displays the boilerplate ASCII banner", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("pre")).toBeVisible();
  });

  test("shows API status section", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByText("API Status")).toBeVisible();
  });
});

test.describe("i18n routing", () => {
  test("serves Arabic locale at /ar", async ({ page }) => {
    await page.goto("/ar");
    await expect(page).toHaveURL("/ar");
  });

  test("redirects unknown locale to default", async ({ page }) => {
    await page.goto("/fr");
    await expect(page).toHaveURL(/\/en/);
  });
});
