// 引用pages
// import demoindex from '@/views/demo/index'
import abnormalVideo from '../components/AbnormalVideo.vue'
import allVideo from '../components/AllVideo.vue'
import customVideo from '../components/CustomVideo.vue'
import thePanoramic from '../components/ThePanoramic.vue'

// 定义路由路径数组列表
export default [
  {
    path: '/',
    name: 'allVideo',
    component: allVideo
  },
  {
    path: 'allvideo',
    name: 'allVideo',
    component: allVideo
  },
  {
    path: 'abnormalvideo',
    name: 'abnormalVideo',
    component: abnormalVideo
  },
  {
    path: 'thepanoramic',
    name: 'thePanoramic',
    component: thePanoramic
  },
  {
    path: 'customizevideo',
    name: 'customizeVideo',
    component: customVideo
  }
]
