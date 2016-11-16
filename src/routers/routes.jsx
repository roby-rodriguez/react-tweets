import React from "react"
import { Route, IndexRoute } from "react-router"

import BaseLayout from "../components/Base"
import DashboardLayout from "../components/Dashboard"

import DashboardOverviewPage from "../containers/pages/dashboard/Overview"
import DashboardReportsPage from "../containers/pages/dashboard/Reports"
import LoginPage from "../containers/pages/Login"
import NotFoundPage from '../components/NotFoundPage';

const routes = (
    <Route path="/" component={BaseLayout}>
      <IndexRoute component={LoginPage}/>
      <Route path="/home" component={DashboardLayout} />
      <Route path="/dashboard" component={DashboardLayout}>
        <IndexRoute component={DashboardLayout}/>
        <Route path="/dashboard/overview" component={DashboardOverviewPage} />
        <Route path="/dashboard/reports" component={DashboardReportsPage} />
      </Route>
      <Route path="/login" component={LoginPage} />
      <Route path="*" component={NotFoundPage}/>
    </Route>
)

export default routes