const packages = ['control-app', 'control-kit', 'control-docs', 'control-docs', 'control-md', 'control-routes']

const testMatches = []

packages.forEach(pkg => {
    testMatches.push(...[
        '<rootDir>/' + pkg + '/src/**/*.(test|spec).(js|ts)',
        '<rootDir>/' + pkg + '/tests/**/*.(test|spec).(js|ts)',
    ])
})

const base = {
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
        '(tests/.*.mock).(jsx?|tsx?)$',
    ],
}

module.exports = {
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
    coverageDirectory: '<rootDir>/../coverage',
}
