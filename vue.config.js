const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: "Real Estate Care",
    themeColor: "#008080"
  },
  baseUrl: "./login"
})
