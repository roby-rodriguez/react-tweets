import twitterAPI from "twitter"
import User from '../model/user'
import appConfig from '../config'
import Util from '../util'

module.exports = {
    search (req, res) {
        User.findById(req.session.passport.user._id)
            .then(user => {
                const { access_token, access_token_secret } = user
                const TwitterAPI = new twitterAPI({ ...appConfig, access_token_key: access_token, access_token_secret })
                const search = Util.getQuery(req.query)
                return TwitterAPI.get('search/tweets', search)
            })
            .then(({ statuses }) => res
                .status(200)
                .json(statuses.map(tweet => ({
                    id: tweet.id_str,
                    userName: tweet.user.screen_name,
                    displayName: tweet.user.name,
                    avatarUrl: tweet.user.profile_image_url,
                    created: tweet.created_at,
                    text: tweet.text,
                    favorited: tweet.favorite_count,
                    retweeted: tweet.retweet_count,
                })))
                .end()
            , err => res
                .status(500)
                .json({
                    error: err
                })
                .end()
            )
    }
}
