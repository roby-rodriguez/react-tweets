import { connect } from 'react-redux'
import { loginUser } from "../../../actions"
import DashboardComponent from "../../../components/Dashboard"

const mapStateToProps = state => ({
    user: state.payload
})

const mapDispatchToProps = dispatch => ({
    fetchUser: loginUser
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardComponent)
