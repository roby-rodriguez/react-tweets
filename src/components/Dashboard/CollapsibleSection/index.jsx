import React, { Component, PropTypes } from 'react'
import { Grid, Col, Row, Collapse } from 'react-bootstrap'

export default class CollapsibleSection extends Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this)
        this.state = {
            //open: true
        }
    }
    componentWillReceiveProps({ forcedClose, ...props }) {
        if (forcedClose)
            this.setState({ open: false })
    }
    toggle() {
        if (!this.state.open) {
            if (typeof this.props.onOpen === 'function')
                this.props.onOpen()
        } else {
            if (typeof this.props.onClose === 'function')
                this.props.onClose()
        }
        this.setState({ open: !this.state.open })
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
                            onClick={this.toggle}
                            >
                        </a>
                    </Col>
                </Row>
                <Row className="rtw-row">
                    <Col sm={12}>
                        <Collapse in={this.state.open}>
                            <div>
                                {
                                    this.state.open ?
                                        this.props.children :
                                        null
                                }
                            </div>
                        </Collapse>
                    </Col>
                </Row>
            </Grid>
        )
    }
}
