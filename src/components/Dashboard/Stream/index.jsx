import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import nProgress from '../../../decorators/nProgress'
import { HeadNavigation } from "../HeadNavigation"

@nProgress
export default class Stream extends Component {

    render() {
        return (
            <div key="stream">
                <div className="ng-scope">
                    <HeadNavigation
                        title="Stream"
                        description="Live tweets"
                        links={[
                            { title: "Back to Query", location: "query" }
                        ]}
                        />

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
