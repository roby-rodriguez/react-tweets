import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import nProgress from "../decorators/nProgress"
import { HeadNavigation } from "./Dashboard/HeadNavigation"

@nProgress
export default class Home extends Component {

    render() {
        return (
            <div key="home">
                <div className="ng-scope">
                    <HeadNavigation
                        title="Home"
                        description="About react-tweets"
                        links={[
                            { title: "Query", location: "query" },
                            { title: "Stream", location: "stream" }
                        ]}
                        />

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
                            <li>view a graph of the users opinion inferred from hashtags or trends (using a third-party sentiment analysis tool)</li>
                        </ul>
                    </Jumbotron>
                </div>
            </div>
        )
    }
}
