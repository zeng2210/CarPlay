<template>
    <div class="m-tabbar">
       <slot></slot>
    </div>
</template>
<script>
    import mTabbarItem from './tabbar-item'
    export default {
      components: {
        mTabbarItem
      },
      props: ['value']
    }
</script>
<style lang="less">
.m-tabbar{
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 100px;
  background: #fff;
}
</style>
