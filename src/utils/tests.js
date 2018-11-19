import React from 'react'
import Provider from 'components/Provider'
import {createStore} from 'redux'
import reducers from 'store'
import i18n from 'i18next'
import {I18nextProvider} from 'react-i18next'

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
