import React, { PropTypes } from 'react'
import { parseTwitterDate } from "../../utils"

const Tweet = ({ data }) =>
    <div className="tweet-content">
        <div className="tweet-header">
            <a href={"https://twitter.com/" + data.userName}>
                <img className="user-avatar-small" src={data.avatarUrl} alt="" />
                <strong className="fullname">{data.displayName}</strong>
                <span className="username">@{data.userName}</span>
            </a>
            <span className="tweet-time">{parseTwitterDate(data.created)}</span>
        </div>
        <a href={"https://twitter.com/" + data.userName + "/status/" + data.id}>
            <p className="tweet-text">{data.text}</p>
        </a>
        <div className="tweet-footer">
            <i className="fa fa-thumbs-up" aria-hidden="true">{data.favorited}</i>
            <i className="fa fa-retweet" aria-hidden="true">{data.retweeted}</i>
        </div>
    </div>

Tweet.propTypes = {
    data: PropTypes.object.isRequired
}

export { Tweet }
