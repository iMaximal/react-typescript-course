import 'normalize.css'
import '@style/base.styl'

import * as React from 'react'
import { render } from 'react-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import './i18n'

import App from './App'

import registerServiceWorker from './registerServiceWorker'
import { store, history } from '@src/store/store'
import { requestInterceptor, responseInterceptor } from '@src/axios'

requestInterceptor()
responseInterceptor(store)

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
)

render(app, document.getElementById('root'))

registerServiceWorker()
