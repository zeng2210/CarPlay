<template>
  <el-dialog
    title="发送消息"
    :visible="visible"
    width="400px"
    @close="close()"
    center>
    <el-input
      type="textarea"
      :rows="5"
      :maxlength="256"
      placeholder="请输入消息内容"
      v-model="msg">
    </el-input>
    <span slot="footer" class="dialog-footer">
    <el-button @click="close()">&nbsp;取&nbsp;&nbsp;&nbsp;&nbsp;消&nbsp;</el-button>
    <el-button type="primary" @click="sendMsg()">确认发送</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {sendMessage} from '../apis'
export default {
  name: 'send-msg-dialog',
  props: {
    visible: {
      require: true,
      type: Boolean,
      default: false
    },
    deviceId: {
      require: true
    }
  },
  data: function () {
    return {
      msg: ''
    }
  },
  methods: {
    close() {
      this.$emit('closeMsgDialog')
      this.msg = ''
    },
    sendMsg() {
      if (this.msg.trim() === '') {
        this.$message.error('请输入消息内容')
        return
      }
      console.log('send msg： ' + this.deviceId + ' : ' + this.msg)
      sendMessage(this.deviceId, this.msg).then(
        function () {
          this.$message.success('发送成功')
          this.$emit('closeMsgDialog')
        }.bind(this)
      ).catch(
        function () {
          this.$message.error('发送消息失败')
        }.bind(this))
    }
  }
}
</script>

<style scoped>

</style>
