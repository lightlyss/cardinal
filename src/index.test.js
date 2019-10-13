import Puppeteer from 'puppeteer';

const URL = 'http://localhost:3000/';
let browser = null, page = null;

const waitOn = async selector => {
  return page.waitForSelector(selector, {
    visible: true,
    timeout: 10*1000
  });
};

beforeAll(async () => {
  jest.setTimeout(5*60*1000);
  browser = await Puppeteer.launch({headless: true});
  page = await browser.newPage();
  return page.setViewport({
    width: 1280,
    height: 720,
    isLandscape: true
  });
});

test('selects Live2D models', async () => {
  await page.goto(URL);
  await waitOn('#selectf');
  const fSelector = await page.$('#selectf');
  const mSelector = await page.$('#selectm');

  await waitOn('#l2d-default-000');
  expect(page.url()).toBe(URL);
  await fSelector.select('Magia Record');
  await mSelector.select('Holy Alina (EX)');
  await waitOn('#l2d-magireco-120800');
  expect(page.url()).toBe(`${URL}?model=magireco-120800`);
});

afterAll(async () => {
  return browser.close();
});
