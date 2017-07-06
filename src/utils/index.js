let lastId = 0;

export function generateId(prefix='id') {
    lastId++;
    return `${prefix}${lastId}`;
}
export function isClient() {
    return !isServer()
}
export function isServer() {
    return !(typeof window != 'undefined' && window.document)
}
// taken from
// http://stackoverflow.com/questions/6549223/javascript-code-to-display-twitter-created-at-as-xxxx-ago#answer-6549563
// from http://widgets.twimg.com/j/1/widget.js
const isIE = () => navigator.userAgent.match(/MSIE\s([^;]*)/)
export function parseTwitterDate(tdate) {
    var system_date = new Date(Date.parse(tdate));
    var user_date = new Date();
    if (isClient() && isIE()) {
        system_date = Date.parse(tdate.replace(/( \+)/, ' UTC$1'))
    }
    var diff = Math.floor((user_date - system_date) / 1000);
    if (diff <= 1) {return "just now";}
    if (diff < 20) {return diff + " seconds ago";}
    if (diff < 40) {return "half a minute ago";}
    if (diff < 60) {return "less than a minute ago";}
    if (diff <= 90) {return "one minute ago";}
    if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
    if (diff <= 5400) {return "1 hour ago";}
    if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
    if (diff <= 129600) {return "1 day ago";}
    if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
    if (diff <= 777600) {return "1 week ago";}
    return "on " + system_date;
}

export class Sequencer {
	constructor(callback, timeout = 1000) {//500
		this.callback = callback
		this.timeout = timeout
		this._running = true
	}
	start() {
	    this._running = true
		setTimeout(() => {
			this.callback()
			if (this._running)
				this.start()
		}, this.timeout)
	}
	update(newTimeout) {
		this.timeout = newTimeout
	}
	reset() {
	    this.timeout = 500
	}
	stop() {
		this._running = false
	}
}
