import React, { Component } from 'react'

export default class Avatar extends Component {
  render() {
    return (
      <div className="cl-effect-3">
        <p>
          <a href={"https://twitter.com/" + this.props.user.username}></a>
          <img src={this.props.user.avatar} className="user-avatar" />
        </p>
        <h3>{this.props.user.displayName}</h3>
        <a href={"https://twitter.com/" + this.props.user.username}><small>{"@" + this.props.user.username}</small></a>
      </div>
    )
  }
}
