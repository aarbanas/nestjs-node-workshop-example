module.exports = (options, webpack) => {
  return {
    ...options,
    entry: './src/lambda.ts',
    externals: [],
    output: {
      ...options.output,
      filename: 'lambda.js',
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
  };
};