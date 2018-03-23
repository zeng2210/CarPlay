import Vue from 'vue'
import Router from 'vue-router'
// 路由文件，引用各业务模块路由

// 引入各业务模块路由数据

// 引用pages
import HomePage from '@/views/Home/HomePage'
import EntranceRamp from '@/views/EntranceRamp/EntranceRampIndex'
import Monitor from '@/views/Monitor/MonitorIndex'
// import Report from '@/views/Report/Report'
// import MonitorSubRouter from '@/views/Monitor/routers/monitorrouter'
import ParkingLot from '@/views/ParkingLot/ParkingLotIndex'
import PeopleMgmt from '@/views/PeopleMgmt/PeopleMgmtIndex'
// import PeopleMgmtRouter from '@/views/PeopleMgmt/routers/peoplemgmtrouter'
import Search from '@/views/Search/SearchIndex'
import SearchSubRouter from '@/views/Search/routers/index'
import Report from '@/views/Report/Report'
import GlobalComponents from '@/views/GlobalComponentsDemo/index'
import VideoTest from '@/views/GlobalComponentsDemo/VideoTest'
// 门禁
import AccessControlApp from '@/views/AccessControlApp/index'
import BuildPlan from '@/views/Home/BuildPlan'
// 门禁道闸
// import DoorAccess from '@/views/DoorAccess/DoorAccessIndex'
// 配置路由
Vue.use(Router)
// 定义路由实例
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/entranceramp',
      name: 'EntranceRamp',
      component: EntranceRamp
    },
    {
      path: '/monitor',
      name: 'Monitor',
      component: Monitor
      // , children: [...MonitorSubRouter]
    },
    {
      path: '/parkinglot',
      name: 'ParkingLot',
      component: ParkingLot
    },
    {
      path: '/peoplemgmt',
      name: 'PeopleMgmt',
      component: PeopleMgmt
      // children: [...PeopleMgmtRouter]
    },
    {
      path: '/search',
      component: Search,
      children: [...SearchSubRouter]
    },
    {
      path: '/report',
      name: Report,
      component: Report
    },
    {
      path: '/globalComponents',
      name: 'GlobalComponents',
      component: GlobalComponents
    },
    {
      path: '/VideoTest',
      name: 'VideoTest',
      component: VideoTest
    },
    {
      path: '/accessControlApp',
      name: 'AccessControlApp',
      component: AccessControlApp
    },
    {
      path: '/buildplan',
      name: 'BuildPlan',
      component: BuildPlan
    }
  ]
})
