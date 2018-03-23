<template>
  <div class="face-recognition">
    <ul class="face-scroll-bar">
      <li v-for="(item , index) in faceEventListphoto" :key="index">
        <img :src="item.facePicUrl" @click="openSearchDialog(item.facePicUrl)">
      </li>
    </ul>
    <!--
    <div class="btn-load-more" @click="eventList">加载更多</div>
    -->
  </div>
</template>
 <script>
import PerfectScrollbar from 'perfect-scrollbar'
import { getFaceEventData } from '../apis/index'
import { getWebSocketUrl } from '../assets/js/index'
import SockJS from 'sockjs-client'
import { mapActions } from 'vuex'
export default {
  name: 'faceRecognition',
  props: {
    cameraId: String
  },
  data () {
    return {
      returnStatus: false,
      currentPage: 1,
      hasNext: false,
      faceEventListphoto: [],
      pageSize: 12,
      timeStamp: null, // 滚动加载的时间戳
      websocket: null,
      reconnectTime: 0,
      reconnectHandle: null,
      scrollbar: null,
      scrollbarDom: null
    }
  },
  mounted () {
    this.scrollbarDom = document.querySelector('.face-recognition .face-scroll-bar')
    this.scrollbar = new PerfectScrollbar(this.scrollbarDom)
  },
  methods: {
    ...mapActions(['setReturnFunc']),
    // 创建webscocket
    createWebsocket () {
      this.websocket = new SockJS('http://' + this.socketUrl + '/sockjs/readData')
      this.websocket.onopen = event => {
        this.reconnectTime = 0
      }
      this.websocket.onmessage = this.handleMessage
      this.websocket.onclose = event => {
        this.reconnectHandle = window.setTimeout(() => {
          if (this.reconnectTime < 5) {
            this.reconnectTime++
            this.createWebsocket()
          }
        }, 1000)
      }
    },
    // websocket需要操作的数据
    handleMessage (event) {
      try {
        let subData = JSON.parse(event.data).data
        if (subData.info) {
          let subInfoData = JSON.parse(subData.info)
          if (subData.type === '20113' && subInfoData && subInfoData.cameraCode === this.cameraId) {
            this.faceEventListphoto.unshift(JSON.parse(subData.info))
            this.scrollbar.update()
          }
        }
      } catch (err) {

      }
    },
    // 窗口打开时操作
    onDialogOpen () {
      this.currentPage = 1
      this.createWebsocket()
      this.faceEventListphoto = []
      this.$nextTick(() => {
        this.scrollbarDom.scrollTop = 0
        this.addScrollEvent()
        this.eventList()
      })
    },
    // 窗口关闭时操作
    onDialogClose () {
      if (this.websocket) {
        this.websocket.onclose = null
        this.websocket.close()
        if (this.reconnectHandle) {
          window.clearTimeout(this.reconnectHandle)
        }
        this.websocket = null
      }
      this.faceEventListphoto = []
      this.reconnectTime = 0
      this.timeStamp = null
      this.removeScrollEvent()
    },
    // 滚动事件下拉加载
    onScroll () {
      if (this.returnStatus) {
        if (this.hasNext) {
          this.currentPage++
          this.eventList()
        }
      }
    },
    // 邦定滚动事件
    addScrollEvent () {
      this.scrollbarDom.addEventListener('ps-y-reach-end', this.onScroll)
    },
    // 解除滚动事件
    removeScrollEvent () {
      this.scrollbarDom.removeEventListener('ps-y-reach-end', this.onScroll)
    },
    // 滚动条
    eventList () {
      this.returnStatus = false
      let param = {
        cameraCode: this.cameraId,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        timeStamp: this.timeStamp
      }
      getFaceEventData(param).then(res => {
        if (res.data.code === '200') {
          this.timeStamp = res.data.timeStamp
          this.faceEventListphoto.push.apply(this.faceEventListphoto, res.data.data.rows)
          this.hasNext = res.data.data.hasNext
          this.$nextTick(() => {
            this.returnStatus = true
            this.scrollbar.update()
          })
        }
      })
    },
    openSearchDialog (imageUrl) { // 跳转到图片搜索页面
      this.setReturnFunc(null)
      this.$router.push({
        path: '/search/pic',
        query: {
          imageUrl: imageUrl
        }
      })
    }
  },
  computed: {
    socketUrl: getWebSocketUrl
  }
}
</script>
<style lang="less" scoped>
.face-recognition {
  width: 182px;
  height: 594px;
  float: right;
  position: relative;
  li {
    width: 130px;
    height: 130px;
    margin: 0 auto;
    margin-bottom: 24px;
    img {
      width: 130px;
      height: 130px;
    }
    overflow: hidden;
  }
  li:last-child {
    margin-bottom: 0;
  }
  .face-scroll-bar {
    height: 594px;
    position: relative;
  }
  .btn-load-more {
    position: absolute;
    top: 0px;
  }
}
</style>




