import twitter from './twitterAPI'
import controller from './controller/flowController'
import CONSTANTS from './twitterAPI'

module.exports = function(app) {
    app.get("/request-token", (req, res) => {
        controller
            .requestTokenFlow(req.params)
            .then(user => {
                res.redirect(CONSTANTS.TWITTER_TOKEN_URL + user.requestToken);
            }).catch((err) => {
                res.status(500).send(err)
            })
    })

    app.get("/access-token", (req, res) => {
        controller
            .requestAccessTokenFlow(req.params)
            .then(user => {
                res.send(user);
            }).catch((err) => {
                res.status(500).send(err)
            })
    })
}