import { createWebcPageE2E, ENVIRONMENTS, HYDRATED_CLASS } from '../../utils';

describe('webc-app-root', () => {
  describe('renders itself and children', () => {
    const environment = ENVIRONMENTS[0];

    it('renders itself', async () => {
      const page = await createWebcPageE2E(environment);
      const rootElement = await page.find('webc-app-root');
      expect(rootElement.tagName).toEqual('WEBC-APP-ROOT');
      expect(rootElement).toHaveClass(HYDRATED_CLASS);
    });

    it('renders webc-app-menu', async () => {
      const page = await createWebcPageE2E(environment);
      const rootElement = await page.find('webc-app-root');
      const menuElement = await rootElement.find(`webc-app-root > webc-app-menu`);
      expect(menuElement.tagName).toEqual('WEBC-APP-MENU');
      expect(menuElement).toHaveClass(HYDRATED_CLASS);
    });

    it('renders webc-app-container', async () => {
      const page = await createWebcPageE2E(environment);
      const rootElement = await page.find('webc-app-root');
      const containerElement = await rootElement.find(`webc-app-root > webc-app-container`);
      expect(containerElement.tagName).toEqual('WEBC-APP-CONTAINER');
      expect(containerElement).toHaveClass(HYDRATED_CLASS);
    });

    it('renders webc-app-error-toast', async () => {
      const page = await createWebcPageE2E(environment);
      const rootElement = await page.find('webc-app-root');
      const errorToastElement = await rootElement.find(`webc-app-root > webc-app-error-toast`);
      expect(errorToastElement.tagName).toEqual('WEBC-APP-ERROR-TOAST');
      expect(errorToastElement).toHaveClass(HYDRATED_CLASS);
    });
  });
});
