#!/bin/bash

# echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >.npmrc

# echo "Token length: ${#NPM_TOKEN}"

# todo: not manual resetting the file here
#git checkout -- packages/webpackPartialConfig.js

cd ./packages

cd control-app
cp package.json build/ && cp package-lock.json build/ && cp README.md build/ && cp LICENSE build/
cd ../

cd control-docs
cp package.json build/ && cp package-lock.json build/ && cp README.md build/ && cp LICENSE build/
cd ../

cd control-kit
cp package.json build/ && cp package-lock.json build/ && cp README.md build/ && cp LICENSE build/
cd ../

cd ../

# npm run release
# npm run release -- --yes

# rm .npmrc
