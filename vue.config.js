const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    port: 3000, // 사용하고자 하는 새로운 포트 번호
  },
  transpileDependencies: true,
});
