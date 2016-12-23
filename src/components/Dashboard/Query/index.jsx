import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Jumbotron, FormGroup, InputGroup, FormControl, DropdownButton, MenuItem, Grid, Col, Row, ControlLabel, Collapse } from 'react-bootstrap'
import DatePicker from 'react-bootstrap-date-picker'
import { Enum } from 'enumify'
import nProgress from "../../../decorators/nProgress"
import Tweets from "../../Tweets"
// not 100% optimal
import { query } from "../../../actions"

class ResultType extends Enum {}
ResultType.initEnum(['mixed', 'recent', 'popular'])

/**
 *  TODO refactor this to separate presentational/container components
 */
@nProgress
class Query extends Component {

  static propTypes = {
    query: PropTypes.string,
    resultType: PropTypes.string,
    language: PropTypes.string,
    until: PropTypes.string,
    fetchTweets: PropTypes.func.isRequired,
    tweets: PropTypes.array
  }

  constructor(...props) {
    super(...props)
    this.state = {
        resultType: ResultType.mixed.name,
        tweets: []
    }

    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.handleResultTypeChange = this.handleResultTypeChange.bind(this)
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
    this.handleUntilChange = this.handleUntilChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleQueryChange (evt) {
    this.setState({
      query: evt.target.value
    })
  }

  handleResultTypeChange (evt) {
    this.setState({
      resultType: evt
    })
  }

  handleLanguageChange (evt) {
    this.setState({
      language: evt.target.value
    })
  }

  handleUntilChange (value, formattedValue) {
    this.setState({
      until: formattedValue
    })
  }

  // TODO (done) this should be moved to the container (smart component vs this one which should stay dumb)
  handleSearch () {
    this.props.fetchTweets(this.state)
      .then(response => response.json())
      .then(json => this.props.dispatch(query(json.statuses)))
  }

  render() {
    return (
        <div className="query-page" key="query">
          <Link to="/dashboard/reports" className="pull-right btn btn-primary btn-outline btn-rounded">Reports</Link>
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
              <FormGroup>
                <Grid>
                  <Row className="rtw-row">
                    <Col componentClass={ControlLabel} sm={1}>
                      Query
                    </Col>
                    <Col sm={11}>
                      <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="e.g. &#x22;watching now&#x22; or movie -scary :) or @RobyJRodriguez"
                            value={this.state.query}
                            onChange={this.handleQueryChange}
                            />
                        <DropdownButton
                            id="input-dropdown-result-type"
                            componentClass={InputGroup.Button}
                            title="Result type"
                            eventKey={this.state.resultType}
                            onSelect={this.handleResultTypeChange}
                            >
                            { /* TODO use map values of enum */ }
                          <MenuItem eventKey={ResultType.mixed.name}>
                              <i className={this.state.resultType === ResultType.mixed.name ? "glyphicon glyphicon-ok pull-right" : ""}></i> { ResultType.mixed.name }
                          </MenuItem>
                          <MenuItem eventKey={ResultType.recent.name}>
                              <i className={this.state.resultType === ResultType.recent.name ? "glyphicon glyphicon-ok pull-right" : ""}></i> { ResultType.recent.name }
                          </MenuItem>
                          <MenuItem eventKey={ResultType.popular.name}>
                            <i className={this.state.resultType === ResultType.popular.name ? "glyphicon glyphicon-ok pull-right" : ""}></i> { ResultType.popular.name }
                          </MenuItem>
                        </DropdownButton>
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="rtw-row">
                    <Col componentClass={ControlLabel} sm={1}>
                      Language
                    </Col>
                    <Col sm={11}>
                      <FormControl
                          type="text"
                          placeholder="e.g. en - English or es - Spanish"
                          value={this.state.language}
                          onChange={this.handleLanguageChange}
                          />
                    </Col>
                  </Row>

                  <Row className="rtw-row">
                    <Col componentClass={ControlLabel} sm={1}>
                      Until
                    </Col>
                    <Col sm={11}>
                      <DatePicker
                          dateFormat="YYYY-MM-DD"
                          value={this.state.until}
                          onChange={this.handleUntilChange}
                          />
                    </Col>
                  </Row>

                </Grid>
                <p>
                  <button type="submit" className="btn btn-primary btn-lg btn-outline btn-rounded" onClick={this.handleSearch}>Search</button>
                  <button type="reset" className="btn btn-info btn-lg btn-outline btn-rounded">Clear</button>
                </p>
              </FormGroup>
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
