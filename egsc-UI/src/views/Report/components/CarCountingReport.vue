<template>
    <div class="car-count">
      <!-- <p class="title">{{msg}}</p> -->
      <section id="chart" class="chart-cont"></section>
      <ul class="tab-list"><li v-for="(item, index) in tabItems" :key="item.id" v-text="item" :class="{current:index==nowIndex}" @click="tabList(index)"></li></ul>
    </div>

</template>

<script>
import echarts from 'echarts'
import { getCarTraffic } from '@/views/Report/apis/index.js'
export default {
  name: 'car-counting-report',
  data() {
    return {
      nowIndex: 0,
      tabItems: ['今天', '昨天', '最近7天', '最近1个月'],
      reportData: '',
      outParkNum: [],
      inParkNum: [],
      timeData: []
    }
  },
  mounted () {
    this.loadCarData()
  },
  methods: {
    loadCarData () {
      let _this = this
      getCarTraffic().then(res => {
        _this.reportData = JSON.parse(res.data)[0]
        this.todayData()
      })
    },
    tabList: function (index) {
      this.nowIndex = index
      if (index === 0) {
        this.todayData()
      } else if (index === 1) {
        this.yestaData()
      } else if (index === 2) {
        this.inParkNum = this.reportData.recent7.inParkNum
        this.outParkNum = this.reportData.recent7.outParkNum
        this.timeData = this.reportData.recent7.statDate
        this.initChart()
      } else if (index === 3) {
        this.inParkNum = this.reportData.recentMonth.inParkNum
        this.outParkNum = this.reportData.recentMonth.outParkNum
        this.timeData = this.reportData.recentMonth.statDate
        this.initChart()
      }
    },
    todayData () {
      this.inParkNum = this.reportData.today.inParkNum
      this.outParkNum = this.reportData.today.outParkNum
      this.timeData = this.hourData(this.reportData.today.statHour)
      this.initChart()
    },
    yestaData () {
      this.inParkNum = this.reportData.yesterday.inParkNum
      this.outParkNum = this.reportData.yesterday.outParkNum
      this.timeData = this.hourData(this.reportData.yesterday.statHour)
      this.initChart()
    },
    hourData (dataHoures) {
      let hours = []
      for (let time of dataHoures) {
        hours.push(time + ':00')
      }
      return hours
    },
    initChart () {
      echarts.init(document.getElementById('chart')).setOption({
        title: {
          text: '车行流量',
          top: 30,
          left: 30,
          textStyle: {
            color: '#5a6b78',
            fontWeight: 'normal',
            fontSize: '20'
          }
        },
        color: ['#4ed8da', '#4c84ff'],
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          data: [{
            name: '进园流量',
            icon: 'circle',
            textStyle: {
              color: '#4ed8da'
            }
          }, {
            name: '出园流量',
            icon: 'circle',
            textStyle: {
              color: '#4c84ff'
            }
          }],
          right: 80,
          top: 80
        },
        grid: {
          top: 140,
          left: 30,
          right: 40,
          bottom: 24,
          borderColor: '#000',
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        xAxis: {
          nameLocation: 'center',
          nameGap: 50,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#e6e6e6', // 左边线的颜色
              width: '1' // 坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: '#5a6b78'  // 坐标值得具体的颜色
            },
            show: true
          },
          axisTick: false,
          data: this.timeData
        },
        yAxis: {
          axisTick: false,
          axisLine: {show: false},
          show: true,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'solid',
              color: '#e6e6e6', // 左边线的颜色
              width: '1' // 坐标线的宽度
            }
          }
        },
        series: [{
          name: '进园流量',
          type: 'line',
          symbolSize: 0,
          stack: '进园流量',
          smooth: true,
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#4ed8da' // 0% 处的颜色
                }, {
                  offset: 1, color: '#fff' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              opacity: 0.1
            }
          },
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#4ed8da'
              }
            }
          },
          data: this.inParkNum
        }, {
          name: '出园流量',
          type: 'line',
          symbolSize: 0,
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#4c84ff'
              }
            }
          },
          data: this.outParkNum
        }]
      })
    }
  }
}
</script>
<style lang="less" scoped>
.chart-cont{
  width: 710px;
  height: 410px;
}
.title{
  height: 85px;
  line-height: 85px;
  text-align: left;
  text-indent: 20px;
  font-size: 18px;
  color: #5b6c79;
}
.car-count{
  position: relative;
}
.tab-list{
  position: absolute;
  top: 76px;
  left: 10px;
  z-index: 99;
  li{
    display: inline-block;
    color: #5a6b78;
    font-size: 14px;
    padding:4px 10px;
    margin: 0 15px;
    cursor: pointer;
    &.current{
      border-bottom: 2px solid #4ed8da;
    }
  }
}
</style>

