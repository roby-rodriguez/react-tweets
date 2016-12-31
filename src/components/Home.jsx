import React, { Component } from 'react'
import { Link } from "react-router"
import { Jumbotron } from 'react-bootstrap'
import nProgress from '../decorators/nProgress'

@nProgress
export default class Home extends Component {

    render() {
        return (
            <div key="reports" className="reports-page">
                <div className="ng-scope">
                    <Link to="/dashboard/query" className="pull-right btn btn-primary btn-outline btn-rounded">Query</Link>
                    <Link to="/dashboard/stream" className="pull-right btn btn-primary btn-outline btn-rounded">Stream</Link>
                    <h2>Home <small>About react-tweets</small></h2>

                    <i className="glyphicon glyphicon-home bg-fade"></i>
                    <Jumbotron>
                        <h1>Query</h1>
                        <p>Build an interactive query to search for tweets</p>
                        <ul>
                            <li>choose between popular or recent (or a combination)</li>
                            <li>type a language</li>
                            <li>go back until at most a week to find older tweets</li>
                        </ul>
                        <h1>Stream</h1>
                        <p>Filter out from among the most recent tweets. See what's trending right now.</p>
                        <ul>
                            <li>browse the live stream</li>
                            <li>view a graph of most popular hastags or trends</li>
                        </ul>
                    </Jumbotron>
                </div>
            </div>
        )
    }
}
