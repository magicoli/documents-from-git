const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

// Configuration object.
const config = {
	...defaultConfig,
	entry: {
        // As in w4os...
        // '../includes/admin/admin': './src/admin/index.js',
		// '../includes/admin/settings-models': './src/admin/models.js',

        // Copilot suggestion
		// 'admin': './src/admin/index.js',
		// 'settings-models': './src/admin/models.js',
	},
	output: {
		filename: '[name].js',
		// Specify the path to the JS files.
		path: path.resolve(__dirname, 'build'),
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: 'src/**/*.css', to: '[name].css' },
			],
		}),
	],
};

// Export the config object.
module.exports = config;
