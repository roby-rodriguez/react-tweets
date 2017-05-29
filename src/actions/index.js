import fetch from 'isomorphic-fetch'

export const LOGIN_USER             = 'LOGIN_USER'
export const QUERY_TWEETS_REQUEST   = 'QUERY_TWEETS_REQUEST'
export const QUERY_TWEETS_RESPONSE  = 'QUERY_TWEETS_RESPONSE'
export const STREAM_TWEETS_START    = 'STREAM_TWEETS_START'
export const STREAM_TWEETS_RECEIVED = 'STREAM_TWEETS_RECEIVED'
export const STREAM_TWEETS_ERROR    = 'STREAM_TWEETS_ERROR'
export const STREAM_TWEETS_STOP     = 'STREAM_TWEETS_STOP'

function login(user) {
    return {
        type: LOGIN_USER,
        payload: user
    }
}

function queryRequest() {
    return {
        type: QUERY_TWEETS_REQUEST,
        isFetching: true
    }
}

function queryResponse(tweets) {
    return {
        type: QUERY_TWEETS_RESPONSE,
        payload: tweets,
        isFetching: false
    }
}

export const startStream = () => {
    return {
        type: STREAM_TWEETS_START,
        isFetching: true
    }
}

export const tweetReceived = tweet => {
    return {
        type: STREAM_TWEETS_RECEIVED,
        payload: tweet
    }
}

export const streamError = reason => {
    return {
        type: STREAM_TWEETS_ERROR,
        payload: reason
    }
}

export const stopStream = () => {
    return {
        type: STREAM_TWEETS_STOP,
        isFetching: false
    }
}

export const loginUser = dispatch => {
    return fetch('/auth/user', {
        method: 'GET',
        credentials: 'same-origin'
    })
    .then(response => response.json())
    // instead of this.setState inside the component, we now do
    .then(json => dispatch(login(json)))
}

export const logoutUser = dispatch => {
    return fetch('/logout', {
        method: 'GET',
        credentials: 'same-origin'
    })
    .then(() => dispatch(login()))
}

export const searchTweets = search => (dispatch, state) => {
    dispatch(queryRequest())
    return fetch(`/auth/api/search?resultType=${search.resultType}&query=${search.query}` + 
        `&language=${search.language}&until=${search.until}`, {
        method: 'GET',
        credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(json => dispatch(queryResponse(json.data)))
}
