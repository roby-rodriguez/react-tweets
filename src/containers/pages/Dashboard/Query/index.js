import { connect } from 'react-redux'
import { searchTweets } from "../../../../actions"
import QueryComponent from "../../../../components/Dashboard/Query"

const mapStateToProps = state => ({
  tweets: state.tweets
})

const mapDispatchToProps = dispatch => ({
  fetchTweets: queryObj => { dispatch(searchTweets(queryObj)) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryComponent)
