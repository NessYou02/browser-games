const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
    //publicPath: process.env.NODE_ENV === 'production' ? '/browser-games/' : '/'
    publicPath: './',
    outputDir:'dist',
    assetsDir:'static'
})
