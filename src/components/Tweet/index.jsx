import React, { PropTypes } from 'react'
import { parseTwitterDate } from "../../utils"

const Tweet = props =>
    <div className="tweet-content">
        <div className="tweet-header">
            <a href={"https://twitter.com/" + props.userName}>
                <img className="user-avatar-small" src={props.avatarUrl} alt="" />
                <strong className="fullname">{props.displayName}</strong>
                <span className="username">@{props.userName}</span>
            </a>
            <span className="tweet-time">{parseTwitterDate(props.created)}</span>
        </div>
        <a href={"https://twitter.com/" + props.userName + "/status/" + props.id}>
            <p className="tweet-text">{props.text}</p>
        </a>
        <div className="tweet-footer">
            <i className="fa fa-thumbs-up" aria-hidden="true">{props.favorited}</i>
            <i className="fa fa-retweet" aria-hidden="true">{props.retweeted}</i>
        </div>
    </div>

Tweet.propTypes = {
    text: React.PropTypes.string.isRequired
}

export { Tweet }
