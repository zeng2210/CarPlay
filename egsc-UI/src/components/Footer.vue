<template>
  <div class="pageFooter">
    <div class="tabContainer">
      <div id="tabbar">
        <div style="flex: 1"></div>
        <m-tabbar v-model="select">
          <div class="tabbaritem" @click="jumpToHome">
            <m-tabbar-item id='home'>
              <img src="../assets/images/footer/home_normal.png" alt="" slot="icon-normal">
              <img src="../assets/images/footer/home_active.png" alt="" slot="icon-active"> &nbsp;首页&nbsp;
            </m-tabbar-item>
          </div>
          <div class="tabbaritem" @click="jumpToMonitor">
            <m-tabbar-item id='monitor'>
              <img src="../assets/images/footer/monitor_normal.png" alt="" slot="icon-normal">
              <img src="../assets/images/footer/monitor_active.png" alt="" slot="icon-active"> &nbsp;监控&nbsp;
            </m-tabbar-item>
          </div>
          <div class="tabbaritem" @click="jumpToEntrance">
            <m-tabbar-item id='accessControlApp'>
              <img src="../assets/images/footer/accesscontrolpp_normal.png" alt="" width='40' slot="icon-normal">
              <img src="../assets/images/footer/accesscontrolpp_active.png" alt="" width='40' slot="icon-active"> &nbsp;轨迹跟踪&nbsp;
            </m-tabbar-item>
          </div>
          <div class="tabbaritem" @click="jumpToPark">
            <m-tabbar-item id='parkinglot'>
              <img src="../assets/images/footer/parkinglot_normal.png" alt="" width='40' slot="icon-normal">
              <img src="../assets/images/footer/parkinglot_active.png" alt="" width='40' slot="icon-active"> &nbsp;停车场&nbsp;
            </m-tabbar-item>
          </div>
          <div class="tabbaritem" @click="jumpToPeopleMgmt">
            <m-tabbar-item id='peoplemgmt'>
              <img src="../assets/images/footer/peoplemgmt_normal.png" alt="" width='40' slot="icon-normal">
              <img src="../assets/images/footer/peoplemgmt_active.png" alt="" width='40' slot="icon-active"> &nbsp;人员管理&nbsp;
            </m-tabbar-item>
          </div>
          <div class="tabbaritem" @click="jumpToSearch">
            <m-tabbar-item id='search'>
              <img src="../assets/images/footer/search_normal.png" alt="" width='40' slot="icon-normal">
              <img src="../assets/images/footer/search_active.png" alt="" width='40' slot="icon-active"> &nbsp;搜索&nbsp;
            </m-tabbar-item>
          </div>
          <div class="tabbaritem" @click="jumpToReport">
            <m-tabbar-item id='report'>
              <img src="../assets/images/footer/report_normal.png" alt="" width='40' slot="icon-normal">
              <img src="../assets/images/footer/report_active.png" alt="" width='40' slot="icon-active"> &nbsp;报表统计&nbsp;
            </m-tabbar-item>
          </div>
        </m-tabbar>
        <div style="flex: 1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import mTabbar from '@/components/tabbar'
import mTabbarItem from '@/components/tabbar-item'
export default {
  name: 'Footer',
  components: {
    mTabbar,
    mTabbarItem
  },
  data () {
    return {
      select: 'tab1'
      // items: [
      //   {
      //     icon: require('@/assets/images/u3174.png'),
      //     title: '首页',
      //     index: '/home'
      //   },
      //   {
      //     icon: require('@/assets/images/u3156.png'),
      //     title: '监控',
      //     event: '/monitor'
      //   },
      //   {
      //     icon: require('@/assets/images/u3188.png'),
      //     title: '门禁道闸',
      //     index: '/entranceramp'
      //   },
      //   {
      //     icon: require('@/assets/images/u3162.png'),
      //     title: '停车场',
      //     index: '/parkinglot'
      //   },
      //   {
      //     icon: require('@/assets/images/u3180.png'),
      //     title: '人员管理',
      //     index: '/peoplemgmt'
      //   },
      //   {
      //     icon: require('@/assets/images/u3196.png'),
      //     title: '搜索',
      //     index: '/search'
      //   }
      // ]
    }
  },
  methods: {
    loadData () {
      var currentRoute = window.location.pathname
      if (currentRoute.slice(1)) {
        this.select = currentRoute.slice(1)
      } else {
        this.select = 'home'
      }
    },
    jumpToHome () {
      this.$router.push('/home')
    },
    jumpToEntrance () {
      this.$router.replace('/accessControlApp')
    },
    jumpToPark () {
      this.$router.replace('/parkinglot')
    },
    jumpToPeopleMgmt () {
      this.$router.replace('/peoplemgmt')
    },
    jumpToSearch () {
      this.$router.replace('/search')
    },
    jumpToMonitor () {
      console.log('Jump to monitor')
      this.$router.replace('/monitor')
    },
    jumpToReport () {
      this.$router.replace('/report')
    }
  },
  mounted: function () {
    this.loadData()
  }
}
</script>
<style lang="less">
.pageFooter {
  width: 100%;
  border-top: 1px solid #dedede;
}
.tabContainer {
  /*width: 1160px;*/
  width: 100%;
  text-align: center;
  /*margin: 0 auto;*/
  /*font-family: "PingFangSC-Medium", "Hiragino Sans GB", "Microsoft YaHei",*/
    /*"WenQuanYi Micro Hei", sans-serif;*/
}
#tabbar {
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: hidden;
  height: 99px;
  background: #fff;
  text-align: center;
}
.tabbaritem {
  /*cursor: pointer;*/
  /*!*flex: 1;*!*/
  /*!*text-align: center;*!*/
  /*.m-tabbar-item-icon {*/
  /*!*display: block;*!*/
  /*!*padding-top: 25px;*!*/
  /*img {*/
  /*width: 35px;*/
  /*}*/
  /*}*/
}
.tabbaritem .is-active {
  background: linear-gradient(#eff1f3, white);
  /*font-family: "PingFangSC-Medium";*/
}
/*.m-tabbar-item {*/
/*cursor: pointer;*/
/*!*flex: 1;*!*/
/*!*text-align: center;*!*/
/*.m-tabbar-item-icon {*/
/*!*display: block;*!*/
/*!*padding-top: 25px;*!*/
/*img {*/
/*width: 35px;*/
/*}*/
/*}*/
/*}*/
</style>
