const playwright = require('playwright');
const chai = require('chai')
const expect = chai.expect

let page, browser, context

const selectors = {
  getTrialButton: '//*[contains(text(), "Get A Free Trial")]',
  helpButton: '//*[@class="helpButton"]',
  downloadButton: '//*[contains(text(), "Download DevCraft Trial")]'
}

describe('Main page: open', () => {
  beforeEach(async function() {
    browser = await playwright.chromium.launch({
      headless: false,
      slowMo: 2000
    });
      
    context = await browser.newContext()
    page = await context.newPage('https://www.telerik.com/')
  })

  afterEach(async function() {
    await browser.close()
  })

  it('1) Page should exists', async() => {
    await page.goto('https://www.telerik.com/');
    
    const title = await page.title()
   
    expect(title).to.equal('Telerik & Kendo UI - .NET Components Suites & JavaScript UI Libraries')
  })

  it('2) Should see a button Get free trial', async() => {
    await page.goto('https://www.telerik.com/');  

    expect(selectors.getTrialButton).to.exist;
  })

  it('3) Should see a "Contact Us" button', async() => {
    await page.goto('https://www.telerik.com/');  

    expect(selectors.helpButton).to.exist;
  })

  it('4) Button GET A FREE TRIAL should work', async() => {
    await page.goto('https://www.telerik.com/');  

    await page.click(selectors.getTrialButton);

    const title = await page.title()
    
    expect(title).to.equal('Download trials and sign up for services | Telerik')
  })
 
  it('5) Button DOWNLOAD TRIAL should work', async() => {
    await page.goto('https://www.telerik.com/');  

    await page.click(selectors.downloadButton);

    const title = await page.title()
    
    expect(title).to.equal('Identity')
  })
 })