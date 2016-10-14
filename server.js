/* eslint no-console: 0 */

import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './src/routers/routes'
import config from './webpack.config'
import apiRoutes from './app/apiRoutes'

const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 1337 : process.env.PORT
const address = isDeveloping ? 'localhost' : process.env.IP

const app = express()
apiRoutes(app)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src'));

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
    // res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
    // res.end()
      match({routes, location: req.url}, (err, redirectLocation, renderProps) => {

            //console.log("URL: " + req.url)
            //console.log("File: " + middleware.fileSystem.readFileSync(path.join(__dirname, '/dist/react-tweets.js')))
            // console.log("File: " + middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/main.js')))
            // in case of error display the error message
            if (err)
              return res.status(500).send(err.message)

            // in case of redirect propagate the redirect to the browser
            if (redirectLocation)
              return res.redirect(302, redirectLocation.pathname + redirectLocation.search)

            // generate the React markup for the current route
            let markup;
            if (renderProps) {
              // if the current route matched we have renderProps
              markup = renderToString(<RouterContext {...renderProps}/>)
            } else {
              // otherwise we can render a 404 page
              markup = renderToString(<NotFoundPage/>)
              res.status(404)
            }

            // render the index template with the embedded React markup
            return res.render('index', { markup })
          }
      )})
  } else {
    app.use(express.static(__dirname + '/dist'))
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist/index.html'))
    })
}

app.listen(port, address, err => {
  if (err) console.error(err)
  console.info('Magic happens on %s:%s...', address, port)
})
