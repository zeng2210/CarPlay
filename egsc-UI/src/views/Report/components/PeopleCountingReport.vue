<template>
  <div class="people-count">
    <section ref="peopleCharge" class="chart-cont"></section>
    <ul class="tab-list">
        <li v-for="(item, index) in tabItems" :key="item.id" v-text="item" :class="{current:index==nowIndex}" @click="tabList(index)"></li>
    </ul>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getData } from '@/views/Report/apis/index.js'
export default {
  name: 'people-counting-report',
  data() {
    return {
      nowIndex: 0,
      tabItems: ['今天', '昨天', '最近7天', '最近1个月'],
      colors: ['#5793f3', '#d14a61'],
      reportData: undefined,
      inNum: [],
      outNum: [],
      timeData: []
    }
  },
  mounted () {
    this.loadPeopleData()
  },
  methods: {
    loadPeopleData () {
      getData().then(res => {
        let code = res.code
        if (code === '00000') {
          this.reportData = res.data
        } else {
          this.$message({
            type: 'warning',
            message: '查询报表数据异常，错误码:' + res.code
          })
        }
        this.tabList(0)
      })
    },
    tabList: function (index) {
      this.nowIndex = index
      if (index === 0) {
        // 初始化今天横轴
        this.timeData = this.getXbyType(index)
        this.inNum = this.reportData.todayIn
        this.outNum = this.reportData.todayOut
      } else if (index === 1) {
        // 初始化昨天横轴
        this.timeData = this.getXbyType(index)
        this.inNum = this.reportData.yesterdayIn
        this.outNum = this.reportData.yesterdayOut
      } else if (index === 2) {
        // 初始化最近7天横轴
        this.timeData = this.getXbyType(index)
        this.inNum = this.reportData.recent7In
        this.outNum = this.reportData.recent7Out
      } else if (index === 3) {
        // 初始化最近1个月横轴
        this.timeData = this.getXbyType(index)
        this.inNum = this.reportData.recentMonthIn
        this.outNum = this.reportData.recentMonthOut
      }
      this.initChart()
    },
    getXbyType (type) {
      let timeData = []
      switch (type) {
        case 0:
          let currentHour = (new Date()).getHours()
          for (let i = 1; i <= currentHour; i++) {
            let hour = i < 10 ? '0' + i + ':00' : i + ':00'
            timeData.push(hour)
          }
          break
        case 1:
          for (let i = 1; i <= 24; i++) {
            let hour = i < 10 ? '0' + i + ':00' : i + ':00'
            timeData.push(hour)
          }
          break
        case 2:
          let myDate = new Date()
          myDate.setDate(myDate.getDate() - 7)
          for (let i = 0; i < 7; i++) {
            let tempDate = (myDate.getMonth() + 1) + '-' + myDate.getDate()
            timeData.push(tempDate)
            myDate.setDate(myDate.getDate() + 1)
          }
          break
        case 3:
          let myMonthDate = new Date()
          myMonthDate.setDate(myMonthDate.getDate() - 30)
          for (let i = 0; i < 30; i++) {
            let tempDate = (myMonthDate.getMonth() + 1) + '-' + myMonthDate.getDate()
            timeData.push(tempDate)
            myMonthDate.setDate(myMonthDate.getDate() + 1)
          }
          break
        default:
          break
      }
      return timeData
    },
    initChart () {
      echarts.init(this.$refs.peopleCharge).setOption({
        title: {
          text: '人行流量',
          top: 30,
          left: 30,
          textStyle: {
            color: '#5a6b78',
            fontWeight: 'normal',
            fontSize: '18'
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
          data: this.inNum
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
          data: this.outNum
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
.people-count{
  position: relative;
}
.tab-list {
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
