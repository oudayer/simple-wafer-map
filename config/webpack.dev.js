const path = require("path")
module.exports={
    mode: "development",
    entry: "./index.ts",
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: "bundle.js",
        library: 'wafer',
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: ["ts-loader"],
            exclude: /node-modules/
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}
