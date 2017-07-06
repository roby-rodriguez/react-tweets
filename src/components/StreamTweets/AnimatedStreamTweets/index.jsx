import React, { PropTypes } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Tweet } from "../../Tweet"

const AnimatedStreamTweets = ({ tweets }) =>
    <ListGroup>
        <ReactCSSTransitionGroup
            transitionName="tweet-stream"
            transitionEnterTimeout={0}
            transitionLeave={false}
        >
            {
                tweets.map(tweet =>
                    <ListGroupItem key={tweet.id}>
                        <Tweet
                            data={tweet}
                            />
                    </ListGroupItem>
                )
            }
        </ReactCSSTransitionGroup>
    </ListGroup>

AnimatedStreamTweets.propTypes = {
    tweets: PropTypes.array.isRequired
}

export { AnimatedStreamTweets }
