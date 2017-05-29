import twitterAPI from "twit"
import User from '../model/user'
import appConfig from '../config'
import Util from '../util'

module.exports = {
    search (req, res) {
        User.findById(req.session.passport.user._id)
            .then(user => {
                const { access_token, access_token_secret } = user
                const TwitterAPI = new twitterAPI({ ...appConfig, access_token, access_token_secret })
                const search = Util.getQuery(req.query)
                return TwitterAPI.get('search/tweets', search)
            })
            .then(tweets => {
                return res
                    .status(200)
                    .json(tweets)
                    .end()
            }, err => {
                console.warn(err)
                return res
                    .status(500)
                    .json({
                        error: err
                    })
                    .end()
            })
    }
}
