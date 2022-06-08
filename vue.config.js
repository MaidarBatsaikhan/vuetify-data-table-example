module.exports = {
  chainWebpack: (config) => {
    // disable cache for prod only, remove the if to disable it everywhere
    // if (process.env.NODE_ENV === 'production') {
    config.module.rule("vue").uses.delete("cache-loader");
    config.module.rule("js").uses.delete("cache-loader");
    config.module.rule("ts").uses.delete("cache-loader");
    config.module.rule("tsx").uses.delete("cache-loader");
    // }
  },
  transpileDependencies: ["vuetify"],
  devServer: {
    port: 8081,
  },
};
