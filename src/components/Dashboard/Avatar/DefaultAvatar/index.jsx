import React, { Component } from 'react'
import userImage from "../../../../twitter.png"

export default class Avatar extends Component {
  render() {
    return (
      <div>
        <img src={userImage} className="user-avatar" /><br />
      </div>
    )
  }
}
