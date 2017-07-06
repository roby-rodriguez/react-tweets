/* eslint no-console: 0 */

import path from 'path'
import express from 'express'
import expressSession from 'express-session'
import ejs from 'ejs'
import morgan from 'morgan'
import redis from 'redis'
import passport from 'passport'
import passportSocketIo from 'passport.socketio'
import mongoose from 'mongoose'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import routes from "./src/routers"
import config from "./webpack.config"
import apiRoutes from "./app/apiRoutes"
import configureStore from "./src/store"
import socketHandler from "./app/socket/handler"
import NotFoundPage from "./src/components/NotFoundPage"

const isDeveloping = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 1337
const address = process.env.IP || 'localhost'

const app = express()
const RedisStore = require('connect-redis')(expressSession)
const client = redis.createClient()
const sessionStore = new RedisStore({ client })
const session = expressSession({
  store: sessionStore,
  secret: 'shhsecret',
  resave: false,
  // don't recreate session for every request
  saveUninitialized: false
})
app.use(session)
app.use(passport.initialize())
app.use(passport.session())
app.use(morgan('dev'))

app.engine('ejs', ejs.__express)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src'))
apiRoutes(app)

mongoose.connect('mongodb://localhost/tweets', err => {
  if (err) console.error('Could not start database: ' + err.toString())
  else console.log("Database started at " + new Date())
})

if (isDeveloping) {
  const compiler = webpack(config)
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  app.use(express.static(path.resolve(__dirname, 'dist')))
  app.get('*', (req, res) => {
      match({routes, location: req.url}, (err, redirectLocation, renderProps) => {

            if (err)
              return res.status(500).send(err.message)

            // in case of redirect propagate the redirect to the browser
            if (redirectLocation)
              return res.redirect(302, redirectLocation.pathname + redirectLocation.search)

            // generate the React markup for the current route
            let markup, appState
            if (renderProps) {
              // TODO compute preloaded state je nach route
              // FIXME ~/dashboard/stream doesn't load because of ws - fix it
              const preloadedState = {
              }
              let store = configureStore(preloadedState)
              appState = JSON.stringify(store.getState())
              // if the current route matched we have renderProps
              markup = renderToString(
                <Provider store={store}>
                  <RouterContext {...renderProps}/>
                </Provider>
              )
            } else {
              // otherwise we can render a 404 page
              markup = renderToString(<NotFoundPage />)
              res.status(404)
            }
            /// -> Faza e ca din prima nici nu se face request, incarca react direct, de-aia scrie <%- markup -%> pe pagina alba

            // render the index template with the embedded React markup
            return res.render('index', { markup, appState })
          }
      )
  })
}

var server = require('http').createServer(app)
var io = require('socket.io')(server)

io.use(passportSocketIo.authorize({
  secret: 'shhsecret',
  store: sessionStore,
}))

io.on('connection', socket => socketHandler(socket))
server.listen(port, address, err => {
  if (err) console.error(err)
  console.info('Magic happens on %s:%s...', address, port)
})
