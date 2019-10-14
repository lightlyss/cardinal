import Puppeteer from 'puppeteer';

const URL = 'http://localhost:3000/';
let browser = null, page = null;
let fSelector = null, mSelector = null;

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

afterAll(async () => {
  return browser.close();
});

afterEach(async () => {
  fSelector = await page.$('#selectf');
  mSelector = await page.$('#selectm');
});

test('loads Shizuku by default', async () => {
  await page.goto(URL);
  await waitOn('#l2d-default-000');
  expect(page.url()).toBe(URL);
});

test('selects a different family', async () => {
  await fSelector.select('Magia Record');
  await mSelector.select('Holy Alina (EX)');
  await waitOn('#l2d-magireco-120800');
  expect(page.url()).toBe(`${URL}?model=magireco-120800`);
});

test('selects a different model', async () => {
  await mSelector.select('Kagami Masara (Casual)');
  await waitOn('#l2d-magireco-302902');
  expect(page.url()).toBe(`${URL}?model=magireco-302902`);
});

test('selects the default family', async () => {
  await fSelector.select('Default');
  await mSelector.select('Haru (2)');
  await waitOn('#l2d-default-002');
  expect(page.url()).toBe(`${URL}?model=default-002`);
});
