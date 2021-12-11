<p align="center">
  <a href="https://control-ui.bemit.codes" rel="noopener noreferrer" target="_blank"><img width="150" src="https://control-ui.bemit.codes/logo.svg" alt="Control-UI Logo"></a>
</p>

<h1 align="center">Control-UI</h1>
<h2 align="center">React Components and Boilerplate for Web-Apps</h2>

- `@control-ui/kit` [![npm (scoped)](https://img.shields.io/npm/v/@control-ui/kit?style=flat-square)](https://www.npmjs.com/package/@control-ui/kit) component library built upon material-ui
- `@control-ui/app` [![npm (scoped)](https://img.shields.io/npm/v/@control-ui/app?style=flat-square)](https://www.npmjs.com/package/@control-ui/app) for translation, routing and layout
- `@control-ui/docs` [![npm (scoped)](https://img.shields.io/npm/v/@control-ui/docs?style=flat-square)](https://www.npmjs.com/package/@control-ui/docs) components for documentation apps

todo:
- `@control-ui/locales` [![npm (scoped)](https://img.shields.io/npm/v/@control-ui/locales?style=flat-square)](https://www.npmjs.com/package/@control-ui/locales) global multi purpose translations dictionary

## Web-App

[![Run on CodeSandbox](https://img.shields.io/badge/run%20on%20CodeSandbox-blue?labelColor=fff&logoColor=505050&style=for-the-badge&logo=codesandbox)](https://codesandbox.io/s/github/control-ui/demo-app-cra/tree/master/?module=%2Fsrc%2Froutes.js)

[![Clone on Repl.it](https://img.shields.io/badge/repl.it%20Clone-grey?labelColor=fff&style=for-the-badge&logo=repl.it)](https://repl.it/github/control-ui/demo-app-cra)

## Documentation App

## Contributing

1. Fork/Clone Repository
2. Install root dev-dependencies (like lerna, webpack): `npm i`
3. Start dev-server: `npm start` (will clean-dist + symlink-es-modules + init & hoist packages + starting demo app)

- `npm start -- controlUIDocs`
- `npm run serve`
- `npm run serve -- controlUIDocs`

Commands:
- Build: `npm run build`
- Clean node_modules and build dirs: `npm run clean`
- Clean build dirs: `npm run clean-dist`
- Add new node_module to one package: `lerna add <npm-package-name> --scope=@control-ui/demo [--dev] [--peer]`, without `--scope` in all packages
- Do not change package.json of packages manually, and if Bootstrap [lerna](https://lerna.js.org/): `npm run bootstrap`
- Add new package `lerna create <name>` and follow on screen, e.g.: `lerna create material-pickers` add package name `@control-ui/material-picker`, creates folder `./packages/material-pickers`

Publish, for main-repo only:

1. Currently manually:
    1. `npm run build`
    2. `./publish.sh` or `bash ./publish.sh`
    3. `lerna publish from-package --contents build --no-git-reset`
    - all in one for M.B.: `npm run bootstrap && npm run build && wsl ./publish.sh && lerna publish from-package --contents build --no-git-reset`
2. Then tag the commit with the same version
3. No CI publishing is enabled atm.

## License

This project is free software distributed under the **MIT License**.

See: [LICENSE](LICENSE).

© 2021 bemit UG (haftungsbeschränkt)

### License Icons

The icons in the badges of the readme's are either from [simpleicons](https://simpleicons.org) or are licensed otherwise:

- [Play Icon © Chanut is Industries, CC BY 3.0](https://www.iconfinder.com/icons/928430/go_media_music_play_playing_start_icon) 
- [Experiment Icon © Ardiansyah Ardi, CC BY 3.0](https://www.iconfinder.com/icons/4951169/chemical_experiment_glass_lab_medical_icon) 
- [Doc Icons © PICOL, CC BY 3.0](https://www.iconfinder.com/iconsets/picol-vector) 

### Contributors

By committing your code/creating a pull request to this repository you agree to release the code under the MIT License attached to the repository.

***

Created by [Michael Becker](https://mlbr.xyz)
