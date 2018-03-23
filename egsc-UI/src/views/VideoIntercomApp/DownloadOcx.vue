<template>
  <!-- 加载失败 -->
  <div class="shelter-stratum">
    <div class="center-box">
      <p class="load-error">
        <img src="./assets/images/warn.png">加载失败
      </p>
      <p>
        请安装最新版本的OCX
        <a href="OCX/ajb-videoplayer.exe" download="ajb-videoplayer.exe">点击这里下载最新OCX</a>
      </p>
      <p>请在IE浏览器中打开</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DownloadOcx'
}
</script>
<style lang="less" scoped>
.shelter-stratum {
  position: relative;
  background-color: #444444;
  width: 100%;
  height: 100%;
  .center-box {
    color: #ffffff;
    width: 100%;
    height: 155px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    p {
      height: 45px;
      text-align: center;
      margin-bottom: 10px;
      font-size: 20px;
      line-height: 45px;
      img {
        height: 45px;
      }
      a {
        color: #e6da16;
        text-decoration: none;
      }
    }
    .load-error {
      display: block;
      width: 140px;
      margin: 0 auto;
      position: relative;
      padding-left: 30px;
      box-sizing: border-box;
      img {
        display: block;
        height: 30px;
        position: absolute;
        top: 6px;
        left: 0;
      }
    }
  }
}
</style>
