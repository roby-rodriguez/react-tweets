import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { LOGIN_USER, QUERY_TWEETS } from "../actions"

const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return action.payload
        default:
            return state
    }
}

const queryReducer = (state = [], action) => {
    // TODO add pagination
    // check out search_metadata from payload
    switch (action.type) {
        case QUERY_TWEETS:
            return [...action.payload.statuses]
        default:
            return state
    }
}

// as the state gets more complex, the reducer functions are split into files
// and imported here, the only thing that should stay here is the following export
const rootReducer = combineReducers({
    user: loginReducer,
    tweets: queryReducer,
    routing: routerReducer,
    form: formReducer
})

export default rootReducer
