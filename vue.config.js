const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: "local.turingvideo.cn", // 本机ip
    port: 443, // 本机端口
    https: true,
    proxy: {
      services: {
        target: "https://dev-ka.turingvideo.cn", // 目标路径，别忘了加http和端口号
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/services": "services", // 重写路径
          // '^/123': ''  // 比如/123/admin/being/classes/classInfo 会被替代成/admin/being/classes/classInfo
        },
      },
    },
  },
});
