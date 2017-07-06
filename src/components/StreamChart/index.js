import React, { Component } from 'react'
import Chart from "./Chart"

export default class StreamChart extends Component {
    static contextTypes = {
        store: React.PropTypes.object
    }
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.chart = new Chart('#stream-chart')
    }
    componentWillReceiveProps({ tweet }) {
        this.chart.stream(tweet)
    }
    render() {
        return (
            <div id="stream-chart" />
        )
    }
}
