'use strict'
// Template version: 1.2.0
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/demo': {
        // target: 'http://localhost:8088/',        //mock
        // target: 'http://192.168.0.235:8040/',    // 服务器
        // target: 'http://192.168.0.235:8082/', // 郭峰
        target: 'http://192.168.0.98:8082/', // 王洪奔(框架Demo)
        changeOrigin: true
      },
      '/scp-patrolapp': {
        target: 'http://192.168.0.242:30940/', // 开发机
        // target: 'http://172.16.10.116:8083', //王云
        changeOrigin: true
      },
      '/scp-videogatewayapp': {
        target: 'http://192.168.0.242:30940/', // 开发机
        // target: 'http://192.168.0.161:30940/', // 开发机
        changeOrigin: true
      },
      '/devicemgmt': {
        target: 'http://192.168.0.22:8082/', // 王珂(设备管理)
        changeOrigin: true
      },
      '/scp-accesscontrolapp': {
        // target: 'http://localhost:8082/',
        target: 'http://192.168.0.242:30940/',
        changeOrigin: true
      },
      '/scp-parkinglotapp': {
        target: 'http://localhost:8082/',
        // target: 'http://192.168.0.242:30940/',
        changeOrigin: true
      },
      '/scp-businesscommonapp': {
        target: 'http://localhost:9086/',
        changeOrigin: true
      },
      '/scp-mapapp': {
        // target: 'http://172.16.10.87:8082/',
        // target: 'http://192.168.0.242:39035/',
        target: 'http://192.168.0.242:30940/', // 开发机
        changeOrigin: true
      },
      '/mapService': {
        target: 'http://192.168.0.242:39035/', // 陈伟波(地图应用)
        changeOrigin: true
      },
      '/mapapp': {
        target: 'http://192.168.0.242:39035/', // 陈伟波(地图应用) wagger: http://192.168.0.236:9036/
        changeOrigin: true
      },
      '/scp-searchenginecomponent': {
        // target: 'http://172.16.10.84:8082/',    // 王丹（搜索）
        target: 'http://192.168.0.242:30940/',
        changeOrigin: true
      },
      '/scp-broadcastapp': {
        target: 'http://192.168.0.242:30940/',
        changeOrigin: true
      },
      '/scp-videointercomapp': {
        target: 'http://192.168.0.242:39021/',
        changeOrigin: true,
        pathRewrite: {}
      },
      '/call': {
        target: 'http://192.168.0.242:39021/',
        changeOrigin: true,
        pathRewrite: {}
      },
      '/VideointercomAppPcIp': {
        target: 'http://192.168.0.242:39021/',
        changeOrigin: true,
        pathRewrite: {}
      },
      '/scp-mdmapp': {
        target: 'http://172.16.10.37:8182/',
        changeOrigin: true,
        pathRewrite: {}
      }
    },
    // Various Dev Server settings //  172.16.10.32 localhost
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.HOST, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.

    cssSourceMap: false
  },
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    /**
     * SourceMap
     */
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
