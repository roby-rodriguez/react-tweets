import { connect } from 'react-redux'
import { searchTweets } from "../../../../actions"
import QueryComponent from "../../../../components/Dashboard/Query"

const mapStateToProps = state => ({
  tweets: state.tweets
})

// TODO not sure this will work -> check this example:
// https://github.com/reactjs/redux/blob/master/examples/real-world/src/containers/UserPage.js
const mapDispatchToProps = ({
  fetchTweets: searchTweets
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryComponent)
