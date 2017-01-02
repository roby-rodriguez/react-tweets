import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const avatar = user => {
    if (user === undefined)
        return null
    return (
        <div>
            <Link to="/login" className="pull-right btn btn-primary btn-outline btn-rounded rtw-header-logout">Logout</Link>
            <a href={"https://twitter.com/" + user.username}>
                <img className="user-avatar-smaller" src={user.avatar} alt="" />
            </a>
        </div>
    )
}

let HeadNavigation = props =>
    <div>
        { avatar(props.user) }
        {
            props.links.map(link =>
                <Link to={"/dashboard/" + link.location} className="pull-right btn btn-primary btn-outline btn-rounded" key={link.location}>
                    {link.title}
                </Link>
            )
        }
        <h2>{props.title} <small>{props.description}</small></h2>
    </div>

HeadNavigation.propTypes = {
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    links: React.PropTypes.array
}

// fetch user from
HeadNavigation = connect(
    state => ({
        user: state.login.user
    })
)(HeadNavigation)

export { HeadNavigation }
