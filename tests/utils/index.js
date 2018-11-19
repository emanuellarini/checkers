const puppeteer = require('puppeteer')
jest.setTimeout(10000)

module.exports = {
  /**
   * Initialize browser and retrieve its configurations
   *
   * @returns {Promise<{browser, page}>}
   */
  initializeBrowser: async () => {
    await page.setViewport({width: 1440, height: 900, deviceScaleFactor: 1})
    await page.goto('http://localhost:3000')
    await page.waitFor(750)

    return page
  },
}
