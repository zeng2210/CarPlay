<template>
  <el-container id="mainContainer">
    <el-main class="map-content" :class="{'map-whole':!isCollapseOn,'map-part':isCollapseOn}">
      <transition name="fade" mode="out-in">
        <div id="mainMap" class="map">
        </div>
      </transition>
    </el-main>
    <el-aside class="list-box" width="150px">
      <ul class="list-wrap">
        <li v-for="(item, index) in sceneList" :class="{ active: item.id === activeItem }" :key="item.name" @click="onListStyleChange(index, item.id)">
          <span :title="item.sceneName">{{item.sceneName}}</span>
          <span v-show="item.countWarning > 0" class="marks"><img src="./assets/images/u7733.png" alt=""></span>
        </li>
      </ul>
    </el-aside>
  </el-container>
</template>

<script>
import { getSceneListData, getMarkerListData, getSceneInfoData } from '@/views/Map/apis/index'
import { mapOptionFormat, extendObj, formatMarker } from '@/views/Map/assets/js/util.js'
let tempParam = null
export default {
  name: 'build-plan-init',
  data () {
    return {
      mapObj: null,
      isCollapseOn: false,
      activeItem: null,
      cacheMapList: {},
      option: {},
      sceneList: {}
    }
  },
  mounted: function () {
    if (this.$route.params.sceneFrom) {
      this.lastMap = this.$route.params.sceneFrom.sceneId
    } else {
      this.$router.push('/home')
    }
    let params = {}
    // 刷新页面后判断路由传递过来的值是否是undefined自动跳转上一个页面并且携带参数
    if (typeof (this.$route.params.queryData) === 'undefined') {
      this.$router.push('/home')
    }
    params.parentArea = this.$route.params.queryData.parentArea
    params.sceneId = this.$route.params.sceneFrom.sceneId
    /*
      加载第一张地图，调用getSceneInfo接口
      加载楼栋列表，调用getSceneList接口
    */
    getSceneListData({ parentArea: params.parentArea }).then(res => {
      console.log('load init map')
      if (res.data.data.length === 0) {
        console.warn('can not find Community big map')
        return
      }
      this.sceneList = res.data.data
      this.option = res.data.data[0]
      this.createMap(res.data.data[0])
      // 实现与首页地图关联的楼层列表项样式的改变
      this.activeItem = this.sceneList[0].id
    }).catch(err => {
      console.warn(err)
    })
  },
  methods: {
    /**
     * @description 创建地图
     * @param {Object} option 场景信息
     */
    createMap: function (option) {
      console.log('business init map')
      let mapImageUrl = option.url
      if (this.mapObj) {
        this.mapObj.clearMap()
        this.mapObj.getMap().setTarget(null)
      }
      // 已经初始化的地图可以直接获取地图对象，进行地图的替换即可
      if (this.cacheMapList[option.id]) {
        this.mapObj = this.cacheMapList[option.id]
        this.mapObj.getMap().setTarget('mainMap')
        // todo 更新本地图点位信息
        this.updateMarkerList(option)
        return
      }
      // 如果没有初始化过，才需要进行地图的初始化
      let formatedOption = mapOptionFormat(option)
      let mapOption = extendObj(formatedOption, {
        gisEngine: 'bitmap',
        domId: 'mainMap',
        mapUrl: mapImageUrl,
        sizeW: 1920,
        sizeH: 1080,
        maxZoom: 4,
        minZoom: 2,
        center: [112.334403, 39.8]
      })
      // eslint-disable-next-line
      this.cacheMapList[option.id] = new hdmap.initMap(mapOption)
      this.mapObj = this.cacheMapList[option.id]
      this.mapObj.getMap().setTarget('mainMap')
      // 首页地图点位信息
      this.updateMarkerList(option)
    },
    /**
     * @description 加载点位方法
     * @param {obj} option 场景信息
     */
    updateMarkerList (option) {
      tempParam = this
      let params = {}
      params.sceneId = option.id
      getMarkerListData(params).then(res => {
        let markerList = res.data.data
        let markerArr = formatMarker(markerList)
        this.mapObj.addMarkers(markerArr, { scale: 0.7 })
        // 注册地图上的点击事件
        this.mapObj.regEventListener('singleclick', function (args1) {
          if (args1.feature != null) {
            tempParam.$emit('singleClickEvent', args1)
          }
        })
      }).catch(err => {
        console.warn(err)
      })
    },
    /**
     * @description 改变场景列表样式
     * @param {number} index 下标
     * @param {string} id 场景ID
     */
    onListStyleChange (index, id) {
      this.activeItem = id
      this.showScene(index)
    },
    /**
     * @description 改变场景信息
     * @param {number} index 下标
     */
    showScene: function (index) {
      let params = {}
      params.sceneId = this.sceneList[index].id
      getSceneInfoData(params).then((res) => {
        this.option = res.data.data
        this.createMap(res.data.data)
      }).catch(err => {
        console.warn(err)
      })
    },
    /**
     * @description 跳转上一个页面并且携带参数
     */
    backUp () {
      let data = {}
      data.sceneFrom = {}
      data.sceneFrom.sceneId = this.lastMap
      this.$router.push({
        path: '/home',
        name: 'HomePage',
        params: data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "/assets/css/animate.css";

.el-main {
  color: #333;
  width: 100%;
  padding: 0;
  text-align: center;
  background-color: #fff;
}

.map {
  padding: 0;
}

#mainContainer {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #55616d;
  position: relative;
}

.el-header {
  height: 100px !important;
}

.el-row {
  margin-top: 20px;
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  cursor: pointer;
}

.row-bg {
  padding: 10px 0;
}

.map-content {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #55616d;
  left: 0;
  top: 0;
  &.map-whole {
    left: 0;
  }
  &.map-part {
    left: -250px;
  }
}

#mainMap {
  height: 100%;
  width: 100%;
}

#time {
  color: #13d5dc;
  text-align: right;
  margin-right: 10px;
}

#aside {
  background-color: #f2f2f2;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 20;
  height: 100%;
}

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.list-box {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  z-index: 9999;
  background: white;
  height: 100%;
  overflow-x: hidden;
  margin: 0;
}

.list-box .list-wrap {
  width: 150px;
  position: absolute;
  bottom: 0;
  height: 100%;
}

.list-box .list-wrap li {
  width: 150px;
  height: 62px;
  line-height: 62px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  position: relative;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-box .list-wrap li .marks {
  position: absolute;
  right: 15px;
  top: -15px;
}

.list-box .list-wrap li .marks img {
  width: 14px;
  height: 14px;
}

.active {
  color: white;
  background: rgba(34, 156, 255, 1);
}

</style>
