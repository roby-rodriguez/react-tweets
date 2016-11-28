import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

export default class Tweets extends Component {
    render() {
        return (
            <ListGroup>
                <ListGroupItem>Tweet 1</ListGroupItem>
                <ListGroupItem>Tweet 2</ListGroupItem>
                <ListGroupItem>...</ListGroupItem>
            </ListGroup>
        )
    }
}
