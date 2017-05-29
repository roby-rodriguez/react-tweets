import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import Socket from "../../../socket"
import nProgress from '../../../decorators/nProgress'
import CollapsibleSection from "../CollapsibleSection"
import SearchInput from "../SearchInput"
import Tweets from "../../Tweet"
import { HeadNavigation } from "../HeadNavigation"

@nProgress
export default class Stream extends Component {
    constructor(props) {
        super(props)
        console.log("Constructor called")
        //this.socket = new Socket()
        console.log(this.context)
        this.state = {
        }
    }
    handleSearch(values) {
        this.props.start(values)
        // hide input section
        this.setState({ hideInput: true })
    }
    handleStop() {
        this.socket.stop()
        this.setState({ hideInput: false })
    }
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
                        <h1>Search</h1> Select from among the controls to create an interactive search for live tweets:
                        
                        <i className="glyphicon glyphicon-flash bg-fade"></i>
                        
                        <CollapsibleSection title="Criteria" forcedClose={this.state.hideInput}>
                            <SearchInput onSubmit={this.handleSearch} />
                        </CollapsibleSection>
                        
                        <CollapsibleSection title="Results" hidden={this.props.tweets.length === 0}>
                            <Tweets data={this.props.tweets} />
                            <p> <a className="btn btn-danger btn-lg btn-outline btn-rounded" onClick={this.handleStop}>Stop</a> </p>
                            <p> <a className="btn btn-primary btn-lg btn-outline btn-rounded" href="https://dev.twitter.com/streaming/overview">Learn more</a> </p>
                        </CollapsibleSection>
                        
                        <CollapsibleSection title="Graph" hidden={true}>
                            <p>TODO D3 charts and live stream tweets flowing</p>
                        </CollapsibleSection>
                    </Jumbotron>
                </div>
            </div>
        )
    }
}
