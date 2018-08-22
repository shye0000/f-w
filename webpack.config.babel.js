import webpack from 'webpack';
import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HashPlugin from 'hash-webpack-plugin';
import WebpackAutoInject from 'webpack-auto-inject-version';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import commonConfig from './config/config.js';

const isDeveloping = process.env.NODE_ENV === 'development';
const appEnv = process.env.APP_ENV;
const bundleAnalyzerHost = '0.0.0.0';
const bundleAnalyzerPort = 6866;
const webpackDevServerHost = '0.0.0.0';
const webpackDevServerPort = 6686;
const staticBuildPath = path.resolve('./build');

let jsFileName, cssFileName, devToolSourceMap, publicPath, AppConfig, jtsAppsConfig,
	pluginsConfig = [], styleLoaderConfig, lessLoaderConfig, entry;

switch (appEnv) {
	case 'dev': {
		AppConfig = require('./config/dev.js').default;
		jtsAppsConfig = require('./jts-apps/config/dev.js').default;
		break;
	}
	case 'demo': {
		AppConfig = require('./config/demo.js').default;
		jtsAppsConfig = require('./jts-apps/config/demo.js').default;
		break;
	}
	case 'demo_client': {
		AppConfig = require('./config/demo_client.js').default;
		jtsAppsConfig = require('./jts-apps/config/demo_client.js').default;
		break;
	}
	case 'moa': {
		AppConfig = require('./config/moa.js').default;
		jtsAppsConfig = require('./jts-apps/config/moa.js').default;
		break;
	}
	case 'preprod': {
		AppConfig = require('./config/preprod.js').default;
		jtsAppsConfig = require('./jts-apps/config/preprod.js').default;
		break;
	}
	case 'prod': {
		AppConfig = require('./config/prod.js').default;
		jtsAppsConfig = require('./jts-apps/config/prod.js').default;
		break;
	}
}

AppConfig = {
	...commonConfig,
	...AppConfig,
	...jtsAppsConfig
};


if (isDeveloping) {
	//configuration for development
	styleLoaderConfig = [ 'style-loader', 'css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap' ];
	publicPath = 'http://' + webpackDevServerHost + ':' + webpackDevServerPort + '/build/';
	jsFileName = 'js/[name].js';
	cssFileName = 'css/[name].css';
	devToolSourceMap = 'cheap-module-source-map';
	pluginsConfig = [
		new webpack.HotModuleReplacementPlugin(),
		new BundleAnalyzerPlugin({ analyzerHost: bundleAnalyzerHost, analyzerPort: bundleAnalyzerPort})
	];
	entry = [
		'babel-polyfill',
		'whatwg-fetch',
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://' + webpackDevServerHost + ':' + webpackDevServerPort,
		'webpack/hot/only-dev-server',
		'url-search-params-polyfill',
		'./src/front.js'
	];
	lessLoaderConfig = [
		{loader: 'style-loader'},
		{loader: 'css-loader'},
		{
			loader: 'postcss-loader',
			options: {
				plugins: function() {
					return [require('autoprefixer')];
				}
			}
		},
		{loader: 'less-loader'},
	];

} else {
	//configuration for prod, demo, preprod, build-test-prod
	styleLoaderConfig = ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: [
			{
				loader: 'css-loader',
				options: {
					sourceMap: false
				}
			}, {
				loader: 'postcss-loader',
				options: {
					sourceMap: false
				}
			}, {
				loader: 'sass-loader',
				options: {
					sourceMap: false
				}
			}
		]
	});
	lessLoaderConfig = ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: [
			{
				loader: 'css-loader',
				options: {
					sourceMap: false
				}
			},
			{
				loader: 'postcss-loader',
				options: {
					sourceMap: false,
					plugins: function() {
						return [require('autoprefixer')];
					}
				}
			},
			{
				loader: 'less-loader',
				options: {
					sourceMap: false
				}
			}
		]
	});
	publicPath = '/build/';
	jsFileName = 'js/[name]-[hash].js';
	cssFileName = 'css/[name]-[hash].css';
	devToolSourceMap = 'none';
	pluginsConfig = [
		new ExtractTextPlugin({
			filename: cssFileName
		}),
		new HashPlugin({ path: staticBuildPath, fileName: 'hash.txt' }),
		new webpack.optimize.UglifyJsPlugin({
			comments: false,
			sourceMap: false,
			compress: {
				warnings: false,
				drop_console: true
			},
		}),
		new WebpackAutoInject({
			SILENT: true,
			componentsOptions: {
				InjectAsComment: {
					tag: 'Version: {version} - {date}',
					dateFormat: 'yyyy-mm-dd hh:MM:ss TT'
				}
			}
		})
	];
	if (appEnv === 'dev') {
		pluginsConfig.push(
			new BundleAnalyzerPlugin({ analyzerHost: bundleAnalyzerHost, analyzerPort: bundleAnalyzerPort})
		);
	}
	entry =  [
		'babel-polyfill',
		'whatwg-fetch',
		'url-search-params-polyfill',
		'./src/front.js'
	];
}

