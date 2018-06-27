var webpack = require("webpack");
var version = require("./../package.json").version;
var banner = "/**\n" + " * ivtable v" + version + "\n" + " * https://github.com/baoniu/ivtable \n" + " * Released under the MIT License.\n" + " */\n";
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsPlugin = require("stats-webpack-plugin");

var loaders = [
	//{
	//	"test": /\.js?$/,
	//	"exclude": /node_modules/,
	//	"loader": "babel"
	//},
	//{
	//	"test": /\.vue?$/,
	//	"loader": "vue"
	//}
    {
        test: /\.vue$/,
        loader: 'vue'
    },
	{
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
    },
	{
        test: /\.css$/,
        loader: 'style!css!autoprefixer'
    },
	{
        test: /\.less$/,
        loader: 'style!css!less'
    },
	{
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url?limit=8192'
    },
	{
        test: /\.(html|tpl)$/,
        loader: 'vue-html'
    }
];


var cssFileName = "ivtable.css";

module.exports = [
	{
		entry: "./src/index.js",
		output: {
			path: "./dist",
			filename: "ivtable.js",
			//library: "IVTable",	//不注释的话，都是这个名字咯,就有问题
			libraryTarget: "umd"
		},
        externals: {
            vue: {
                root: 'Vue',
                commonjs: 'vue',
                commonjs2: 'vue',
                amd: 'vue'
            }
        },
		plugins: [
			new webpack.DefinePlugin({
				"process.env" : {
					NODE_ENV : JSON.stringify("production")
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			}),
			new webpack.optimize.DedupePlugin(),
			new webpack.BannerPlugin(banner, {
				raw: true
			}),
			new ExtractTextPlugin(cssFileName, { allChunks: true }),
			new StatsPlugin("../stats.json", {
				chunkModules: true
				//exclude: [/node_modules[\\\/]react/]
			})
		],

		module: {
			loaders
		},

		vue: {
			loaders: {
				css: ExtractTextPlugin.extract("css"),
				postcss: ExtractTextPlugin.extract("css"),
				sass: ExtractTextPlugin.extract("css!sass"),
			}
		},

		resolve: {
			packageAlias: "browser",
            extensions: ['', '.js', '.vue']
		}
	}

];
