import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Jumbotron, Collapse } from 'react-bootstrap'
import { Enum } from 'enumify'
import nProgress from "../../../decorators/nProgress"
import SearchInput from "../SearchInput"
import Tweets from "../../Tweets"
// not 100% optimal
import { query } from "../../../actions"

/**
 *  TODO refactor this to separate presentational/container components
 */
@nProgress
class Query extends Component {

  static propTypes = {
    fetchTweets: PropTypes.func.isRequired,
    tweets: PropTypes.array
  }

  constructor(...props) {
    super(...props)
    this.state = {
        tweets: []
    }
  }

  // TODO (done) this should be moved to the container (smart component vs this one which should stay dumb)
  handleSearch = values => {
    this.props.fetchTweets(values)
      .then(response => response.json())
      .then(json => this.props.dispatch(query(json.statuses)))
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
                <SearchInput onSubmit={this.handleSearch} />
            </Collapse>

            <Tweets data={this.props.tweets} />
          </Jumbotron>
        </div>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    tweets: state.tweets
  })
)(Query)
