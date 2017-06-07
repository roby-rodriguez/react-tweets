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
            const search = Util.getStreamQuery(query)
            stream = TwitterAPI.stream('statuses/filter', search)
            stream.on('data', tweet => {
                console.log("Event tweet: ")
                console.log(tweet)
                socket.emit('stream:tweet', tweet)
            })
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
            if (stream) stream.stop()
        })

        socket.on('disconnect', () => {
            if (stream) stream.stop()
        })
    }
}
