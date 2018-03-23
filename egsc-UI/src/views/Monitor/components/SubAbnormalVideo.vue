<template>
  <div>
    <div :class="fullScreen?'sub-abnormal-video full-screen':'sub-abnormal-video'">
      <ul class="video-list">
        <li v-for="(item, index) in videoList" :key="index" @click="showAbnormalVideo(item)">
          <div class="header-bar">
            <b>{{item.deviceName}}</b>
            <i>{{item.startTime}}</i>
          </div>
          <img :src="item.imgUrl || errorImg" :alt="item.deviceName" :onerror="defaultImg">
        </li>
      </ul>
      <div class="page">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.pageNo" :page-size="query.pageSize" layout="prev, pager, next, jumper" :total="query.total"> </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getAbnormalVideosData } from '../apis/index'
export default {
  name: 'subAbnormalVideo',
  props: {
    fullScreen: Boolean
  },
  data () {
    return {
      query: {
        pageNo: 1,
        pageSize: 12,
        total: 0,
        subEventType: 0
      },
      videoList: [],
      errorImg: require('../assets/images/loadError.png'),
      abnormaVisible: false,
      previewData: {},
      abnormalShow: false,
      previewVisible: false,
      defaultImg: 'this.src="' + require('../assets/images/loadError.png') + '"',
      warnShow: false
    }
  },
  methods: {
    // 异常视频到单屏
    showAbnormalVideo (item) {
      console.log(item)
      this.$emit('onItemClick', item)
    },
    // 获取异常视频数据
    getVideoList () {
      getAbnormalVideosData(this.query).then(rs => {
        this.videoList = rs.data.rows
        this.query.pageNo = rs.data.currentPage
        this.query.pageSize = rs.data.pageSize
        this.query.total = rs.data.total
      })
    },
    renderSub (type) {
      this.query.subEventType = type
      this.getVideoList()
    },
    handleSizeChange (val) {
      this.query.pageSize = val
      this.getVideoList()
    },
    handleCurrentChange (val) {
      this.query.pageNo = val
      this.getVideoList()
      window.focus() // 解决ie分页组件第二次按Enter不跳转问题
      document.querySelector('.sub-abnormal-video .el-input__inner').focus()
    }
  }
}
</script>
<style lang="less" scoped>
.sub-abnormal-video {
  width: 100%;
  height: 100%;
  padding: 26px 32px 0px 32px;
  box-sizing: border-box;
  .go-back {
    cursor: pointer;
    color: #6d7d88;
    margin-bottom: 10px;
  }
  .go-back:hover {
    text-decoration: underline;
  }
  .video-list {
    width: 100%;
    height: 680px;
    margin-bottom: 33px;
    overflow: auto;
  }
  .video-list li {
    position: relative;
    float: left;
    width: 25%;
    height: 226px;
    .header-bar {
      position: absolute;
      width: 100%;
      height: 40px;
      line-height: 40px;
      color: #fff;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.65);
      z-index: 100;
      b,
      i {
        font-style: normal;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      b {
        float: left;
        width: 50%;
        text-indent: 15px;
      }
      i {
        float: right;
        text-align: right;
        padding-right: 5px;
      }
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .page {
    text-align: center;
  }
}
.full-screen {
  .video-list {
    height: 780px;
  }
  .video-list li {
    height: 260px;
  }
}
</style>
