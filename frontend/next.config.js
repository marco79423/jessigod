/** @type {import('next').NextConfig} */

module.exports = {
  serverRuntimeConfig: {
    backendUrl: 'http://localhost:8000',
  },

  publicRuntimeConfig: require('./runtimeConfig'),
}
