import { ENVIRONMENTS, HYDRATED_CLASS, createWebcPageE2E } from '../utils';

describe('webc-container', () => {
  const environment = ENVIRONMENTS[0];

  async function getLoaderFromTag(environment, tag) {
    const page = await createWebcPageE2E(environment);

    // find and wait for application to load completely
    const rootElement = await page.find('webc-app-root');
    await rootElement.callMethod('componentOnReady');

    // find and wait for loader of the homepage to load completely
    let loaderElement = await rootElement.find('webc-app-loader[path="/"]');
    expect(loaderElement).toHaveClass(HYDRATED_CLASS);
    await loaderElement.callMethod('componentOnReady');

    // go to desired page
    const linkElement = await loaderElement.find(`webc-link[tag=${tag}]`);
    expect(linkElement).toHaveClass(HYDRATED_CLASS);
    await linkElement.click();

    // find the loader for desired page
    loaderElement = await rootElement.find('webc-app-loader');
    expect(loaderElement).toHaveClass(HYDRATED_CLASS);
    await loaderElement.callMethod('componentOnReady');

    return loaderElement;
  }

  async function getContainerElement(controller) {
    const loaderElement = await getLoaderFromTag(environment, 'webc-container');
    const containerElement = await loaderElement.find(`webc-container[controller="webc-container/${controller}"]`);
    expect(containerElement).toHaveClass(HYDRATED_CLASS);
    expect(containerElement).toEqualAttribute('controller', `webc-container/${controller}`);
    await containerElement.callMethod('componentOnReady');
    return containerElement;
  }

  async function getTestElement(controller, testNumber) {
    const containerElement = await getContainerElement(controller);
    const testElement = await containerElement.find(`[data-test="${testNumber}"]`);
    expect(testElement['dataset'].test).toEqual(testNumber);
    return testElement;
  }

  describe('renders itself and applies initial binding', () => {
    const controller = 'T1';

    it('renders itself', async () => {
      await getContainerElement(controller);
    });

    it(`binds text '{{ @title }}'`, async () => {
      const h1Element = await getTestElement(controller, '01');
      expect(h1Element.innerText).toEqual('Title!');
    });

    it(`binds text 'Description: {{ @description }}'`, async () => {
      const pElement = await getTestElement(controller,'02');
      expect(pElement.innerText).toEqual('Description: This is our Description!');
    });

    it(`binds attributes 'class="@class"'`, async () => {
      const divElement = await getTestElement(controller,'03');
      expect(divElement.innerText).toEqual('This div has a nice class!');
      expect(divElement).toHaveClass('surprise');
    });

    it(`binds data-view-model 'data-model="@dataViewModel"`, async () => {
      const divElement = await getTestElement(controller,'04');
      expect(divElement).toEqualAttribute('data-view-model', '@dataViewModel');
      expect(divElement.innerText).toEqual('Text');
      expect(divElement.classList.contains('success')).toEqual(true);
      expect(divElement.classList.contains('inactive')).toEqual(false);
      expect(divElement).toEqualAttribute('custom', 'custom-attribute');
      expect(divElement).toEqualAttribute('data-tag', 'div-tag');
    });
  });

  describe('applies re-rendering when is needed', () => {
    const controller = 'T2';

    it('renders itself', async () => {
      await getContainerElement(controller);
    });

    it('model change triggers a render', async () => {
      const divElement = await getTestElement(controller,'01');

      const code = await divElement.find('code');
      const dec = await divElement.find('button[data-tag=number-decrement]');
      const inc = await divElement.find('button[data-tag=number-increment]');

      expect(code.innerText).toEqual('Value: 0');
      await dec.click();
      expect(code.innerText).toEqual('Value: -1');
      await inc.click();
      expect(code.innerText).toEqual('Value: 0');
      await inc.click();
      expect(code.innerText).toEqual('Value: 1');
      await dec.click();
      expect(code.innerText).toEqual('Value: 0');
    });
  })
});
