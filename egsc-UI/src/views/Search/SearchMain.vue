<template>
  <div class="content">
    <div class="content-bg">
      <div class="top-blank-div"></div>
      <!-- 输入框区域 -->
      <div class="search-flex-box">
        <div class="fill-remain-space"></div>
        <search-input></search-input>
        <div class="fill-remain-space"></div>
      </div>

      <!-- 历史记录区域 -->
      <div class="search-flex-box">
        <div class="fill-remain-space"></div>
        <search-history></search-history>
        <div class="fill-remain-space"></div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from './components/SearchInput'
import SearchHistory from './components/SearchHistory'
export default {
  components: {
    SearchInput,
    SearchHistory
  },
  name: 'SearchMain'
}
</script>
<style lang="less" scoped>
.search-flex-box {
  display: flex;
}
.top-blank-div {
  height: 150px;
}
.fill-remain-space {
  flex: 1;
}
.content {
  width: 100%;
  background: url('./assets/images/bg.jpg') no-repeat center;
  background-size: 100% auto;
  display: flex;
  flex-direction: column;
}
.content-bg {
  /*width: 100%;*/
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  filter:progid:DXImageTransform.Microsoft.gradient(startcolorstr=#66000000,endcolorstr=#66000000);
  flex: 1;
}
</style>
