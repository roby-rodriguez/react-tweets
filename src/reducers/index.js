import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import { LOGIN_USER, QUERY_TWEETS_REQUEST, QUERY_TWEETS_RESPONSE } from "../actions"

/**
 * Login reducer
 *
 * @param state
 * @param action
 * @returns {*}
 */
const login = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return Object.assign({}, state, {
                user: action.payload
            })
        default:
            return state
    }
}

/**
 * Query reducer
 *
 * @param state
 * @param action
 * @returns {*}
 */
const query = (state = {
    tweets: [],
    isFetching: false
}, action) => {
    // TODO add pagination
    // check out search_metadata from payload
    switch (action.type) {
        case QUERY_TWEETS_REQUEST:
            return Object.assign({}, state, {
                tweets: [],
                isFetching: true
            })
        case QUERY_TWEETS_RESPONSE:
            return Object.assign({}, state, {
                tweets: [...action.payload.statuses],
                isFetching: false
            })
            return
        default:
            return state
    }
}

// as the state gets more complex, the reducer functions are split into files
// and imported here, the only thing that should stay here is the following export
const rootReducer = combineReducers({
    login,
    query,
    routing,
    form
})

export default rootReducer
