<template>
  <div :style="layout">
    <div class="abnormal-pie-title">
      已为您保驾护航
      <span>{{abnormalData.continueDays}}</span>天
    </div>
    <div class="abnormal-pie-box" :style="pieLayout">
      <div class="abnormal-pie" ref="abnormalPie"></div>
      <ul class="abnormal-legend">
        <li v-for="(item,index) in abnormalData.abnormalEvents" :key="index">
          <span class="loop-legend" :style="{backgroundColor: item.color}">
            <span></span>
          </span>
          <strong>{{item.name}}</strong>
          <i>{{item.percent}}%</i>
          <b>{{item.count}} 件</b>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import echart from 'echarts'
import { getAbnormalEventPie } from '../src/apis/index'
import { options } from './pieOption'
export default {
  name: 'AbnormalEventPie',
  props: {
    width: {
      type: Number,
      default: 710
    },
    height: {
      type: Number,
      default: 410
    }
  },
  data () {
    return {
      layout: { width: this.width + 'px', height: this.height + 'px' },
      pieLayout: { width: this.width + 'px', height: (this.height - 85) + 'px' },
      abnormalData: {
        managedEvent: 0,
        continueDays: 0,
        abnormalEvents: []
      },
      options: options,
      echartInit: {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.echartInit = echart.init(this.$refs.abnormalPie)
      this.getData()
    })
  },
  methods: {
    getData () {
      getAbnormalEventPie().then((rs) => {
        if (rs.data.code === '200') {
          this.options.title.text = rs.data.data.managedEvent
          this.abnormalData = rs.data.data
          this.formatOptions()
          // console.log(this.options)
          this.echartInit.setOption(this.options)
        }
      })
    },
    formatOptions () {
      this.options.color = []
      this.options.series[0].data = []
      this.abnormalData.abnormalEvents.forEach((item) => {
        this.options.color.push(item.color)
        this.options.series[0].data.push({
          name: item.name,
          value: item.percent
        })
      })
    },
    resize () {
      this.echartInit.resize()
    }
  }
}
</script>
<style lang="less" scoped>
.abnormal-pie-title {
  height: 85px;
  line-height: 85px;
  text-align: left;
  text-indent: 20px;
  font-size: 18px;
  color: #5b6c79;
  span {
    color: #5389ff;
    margin: 0 5px;
  }
}
.abnormal-pie-box {
  border-top: 2px solid #e5e9ed;
  padding-left: 20px;
  box-sizing: border-box;
  .abnormal-pie {
    float: left;
    width: 250px;
    height: 100%;
  }
  .abnormal-legend {
    float: left;
    width: 350px;
    height: 100%;
    text-align: left;
    box-sizing: border-box;
    padding: 80px 0 0 40px;
    color: #5b6c79;
    li {
      display: block;
      height: 30px;
      line-height: 30px;
    }
    .loop-legend {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 6px;
      position: relative;
      span {
        display: inline-block;
        position: absolute;
        left: 2px;
        top: 2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background-color: #fff;
        z-index: 10;
      }
    }
    strong {
      font-weight: 400;
      display: inline-block;
      width: 100px;
      margin: 0 20px;
    }
    i {
      font-style: normal;
      display: inline-block;
      width: 50px;
      margin-right: 20px;
    }
    b {
      font-weight: 400;
      display: inline-block;
    }
  }
}
</style>
