import Vue from 'vue'
import Router from 'vue-router'
// 引用pages
import EntranceRampIndex from '@/views/EntranceRamp/EntranceRampIndex'

Vue.use(Router)
// 定义路由路径数组列表
export default[
  {
    path: '/entranceramp',
    name: 'EntranceRampIndex',
    component: EntranceRampIndex
  }
]
