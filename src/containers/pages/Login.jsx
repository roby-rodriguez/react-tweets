import React from 'react';
import Router from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import { History } from 'history';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from "jQuery";
import defaultImage from "../../twitter.png";

export default class LoginPage extends React.Component {

  getInitialState() {
    return {
      loginID: '',
      password: '',
      isSubmitted: false
    };
  }

  // mixins: [History],

  render() {
    return(
        <div className="login-page ng-scope ui-view"> 
          <div className="row"> 
            <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4"> 
              <img src={defaultImage} className="user-avatar" />
              <h1>React Tweets <small>A Twitter API utility</small></h1>
              <form role="form" onSubmit={this.handleLogin} className="ng-pristine ng-valid"> 
                <div className="form-content"> 
                  <div className="form-group"> 
                    <input type="text" className="form-control input-underline input-lg" placeholder="Email" /> 
                  </div> 
                  <div className="form-group"> 
                    <input type="password" className="form-control input-underline input-lg" placeholder="Password" /> 
                  </div> 
                </div> 
                <button type="submit" className="btn btn-white btn-outline btn-lg btn-rounded">Login</button> 
              </form> 
            </div> 
          </div> 
        </div>
    );
  }

  setLoginID(e) {
    this.setState({
      loginID: e.target.value,
      loginError: ''
    });
  }

  setPassword(e) {
    this.setState({
      password: e.target.value,
      loginError: ''
    });
  }

  handleLogin(e) {
    e.preventDefault();
    // for history check this out: https://github.com/ReactTraining/react-router/blob/fe9358adc864c556afff6fd472476ab84ce2d7d9/docs/api/History.md#but-im-using-classes
    // this.context.history.pushState(null, '/dashboard/overview');
    // this.transitionTo('dashboard');
    return false;
  }
}