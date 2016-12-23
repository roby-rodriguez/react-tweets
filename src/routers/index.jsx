import React from 'react'
import { Route, IndexRoute } from 'react-router'

import BaseLayout from "../components/Base"
import DashboardLayout from "../containers/pages/Dashboard"

import DashboardQueryPage from "../containers/pages/Dashboard/Query"
import DashboardReportsPage from "../containers/pages/Dashboard/Reports"
import LoginPage from "../containers/pages/Login"
import NotFoundPage from '../components/NotFoundPage'

const routes = (
    <Route path="/" component={BaseLayout}>
      <IndexRoute component={LoginPage}/>
      <Route path="/home" component={DashboardLayout} />
      <Route path="/dashboard" component={DashboardLayout}>
        <IndexRoute component={DashboardLayout}/>
        <Route path="/dashboard/query" component={DashboardQueryPage} />
        <Route path="/dashboard/reports" component={DashboardReportsPage} />
      </Route>
      <Route path="/login" component={LoginPage} />
      <Route path="*" component={NotFoundPage}/>
    </Route>
)

export default routes
