const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
    //publicPath: process.env.NODE_ENV === 'production' ? '/browser-games/' : '/'
    publicPath: process.env.NODE_ENV === "production" ? "/browser-games/" : "/",
    outputDir:'dist',
    assetsDir:'static'
})
//Your site is live at https://nessyou02.github.io/browser-games/