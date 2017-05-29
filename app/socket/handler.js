import twitterAPI from "twit"
import User from '../model/user'
import appConfig from '../config'
import Util from '../util'

module.exports = function(io) {
    return function(socket) {
        
        socket.on('connection', socket => {
            const userId = socket.request.session.passport.user._id
            let TwitterAPI, stream

            if (socket.request.session.stream !== 'undefined') {
                User.findById(userId)
                    .then(user => {
                        const { access_token, access_token_secret } = user
                        TwitterAPI = new twitterAPI({ ...appConfig, access_token, access_token_secret })
                    }, err => {
                        socket.emit('stream:error', err)
                    })
            }
            
            socket.on('stream:start', query => {
                const search = Util.getQuery(query)
                stream = TwitterAPI.get('statuses/filter', search)
                console.log(socket.stream)
                stream.on('tweet', tweet => socket.emit('stream:tweet', tweet))
                stream.on('limit', message => socket.emit('stream:error', message))
                stream.on('disconnect', message => socket.emit('stream:error', message))
            })
            
            socket.on('stream:end', () => {
                stream.stop()
            })
            
            socket.on('disconnect', () => {
                stream.stop()
            })
        })
    }
}
