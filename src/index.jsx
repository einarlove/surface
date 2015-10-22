import React from 'react'
import ReactDOM from 'react-dom'
import Application from './components/Application'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'

const debug = process.env.NODE_ENV !== 'production'
const middleware = debug ? [require('redux-immutable-state-invariant')()] : []
const createStoreWithMiddle = applyMiddleware(...middleware)(createStore)
const store = createStoreWithMiddle(reducers)

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root'),
)
