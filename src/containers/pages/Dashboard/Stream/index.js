import { connect } from 'react-redux'
import { tweetProcessed } from "../../../../actions"
import StreamComponent from "../../../../components/Dashboard/Stream"

const mapStateToProps = state => ({
    tweet: state.stream.isFetching ? state.stream.current : null,
    isFetching: state.stream.isFetching
})

const mapDispatchToProps = dispatch => ({
    processTweet: queryObj => { dispatch(tweetProcessed()) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamComponent)
