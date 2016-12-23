/* eslint no-console: 0 */

import path from 'path'
import express from 'express'
import session from 'express-session'
import ejs from 'ejs'
import morgan from 'morgan'
import passport from 'passport'
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
import NotFoundPage from "./src/components/NotFoundPage"

// TODO remove this
import { LOGIN_USER } from "./src/actions"

const isDeveloping = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 1337
const address = process.env.IP || 'localhost'

const app = express()
app.use(session({
    secret: 'shhsecret',
    resave: true,
    saveUninitialized: true
}))
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
              let preloadedState = {
                type: LOGIN_USER,
                payload: {}
              }
              let store = configureStore()
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

app.listen(port, address, err => {
  if (err) console.error(err)
  console.info('Magic happens on %s:%s...', address, port)
})
