import twitterAPI from "twitter"
import User from '../model/user'
import appConfig from '../config'
import Util from '../util'

module.exports = function(socket) {
    const userId = socket.request && socket.request.user ? socket.request.user._id : undefined

    if (userId) {
        let TwitterAPI, stream

        User.findById(userId)
            .then(user => {
                const { access_token, access_token_secret } = user
                TwitterAPI = new twitterAPI({ ...appConfig, access_token_key: access_token, access_token_secret })
            }, err => {
                socket.emit('stream:error', err)
            })

        socket.on('stream:start', query => {
            const ARRAY_TO_REMOVE = ["Positive", "Neutral", "Negative"]
            const search = Util.getStreamQuery(query)
            stream = TwitterAPI.stream('statuses/filter', search)
            stream.on('data', tweet => socket.emit('stream:tweet', {
                id: tweet.id_str,
                userName: tweet.user.screen_name,
                displayName: tweet.user.name,
                avatarUrl: tweet.user.profile_image_url,
                created: tweet.created_at,
                text: tweet.text,
                favorited: tweet.favorite_count,
                retweeted: tweet.retweet_count,
                // TODO implement - from mashape sentiment-analysis API
                // don't just call the service yet -> return randoms and when it works replace this
                confidence: Math.random() * 100 + '',
                sentiment: ARRAY_TO_REMOVE[Math.floor(Math.random() * 3)],
            }))
            stream.on('limit', message => {
                console.log("Event limit: ")
                console.log(message)
                socket.emit('stream:error', message)
            })
            stream.on('error', message => {
                console.log("Event error: ")
                console.log(message)
                socket.emit('stream:error', message)
            })
            stream.on('disconnect', message => {
                console.log("Event disconnect: ")
                console.log(message)
                socket.emit('stream:error', message)
            })
        })

        socket.on('stream:end', () => {
            if (stream) stream.destroy()
        })

        socket.on('disconnect', () => {
            if (stream) stream.destroy()
        })
    }
}
