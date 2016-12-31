import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Jumbotron, Collapse } from 'react-bootstrap'
import nProgress from "../../../decorators/nProgress"
import SearchInput from "../SearchInput"
import Tweets from "../../Tweets"

@nProgress
export default class Query extends Component {

  static propTypes = {
    fetchTweets: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    tweets: PropTypes.array
  }

  constructor(...props) {
    super(...props)
    this.state = {
    }
  }

  handleSearch = values => {
    this.props.fetchTweets(values)
  }

  render() {
    return (
        <div className="query-page" key="query">
          <Link to="/dashboard/stream" className="pull-right btn btn-primary btn-outline btn-rounded">Stream</Link>
          <h2>Query <small>Find tweets</small></h2>
          <Jumbotron>
            <h1>Search</h1> Select from among the controls to create an interactive search for tweets:

            <a
                className={"pull-right btn btn-default btn-lg btn-outline btn-rounded glyphicon rtw-toggle " + (this.state.open ? "glyphicon-chevron-right" : "glyphicon-chevron-up")}
                onClick={() => this.setState({ open: !this.state.open })}
                >
            </a>
            <h2>Criteria</h2>
            <Collapse in={!this.state.open}>
              <div>
                <SearchInput onSubmit={this.handleSearch} />
              </div>
            </Collapse>

            <Tweets data={this.props.tweets} />
          </Jumbotron>
        </div>
    )
  }
}
