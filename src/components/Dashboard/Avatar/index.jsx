import React, { Component } from 'react'
// TODO implement logout
import { Link } from 'react-router'
import UserAvatar from "./UserAvatar"
import DefaultAvatar from "./DefaultAvatar"

export default class Avatar extends Component {
  isAuthenticated() {
    return this.props.user !== undefined
  }
  avatar() {
    if (this.isAuthenticated())
      return <UserAvatar user={this.props.user} />
    return <DefaultAvatar />
  }
  render() {
    return (
      <div className="text-center">
        <h1 className="brand">React Tweets <br /><small>A Twitter API utility</small></h1>
        { this.avatar() }
        <Link to="/login" className="btn btn-white btn-outline btn-rounded btn-sm">Logout</Link>
      </div>
    )
  }
}
