import React, { Component, PropTypes } from 'react'
import { AnimatedStreamTweets } from "./AnimatedStreamTweets"
/*
export default class StreamTweets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets: [],
            index: 0
        }
    }
    componentWillReceiveProps({ tweet }) {
        // TODO do we really need this check?
        if (tweet) {
            const tweets = this.state.tweets.slice()
            const index = this.state.index
            tweets.splice(index, 1, tweet)
            this.setState({
                tweets,
                index: (index + 1) % 3
            })
        }
    }
    render() {
        return (
            <AnimatedStreamTweets
                tweets={this.state.tweets}
                />
        )
    }
}
*/
export default class StreamTweets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets: [],
            index: 0
        }
    }
    componentWillReceiveProps({ tweet }) {
        // TODO do we really need this check?
        if (tweet) {
            const tweets = this.state.tweets.slice()
            const index = this.state.index
            tweets.splice(index, 1, tweet)
            this.setState({
                tweets,
                index: (index + 1) % 3
            })
        }
    }
    render() {
        return (
            <AnimatedStreamTweets
                tweets={this.state.tweets}
                />
        )
    }
}
