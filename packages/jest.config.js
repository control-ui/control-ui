const packages = ['control'];

const testMatches = []
const testMatchesLint = []

packages.forEach(pkg => {
    testMatches.push(...[
        '<rootDir>/' + pkg + '/src/**/*.(test|spec).(js|ts)',
        '<rootDir>/' + pkg + '/tests/**/*.(test|spec).(js|ts)',
    ])
    testMatchesLint.push(...[
        '<rootDir>/' + pkg + '/src/**/*.(js|ts|tsx)',
        //'<rootDir>/' + pkg + '/src/**/*.(test|spec|d).(js|ts)',
        '<rootDir>/' + pkg + '/tests/**/*.(test|spec|d).(js|ts)',
    ])
})

const base = {
    transformIgnorePatterns: [
        'node_modules/?!(@control-ui)'
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
        'node'
    ],
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        '(tests/.*.mock).(jsx?|tsx?)$'
    ],
    verbose: true,
};

module.exports = {
    ...base,
    projects: [
        {
            displayName: 'test',
            ...base,
            testMatch: testMatches,
        },
        {
            displayName: 'lint',
            runner: 'jest-runner-eslint',
            ...base,
            testMatch: testMatchesLint,
        },
    ],
    coverageDirectory: '<rootDir>/../coverage',
};
