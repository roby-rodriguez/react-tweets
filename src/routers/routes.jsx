import React from "react"
import { Route, IndexRoute } from "react-router"

import BaseLayout from "../components/Base"
import DashboardLayout from "../components/Dashboard"

import DashboardOverviewPage from "../containers/pages/dashboard/Overview/Overview"
import DashboardReportsPage from "../containers/pages/dashboard/Reports/Reports"
import LoginPage from "../containers/pages/Login"

const routes = (
    <Route path="/" component={BaseLayout}>
      <IndexRoute component={DashboardLayout}/>
      <Route path="/dashboard" component={DashboardLayout}>
        <IndexRoute component={DashboardLayout}/>
        <Route path="/dashboard/overview" component={DashboardOverviewPage} />
        <Route path="/dashboard/reports" component={DashboardReportsPage} />
      </Route>
      <Route path="/login" component={LoginPage} />
    </Route>
)

export default routes