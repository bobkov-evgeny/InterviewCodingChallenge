const webpack = require("webpack");
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env = {}, opts) => {
    const publicPath = (process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : "/");

    const compilerOptions = require('./tsconfig.json').compilerOptions;
    const alias = {};
    Object.keys(compilerOptions.paths).forEach((item) => {
        const key = item.replace('/*', '');
        const value = path.resolve('./', compilerOptions.paths[item][0].replace('/*', ''));
        alias[key] = value;
    });

    const plugins = [
        new CleanWebpackPlugin([
            './dist'
        ]),
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'chunks/[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve('./', 'resources/html/index.html'),
            chunks: ["main"],
            chunksSortMode: "manual",
            inject: true
        })
    ];
    const webpackConfig = {
        target: 'web',
        mode: env.prod ? 'production' : 'development',
        entry: {
            main: "./src/entry/Main.tsx",
        },
        output: {
            filename: "bundles/[name].[contenthash].js",
            chunkFilename: "chunks/[name].[contenthash].js",
            path: __dirname + "/dist",
            publicPath
        },
        optimization: {
            occurrenceOrder: true,
            minimizer: [new TerserJSPlugin({ terserOptions: { keep_classnames: true, keep_fnames: true, comments: false } } ), new OptimizeCSSAssetsPlugin({})],
        },
        devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
        resolve: {
            alias: alias,
            extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".scss", ".json"],
            modules: [
                path.resolve(__dirname, "src"),
                "node_modules"
            ]
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)?$/,
                    include: [/src/, /node_modules/],
                    loader: "awesome-typescript-loader"
                },
                {
                    enforce: "pre",
                    test: /\.(ts|tsx)?$/,
                    use: [{
                        loader: "tslint-loader",
                        options: {
                            formatter: 'stylish'
                        }
                    }]
                },
                {
                    type: 'javascript/auto',
                    test: /\.json?$/,
                    exclude: /(node_modules)/,
                    use: [
                        {
                            loader: 'json-loader'
                        }
                    ]
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { url: false }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [require('autoprefixer')]
                                }
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
            ]
        },
        stats: {
            colors: true
        },
        plugins: plugins
    };

    plugins.push(new WriteFilePlugin());

    webpackConfig.devServer = {
        port: 12345,
        host: "localhost",
        open: true,
        contentBase: path.resolve(__dirname, "dist"),
        publicPath: "/",
        watchContentBase: true,
        watchOptions: {
            ignored: /node_modules/
        },
        openPage: "index.html",
        historyApiFallback: {
            index: "index.html"
        }
    };
    return webpackConfig;
};
