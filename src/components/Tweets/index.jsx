import React, { PropTypes } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Tweet } from "../Tweet"

const Tweets = props =>
    <ListGroup>
        {
            props.data.map(tweet => <ListGroupItem key={tweet.id}>
                <Tweet
                    userName={tweet.user.screen_name}
                    displayName={tweet.user.name}
                    avatarUrl={tweet.user.profile_image_url}
                    text={tweet.text}
                    id={tweet.id_str}
                    created={tweet.created_at}
                    favorited={tweet.favorite_count}
                    retweeted={tweet.retweet_count}
                    >
                </Tweet>
            </ListGroupItem>)
        }
    </ListGroup>

Tweets.propTypes = {
    data: React.PropTypes.array.isRequired
}

export default Tweets
