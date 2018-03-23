<template>
    <div class="m-tabbar-item" :class="{'is-active':isActive}" @click="$parent.$emit('input',id)">
        <span class="m-tabbar-item-icon" v-show="!isActive"><slot name="icon-normal"></slot></span>
        <span class="m-tabbar-item-icon" v-show="isActive"><slot name="icon-active"></slot></span>
        <div class="m-tabbar-item-text"><slot></slot></div>
    </div>
</template>
<script>
export default{
  props: ['id'],
  computed: {
    isActive () {
      if (this.$parent.value === this.id) {
        return true
      }
    }
  }
}
</script>
<style lang="less">
.m-tabbar-item{
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: center;

  .m-tabbar-item-icon{
    margin-top: 18px;
    width: 100%;
    height: 32px;
    img {
      height: 100%;
      width: auto;
    }
  }
  .m-tabbar-item-text{
    margin-top:8px;
    /*margin-left: -3px;*/
    color:#5a6b78;
    /*font-weight: bold;*/
    font-family: "PingFangSC-Medium", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    font-size:16px !important;
  }
  &.is-active{
    .m-tabbar-item-text{
      color: #1D8FE1;
      /*font-weight: bold;*/
      /*font-size: 14px;*/
    }
  }
}
</style>
