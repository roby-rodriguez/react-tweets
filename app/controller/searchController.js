import twitterAPI from "node-twitter-api"
import User from '../model/user'
import config from '../config'

const TwitterAPI = new twitterAPI({
    consumerKey: config.auth.consumerKey,
    consumerSecret: config.auth.consumerSecret,
    callback: config.auth.callbackURL
})

module.exports = {
    search (req, res) {
        User.findById(req.params.userId)
            .then(user => {
                // Twitter.prototype.search = function(params, accessToken, accessTokenSecret, callback)
                // TODO maybe you need to promise-ify this
                return TwitterAPI.search({
                    q: req.params.query,
                    lang: req.params.language,
                    result_type: req.params.resultType,
                    until: req.params.until
                }, user.token, user.tokenSecret)
            })
            .then((err, data) => {
                if (err)
                    return res
                        .status(503)
                        .json({
                            error: err
                        })
                        .end()
                else
                    return res
                        .status(200)
                        .json(data)
                        .end()
            })
    }
}
