import passport from 'passport'
import init from './passport/init'
import SearchController from './controller/searchController'

function isAuthenticated (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/')
}

init(passport)

module.exports = function (app) {

    app.get('/login/twitter', passport.authenticate('twitter'))

    app.get('/login/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/home',
        failureRedirect: '/'
    }), (req, res) => {
        res.json(req.user)
    })

    app.get('/auth/api/search/:query', SearchController.search)

    app.get('/auth/*', isAuthenticated)
}
