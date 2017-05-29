import io from 'socket.io-client'
import { startStream, tweetReceived, streamError, stopStream } from "../actions"

class Socket {
    constructor(store) {
        this.socket = io()
        this.store = store
        this.socket.on('stream:tweet', tweet => this.store.dispatch(tweetReceived(tweet)))
        this.socket.on('stream:error', reason => this.store.dispatch(streamError(reason)))
    }
    start(query) {
        this.store.dispatch(startStream())
        this.socket.emit('stream:start', query)
    }
    end() {
        this.store.dispatch(stopStream())
        this.socket.emit('stream:end')
    }
}

export default Socket
