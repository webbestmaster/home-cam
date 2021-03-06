const path = require('path');

const {cwd, pathToDist, ssrServerPort, isBuildServer, webpackDevServerPort} = require('./../config');

const host = 'localhost';
// const host = '192.168.147.25';

const mainProxyUrlSetting = {
    // target: `http://${host}:${ssrServerPort}/`,
    target: `http://localhost:8080/`,
    changeOrigin: true, // for this option only: see documentations here https://github.com/chimurai/http-proxy-middleware#http-proxy-middleware-options
};

module.exports.devServer = {
    host,
    port: webpackDevServerPort,
    contentBase: path.join(cwd, pathToDist),
    historyApiFallback: {
        disableDotRule: true,
    },
    writeToDisk: isBuildServer,
    // inline: false,
    // hot: true,
    // hotOnly: false,
    disableHostCheck: true,
    proxy: {
        // '/manifest.json': mainProxyUrlSetting,
        '/post-file': mainProxyUrlSetting,
        '/again': mainProxyUrlSetting,
        // '/upload-file/': mainProxyUrlSetting,
    },
};
