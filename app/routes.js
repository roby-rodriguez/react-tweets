import passport from 'passport'
import init from './passport/init'
//import twitter from './twitterAPI'
//import controller from './controller/flowController'
//import CONSTANTS from './twitterAPI'

function isAuthenticated (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/')
}

/*
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
*/

init(passport)

module.exports = function (app) {

    app.get('/login/twitter', passport.authenticate('twitter'))

    app.get('/login/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/home',
        failureRedirect: '/'
    }))

    app.get('/auth/*', isAuthenticated)
}
