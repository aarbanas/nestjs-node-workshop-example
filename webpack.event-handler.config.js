module.exports = (options, webpack) => ({
  ...options,
  entry: './src/eventHandlers/createCarHandler.ts',
  externals: [],
  output: {
    ...options.output,
    filename: 'createCarHandler.js',
    libraryTarget: 'commonjs2',
  },
});
