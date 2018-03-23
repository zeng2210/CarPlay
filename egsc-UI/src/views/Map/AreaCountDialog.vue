<template>
  <div class="dialog-box" @click="jumpMap({sceneId: areaCount.linkSceneId})">
    <img src="./assets/images/count_camera.png" alt="">
    <span>{{areaCount.countCamera}}</span>
    <img src="./assets/images/count_broadcast.png" alt="">
    <span>{{areaCount.countBroadCast}}</span>
    <img src="./assets/images/count_security.png" alt="">
    <span>{{areaCount.countSecurity}}</span>
    <i></i>
  </div>
</template>

<script>

export default {
  name: 'area-count-dialog',
  props: ['areaCount', 'jumpMap']
}
</script>
<style lang="less" scoped>
.dialog-box {
  position: relative;
  width: 250px;
  height: 60px;
  line-height: 60px;
  background-color: #1D89D7;
  color: #F8E71C;
  font-weight: bold;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 1px 1px 10px #000;
  -moz-box-shadow: 1px 1px 10px #000;
  -o-box-shadow: 1px 1px 10px #000;
}

span {
  margin-right: 20px;
  padding-left: 10px;
}

img {
  vertical-align: middle;
  margin-top: -3px;
}

img:first-child {
  margin-left:20px;
}

i {
  position:absolute;
  border: 10px solid transparent;
  border-top-color: #1D89D7;
  left: 20px;
  bottom: -20px;
  z-index: 2;
}
</style>





