import React, { Component } from 'react'
import defaultImage from "../../twitter.png"

export default class LoginPage extends Component {

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
}
