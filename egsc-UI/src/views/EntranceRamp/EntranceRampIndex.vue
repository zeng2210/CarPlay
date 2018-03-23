<template>
  <div id="entranceMain">
    <div id="content">
      <el-container id="mainContainer">
      {{ msg }}
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EntranceRamp',
  data () {
    return {
      msg: '这是门禁道闸页面！请添加相应的功能'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  padding: 0;
  margin: 0;
  height: 100%;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
