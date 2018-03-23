<template>
  <div class="container">
    <div class="report-item size1">
      <!-- 男女比例 -->
      <gender-ratio-report></gender-ratio-report>
    </div>
    <div class="report-item size2">
      <!-- 人行流量 -->
      <people-counting-report></people-counting-report>
    </div>
    <div class="report-item size2">
      <!-- 车位信息 -->
      <carport-report></carport-report>
    </div>
    <div class="report-item size1">
      <!-- 年龄范围 -->
      <age-range-report></age-range-report>
    </div>
    <div class="report-item size2">
      <!-- 车行流量 -->
      <car-counting-report></car-counting-report>
    </div>
    <div class="report-item size2">
      <!-- 保驾护航 -->
      <warming-statistics-report></warming-statistics-report>
    </div>
  </div>
</template>

<script>
import GenderRatioReport from './components/GenderRatioReport'
import PeopleCountingReport from './components/PeopleCountingReport'
import CarportReport from './components/CarportReport'
import AgeRangeReport from './components/AgeRangeReport'
import CarCountingReport from './components/CarCountingReport'
import WarmingStatisticsReport from './components/WarmingStatisticsReport'

export default {
  components: {
    WarmingStatisticsReport,
    CarCountingReport,
    AgeRangeReport,
    CarportReport,
    PeopleCountingReport,
    GenderRatioReport
  }
}
</script>

<style scoped>

.container {
  background-color: #F1F3F4;
  min-height: 869px;
  height: auto;
  display: flex;
  padding: 0px 10px;
  justify-content: space-around;
  flex-wrap: wrap;
}
.report-item {
  background:#ffffff;
  border-radius:6px;
  margin-top: 10px;
  height:418px;
}
.size1 {
  width:400px;
}
.size2 {
  width:714px;
}
</style>
