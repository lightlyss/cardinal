import Puppeteer from 'puppeteer';

const URL = 'http://localhost:3000/';
const DEBUG = false;
let browser = null, page = null;
let fSelector = null, mSelector = null;

// Tools

const waitOn = async selector => {
  return page.waitForSelector(selector, {
    visible: true,
    timeout: 10*1000
  });
};

const verifyLoaded = async tag => {
  await waitOn(`#l2d-${tag}`);
  expect(page.url()).toBe(`${URL}?model=${tag}`);
};

// Framework

beforeAll(async () => {
  jest.setTimeout(5*60*1000);
  browser = await Puppeteer.launch({headless: !DEBUG});
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

// Test scenario

test('loads Shizuku by default', async () => {
  await page.goto(URL);
  await waitOn('#l2d-default-000');
  expect(page.url()).toBe(URL);
});

test('selects Magia Record', async () => {
  await fSelector.select('Magia Record');
  await verifyLoaded('magireco-200200');
});

test('noops if selection unchanged', async () => {
  await mSelector.select('Akemi Homura');
  await verifyLoaded('magireco-200200');
  await fSelector.select('Magia Record');
  await verifyLoaded('magireco-200200');
});

test('loads Holy Alina', async () => {
  await mSelector.select('Holy Alina (EX)');
  await verifyLoaded('magireco-120800');
});

test('loads Kagami Masara', async () => {
  await mSelector.select('Kagami Masara (Casual)');
  await verifyLoaded('magireco-302902');
});

test('selects the default family', async () => {
  await fSelector.select('Default');
  await verifyLoaded('default-000');
});

test('loads Haru', async () => {
  await mSelector.select('Haru (2)');
  await verifyLoaded('default-002');
});
