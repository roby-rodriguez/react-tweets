import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import { LOGIN_USER, QUERY_TWEETS_REQUEST, QUERY_TWEETS_RESPONSE, STREAM_TWEETS_START, 
    STREAM_TWEETS_RECEIVED, STREAM_TWEETS_ERROR, STREAM_TWEETS_STOP
} from "../actions"

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

/**
 * Stream reducer
 *
 * @param state
 * @param action
 * @returns {*}
 */
const stream = (state = {
    tweets: [],
    isFetching: false
}, action) => {
    switch (action.type) {
        case STREAM_TWEETS_START:
            return Object.assign({}, state, {
                tweets: [],
                isFetching: true
            })
        case STREAM_TWEETS_STOP:
            return Object.assign({}, state, {
                error: action.payload,
                isFetching: false
            })
        case STREAM_TWEETS_ERROR:
            return Object.assign({}, state, {
                error: action.payload,
                isFetching: false
            })
        case STREAM_TWEETS_RECEIVED:
            return Object.assign({}, state, {
                tweets: [...action.payload.tweet]
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
    stream,
    routing,
    form
})

export default rootReducer
