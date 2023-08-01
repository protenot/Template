module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest/globals": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint", "jest", "import"
    ],
    "rules": {
        
        "@typescript-eslint/no-base-to-string": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-throw-literal": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/restrict-plus-operands": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-var-requires": "off",
        "import/prefer-default-export": "off",
        "import/no-unresolved": "off",
        "no-undef":"off",
        "import/extensions": ["warn", "never"],
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
         
    }
}
