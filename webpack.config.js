const path = require("path");

module.exports = {
    devtool: 'eval-source-map',
    mode: "production",
    entry: "./src/dev/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: path.resolve(__dirname, 'src/dev')
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/dev')
    },
}