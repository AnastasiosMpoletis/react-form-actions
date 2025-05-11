// .eslintrc.cjs
module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        es2021: true,
    },
    plugins: ["react", "react-hooks"],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
    ],
    rules: {
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off"
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};