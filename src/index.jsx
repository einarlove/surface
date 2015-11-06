import React from 'react'
import ReactDOM from 'react-dom'
import Application from './components/Application'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
const store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root'),
)
