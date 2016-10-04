import React from 'react'
import { render } from 'react-dom'
import { createHashHistory, useBasename } from 'history'
import { Router, browserHistory } from 'react-router'
import "./styles/app.less"
import NProgress from 'nProgress'
import Base from './components/Base'
import routes from './routers/routes'

NProgress.configure({ showSpinner: false })

render(
  <Router routes={routes} history={browserHistory} />,
  document.getElementById('app')
)
