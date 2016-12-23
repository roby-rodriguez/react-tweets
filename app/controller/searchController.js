import twitterAPI from "node-twitter-api"
import User from '../model/user'
import config from '../config'

const TwitterAPI = new twitterAPI({
    consumerKey: config.auth.consumerKey,
    consumerSecret: config.auth.consumerSecret,
    callback: config.auth.callbackURL
})

const isEmpty = element => element == null || element == '' || element == 'null' || element == 'undefined'

// wrap twitter API call to promise
const searchTweets = (search, token, tokenSecret) => {
    return new Promise((resolve, reject) => {

        TwitterAPI.search(search, token, tokenSecret, (err, data) => {
            if (err)
                reject(err)
            else
                resolve(data)
        })
    })
}

module.exports = {
    search (req, res) {
        User.findById(req.session.passport.user._id)
            .then(user => {
                // Twitter.prototype.search = function(params, accessToken, accessTokenSecret, callback)
                const search = {
                    q: req.query.query,
                    result_type: req.query.resultType
                }
                if (!isEmpty(req.query.language)) search.lang = req.query.language
                if (!isEmpty(req.query.until)) search.until = req.query.until

                return searchTweets(search, user.token, user.tokenSecret)
            })
            .then(tweets => {
                return res
                    .status(200)
                    .json(tweets)
                    .end()
            }, err => {
                return res
                    .status(503)
                    .json({
                        error: err
                    })
                    .end()
            })
    }
}
