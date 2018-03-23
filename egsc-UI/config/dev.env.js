'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost:8088"',
  DeviceManagement_API_URL: '"http://localhost:8080"',
  WEBSOCKET_PATH: '"127.0.0.1:9018/scp-websocketcomponent"'
})
