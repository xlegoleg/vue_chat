module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/config/_main.scss";`
      }
    }
  }
}