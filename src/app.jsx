import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import NProgress from 'nprogress'
import routes from "./routers"
import configureStore from "./store"
import "./styles/app.less"

NProgress.configure({ showSpinner: false })

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)
const history = syncHistoryWithStore(browserHistory, store)

// TODO check if anything else needed
// https://github.com/reactjs/redux/blob/master/examples/real-world/src/index.js

render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById('app')
)
