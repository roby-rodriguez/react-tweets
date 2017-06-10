React Tweets - OAuth-based Twitter-API tool

# App Sections 
The app has two sections

## Query
Build your own query to search for tweets

## Stream
Similar to the previous but you can search for live tweets

# Libraries/APIs/Frameworks
TODO

# Setup for development
Follow these steps:
- first run an `npm install` to get the local dependencies
- make sure to start the application db (mongo) and session db (redis)

## Database
Mongo:
- if first run launch `mongod`, otherwise if driver doesn't start see [troubleshooting](#database-troubleshooting)

Redis:
- just run `redis-server`

## Twitter Apps Console
When switching cloud9/localhost development workspace make sure to change the [callback url](https://dev.twitter.com/web/sign-in/implementing)

# Lessons Learned

## Webpack
Loaded modules/resources are relative to the URL, such that if say you find yourself in a child route
http://localhost:1337/dashboard/overview

then requests from within this component will go to &#42;/dashboard/bla-bla and not to &#42;/bla-bla anymore, which I personally believe right now is fkin retarded you can fix this of course by directing your loaders to generate an absolute path, i.e. &lt;img src="/some-hashcode.png" /&gt; &rarr; see .babelrc loaders as an example

# Troubleshooting

## Database Troubleshooting
If the mongo driver fails on `npm start` then go to your data directory and do the following:
```bash
rm data/mongod.lock
mongod --dbpath data --repair
```

You should then be able to launch the mongo daemon again
