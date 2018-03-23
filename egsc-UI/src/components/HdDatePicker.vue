<template>
  <div class="container">
    <el-date-picker
      v-model="start"
      type="date"
      :change="onStartChange()"
      :picker-options="startOptions"
      :popper-class="poperClassName"
      placeholder="开始日期">
    </el-date-picker>
    <span>-</span>
    <el-date-picker
      ref="endPicker"
      v-model="end"
      type="date"
      :readonly="endReadOnly"
      :picker-options="endOptions"
      :popper-class="poperClassName"
      :change="onEndChange()"
      placeholder="结束日期">
    </el-date-picker>
    <span class="icon-calender">
      <img src="../assets/images/icon_calender.png" />
    </span>

    <!--
    <el-date-picker v-model="range"
                    type="datetimerange"
                    :editable="editable"
                    range-separator="-"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="small"
                    :unlink-panels="true"
                    :picker-options="pickerOptions">
    </el-date-picker>
    -->
  </div>
</template>

<script>
export default {
  name: 'hd-date-picker',
  props: {
    result: {
      type: Array,
      required: true,
      default: ['', '']
    }
  },
  data () {
    return {
      start: null,
      end: null,
      endOptions: {},
      startOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      endReadOnly: false,
      poperClassName: 'date-panel'
    }
  },
  methods: {
    onStartChange() {
      if (this.start !== null) {
        this.$refs.endPicker.focus()
        this.result[0] = this.formatDate(this.start, 'yyyy-MM-dd') + ' 00:00:00'
      } else {
        this.end = null
        this.result[0] = ''
      }
    },
    onEndChange() {
      if (this.end !== null) {
        if (this.formatDate(new Date(), 'yyyy-MM-dd') === this.formatDate(this.end, 'yyyy-MM-dd')) {
          this.result[1] = this.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
        } else {
          this.result[1] = this.formatDate(this.end, 'yyyy-MM-dd') + ' 23:59:59'
        }
      } else {
        this.result[1] = ''
      }
    },
    formatDate(date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
        }
      }
      return fmt
    },
    padLeftZero(str) {
      return ('00' + str).substr(str.length)
    }
  },
  watch: {
    start (startTime) {
      if (startTime === null) {
        this.endOptions = {
          disabledDate(time) {
            return false
          }
        }
      } else {
        this.endOptions = {
          disabledDate(time) {
            return (time.getTime() <= startTime.getTime()) || (time.getTime() > Date.now())
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 32px;
  line-height: 32px !important;
  border: 1px solid #c7d1d9 !important;
  border-radius: 2px;
  font-size: 14px;
  margin-top: 3px;

  .el-input {
    padding: 0 !important;
    width: 125px !important;
  }

  .el-input /deep/ input::-ms-clear {
    display: none;
  }

  .el-input /deep/ .el-input__prefix {
    display: none !important;
  }

  .el-input /deep/ .el-input__inner {
    border: 0px none transparent !important;
    padding-left: 15px;
    /*padding-right: 10px;*/
    height: 32px;
  }

  .el-input /deep/ .el-input__suffix {
    margin-top: -3px !important;
    /*display: none !important;*/
  }

  .icon {
    margin-right: 10px;
  }

  .icon-calender {
    margin-right: 10px;

    img {
      width: 22px;
      height: 22px;
      margin-bottom: -5px;
    }
  }
}
</style>
