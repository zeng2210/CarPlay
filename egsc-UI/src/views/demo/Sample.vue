<template>
  <div class="hello">
    <div style="margin: 20px 0;"></div>
    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="sendmsg">
    </el-input>
    <el-button type="primary" @click="sendMessage">发送</el-button>
    <div style="margin: 20px 0;"></div>
    <div style="margin: 20px 0;">{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to websocket! ',
      sendmsg: '',
      websocket: null,
      wspath: '127.0.0.1:9018/scp-websocketcomponent'
      // wspath: 'localhost:9018/scp-websocketcomponent'
      // wspath: 'egsc.hdsc.com:9018/scp-websocketcomponent'
    }
  },
  mounted () {
    this.loadWebsocket()
  },
  methods: {
    loadWebsocket () {
      this.websocket = new WebSocket('ws://' + this.wspath + '/webSocket/readData')
      this.websocket.onopen = () => {
        // Web Socket 已连接上，使用 send() 方法发送数据
        this.msg += 'WebSocket链接开始！\n'
        console.log('数据发送中...')
      }
      this.websocket.onmessage = evnt => {
        console.log('数据已接收...')
        this.msg += evnt.data + ' \n'
      }
      this.websocket.onclose = evnt => {
        // 关闭 websocket
        console.log('连接已关闭...')
        this.msg += 'WebSocket链接关闭！\n'
      }
      this.websocket.onerror = evnt => {
        //  链接出错
        console.log('链接出错...')
        this.msg += 'WebSocket链接出错！\n'
      }
      // 组件销毁时调用，中断websocket链接
      this.over = () => {
        this.websocket.close()
      }
      console.log(' this.msg: ' + this.msg)
    },
    sendMessage () {
      this.websocket.send(this.sendmsg)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  padding: 0;
  margin: 0;
  height: 100%;
}

h1,h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
