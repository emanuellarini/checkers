import React from 'react'
import Provider from 'components/Provider'
import {createStore} from 'redux'
import reducers from 'store'
import i18n from 'i18next'
import {I18nextProvider} from 'react-i18next'
import puppeteer from 'puppeteer'
jest.setTimeout(10000)

const translator = i18n.init({
  fallbackLng: 'en',
  debug: false,
  saveMissing: false,

  interpolation: {
    escapeValue: false,
  },

  react: {
    wait: false,
    nsMode: 'fallback',
  },
})

/**
 * Add Providers as wrappers for testing
 *
 * @param props
 * @returns {*}
 */
export const Wrapper = props => {
  const store = createStore(reducers, props.store || {})

  return (
    <Provider store={store}>
      <I18nextProvider i18n={translator}>{props.children}</I18nextProvider>
    </Provider>
  )
}

/**
 * Initialize browser and retrieve its configurations
 *
 * @returns {Promise<{browser, page}>}
 */
export const initializeBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 100,
    args: [`--window-size=${1440},${900}`],
  })
  const page = await browser.newPage()
  await page.setViewport({width: 1440, height: 900, deviceScaleFactor: 1})
  await page.goto('http://localhost:3000')
  await page.waitFor(900)

  return {
    browser,
    page,
  }
}
