<template>
  <div>
    <div class="title">{{msg}}</div>
    <div ref='ageChart' class="ageChart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getGenderList } from '../apis/index'
export default {
  name: 'age-range-report',
  data () {
    return {
      msg: '年龄范围',
      AgeData: [],
      obj: {}
    }
  },
  mounted () {
    getGenderList().then(res => {
      this.obj.name = '66以上'
      this.obj.value = res.data.oldMan
      this.AgeData.push(this.obj)
      this.obj = {}
      this.obj.name = '41-65'
      this.obj.value = res.data.middleMan
      this.AgeData.push(this.obj)
      this.obj = {}
      this.obj.name = '18-40'
      this.obj.value = res.data.youthMan
      this.AgeData.push(this.obj)
      this.obj = {}
      this.obj.name = '8-17'
      this.obj.value = res.data.juvenile
      this.AgeData.push(this.obj)
      this.obj = {}
      this.obj.name = '0-7'
      this.obj.value = res.data.children
      this.AgeData.push(this.obj)
      console.log(this.AgeData)
      this.initEchart()
    })
  },
  methods: {
    initEchart: function () {
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{c}'
        },
        grid: {
          left: '10%',
          right: '20%',
          bottom: '20%',
          containLabel: true
        },
        color: ['#5E90FF'],
        xAxis: {
          type: 'value',
          name: '(人)',
          nameLocation: 'end',
          splitLine: {show: false},   // 去除网格线
          minInterval: 10,
          boundaryGap: [0, 0.01],
          splitNumber: 4
        },
        yAxis: {
          type: 'category',
          name: '年龄(岁)',
          nameLocation: 'end',
          axisTick: {alignWithLabel: true},
          splitLine: {show: true},   // 网格线
          data: ['66以上', '41-65', '18-40', '8-17', '0-7']
        },
        series: [
          {
            name: this.msg,
            barWidth: 20,             // 固定柱子宽度
            type: 'bar',
            label: {
              normal: {
                show: false
              }
            },
            data: this.AgeData
          }
        ]
      }
      this.charts = echarts.init(this.$refs.ageChart)
      this.charts.setOption(option)
    }
  }
}
</script>

<style scoped>
.title{
  font-weight: bold;
  margin-top: 25px;
  margin-left: 25px
}
.ageChart{
  width:400px;
  height:400px;
}
</style>
