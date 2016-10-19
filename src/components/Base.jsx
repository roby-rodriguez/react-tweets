import React from "react"
import { Route, DefaultRoute, RouteHandler } from "react-router"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class Base extends React.Component {

  render() {
  	return (
      <div className="ui-view">
        <div className="ui-base">
            <ReactCSSTransitionGroup
                component="div"
                transitionName="ng"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                <div className="ui-view">{this.props.children}</div>
            </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}