const config = {
	entry: {
		front: entry
	},
	output: {
		path: staticBuildPath,
		publicPath: publicPath,
		filename: jsFileName,
		chunkFilename: jsFileName
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: {
					test   : path.resolve(__dirname, 'node_modules'),
					exclude: [
						path.resolve(__dirname, 'node_modules/streamsaver'),
					]
				}
			},
			{
				test: /\.svg$/,
				include: [
					path.resolve(__dirname, './icons'),
					path.resolve(__dirname, 'jts-apps/icons')
				],
				loader: 'babel-loader!svg-react-loader'
			},
			{
				test: /\.less$/,
				use: lessLoaderConfig
			},
			{
				test: /\.(scss|css)$/,
				use: styleLoaderConfig
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'file-loader',
				options: {
					outputPath: 'files/',
					publicPath: publicPath
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
				loader: 'file-loader',
				exclude: [
					path.resolve(__dirname, 'icons'),
					path.resolve(__dirname, 'jts-apps/icons')
				],
				options: {
					outputPath: 'files/',
					publicPath: publicPath
				}
			},
			{
				test: /\.json($|\?)/,
				use: 'json-loader'
			}
		]
	},
	devServer: {
		host: webpackDevServerHost,
		port: webpackDevServerPort,
		hot: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
		},
		watchOptions: {
			ignored: /node_modules/
		}
	},
	devtool: devToolSourceMap,
	resolve: {
		alias: {
			react: path.resolve('./node_modules/react'),
		},
	},
	plugins: [
		new CleanWebpackPlugin(['build'], {verbose: true}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'AppConfig': JSON.stringify(AppConfig)
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /fr|ja/),
		new webpack.ContextReplacementPlugin(/antd[/\\]lib[/\\]locale-provider$/, /(fr_FR|ja_JP).js/),
		new webpack.ContextReplacementPlugin(/wbc-components[/\\]locale$/, /((fr_FR|ja_JP|)[/\\]messages).js$/),
		new HtmlWebpackPlugin({
			alwaysWriteToDisk: true,
			inject: false,
			minify: {
				collapseWhitespace: true
			},
			template: './src/index.ejs',
			appMountId: 'main',
			// todo if needed
			// googleAnalytics: {
			// 	trackingId: 'UA-XXXX-XX', // todo to be corrected with the real value
			// 	pageViewOnLoad: true
			// },
			meta: [
				{
					name: 'FONDATIONS-ADMIN',
					content: 'FONDATIONS ADMIN'
				}
			],
			mobile: true,
			lang: 'fr-FR',
			title: 'FONDATIONS'
		}),
		new HtmlWebpackHarddiskPlugin(),
		...pluginsConfig
	]
};

module.exports = config;