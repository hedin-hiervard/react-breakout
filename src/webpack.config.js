const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const htmlPlugin = new HtmlPlugin({
    template: path.resolve(__dirname, 'index.html'),
    filename: 'index.html',
})

const copyPlugin = new CopyWebpackPlugin([
    {
        from: path.resolve(__dirname, 'assets'),
        to: 'assets',
    },
])

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '..', '..', 'dist/__build_frontend__'),
        filename: 'bundled.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true,
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        htmlPlugin,
        copyPlugin,
    ],
}

module.exports = (env, argv) => {
    if(argv && argv.mode === 'development') {
        config.devtool = 'eval-source-map'
    }
    return config
}
