import { connect } from 'react-redux'
import { loginUser, logoutUser } from "../../../actions"
import DashboardComponent from "../../../components/Dashboard"

const mapStateToProps = state => ({
    user: state.login.user
})

const mapDispatchToProps = dispatch => ({
    fetchUser: () => { dispatch(loginUser) },
    logout: () => { dispatch(logoutUser) }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardComponent)
