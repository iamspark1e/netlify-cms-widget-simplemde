const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

const developmentConfig = {
    mode: 'development',
    entry: './dev/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
    },
    optimization: { minimize: true },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                enforce: 'pre',
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    devtool: 'eval-source-map',
}

const productionConfig = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env', 'babel-preset-react'],
                        "plugins": [
                            "transform-export-extensions",
                            "transform-class-properties",
                            "transform-object-rest-spread"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env'],
                        "plugins": [
                            "transform-export-extensions",
                            "transform-class-properties",
                            "transform-object-rest-spread"
                        ]
                    }
                },
                enforce: 'pre',
            },
        ],
    },
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    }
}

module.exports = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig