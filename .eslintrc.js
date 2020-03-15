module.exports = {
    extends: ['airbnb', 'plugin:@typescript-eslint/recommended', "plugin:jest/recommended"],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier', 'jest'],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {},
        },
    },
    env: {
        "jest/globals": true
    },
    rules: {
        "import/no-unresolved": [0],
        "jest/no-disabled-tests": [1],
        "jest/no-focused-tests": [2],
        "jest/no-identical-title": [2],
        "jest/prefer-to-have-length": [1],
        "jest/valid-expect": [2],
        'import/extensions': [0],
        'import/no-extraneous-dependencies': [2, { devDependencies: ['**/test.tsx', '**/test.ts'] }],
        '@typescript-eslint/indent': [2, 2],
    },
};