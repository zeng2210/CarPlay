import SearchMain from '@/views/Search/SearchMain'
import PeopleResult from '@/views/Search/PeopleSearchResult'
import VideoResult from '@/views/Search/VideoSearchResult'
import PicResult from '@/views/Search/PicSearchResult'
import PicMoreCapt from '@/views/Search/PicMoreCapt'
import PicMoreFace from '@/views/Search/PicMoreFace'
import DeviceResult from '@/views/Search/DeviceSearchResult'
import CarResult from '@/views/Search/CarSearchResult'
import AllResult from '@/views/Search/AllResult'
import {CONFIG} from '../assets/js/config'

export default [
  {
    path: '/',
    redirect: CONFIG.ROUTE_PATH.MAIN
  },
  {
    path: CONFIG.ROUTE_PATH.MAIN, // 搜索的主页面
    name: CONFIG.ROUTE_NAME.MAIN,
    component: SearchMain
  },
  {
    path: CONFIG.ROUTE_PATH.CAMERA, // “找摄像头”的搜索结果页面
    name: CONFIG.ROUTE_NAME.CAMERA,
    component: VideoResult
  },
  {
    path: CONFIG.ROUTE_PATH.PIC,    // 上传图片的搜索结果页面
    name: CONFIG.ROUTE_NAME.PIC,
    component: PicResult
  },
  {
    path: CONFIG.ROUTE_PATH.PIC_CAPT, // 图片搜索 更多抓拍
    name: CONFIG.ROUTE_NAME.PIC_CAPT,
    component: PicMoreCapt
  },
  {
    path: CONFIG.ROUTE_PATH.PIC_FACE, // 图片搜索 更多人脸库图片
    name: CONFIG.ROUTE_NAME.PIC_FACE,
    component: PicMoreFace
  },
  {
    path: CONFIG.ROUTE_PATH.NAME,     // “找人”的搜索结果页面
    name: CONFIG.ROUTE_NAME.NAME,
    component: PeopleResult
  },
  {
    path: CONFIG.ROUTE_PATH.CAR,      // “找车”的搜索结果页面
    name: CONFIG.ROUTE_NAME.CAR,
    component: CarResult
  },
  {
    path: CONFIG.ROUTE_PATH.DEVICE,    // “找设备”的搜索结果页面
    name: CONFIG.ROUTE_NAME.DEVICE,
    component: DeviceResult
  },
  {
    path: CONFIG.ROUTE_PATH.ALL,        // “全部搜索”的结果页面
    name: CONFIG.ROUTE_NAME.ALL,
    component: AllResult
  }
]
