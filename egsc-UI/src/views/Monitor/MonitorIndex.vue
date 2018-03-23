<template>
  <div class="monitor-contain">
    <keep-alive>
      <div class="main-content" v-if="!showSub">
        <el-container class="monitor-contain">
          <el-main class="monitorIndex-allVideo">
            <!-- <router-view :allVideoOrgId="allVideoOrgId" :customGroupId="customGroupId" :eagleEyeData="eagleEyeData" :customizeVideoSendData="customizeVideoSendData" @allVideoToPreview="onVideoToPreview" :allVideoData="allVideoData"></router-view> -->
            <template v-if="activeName === 'allvideo'">
              <all-video ref="allVideo" @multi2single="handleMulti2Single" :fullScreen="fullScreen"></all-video>
            </template>
            <template v-else-if="activeName === 'abnormalvideo'">
              <abnormal-video ref="abnormalVideo" @videoToAbnormalOcx="videoToAbnormalOcx" @onClickMore="handleMore"></abnormal-video>
            </template>
            <template v-else-if="activeName === 'thepanoramic'">
              <the-panoramic ref="thePanoramic"></the-panoramic>
            </template>
            <template v-else-if="activeName === 'customvideo'">
              <custom-video ref="customVideo" @multi2single="handleMulti2Single" :fullScreen="fullScreen"></custom-video>
            </template>
          </el-main>
          <el-aside width="517px" style="" class="monitor-aside" :style="getHeightStyle(1)" v-loading="asideLoading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
              <el-tab-pane label="全部视频" name="allvideo">
                <div :style="getHeightStyle(95)" class="all-video-scrollbar">
                  <el-tree class="all-video-tree" :default-expanded-keys="videoTreeData.length ? [videoTreeData[0].uuid] : []" node-key="uuid" :data="videoTreeData" :props="defaultProps" @node-expand="updateTreeScrollBar" @node-collapse="updateTreeScrollBar" @node-click="handleNodeClick"></el-tree>
                </div>
              </el-tab-pane>
              <el-tab-pane label="异常视频" name="abnormalvideo">
                <el-scrollbar :native="false" tag='ul' viewClass="abnormal-event" :viewStyle="getHeightStyle(95)" :noresize="false" ref="abnormalScroll">
                  <li v-for="(item, index) in abnormalEvents" :key="index" @click="showAbnormalVideo(item)">
                    <strong class="date-label">
                      <template v-if="!index"> {{toDate(item.startTime)}}</template>
                      <template v-else-if="!!index && !isSameDay(abnormalEvents[index-1].startTime,item.startTime)">
                        {{toDate(item.startTime)}}
                      </template>
                    </strong>
                    <i></i>
                    <span class="starttime">{{ toTime(item.startTime) }}</span>
                    <b>{{ item.content }}</b>
                    <span class="duration">
                      {{item.videoDuration}}
                    </span>
                  </li>
                  <li class="last-item">
                    <a @click="seeMore">查看更多视频</a>
                  </li>
                </el-scrollbar>
              </el-tab-pane>
              <el-tab-pane label="园区全景" name="thepanoramic">
                <div :style="getHeightStyle(95)" class="eagle-eye-scrollbar">
                  <el-menu default-active="0">
                    <el-menu-item v-for="( item , index) in eagleEyesData" :key="index" :index="''+index" @click="eagleEyeClick(item)">
                      <span slot="title">{{item.deviceName}}</span>
                    </el-menu-item>
                  </el-menu>
                </div>
              </el-tab-pane>
              <el-tab-pane label="自定义视频" name="customvideo">
                <div :style="getHeightStyle(95)" class="custom-video-scrollbar">
                  <el-menu default-active="0">
                    <el-menu-item v-for="( item , index) in customizeVideodData" :key="index" :index="index+''" @click="customizeClickDeal(item)">
                      <span slot="title">{{item.customGroupName}}</span>
                    </el-menu-item>
                  </el-menu>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-aside>
        </el-container>
      </div>
    </keep-alive>
    <div class="sub-content" v-if="showSub">
      <sub-abnormal-video ref="subAbnormal" @onItemClick="showAbnormalVideo" :fullScreen="fullScreen"></sub-abnormal-video>
    </div>
    <abnormal-dialog :abnormalData="abnormalData" :open.sync="abnormaVisible" @close="handleAbnormalClose" @onAbnormalToVideo="handleAbnormalToVideo"> </abnormal-dialog>
    <video-dialog :abnormalShow="abnormalShow" :previewData="previewData" :open.sync="previewVisible" @close="handlePreviewClose" @onPreviewBackToAbnormal="handlePreviewBackToAbnormal"></video-dialog>
  </div>
