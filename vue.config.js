module.exports = {
  baseUrl: './',
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          ws: true,
          changeOrigin: true,
          pathRewrite:{
            "^/api":"/"//api相当于一个别名，代指http://198.33.33.33:8000
            }
        },
      }
    }
  }