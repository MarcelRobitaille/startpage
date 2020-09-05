module.exports = {
	extends: 'eslint:recommended',
	env: { browser: true, node: true, es6: true },
	parserOptions: {
		sourceType: 'module',
	},
	rules: {
		'indent': [
			'error',
			'tab',
			{ SwitchCase: 1 }
		],
		'linebreak-style': [
			'error',
			'unix',
		],
		'eol-last': [
			'error',
			'always',
		],
		'no-multiple-empty-lines': [
			2,
			{ 'max': 2, 'maxEOF': 0 },
		],
		'quotes': [
			'error',
			'single',
		],
		'jsx-quotes': [
			'error',
			'prefer-double',
		],
		'semi': [
			'error',
			'never',
		],
		'max-len': [
			'error',
			{ code: 80, tabWidth: 2 }
		],
		'no-trailing-spaces': 'error',
		'key-spacing': [
			'error',
			{ beforeColon: false, afterColon: true },
		],
		'no-console': 'off',
		'react/no-find-dom-node': 'off',
	},
}
