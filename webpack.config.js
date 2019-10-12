const HtmlWebPlugin  = require("html-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    },
                ]
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'
            },
            {
                test:/\.(png|svg|jpe?g|gif)$/,
                use: [
                    'file-loader'
                ]
            },

        ]
    },
    plugins: [
        new HtmlWebPlugin(
            {
                template: "./src/index.html",
                filename: "./index.html"
            }
        )
    ]
};
