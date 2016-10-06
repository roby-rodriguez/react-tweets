import Twitter from 'node-twitter-api'

const CONSTANTS = {
    TWITTER_TOKEN_URL: "https://api.twitter.com/oauth/authenticate?oauth_token="
}

const twitter = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

module.exports = CONSTANTS
module.exports = twitter