export const options = {
  tooltip: { show: false },
  color: ['#4C84FF', '#4ED8DA', '#5A6B78', '#FFD100', '#77CD48'],
  title: {
    text: 0,
    textStyle: {
      color: '#5A6B78',
      fontWeight: 500
    },
    subtext: '已处理异常',
    subtextStyle: {
      color: '#5b6c79',
      fontSize: 14,
      fontWeight: 'normal'
    },
    x: 'center',
    y: '40%'
  },
  series: [
    {
      type: 'pie',
      radius: ['65%', '88%'],
      avoidLabelOverlap: false,
      label: { normal: { show: false }, emphasis: { show: false } },
      labelLine: { normal: { show: false } },
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ]
    }
  ]
}
