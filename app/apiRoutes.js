import passport from 'passport'
import init from './passport/init'
import SearchController from './controller/searchController'

function isAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}

init(passport)

module.exports = function (app) {

    app.get('/login/twitter', passport.authenticate('twitter'))

    app.get('/login/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/dashboard',
        failureRedirect: '/'
    }))

    app.get('/logout', (req, res) => {
        console.log("Logged out")
        req.session.destroy()
        req.logout()
        res.status(200)
        res.end()
    })

    // secure pages
    app.get('/dashboard', isAuthenticated)
    app.get('/dashboard/*', isAuthenticated)

    // secure services
    app.get('/auth/*', isAuthenticated)

    app.get('/auth/api/search', SearchController.search)

    app.get('/auth/user', (req, res) => {
        if (req.session.passport !== undefined)
            res
                .status(200)
                .json(req.session.passport.user)
        else
            res
                .status(401)
        res.end()
    })
}
