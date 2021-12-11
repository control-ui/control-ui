const path = require('path')
const {buildExternal, packer} = require('lerna-packer')

packer({
        apps: {
            docs: {
                root: path.resolve(__dirname, 'packages', '_docs-control'),
                template: path.resolve(__dirname, 'packages', '_docs-control/public/index.html'),
                publicPath: path.resolve(__dirname, 'packages', '_docs-control/public'),// dev-server
                port: 9219,
                main: path.resolve(__dirname, 'packages', '_docs-control/src/index.tsx'),
                dist: path.resolve(__dirname, 'dist', 'docs-control'),
                servedPath: '/', // todo: make package.json homepage dependent
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
                externals: {
                    react: buildExternal('react'),
                    'react-dom': buildExternal('react-dom'),
                    '@material-ui/core': buildExternal('@material-ui/core'),
                    '@material-ui/icons': buildExternal('@material-ui/icons'),
                },
            },
            controlDocs: {
                name: '@control-ui/docs',
                root: path.resolve(__dirname, 'packages', 'control-docs'),
                entry: path.resolve(__dirname, 'packages', 'control-docs/src/'),
                externals: {
                    react: buildExternal('react'),
                    'react-dom': buildExternal('react-dom'),
                    'react-markdown': buildExternal('react-markdown'),
                    '@material-ui/core': buildExternal('@material-ui/core'),
                    '@material-ui/icons': buildExternal('@material-ui/icons'),
                    '@control-ui/kit': buildExternal('@control-ui/kit'),
                    '@control-ui/app': buildExternal('@control-ui/app'),
                },
            },
            controlKit: {
                name: '@control-ui/kit',
                root: path.resolve(__dirname, 'packages', 'control-kit'),
                entry: path.resolve(__dirname, 'packages', 'control-kit/src/'),
                externals: {
                    react: buildExternal('react'),
                    'react-dom': buildExternal('react-dom'),
                    '@material-ui/core': buildExternal('@material-ui/core'),
                    '@material-ui/icons': buildExternal('@material-ui/icons'),
                },
            },
            controlLocales: {
                name: '@control-ui/locales',
                root: path.resolve(__dirname, 'packages', 'control-locales'),
                entry: path.resolve(__dirname, 'packages', 'control-locales/src/'),
                externals: {},
            },
        },
    },
    __dirname,
)

