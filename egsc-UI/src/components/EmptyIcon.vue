<template>
  <div class="empty-icon">
    <img :src="icon" />
  </div>
</template>

<script>
export default {
  name: 'empty-icon',
  data () {
    return {
      icon: require('../assets/images/dialog_empty.png')
    }
  }
}
</script>

<style lang="less" scoped>
.empty-icon {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;

  & img {
    margin: 110px auto 160px auto;
  }
}
</style>
