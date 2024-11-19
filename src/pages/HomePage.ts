import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

  private logo: Locator;
 

  constructor(page: Page) {
    super(page);
    this.logo = page.getByRole('link', { name: 'Playwright logo Playwright' });
  }

  async navigateToHome() {
    await this.visit('https://playwright.dev/');
  }

  async isLogoVisible() {
    return await this.logo.isVisible();
  }
}
