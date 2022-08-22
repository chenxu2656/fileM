const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: "4000",
    proxy: {
      'api':{
        target: 'http://localhost:4000'
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        // scss 引入全局变量
        // additionalData: `@import "~@/stylesheet/define.scss";`
      }
    }
  },
  chainWebpack: config =>{
    config
      .plugin("html")
      .tap(args=>{
        args[0].title = "项目申报管理系统"
        return args
      })
  
  }
})
