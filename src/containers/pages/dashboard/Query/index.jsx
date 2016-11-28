import React, { PropTypes, Component } from 'react'
import { Link } from "react-router"
import { Jumbotron, FormGroup, InputGroup, FormControl, Button, DropdownButton, MenuItem, Grid, Col, Row, ControlLabel, Collapse } from 'react-bootstrap'
import DatePicker from "react-bootstrap-date-picker"
import { Enum } from "enumify"
import fetch from "isomorphic-fetch"
import nProgress from '../../../../decorators/nProgress'
import Tweets from '../../../../components/Tweets'

class ResultType extends Enum {}
ResultType.initEnum(['mixed', 'recent', 'popular'])

/**
 *  TODO refactor this to separate presentational/container components
 */
@nProgress
export default class Query extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
        resultType: ResultType.mixed.name
    }

    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.handleResultTypeChange = this.handleResultTypeChange.bind(this)
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
    this.handleUntilChange = this.handleUntilChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleSubmit (evt) {
    evt.preventDefault();
    return fetch(`/auth/api/search/haha`)
      .then(response => console.log(response.json()))
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
                onClick={ ()=> this.setState({ open: !this.state.open })}
                >
            </a>
            <h2>Criteria</h2>
            <Collapse in={!this.state.open}>
              <form onSubmit={this.handleSubmit}>
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
                    <button type="submit" className="btn btn-primary btn-lg btn-outline btn-rounded">Search</button>
                    <button type="reset" className="btn btn-info btn-lg btn-outline btn-rounded">Clear</button>
                  </p>
                </FormGroup>
              </form>
            </Collapse>

            <h2>Results</h2>
            <Tweets />
            <p>
              <a className="btn btn-info btn-lg btn-outline btn-rounded" href="https://dev.twitter.com/rest/reference/get/search/tweets">Learn more</a>
            </p>
          </Jumbotron>
        </div>
    )
  }
}
