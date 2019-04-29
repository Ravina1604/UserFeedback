var config = {
  entry: __dirname + '/main.js',
  output: {
    path: __dirname + '/',
    publicPath: __dirname + '/',
    filename: 'index.js',
  },
  devServer: {
    inline: true,
    port: 8080
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ["@babel/preset-env","@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
        
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  performance: { hints: false }
}
module.exports = config;