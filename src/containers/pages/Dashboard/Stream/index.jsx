import React, { PropTypes, Component } from 'react'
import { Link } from "react-router"
import { Jumbotron } from 'react-bootstrap'
import nProgress from '../../../../decorators/nProgress'

@nProgress
export default class Stream extends Component {

  render() {
    return (
        <div key="reports" className="reports-page">
          <div className="ng-scope">
            <Link to="/dashboard/query" className="pull-right btn btn-primary btn-outline btn-rounded">Back to Query</Link>
            <h2>Stream <small>Live tweets</small></h2>

            <i className="glyphicon glyphicon-flash bg-fade"></i>
            <Jumbotron>
              <h1>Under construction</h1>
              <p>Here will be D3 charts and live stream tweets flowing</p>
              <p> <a className="btn btn-primary btn-lg btn-outline btn-rounded" href="https://dev.twitter.com/streaming/overview">Learn more</a> </p>
            </Jumbotron>
          </div>
        </div>
    )
  }
}
