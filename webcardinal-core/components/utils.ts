import { newE2EPage } from "@stencil/core/testing";

// constants
export const HYDRATED_CLASS = 'hydrated';
export const ENVIRONMENTS = setEnvironments();

// exported functions
export async function createWebcPageE2E(environment, options = {}) {
  const page = await newE2EPage(options);
  await page.setContent(environment.content);
  return page;
}

export async function getWebcWindowFrom(page) {
  const handle = await page.evaluateHandle(() => ({ window }));
  const properties = await handle.getProperties();
  const windowHandle = properties.get('window');
  return [handle, windowHandle, await page.evaluate(win => win, windowHandle)];

  // At the end
  // await handle.dispose();
}

// functions
function setEnvironments() {
  const environments: Array<any> = [
    {
      basePath: '/test/environments/1',
    }
  ]

  environments[0]['content'] = `
    <base href="${environments[0].basePath}">
    <webc-app-root></webc-app-root>
  `;

  return environments;
}
