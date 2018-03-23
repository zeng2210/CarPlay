export const CONFIG = {
  /**
   * 分页每页大小
   */
  PAGE_SIZE: 12,
  /**
   * 路由名称
   */
  ROUTE_NAME: {
    MAIN: 'SearchMain',             // 搜索的主页面
    ALL: 'AllResult',               // 搜索“全部”结果页面
    NAME: 'SearchPeopleResult',     // 搜索“姓名”结果页面
    CAMERA: 'SearchVideoResult',    // 搜索“摄像头”结果页面
    DEVICE: 'SearchDeviceResult',   // 搜索“设备”结果页面
    CAR: 'SearchCarResult',         // 搜索“车”结果页面
    PIC: 'SearchPicResult',         // 以图搜图结果页面
    PIC_CAPT: 'PicMoreCapt',       // 图片搜索 更多抓拍
    PIC_FACE: 'PicMoreFace'        // 图片搜索 更多人脸库图片
  },
  /**
   * 路由路由
   */
  ROUTE_PATH: {
    PREFIX: '/search/',
    MAIN: 'main',             // 搜索的主页面
    ALL: 'all',               // 搜索“全部”结果页面
    NAME: 'people',           // 搜索“姓名”结果页面
    CAMERA: 'video',          // 搜索“摄像头”结果页面
    DEVICE: 'device',         // 搜索“设备”结果页面
    CAR: 'car',               // 搜索“车”结果页面
    PIC: 'pic',               // 以图搜图结果页面
    PIC_CAPT: 'morecapt',     // 图片搜索 更多抓拍
    PIC_FACE: 'moreface'      // 图片搜索 更多人脸库图片
  },
  /**
   * 搜索类型
   */
  SEARCH_TYPE: {
    ALL: '1',
    NAME: '2',
    CAMERA: '3',
    DEVICE: '4',
    CAR: '5'
  }
}
