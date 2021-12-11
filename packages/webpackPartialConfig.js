
const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@control-ui/app': path.resolve(__dirname, './control-app/src'),
'@control-ui/docs': path.resolve(__dirname, './control-docs/src'),
'@control-ui/kit': path.resolve(__dirname, './control-kit/src'),
'@control-ui/locales': path.resolve(__dirname, './control-locales/src'),

        }
    }
}