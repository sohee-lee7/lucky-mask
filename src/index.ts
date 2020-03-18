import puppeteer from 'puppeteer-core'

(async () => {
  const AER = 'https://smartstore.naver.com/aer-shop/products/4722827602'
  const testUrl = 'https://smartstore.naver.com/hyslovely/products/567515619'
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  })
  const page = await browser.newPage()
  await page.goto(AER)

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 20000)
  })

  const waitBuyButton = async () => {
    const result = await page.waitForSelector('._buy_button', {
      timeout: 500
    })
      .then(_ => true)
      .catch(_ => false)

    if (!result) {
      await page.reload()
      await waitBuyButton()
    }
  }

  await waitBuyButton()
  await page.click('._buy_button')

})()