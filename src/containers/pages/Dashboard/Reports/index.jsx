import React, { PropTypes, Component } from 'react'
import { Link } from "react-router"
import { Jumbotron } from 'react-bootstrap'
import nProgress from '../../../../decorators/nProgress'

@nProgress
export default class Reports extends Component {
  componentWillMount() {
    console.log("will mount reports")
  }
  render() {
    return (
        <div key="reports" className="reports-page">
          <div className="ng-scope">
            <Link to="/dashboard/query" className="pull-right btn btn-primary btn-outline btn-rounded">Back to Query</Link>
            <h2>Reports <small>Work with Chart.js and D3</small></h2>

            <i className="glyphicon glyphicon-dashboard bg-fade"></i>
            <Jumbotron>
              <h1>Add Charts here</h1>
              <p>You can use C3.js or Chart.js</p>
              <p> <a className="btn btn-primary btn-lg btn-outline btn-rounded">Learn more</a> </p>
            </Jumbotron>
          </div>
        </div>
    )
  }
}