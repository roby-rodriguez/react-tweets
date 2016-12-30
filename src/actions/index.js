import fetch from 'isomorphic-fetch'

export const LOGIN_USER             = 'LOGIN_USER'
export const QUERY_TWEETS_REQUEST   = 'QUERY_TWEETS_REQUEST'
export const QUERY_TWEETS_RESPONSE  = 'QUERY_TWEETS_RESPONSE'

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

export const loginUser = dispatch => {
    return fetch('/auth/user', {
      method: 'GET',
      credentials: 'same-origin'
    })
      .then(response => response.json())
      // instead of this.setState inside the component, we now do
      .then(json => dispatch(login(json)))
}

export const searchTweets = search => (dispatch, state) => {
    dispatch(queryRequest())
    return fetch(`/auth/api/search?resultType=${search.resultType}&query=${search.query}` + 
        `&language=${search.language}&until=${search.until}`, {
      method: 'GET',
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(json => dispatch(queryResponse(json)))
}