</template>
<script>
import PerfectScrollbar from 'perfect-scrollbar'
import {
  // 全部视频调用ajxa
  getVideoData, // 真实数据 列表getVideoData
  // 自动以视频调用ajxa
  getCustomGrounpData, // 真实数据 列表getCustomizeVideo
  getAbnormalData, // 异常视频 列表getAbnormalEvents
  getEagleEyeData// 鹰眼列表
} from './apis/index.js'
import allVideo from './components/AllVideo.vue'
import abnormalVideo from './components/AbnormalVideo.vue'
import thePanoramic from './components/ThePanoramic.vue'
import customVideo from './components/CustomVideo.vue'
import subAbnormalVideo from './components/SubAbnormalVideo'
import { createNamespacedHelpers, mapActions } from 'vuex'
import m from 'moment'
const { mapState } = createNamespacedHelpers('monitor')
const { mapState: mapCommonState, mapMutations } = createNamespacedHelpers('common')
export default {
  name: 'monitorIndex',
  components: {
    allVideo, abnormalVideo, thePanoramic, customVideo, subAbnormalVideo
  },
  data () {
    return {
      // 异常事件数据
      abnormalEvents: [],
      abnormalQuery: {
        pageNo: 1,
        pageSize: 30,
        timeStamp: ''
      },
      fistTime: '',
      videoTreeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 鹰眼列表数据
      // eagleEyesData: [{ name: '园区全景鹰眼相机', url: 'http://192.168.199.14/doc/page/login.asp' }],
      // eagleEyeData: { name: '园区全景鹰眼相机', url: 'http://192.168.199.14/doc/page/login.asp' },
      // customizevideo
      eagleEyesData: [],
      customizeVideodData: [],
      abnormaVisible: false,
      abnormalData: {},
      abnormalShow: false,
      previewVisible: false,
      previewData: {},
      activeName: 'allvideo',
      showSub: false,
      fullScreen: false,
      customScrollbar: null,
      allVideoScrollbar: null,
      eagleEyeScrollbar: null
    }
  },
  mounted () {
    this.getAllVideoData()
    this.$nextTick(() => {
      window.setTimeout(function () {
        window.onresize() // 调用一次邦定onresize的回调函数
      }, 10)
      this.fullScreen = this.isFullScreen()
      this.customScrollbar = new PerfectScrollbar(document.querySelector('.custom-video-scrollbar'))
      this.allVideoScrollbar = new PerfectScrollbar(document.querySelector('.all-video-scrollbar'))
      this.eagleEyeScrollbar = new PerfectScrollbar(document.querySelector('.eagle-eye-scrollbar'))
    })
  },
  watch: {
    '$route' (to, from) {
      this.activeName = to.path
    },
    mainContainHeight: function (newVal, oldVal) { // 窗口大小改变触发
      this.fullScreen = this.isFullScreen()
    }
  },
  computed: {
    // 动态获取中间部分高度
    ...mapState(['asideLoading']),
    ...mapCommonState(['mainContainHeight'])
  },
  methods: {
    ...mapActions(['showReturn', 'hideReturn']),
    ...mapMutations(['UPDATE_MAIN_HEIGHT']),
    // 滚动条高度设置
    getHeightStyle (h = 0) {
      return { height: (this.mainContainHeight - h) + 'px' }
    },
    // 全部视频组织树数据
    getAllVideoData () {
      getVideoData().then(res => {
        this.videoTreeData = []
        this.videoTreeData = [res.data]
        this.$nextTick(() => {
          this.$refs.allVideo.getVideoParams(res.data.uuid)
          document.querySelector('.all-video-scrollbar').scrollTop = 0
          this.updateTreeScrollBar()
        })
      })
    },
    // 自定义数据
    customizeVideoGrounp () {
      this.customizeVideodData = []
      getCustomGrounpData().then(res => {
        this.customizeVideodData = res.data
        this.$nextTick(() => {
          this.$refs.customVideo.getVideoParams(res.data[0].customGroupId)
          this.customScrollbar.update()
          document.querySelector('.custom-video-scrollbar').scrollTop = 0
        })
      })
    },
    // 获取异常视频数据列表
    getAbnormalEvents () {
      getAbnormalData(this.abnormalQuery).then(rs => {
        this.abnormalQuery.timeStamp = rs.data.timeStamp
        if (this.abnormalQuery.pageNo === 1) {
          this.abnormalEvents = rs.data.rows
          this.$nextTick(() => {
            document.querySelector('.abnormal-event').parentNode.scrollTop = 0
          })
        } else {
          this.abnormalEvents = this.abnormalEvents.concat(rs.data.rows)
        }
        this.$nextTick(() => {
          this.$refs.abnormalScroll.update()
        })
      })
    },
    // 获取鹰眼设备
    setEyeData () {
      this.eagleEyesData = []
      getEagleEyeData().then(res => {
        this.eagleEyesData = res.data
        this.$refs.thePanoramic.getEagleEyeParams(res.data[0])
        this.$nextTick(() => {
          this.eagleEyeScrollbar.update()
          document.querySelector('.eagle-eye-scrollbar').scrollTop = 0
        })
      })
    },
    // 查看更多
    seeMore () {
      this.abnormalQuery.pageNo++
      this.getAbnormalEvents()
    },
    // 时间转化
    toTime (value) {
      return m(value).format('HH:mm')
    },
    toDate (value) {
      // 无特别需求，正常日期格式化
      let fmtDate = m(value).format('MM-DD')
      // 如果与当前时间为同一天， 则标记为今天
      if (this.isSameDay(value, this.abnormalQuery.timeStamp)) {
        fmtDate = '今天'
      }
      // 如果与传入参数m(value)时差在一天之内，则标记为昨天
      if (this.isSameDay(m(value).add(1, 'days'), this.abnormalQuery.timeStamp)) {
        fmtDate = '昨天'
      }
      return fmtDate
    },
    // 判断不是同一天
    isSameDay (lastTime, thisTime) {
      return m(lastTime).isSame(thisTime, 'day')
    },
    // 调用控件单独控件模块
    showAbnormalVideo (val) {
      this.abnormaVisible = true
      this.abnormalData = {
        startTime: val.startTime,
        endTime: val.endTime,
        ip: val.deviceIp,
        port: Number(val.devicePort),
        deviceId: val.cameraCode
      }
    },
    // 图片跳往异常视频
    videoToAbnormalOcx (data) {
      this.abnormalData = {
        startTime: data.startTime,
        endTime: data.endTime,
        ip: data.deviceIp,
        port: Number(data.devicePort),
        deviceId: data.cameraCode
      }
      this.abnormaVisible = true
    },
    // 关闭预览
    handlePreviewClose () {
      this.previewVisible = false
      this.abnormalShow = false
      // 恢复播放多屏，区别场景
      this.$nextTick(() => {
        if (this.activeName === 'allvideo') {
          this.$refs.allVideo.returnShowMulti()
        }
        if (this.activeName === 'customvideo') {
          this.$refs.customVideo.returnShowMulti()
        }
      })
    },
    // 关闭异常视频
    handleAbnormalClose () {
      this.abnormaVisible = false
    },
    // 异常视频跳入预览
    handleAbnormalToVideo () {
      this.abnormaVisible = false
      this.previewVisible = true
      this.abnormalShow = true
      this.previewData.deviceId = this.abnormalData.deviceId
    },
    // 预览回到异常视频
    handlePreviewBackToAbnormal () {
      this.abnormaVisible = true
      this.previewVisible = false
    },
    // 下拉列表展开函数
    handleNodeClick (node) {
      this.$refs.allVideo.getVideoParams(node.uuid)
    },
    customizeClickDeal (item) {
      this.$refs.customVideo.getVideoParams(item.customGroupId)
    },
    eagleEyeClick (data) {
      this.$refs.thePanoramic.getEagleEyeParams(data)
    },
    // 显示预览
    handleMulti2Single (data) {
      this.previewData = {
        deviceId: data
      }
      this.previewVisible = true
    },
    // 路由切换
    tabClick (val) {
      this.releaseOcxs(val.index)
      this.activeName = val.name
      switch (val.index) {
        case '0':
          this.getAllVideoData()
          break
        case '1':
          this.abnormalQuery.pageNo = 1
          this.abnormalQuery.timeStamp = ''
          this.getAbnormalEvents()
          break
        case '2':
          this.$nextTick(() => {
            this.setEyeData()
          })
          break
        case '3':
          this.customActive = '0'
          this.$nextTick(() => {
            this.customizeVideoGrounp()
          })
          break
      }
    },
    // 切换时销毁组件
    releaseOcxs (activeIndex) {
      if (activeIndex === '0') {
        this.$refs.customVideo && this.$refs.customVideo.releaseOcx()
      } else if (activeIndex === '3') {
        this.$refs.allVideo && this.$refs.allVideo.releaseOcx()
      } else {
        this.$refs.customVideo && this.$refs.customVideo.releaseOcx()
        this.$refs.allVideo && this.$refs.allVideo.releaseOcx()
      }
    },
    // 响应异常视频点击更多事件
    handleMore (type) {
      this.showSub = true
      // 使用全局返回按钮
      this.showReturn(() => {
        this.showSub = false
        this.hideReturn()
      })
      this.$nextTick(() => {
        this.$refs.subAbnormal.renderSub(type)
      })
    },
    // 判断浏览器是否全屏
    isFullScreen () {
      var explorer = window.navigator.userAgent.toLowerCase()
      if (explorer.indexOf('chrome') > 0) { // webkit
        return (document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width)
      } else { // IE 9+  fireFox
        return (window.outerHeight === window.screen.height && window.outerWidth === window.screen.width)
      }
    },
    // 更新全部视频组织树的滚动条
    updateTreeScrollBar () {
      window.setTimeout(() => {
        this.allVideoScrollbar.update()
      }, 300)
    }
  }
}
</script>
<style scoped lang="less">
// @import url("./assets/css/monitorscoped.less");
.monitorIndex-allVideo {
  padding: 20px 20px 0px 20px;
}
.all-video-scrollbar,
.custom-video-scrollbar {
  position: relative;
}
</style>
<style lang='less'>
@import url("./assets/css/monitorindex.less");
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .ps {
    overflow: hidden !important;
  }
}
</style>
