import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

export default class Tweets extends Component {
    static propTypes = {
        data: React.PropTypes.array.isRequired
    }
    
    results() {
        return (
            <div>
                <h2>Results</h2>
                <ListGroup>
                    {
                        this.props.data.map(tweet => {
                            return <ListGroupItem>{tweet.text}</ListGroupItem>
                        })
                    }
                </ListGroup>
                <p>
                  <a className="btn btn-info btn-lg btn-outline btn-rounded" href="https://dev.twitter.com/rest/reference/get/search/tweets">Learn more</a>
                </p>
            </div>
        )
    }

    render() {
        return this.props.data.length > 0 ? this.results() : <div/>
    }
}
