import { Page, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit(url: string) {
    await this.page.goto(url);
  }

  async getPageTitle() {
    // Esperar a que la página se cargue completamente
    await this.page.waitForLoadState('networkidle');
    return await this.page.title();
  }

  async checkResponseStatus(expectedStatus = 200) {
    const response = await this.page.goto(this.page.url());
    expect(response?.status()).toBe(expectedStatus);
  }
}
