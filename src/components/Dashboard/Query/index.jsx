import React, { Component, PropTypes } from 'react'
import { Jumbotron } from 'react-bootstrap'
import nProgress from "../../../decorators/nProgress"
import CollapsibleSection from "../CollapsibleSection"
import SearchInput from "../SearchInput"
import Tweets from "../../Tweets"
import { HeadNavigation } from "../HeadNavigation"

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
          <HeadNavigation
              title="Query"
              description="Find tweets"
              links={[
                  { title: "Go to Stream", location: "stream" }
              ]}
              />

          <Jumbotron>
            <h1>Search</h1> Select from among the controls to create an interactive search for tweets:

            <i className="glyphicon glyphicon-search bg-fade"></i>

            <CollapsibleSection title="Criteria" open={!this.state.hideInput}>
              <SearchInput onSubmit={this.handleSearch} />
            </CollapsibleSection>

            <CollapsibleSection title="Results" hidden={this.props.tweets.length === 0} open={this.state.hideInput}>
              <Tweets data={this.props.tweets} />
              <p>
                <a className="btn btn-info btn-lg btn-outline btn-rounded" href="https://dev.twitter.com/rest/reference/get/search/tweets">Learn more</a>
              </p>
            </CollapsibleSection>
          </Jumbotron>
        </div>
    )
  }
}
