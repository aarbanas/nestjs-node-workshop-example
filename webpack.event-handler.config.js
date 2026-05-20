module.exports = (options, webpack) => ({
  ...options,
  entry: './src/eventHandlers/createCarHandler.ts',
  externals: [],
  output: {
    ...options.output,
    filename: 'createCarHandler.js',
    libraryTarget: 'commonjs2',
  },
  optimization: {
    splitChunks: false,
    runtimeChunk: false,
  },
  plugins: [
    ...options.plugins,
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
  ],
});
