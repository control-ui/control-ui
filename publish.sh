#!/bin/bash

echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >.npmrc

echo "Token length: ${#NPM_TOKEN}"

cd ./packages

cd control-app
cp package.json build/ && cp package-lock.json build/ && cp README.md build/ && cp LICENSE build/
cd ../

cd control-docs
cp package.json build/ && cp package-lock.json build/ && cp README.md build/ && cp LICENSE build/
cd ../

cd control-docs-ts
cp package.json build/ && cp package-lock.json build/ && cp README.md build/ && cp LICENSE build/
cd ../

cd control-kit
cp package.json build/ && cp package-lock.json build/ && cp README.md build/ && cp LICENSE build/
cd ../

cd control-md
cp package.json build/ && cp package-lock.json build/ && cp README.md build/ && cp LICENSE build/
cd ../

cd control-routes
cp package.json build/ && cp package-lock.json build/ && cp README.md build/ && cp LICENSE build/
cd ../

cd ../

# npm run release
npm run release -- --yes

rm .npmrc
