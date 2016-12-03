import twitter from './twitter'

module.exports = function (passport) {

    passport.serializeUser((user, done) => {
        console.log("serialize user: ")
        console.log(user)
        return done(null, user)
    })

    passport.deserializeUser((user, done) => {
        console.log("deserialize user: ")
        console.log(user)
        return done(null, user)
    })

    twitter(passport)
}
