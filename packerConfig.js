const path = require('path')
const {packer} = require('lerna-packer')

packer({
        apps: {
            docs: {
                root: path.resolve(__dirname, 'packages', '_docs-control'),
                template: path.resolve(__dirname, 'packages', '_docs-control/public/index.html'),
                contentBase: path.resolve(__dirname, 'packages', '_docs-control/public'),// dev-server
                port: 9219,
                main: path.resolve(__dirname, 'packages', '_docs-control/src/index.tsx'),
                dist: path.resolve(__dirname, 'dist', 'docs-control'),
                vendors: [],
            },
        },
        packages: {
            // the keys are the commonjs names that is applied to externals
            // this is the same as `@babel/plugin-transform-modules-commonjs` applies
            controlApp: {
                name: '@control-ui/app',
                root: path.resolve(__dirname, 'packages', 'control-app'),
                entry: path.resolve(__dirname, 'packages', 'control-app/src/'),
            },
            controlDocs: {
                name: '@control-ui/docs',
                root: path.resolve(__dirname, 'packages', 'control-docs'),
                entry: path.resolve(__dirname, 'packages', 'control-docs/src/'),
            },
            controlKit: {
                name: '@control-ui/kit',
                root: path.resolve(__dirname, 'packages', 'control-kit'),
                entry: path.resolve(__dirname, 'packages', 'control-kit/src/'),
            },
            controlLocales: {
                name: '@control-ui/locales',
                root: path.resolve(__dirname, 'packages', 'control-locales'),
                entry: path.resolve(__dirname, 'packages', 'control-locales/src/'),
            },
        },
    },
    __dirname,
)

