let env
if (process.env.C9_PROJECT)
    env = require('./remote.json')
else
    env = require('./local.json')
const auth = require('./auth.json')
const shared = require('./shared.json')
module.exports = Object.assign({}, env, auth, shared)
