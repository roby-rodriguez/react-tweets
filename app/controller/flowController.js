import twitter from '../twitterAPI'
import User from '../model/user'

module.exports = {

    requestTokenFlow(email) {
        let user = null
        return User
            .find(email)
            .then(found => {
                user = found
                return twitter.getRequestToken()
            })
            .then((token, secret) => {
                // TODO check if you can use destructuring to up your stylez ya digg
                user.requestToken = token
                user.requestSecret = secret
                return user.save()
            })
    },

    requestAccessTokenFlow({ email, requestToken, verifier }) {
        let user = null
        return User
            .find(email)
            .then(found => {
                user = found
                return twitter.getAccessToken(user.requestToken, user.requestSecret, verifier)
            })
            .then((accessToken, accessSecret) => {
                return twitter.verifyCredentials(accessToken, accessSecret)
            })
    }
}