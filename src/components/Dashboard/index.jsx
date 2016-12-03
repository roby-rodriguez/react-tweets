import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import fetch from 'isomorphic-fetch'
import Avatar from "./Avatar"

class HomePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }
    
  componentWillMount() {
    fetch('/auth/user', {
      method: 'GET',
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(json => this.setState({
          user: json
        })
      )
  }

  render() {

    return (
        <div className="dashboard-page ui-view"> 
          <div className="container-fluid"> 
            <div className="row"> 
              <div className="col-sm-3 col-md-2 sidebar"> 
                <Avatar user={this.state.user} />

                <ul className="nav nav-sidebar"> 
                  <li>
                    <Link to="/dashboard/query">Query</Link>
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
                  <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main ng-scope ui-view">{this.props.children}</div>
                </ReactCSSTransitionGroup>
                
            </div> 
          </div> 
        </div>
    )
  }
}

export default HomePage
