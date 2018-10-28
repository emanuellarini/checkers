import {createStore, applyMiddleware, compose} from 'redux'
import reducers from 'store'
import thunk from 'redux-thunk'

export default (initialState = {}) => {
  const middlewares = [thunk]

  const enhancers = [applyMiddleware(...middlewares)]

  const store = createStore(reducers, initialState, compose(...enhancers))

  store.asyncReducers = {}

  return store
}
