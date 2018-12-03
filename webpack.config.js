const isDebug = !process.argv.includes("--release");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	mode: isDebug ? "development" : "production",

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json"]
	},

	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

			// All css files will become packed in by 'css-loader'.
			{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
		]
	},

	entry: "./index.tsx",

	output: {
		libraryTarget: "this",
		filename: "index.js",
		path: __dirname + "/"
	},

	optimization: isDebug ? {
		//Debug optimizations
	} : {
		// Release optimizations
		minimizer: [new UglifyJsPlugin({
			sourceMap: true,
			parallel: true,
			uglifyOptions: {
				warnings: false,
				parse: {},
				compress: {},
				mangle: true, // Note `mangle.properties` is `false` by default.
				output: null,
				toplevel: false,
				nameCache: null,
				ie8: false,
				keep_fnames: false,
			}
		})]
	}
}
