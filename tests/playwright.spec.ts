import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { DocsPage } from '../src/pages/DocsPage';

test.describe('Playwright Website Tests', () => {
  test('Verify Home Page', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigateToHome();
    await homePage.checkResponseStatus();

    const pageTitle = await homePage.getPageTitle();
    expect(pageTitle).toBe('Fast and reliable end-to-end testing for modern web apps | Playwright');

    const isLogoVisible = await homePage.isLogoVisible();
    expect(isLogoVisible).toBeTruthy();
  });

  test('Navigate to Docs Page', async ({ page }) => {
    const homePage = new HomePage(page);
    const docsPage = new DocsPage(page);

    await homePage.navigateToHome();
    await docsPage.clickDocsLink();
    await page.waitForTimeout(3000);
    const pageTitle = await docsPage.getPageTitle();
    expect(pageTitle).toMatch('Installation | Playwright');
    // Opción 2: Verificar que contiene al menos una parte del título esperado
    expect(pageTitle).toContain('Playwright');

    const isGettingStartedVisible = await docsPage.isGettingStartedVisible();
    expect(isGettingStartedVisible).toBeTruthy();
  });

  test('Search Documentation', async ({ page }) => {
    const homePage = new HomePage(page);
    const docsPage = new DocsPage(page);

    await homePage.navigateToHome();
    // Añadir un pequeño retraso
    await page.waitForTimeout(3000);
    await docsPage.clickDocsLink();

    // Esperar a que la página se cargue
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    await docsPage.searchDocumentation('API');

    const isSearchResultVisible = await docsPage.isSearchResultVisible();
    expect(isSearchResultVisible).toBeTruthy();
  });
});