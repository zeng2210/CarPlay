<template>
  <div class="top-text flex">
    <p>{{text}}共<span class="red">{{total}}条</span>结果</p>
    <div class="fill-remain"></div>
    <div class="to-more" v-show="total > 4 && toMoreTarget" @click="toMore('SearchPeopleResult')">查看更多 &gt;</div>
  </div>
</template>
<script>
export default {
  name: 'result-title-bar',
  props: {
    title: {
      require: true,
      type: String,
      default: ''
    },
    total: {
      require: true,
      type: Number,
      default: 0
    },
    keyword: {
      require: false,
      type: String,
      default: ''
    },
    toMoreTarget: {
      require: false,
      type: String,
      default: null
    },
    isPicSearch: {
      require: false,
      type: Boolean,
      default: false
    },
    picDataList: {
      require: false,
      type: Array
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    toMore () {
      // 搜索
      if (this.isPicSearch) {
        this.$router.push({
          name: this.toMoreTarget,
          params: {
            allDataList: this.picDataList
          }
        })
      } else {
        this.$router.push({
          name: this.toMoreTarget,
          query: {
            keyword: this.keyword
          }
        })
      }
    }
  },
  mounted() {
    if (this.isPicSearch) {
      this.text = this.title
    } else {
      this.text = this.title + ' "' + this.keyword + '" ，'
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../assets/css/index";
  .flex {
    display: flex;
  }
  .fill-remain {
    flex: 1;
  }
  .to-more {
    font-size: 14px;
    color: #1d8fe1;
    margin-right: 15px;
    cursor: pointer;
  }
</style>
