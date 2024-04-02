/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var webpack = require("webpack");
var path = require("path");

var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
	"context": __dirname,
	entry: {
		"Main": "./app/Main",
	},
	output: {
		filename: "./build/[name].js",
		chunkFilename: "./build/[id].js",
		sourceMapFilename: "[file].map",
	},
	resolve: {
		alias: {
			Tone: path.resolve(__dirname, 'app/third_party/Tone.js/'),
			Style: path.resolve(__dirname, 'style/'),
			App: path.resolve(__dirname, 'app/'),
			Node: path.resolve(__dirname, 'node_modules'),
			ThirdParty: path.resolve(__dirname, 'third_party/'),
		},	
	},
	plugins: PROD ? [
		new webpack.optimize.UglifyJsPlugin({ minimize: true })
	] : [],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{ loader: 'autoprefix-loader' },
				]
			},
			{
				test: /\.json$/,
				use: [
					{ loader: 'json' },
				]
			},
			{
				test: /\.(png|gif)$/,
				use: [
					{ loader: 'url-loader' }
				]
			},
			{
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				use: [
					{ loader: 'file-loader?name=images/font/[hash].[ext]' }
				]
			}
		]
	}
};
