const isDebug = !process.argv.includes("--release");

module.exports = {
	mode: isDebug ? "development" : "production",

	externals: {
		"react": "react",
		"react-dom": "react-dom",
		"react-bootstrap": "react-bootstrap",
		"socket.io-client": "socket.io-client",
		"axios": "axios"
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json"]
	},

	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.ts[x]?$/,
				loader: "awesome-typescript-loader",
				options: {
					usePrecompiledFiles: true,
					useCache: true
				}
			},

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},

			// All css files will become packed in by 'css-loader'.
			{
				test: /\.css$/,
				use: [ {
					loader: 'style-loader',
					options: {
						hmr: true
					}
				}, {
					loader:'css-loader',
					options: {
						url: true,
						import: true,
						modules: true
					}
				}]
			}
		]
	},

	entry: "./src/index.ts",

	output: {
		libraryTarget: "this",
		filename: "index.js",
		path: __dirname + "/dist/"
	},


	optimization: {
		minimize: !isDebug,
		mergeDuplicateChunks: !isDebug,
		removeEmptyChunks: !isDebug
	}
}
