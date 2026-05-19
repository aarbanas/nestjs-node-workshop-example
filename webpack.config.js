module.exports = (options, webpack) => {
  return {
    ...options,
    entry: './src/lambda.ts',
    externals: [],
    output: {
      ...options.output,
      filename: 'lambda.js',
      libraryTarget: 'commonjs2'
    },
  };
};
