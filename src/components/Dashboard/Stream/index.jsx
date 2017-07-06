import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import Socket from "../../../socket"
import nProgress from '../../../decorators/nProgress'
import CollapsibleSection from "../CollapsibleSection"
import SearchInput from "../SearchInput"
import StreamTweets from "../../StreamTweets"
import StreamChart from "../../StreamChart"
import { HeadNavigation } from "../HeadNavigation"
import { Sequencer } from "../../../utils"

@nProgress
export default class Stream extends Component {
    static contextTypes = {
        store: React.PropTypes.object
    }
    constructor(props, context) {
        super(props)
        this.socket = new Socket(context.store)
        //this.sequencer = new Sequencer(() => this.props.processTweet())
        this.sequencer = new Sequencer(() => this.props.processTweet())
        this.state = {
        }
    }
    componentWillUnmount = () => {
        //this.socket.close()
        //clearInterval(this.timer)
    }
    handleSearch = values => {
        this.socket.start(values)
        // hide input section
        this.setState({ hideInput: true })
        this.sequencer.start()
    }
    handleStop = () => {
        this.socket.end()
        this.setState({ hideInput: false })
        // stop sequencer
        //clearInterval(this.timer)
        //delete this.timer
        this.sequencer.stop()
    }
    showChart = () => {
/*        
        if (typeof this.timer === 'undefined') {
            this.timer = setInterval(() => {
                console.log("CURRENT TWEET: ")
                console.log(this.props.currentTweet)
                this.props.processTweet()
            }, 1000)   
        }
*/
        this.sequencer.update(1000)
    }
    hideChart = () => {
        this.sequencer.reset()
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

                        <CollapsibleSection title="Graph" hidden={this.props.tweet === null} onOpen={this.showChart} onClose={this.hideChart}>
                            <StreamChart tweet={this.props.tweet} />
                        </CollapsibleSection>

                        <CollapsibleSection title="Results" hidden={this.props.tweet === null}>
                            <StreamTweets tweet={this.props.tweet} />
                            <p> <a className="btn btn-danger btn-lg btn-outline btn-rounded" onClick={this.handleStop}>Stop</a> </p>
                            <p> <a className="btn btn-primary btn-lg btn-outline btn-rounded" href="https://dev.twitter.com/streaming/overview">Learn more</a> </p>
                        </CollapsibleSection>

                    </Jumbotron>
                </div>
            </div>
        )
    }
}
