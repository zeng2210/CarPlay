<template>
  <div>
    <div class="title">{{msg}}</div>
    <div ref='genderChart' class="genderChart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getGenderList } from '../apis/index'
export default {
  name: 'gender-ratio-report',
  data() {
    return {
      GenderData: {},
      msg: '男女比例',
      title: '',
      subtitle: '小区总住户',
      br: '   ',
      percent: {}
    }
  },
  mounted() {
    getGenderList().then(res => {
      this.GenderData.man = res.data.man
      this.GenderData.woman = res.data.woman
      this.title = res.data.man + res.data.woman

      this.initEchart()
    })
  },
  methods: {
    initEchart: function () {
      var option = {
        title: {
          text: this.title,
          textStyle: {
            fontSize: '18'
          },
          subtext: this.subtitle,
          subtextStyle: {
            fontSize: '18'
          },
          left: 'center',
          top: '42%'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'center',
          y: 'bottom',
          textStyle: {
            fontSize: '16'
          },
          data: [
            {
              name: '男性',
              icon: 'circle'
            },
            {
              name: '女性',
              icon: 'circle'
            }
          ],
          formatter: function (e) {
            var total = 0
            for (var i = 0; i < option.series[0].data.length; i++) {
              total += option.series[0].data[i].value
            }
            for (i = 0; i < option.series[0].data.length; i++) {
              var ePercent = (option.series[0].data[i].value / total * 100).toFixed(2) + '%'
              if (option.series[0].data[i].name === e) {
                return e + '      ' + ePercent + '      ' + option.series[0].data[i].value
              }
            }
          }
        },
        color: ['#61a0a8', '#c23531'],
        series: [
          {
            name: this.msg,
            type: 'pie',
            radius: ['45%', '58%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: this.GenderData.man, name: '男性' },
              { value: this.GenderData.woman, name: '女性' }
            ]
          }]
      }
      this.charts = echarts.init(this.$refs.genderChart)
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
.genderChart{
  width:400px;
  height:350px
}
</style>
