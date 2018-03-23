 <template>
  <div :class="fullScreen?'all-video-style full-screen':'all-video-style'">
    <div v-if="ocxShow">
      <object classid="clsid:d97c5a6f-1b81-4ccc-8c3f-1c9860e57567" ref="previewOcx" class="ocx-video" v-show="showMulti"> </object>
      <el-pagination background layout="prev, pager, next" :page-size="query.pageSize" @current-change="handleCurrentChange" :total="query.total"></el-pagination>
    </div>
    <div class="loading" v-else>
      <!-- 加载失败 -->
      <download-ocx></download-ocx>
    </div>
  </div>
</template>
<script>
import {
  getCustomVideoData
} from '../apis/index.js'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('monitor')
export default {
  name: 'customVideo',
  props: {
    fullScreen: Boolean
  },
  data () {
    return {
      query: {
        pageNo: 1,
        pageSize: 12,
        total: 0
      },
      videoParams: [],
      ocxShow: true,
      showMulti: true,
      customVideogroupId: '',
      arrowPic: require('../assets/images/left_u15682.png')
    }
  },
  mounted () {
    this.initOcx()
    window.onbeforeunload = () => {
      this.releaseOcx()
    }
  },
  beforeDestroy () {
    console.log('销毁')
    this.customVideogroupId = ''
    this.releaseOcx()
  },
  methods: {
    ...mapMutations(['UPDATE_ASIDE_LOADING']),
    // ocx初始化
    initOcx () {
      this.$nextTick(() => {
        try {
          let Plugin = this.$refs.previewOcx
          Plugin.OCX_SetFrame(JSON.stringify({
            cmd: 1,
            showMode: 1,
            width: 1344,
            height: 690
          }))
          Plugin.OCX_SetCallback((data) => { this.ocxCallBack(data) })
        } catch (e) {
          this.ocxShow = false
        }
      })
    },
    // 分页
    handleCurrentChange (val) {
      this.query.pageNo = val
      this.getVideoParams(this.customVideogroupId)
    },
    // 获取视频数据
    getVideoParams (groupId) {
      this.customVideogroupId = groupId
      this.closePreview()
      this.UPDATE_ASIDE_LOADING(true)
      getCustomVideoData(Object.assign({ customGroupId: groupId }, this.query)).then(res => {
        // this.UPDATE_ASIDE_LOADING(false)
        let data = res.data.data
        this.query = {
          pageNo: data.pageNo,
          pageSize: data.pageSize,
          total: data.total
        }
        this.videoParams = data.rows.map((item) => {
          return {
            // 先用主id ， 后面用子id
            deviceID: item.subDeviceID,
            parentID: item.parentID,
            mediaIP: item.mediaIp,
            mediaPort: item.mediaPort,
            streamProfile: 1
          }
        })
        setTimeout(() => {
          this.$nextTick(() => {
            this.playPreview()
            this.UPDATE_ASIDE_LOADING(false)
          })
        }, 2000)
      }, () => {
        this.UPDATE_ASIDE_LOADING(false)
      })
    },
    // 回到多屏
    returnShowMulti () {
      this.showMulti = true
    },
    // 预览
    playPreview () {
      try {
        let Plugin = this.$refs.previewOcx
        Plugin.OCX_InformExe(JSON.stringify({ cmd: 2, data: this.videoParams }))
      } catch (e) {
      }
    },
    // 停止预览
    closePreview () {
      try {
        let Plugin = this.$refs.previewOcx
        Plugin.OCX_InformExe(JSON.stringify({ cmd: 3, data: this.videoParams }))
      } catch (e) {
      }
    },
    // 跳转到单屏时发送消息
    playSinglePreview (data) {
      this.showMulti = false
      this.$emit('multi2single', data)
    },
    // ocx回调
    ocxCallBack (data) {
      window.focus()
      let callBackdata = JSON.parse(data)
      switch (callBackdata.cmd) {
        case 5:
          this.playSinglePreview(callBackdata.deviceId)
          break
        case 12:
          this.UPDATE_ASIDE_LOADING(false)
          break
      }
    },
    // releaseOCX
    releaseOcx () {
      try {
        let Plugin = this.$refs.previewOcx
        Plugin.OCX_CloseFrame(JSON.stringify({ cmd: 9 }))
      } catch (e) { }
    }
  }
}
</script>
<style lang="less" scoped>
.all-video-style {
  width: 1345px;
  overflow: hidden;
  position: relative;
  /* 高清和标清选择样式 */
  .pixel-choose {
    text-align: center;
    position: absolute;
    right: 1%;
    bottom: 20px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #e4e7ed;
    background-color: #f5f7fa;
    border-radius: 3px;
    width: 130px;
    padding-left: 15px;
    overflow: hidden;
    /* 动画属性 */
    transition: all 1s;
  }
  .pixel-choose li {
    position: relative;
    float: left;
    margin-left: 20px;
    transition: all 1s;
  }
  .pixel-choose a {
    margin-top: 2px;
    float: left;
  }
  .conceal-box {
    width: 200px;
  }
  /* 动画 */
  .pixel-choose-active {
    width: 80px;
  }
  /* 动画图片旋转 */
  .pixel-choose img {
    transition: all 1s;
  }
  /* 文字颜色 */
  .colorChange {
    color: #59abe0;
  }
  /* 文字消失 */
  .disappear {
    opacity: 0;
    display: none;
  }
  /* 图片旋转 */
  .img-rotate-active {
    transform: rotateZ(180deg);
  }
  /* 颜色添加 */
  .text-color-active {
    color: #59abe0;
  }
  .text-color-active {
    color: #59abe0;
  }
  .ocx-video {
    width: 1345px;
    height: 690px;
    margin-bottom: 30px;
  }
}
.loading {
  width: 1345px;
  height: 690px;
}
.full-screen {
  margin-top: 26px;
  .ocx-video {
    margin-bottom: 58px;
  }
}
</style>
<style lang="less" >
.all-video-style {
  .el-pagination {
    text-align: center;
  }
}
</style>
