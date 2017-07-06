import React, { Component, PropTypes } from 'react'
import { AnimatedStreamTweets } from "./AnimatedStreamTweets"

export default class StreamTweets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets: [],
            total: props.total,
            index: 0
        }
    }
    componentWillReceiveProps({ tweet }) {
        // TODO do we really need this check?
        if (tweet) {
            const tweets = this.state.tweets.slice()
            const index = this.state.index
            const total = this.state.total
            tweets.splice(index, 1, tweet)
            this.setState({
                tweets,
                total,
                index: (index + 1) % total
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
