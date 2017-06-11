import React, { PropTypes } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Tweet } from "../Tweet"

const Tweets = props =>
    <ListGroup>
        {
            props.data.map(tweet =>
                <ListGroupItem key={tweet.id}>
                    <Tweet
                        data={tweet}
                        />
                </ListGroupItem>
            )
        }
    </ListGroup>

Tweets.propTypes = {
    data: PropTypes.array.isRequired
}

export default Tweets
