import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Jumbotron } from 'react-bootstrap'
import nProgress from "../../../decorators/nProgress"
import CollapsibleSection from "../CollapsibleSection"
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
    // hide input section
    this.setState({ hideInput: true })
  }

  render() {
    return (
        <div className="query-page" key="query">
          <Link to="/dashboard/stream" className="pull-right btn btn-primary btn-outline btn-rounded">Go to Stream</Link>
          <h2>Query <small>Find tweets</small></h2>
          <Jumbotron>
            <h1>Search</h1> Select from among the controls to create an interactive search for tweets:

            <i className="glyphicon glyphicon-search bg-fade"></i>

            <CollapsibleSection title="Criteria" forcedClose={this.state.hideInput}>
              <SearchInput onSubmit={this.handleSearch} />
            </CollapsibleSection>

            <CollapsibleSection title="Results" hidden={this.props.tweets.length === 0}>
              <Tweets data={this.props.tweets} />
            </CollapsibleSection>
          </Jumbotron>
        </div>
    )
  }
}
