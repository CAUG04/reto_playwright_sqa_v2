import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DocsPage extends BasePage {
  private gettingStartedButton: Locator;
  private searchInput: Locator;
  private searchResults: Locator;
  private docsLink: Locator;
  private searchLabel: Locator;

  constructor(page: Page) {
    super(page);
    
    this.docsLink = page.getByRole('link', { name: 'Docs' });
    this.gettingStartedButton = page.getByRole('button', { name: 'Getting Started' });

    // Modificar los selectores de búsqueda
    this.searchLabel = page.getByLabel('Search');
    
    this.searchInput = page.getByPlaceholder('Search docs');
    this.searchResults = page.getByRole('heading', { name: 'Mock browser APIs' });
  }

  async isGettingStartedVisible() {
    return await this.gettingStartedButton.isVisible();
  }

  async searchDocumentation(searchTerm: string) {
    // Primero hacer clic en la etiqueta de búsqueda
    await this.searchLabel.click();

     // Esperar a que el input de búsqueda esté listo
     await this.page.waitForSelector('input[placeholder="Search docs"]', { 
      state: 'visible',
      timeout: 10000 
    });
    await this.searchInput.click();
    await this.searchInput.fill(searchTerm);
    // Esperar un momento
    await this.page.waitForTimeout(3000);
    await this.searchInput.press('Enter');

    // Esperar un momento para que se carguen los resultados
    await this.page.waitForTimeout(3000);
  }

  async isSearchResultVisible() {
    try {
      // Aumentar el timeout y manejar la visibilidad
      return await this.searchResults.isVisible({ timeout: 10000 });
    } catch (error) {
      console.error('Search result not found:', error);
      return false;
    }
  }

  async clickDocsLink() {
    // Esperar a que el enlace esté visible
    await this.docsLink.waitFor({
      state: 'visible',
      timeout: 10000
    });

    // Navegar y esperar la URL correcta
    await Promise.all([
      this.page.waitForURL('**/docs/**'),
      this.docsLink.click()
    ]);

    // Esperar a que la página se cargue completamente
    await this.page.waitForLoadState('networkidle');
  }


}
