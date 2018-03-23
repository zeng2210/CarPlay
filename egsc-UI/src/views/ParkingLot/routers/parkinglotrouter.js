import Vue from 'vue'
import Router from 'vue-router'
// 引用pages
// import demoindex from '@/views/demo/index'
import ParkingLotIndex from '@/views/ParkingLot/ParkingLotIndex'
import test from '@/views/ParkingLot/test'

Vue.use(Router)
// 定义路由路径数组列表
export default[
  {
    path: '/parkinglot',
    name: 'ParkingLotIndex',
    component: ParkingLotIndex
  }
]
