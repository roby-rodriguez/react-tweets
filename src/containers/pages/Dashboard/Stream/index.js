import { connect } from 'react-redux'
import { streamTweets } from "../../../../actions"
import StreamComponent from "../../../../components/Dashboard/Stream"

const mapStateToProps = state => ({
    tweets: state.stream.tweets,
    isFetching: state.stream.isFetching
})

export default connect(
    mapStateToProps,
)(StreamComponent)
