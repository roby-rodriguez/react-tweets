import React from 'react'
import Router, { Link } from 'react-router'
import {Panel, Input, Button} from 'react-bootstrap'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import $ from "jquery"
const defaultImage = "../../twitter.png"

export default class LoginPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loginID: '',
      password: '',
      isSubmitted: false
    }
  }

  render() {
    return(
        <div className="login-page ng-scope ui-view"> 
          <div className="row"> 
            <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4"> 
              <img src={defaultImage} className="user-avatar" />
              <h1>React Tweets <small>A Twitter API utility</small></h1>
              <a href="/login/twitter" className="btn btn-white btn-outline btn-lg btn-rounded">
                <i className="fa fa-twitter"></i> Login with Twitter
              </a>
            </div> 
          </div> 
        </div>
    )
  }

  setLoginID(e) {
    this.setState({
      loginID: e.target.value,
      loginError: ''
    })
  }

  setPassword(e) {
    this.setState({
      password: e.target.value,
      loginError: ''
    })
  }

  handleLogin(e) {
    e.preventDefault()
    // for history check this out: https://github.com/ReactTraining/react-router/blob/fe9358adc864c556afff6fd472476ab84ce2d7d9/docs/api/History.md#but-im-using-classes
    // this.context.history.pushState(null, '/dashboard/overview')
    // this.transitionTo('dashboard')
    return false
  }
}