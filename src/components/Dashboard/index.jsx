import React, { PropTypes, Component, cloneElement } from 'react';
import Router, { Link, RouteHandler } from "react-router";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem, ProgressBar } from "react-bootstrap";
import $ from "jQuery";
import classNames from "classnames";
import userImage from "../../twitter.png";

export default class HomePage extends Component {
    
  componentWillMount() {
    this.setState({Height: $(window).height()});
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    $(window).unbind('resize',this.adjustResize);
  }

  static getInitialState() {
    return {
      uiElementsCollapsed: true,
      chartsElementsCollapsed: true,
      multiLevelDropdownCollapsed: true,
      thirdLevelDropdownCollapsed: true,
      samplePagesCollapsed: true
    };
  }

  contextTypes: {
    router: PropTypes.func
  }

  render() {

    const { pathname } = this.props.location;

    var title = <span><a href="http://startreact.com/" title="Start React" rel="home"><img src="http://startreact.com/wp-content/themes/dazzling-child/images/logo.png" alt="Start React" title="Start React" height="35px" />&nbsp;SB Admin React - StartReact.com</a></span>;
    
    return (
        <div className="dashboard-page ui-view"> 
          <div className="container-fluid"> 
            <div className="row"> 
              <div className="col-sm-3 col-md-2 sidebar"> 
                <div className="text-center"> 
                  <h2 className="brand">React Tweets <br /><small>A Twitter API utility</small></h2>
                  <img src={userImage} className="user-avatar" />
                  <br /> 
                  <Link to="/login" className="btn btn-white btn-outline btn-rounded btn-sm">Logout</Link> 
                </div> 

                <ul className="nav nav-sidebar"> 
                  <li>
                    <Link to="/dashboard/overview">Overview</Link>
                  </li> 
                  <li>
                    <Link to="/dashboard/reports">Reports</Link>
                  </li>
                  <li>
                    <a href="http://www.strapui.com/ani-reactjs-theme">Bootstrap theme for this site</a>
                  </li>
                </ul> 
              </div>

               <ReactCSSTransitionGroup component="div"
                                 transitionName="ng"
                                 transitionEnterTimeout={500}
                                 transitionLeaveTimeout={300}
                >
                  { cloneElement(<div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main ng-scope ui-view">{this.props.children}</div> || <div />, { key: pathname }) }
                </ReactCSSTransitionGroup>
                
            </div> 
          </div> 
        </div>
    );
  }
}
