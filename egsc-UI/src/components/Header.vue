<template>
<div class="pageHeader">
  <el-row :gutter="0">
    <el-col :span="6" >
      <div class="areaReturn">
        <div class="btn-return" v-show="showReturn" @click="onReturnClick">
          <img :src='returnIcon' style="width:45px; margin-top: -2px;"/><span>返回</span>
        </div>
      </div>
    </el-col>
    <el-col :span="12"><div class="pageTitle">{{ title }}</div></el-col>
    <el-col :span="6"><div class="time">{{ time | formatDate }}</div></el-col>
  </el-row>
</div>
</template>

<script>
import {formatDate} from '@/assets/js/date'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      title: '监控中心（增城恒大酒店）',
      time: new Date(),
      returnIcon: require('../assets/images/return.png'),
      showReturn: false,
      topRoutes: ['/home', '/monitor', '/accessControlApp', '/parkinglot', '/peoplemgmt', '/search/main', '/report']
    }
  },
  methods: {
    ...mapActions(['setShowReturnBtn', 'setReturnFunc']),
    updateTime() {
      setInterval(() => {
        this.time = new Date()
      }, 60000)
    },
    isTopRoute(currentRouteName) {
      for (let i = 0; i < this.topRoutes.length; i++) {
        if (currentRouteName === this.topRoutes[i]) {
          return true
        }
      }
      return false
    },
    onReturnClick() {
      if (this.returnFunc !== null) {
        this.returnFunc()
        this.setReturnFunc(null)
      } else {
        this.$router.go(-1)
      }
    }
  },
  mounted() {
    this.updateTime()
  },
  filters: {
    formatDate (date) {
      return formatDate(date, 'hh:mm')
    }
  },
  watch: {
    $route (now, old) {
      if (this.isTopRoute(this.$route.path)) {
        this.setShowReturnBtn(false)
        this.setReturnFunc(null)
      } else {
        this.setShowReturnBtn(true)
      }
    },
    showReturnBtn(data) {
      this.showReturn = data
    }
  },
  computed: {
    showReturnBtn() {
      return this.$store.state.mutations.showReturnBtn
    },
    returnFunc() {
      return this.$store.state.mutations.returnFunc
    }
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
.el-row {
  margin-top: 10px;
}
.el-col {
  border-radius: 4px;
}
.pageTitle {
  /*font-weight: bold;*/
  font-size: 22px;
  color: #5a6b78;
  /*font-family: 'PingFangSC-Medium';*/
}
.time {
  color: #5a6b78;
  font-size:22px;
  text-align: right;
  margin-right: 33px;
}
.btn-return {
  color: #5a6b78;
  text-align: left;
  font-size: 18px;
  cursor: pointer;
  width: 100px;
  display: flex;
  align-items: center;
  letter-spacing:0;
}
.pageHeader {
  /*background-color: #fff;*/
  width: 100%;
  /*border-bottom: 1px solid #dedede;*/
}
.el-header {
  /*background-color: #fff !important;*/
}
.areaReturn {
  height: 60px;
}
</style>
