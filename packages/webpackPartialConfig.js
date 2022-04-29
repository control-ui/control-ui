
const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@control-ui/app': path.resolve(__dirname, './control-app/src'),
'@control-ui/docs': path.resolve(__dirname, './control-docs/src'),
'@control-ui/docs-ts': path.resolve(__dirname, './control-docs-ts/src'),
'@control-ui/kit': path.resolve(__dirname, './control-kit/src'),
'@control-ui/routes': path.resolve(__dirname, './control-routes/src'),
'@control-ui/md': path.resolve(__dirname, './control-md/src'),

        }
    }
}