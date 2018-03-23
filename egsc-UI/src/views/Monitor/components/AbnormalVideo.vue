<template>
  <div class='abnormal-videos-box'>
    <div v-for="(item ,index) in abnormalVideosGroup" :key="index" class="video-groups">
      <template>
        <div class="header-hurdle">
          <b>{{groupsNameMaps[item.subEventType]}}</b>
          <a v-if="item.hasMore===1" @click.stop.prevent="more(item.subEventType)">更多</a>
        </div>

        <ul class="img-list" v-if="item.eventLogDtoList.length>0">
          <li v-for="(subItem, subIndex) in item.eventLogDtoList" :key="index+'-'+subIndex" @click="callOcxPlayBack(subItem)">
            <div class="header-txt">
              <b>{{subItem.cameraName}}</b>
              <i>{{subItem.startTime}}</i>
            </div>
            <img :key="index" :src="subItem.imgUrl || errorImg" :alt="subItem.cameraName" :onerror="defaultImg">
          </li>
        </ul>
        <div v-else class="no-data">
          暂无事件！
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { getAbnormalVideoData } from '../apis/index'
export default {
  name: 'abnormalVideo',
  props: {
    abnormaDate: {
      type: Object,
      validator: function (param) {
        return param
      }
    }
  },
  data () {
    return {
      abnormalVideosGroup: {},
      defaultPng: require('../assets/images/abnormal-default.png'),
      groupsNameMaps: { 1: '园区越界', 2: '亲水平台异常', 3: '人员徘徊', 4: '违停/占道', 5: '人员脱岗' },
      subEventType: 0,
      errorImg: require('../assets/images/loadError.png'),
      abnormaVisible: false,
      abnormalShow: false,
      previewVisible: false,
      showaddDialog: false,
      twoShowDialog: false,
      returnShow: false,
      diseid: '',
      defaultImg: 'this.src="' + require('../assets/images/loadError.png') + '"',
      parameter: {},
      previewData: {}
    }
  },
  mounted () {
    this.getAbnormalVideoGroups()
  },
  // components: {
  //   subAbnormalVideo
  // },
  methods: {
    /**
     * 点击图片展示弹框
     */
    callOcxPlayBack (subItem) {
      // this.showaddDialog = true
      this.$emit('videoToAbnormalOcx', subItem)
    },
    // 获取数据
    getAbnormalVideoGroups () {
      getAbnormalVideoData().then(rs => {
        this.abnormalVideosGroup = rs.data
        // this.abnormalVideosGroup[0] = {}
        console.log(this.abnormalVideosGroup)
      })
    },
    handlePreviewBackToAbnormal () {
      this.abnormaVisible = true
      this.previewVisible = false
      this.abnormalShow = false
    },
    // 处理更多
    more (type) {
      this.$emit('onClickMore', type)
    },
    // 处理返回事件
    handleBack () {
      // this.showSub = false
    }
  }
}
</script>
<style scoped lang='less'>
.abnormal-videos-box {
  .video-groups {
    width: 32.7%;
    float: left;
    margin: 0 0.3% 0 0.3%;
    margin-bottom: 20px;
    .no-data {
      width: 100%;
      height: 252px;
      line-height: 252px;
      text-align: center;
      color: #f56c6c;
      background: #eee;
    }
  }
  .header-hurdle {
    height: 68px;
    line-height: 68px;
    text-align: center;
    position: relative;
    b {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #5a6b78;
      font-size: 18px;
      letter-spacing: 2px;
    }
    a {
      position: absolute;
      font-size: 12px;
      letter-spacing: 2px;
      text-decoration: none;
      top: 0;
      right: 0;
      color: #409eff;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .img-list {
    width: 100%;
    height: 252px;
    li {
      float: left;
      width: 50%;
      height: 126px;
      position: relative;
    }
    .header-txt {
      width: 100%;
      height: 18px;
      line-height: 18px;
      background: rgba(20, 13, 13, 0.6);
      font-size: 8px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      color: #fff;
      b,
      i {
        font-style: normal;
        font-weight: 400;
        display: block;
        width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      b {
        float: left;
      }
      i {
        float: right;
      }
    }
    img {
      display: block;
      border: none;
      width: 100%;
      height: 100%;
    }
  }
}
.sub-content {
  width: 100%;
  height: 100%;
}
</style>