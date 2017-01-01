import React, { Component, PropTypes } from 'react'
import { Grid, Col, Row, Collapse } from 'react-bootstrap'

export default class CollapsibleSection extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            open: true
        }
    }
    componentWillReceiveProps() {
        this.setState({ open: !this.props.forcedClose })
    }
    render() {
        if (this.props.hidden)
            return null
        return (
            <Grid>
                <Row className="rtw-row">
                    <Col sm={11}>
                        <h2>{this.props.title}</h2>
                    </Col>
                    <Col sm={1}>
                        <a
                            className={"pull-right btn btn-default btn-lg btn-outline btn-rounded glyphicon " + (this.state.open ? "glyphicon-chevron-up" : "glyphicon-chevron-right")}
                            onClick={() => this.setState({ open: !this.state.open })}
                            >
                        </a>
                    </Col>
                </Row>
                <Row className="rtw-row">
                    <Col sm={12}>
                        <Collapse in={this.state.open}>
                            <div>
                                {this.props.children}
                            </div>
                        </Collapse>
                    </Col>
                </Row>
            </Grid>
        )
    }
}
