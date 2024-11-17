import type { Config } from '@jest/types'

const packages = ['control-app', 'control-kit', 'control-docs', 'control-docs', 'control-md', 'control-routes']

const testMatches: string[] = []

packages.forEach(pkg => {
    testMatches.push(...[
        '<rootDir>/' + pkg + '/src/**/*.(test|spec).(js|ts)',
        '<rootDir>/' + pkg + '/tests/**/*.(test|spec).(js|ts)',
    ])
})

const base: Partial<Config.InitialOptions> = {
    transformIgnorePatterns: [
        'node_modules/?!(@control-ui)',
    ],
    moduleNameMapper: {
        '^@control-ui/kit(.*)$': '<rootDir>/control/src$1',
    },
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node',
    ],
    coveragePathIgnorePatterns: [
        '(tests/.*.mock).(jsx?|tsx?|ts?|js?)$',
        '.*.(test|spec).(js|ts|tsx)$',
        '<rootDir>/packages/_docs-control',
        '<rootDir>/packages/.+/demo',
    ],
    testPathIgnorePatterns: [
        '<rootDir>/dist',
        '<rootDir>/packages/.+/build',
    ],
    watchPathIgnorePatterns: [
        '<rootDir>/.idea',
        '<rootDir>/.git',
        '<rootDir>/dist',
        '<rootDir>/node_modules',
        '<rootDir>/packages/.+/node_modules',
        '<rootDir>/packages/.+/build',
    ],
    modulePathIgnorePatterns: [
        '<rootDir>/dist',
        '<rootDir>/packages/.+/build',
    ],
}

const config: Config.InitialOptions = {
    collectCoverage: true,
    verbose: true,
    ...base,
    projects: [
        {
            displayName: 'test',
            ...base,
            testMatch: testMatches,
        },
    ],
    coverageDirectory: '<rootDir>/coverage',
}

export default config
