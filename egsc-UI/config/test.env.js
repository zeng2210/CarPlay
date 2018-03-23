'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_URL: '"http://localhost:8088"',
  WEBSOCKET_PATH: '"127.0.0.1:9018/scp-websocketcomponent"'
})
