import React from 'react'
import { Route, IndexRoute } from 'react-router'

import BaseLayout from "../components/Base"
import DashboardLayout from "../containers/pages/Dashboard"

import DashboardQueryPage from "../containers/pages/Dashboard/Query"
import DashboardStreamPage from "../containers/pages/Dashboard/Stream"
import LoginPage from "../containers/pages/Login"
import HomePage from '../components/Home'
import NotFoundPage from '../components/NotFoundPage'

const routes = (
    <Route path="/" component={BaseLayout}>
      <IndexRoute component={LoginPage}/>
      <Route path="/dashboard" component={DashboardLayout}>
        <IndexRoute component={HomePage}/>
        <Route path="/dashboard/query" component={DashboardQueryPage} />
        <Route path="/dashboard/stream" component={DashboardStreamPage} />
      </Route>
      <Route path="*" component={NotFoundPage}/>
    </Route>
)

export default routes
