<template>
  <!-- 解除预警对话框 -->
  <el-dialog title="解除警报" :visible="isWarnShow" append-to-body class="inner-dialog" top="18vh" :show-close="false">
    <div class="lift-reason-box">
      <textarea name="liftReason" placeholder="请输入解除警报原因" v-model.trim='liftReason'></textarea>
    </div>
    <div class="lift-btn-box">
      <el-button class="cancle-btn" @click="closeEvent">取消</el-button>
      <el-button type="primary" class="confirm-btn" @click="confirmLift(liftReason)">确认解除</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { releaseAlarm } from '../apis/index'
export default {
  name: 'DismissWarnDialog',
  props: {
    isWarnShow: {
      type: Boolean,
      required: true,
      default () {
        return false
      }
    },
    dissmissType: {
      type: String,
      required: false,
      default () {
        return ''
      }
    },
    dismissArray: {
      type: Array,
      required: false,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      liftReason: '' // 解除预警原因
    }
  },
  methods: {
    // 取消
    closeEvent () {
      this.liftReason = ''
      this.$emit('closeWarn')
    },
    // 解除预警
    confirmLift (liftReason) {
      // 校验
      var a = /^\s+$/gi.test(liftReason) || liftReason.length === 0
      if (!a) {
        if (liftReason.length >= 256) {
          this.$message({
            message: '取消预警原因文本长度不能超过256',
            type: 'warning',
            center: true
          })
          return
        }
        // 组装传给后台的解除预警数据
        let idArr = []
        for (let v of this.dismissArray) {
          idArr.push(v.alarmId)
        }
        let type = -1
        if (this.dissmissType === 'parkinglotoccupied') {
          type = 1
        } else if (this.dissmissType === 'carexception') {
          type = 2
        } else if (this.dissmissType === 'parkTimeEnd') {
          type = 3
        } else if (this.dissmissType === 'parkingArrears') {
          type = 4
        }
        let warnStatusData = {
          type: type,
          idList: idArr,
          reason: this.liftReason
        }
        this.liftReason = ''
        this.$emit('closeWarn')
        this.$emit('closeParent')
        releaseAlarm(warnStatusData).then(res => {
          this.$emit('dismissWarnSucc', res.code)
        })
      } else {
        this.$message({
          message: '请输入解除警报原因',
          type: 'warning',
          center: true
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import url("../assets/css/dismissWarnDialog.less");
</style>
