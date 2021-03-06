import React, { PropTypes } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Tweet } from "../Tweet"

const Tweets = props =>
    <ListGroup>
       <ReactCSSTransitionGroup
                         transitionName="tweet-stream"
                         transitionEnterTimeout={0}
                         transitionLeaveTimeout={0}
        >
            {
                props.data.map(tweet =>
                    <ListGroupItem key={tweet.id}>
                        <Tweet
                            data={tweet}
                            />
                    </ListGroupItem>
                )
            }
        </ReactCSSTransitionGroup>
    </ListGroup>

Tweets.propTypes = {
    data: PropTypes.array.isRequired
}

export default Tweets
