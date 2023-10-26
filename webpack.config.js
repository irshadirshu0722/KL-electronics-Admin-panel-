import path from 'path'

module.exports = {

  resolve: {
    fallback: { "crypto": require.resolve("crypto-browserify") }
  },

};
