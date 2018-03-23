<template>
  <!-- 预置点巡更点 -->
  <div class="preset-points">
    <el-tabs type="card" v-model="activeTab">
      <el-tab-pane label="预置点" name="first">
        <ul class="preset-ul">
          <li v-for="(item,index) in presetList" :key="item.ptzCmd">
            <span class="preset-index">{{index+1}}</span>
            <span class="preset-name">{{item.presetCruiseName}}</span>
            <div class="preset-tool">
              <span class="preset-icon-star" @click="fnStartPreset(item)">
                <i class="el-icon-caret-right"></i>
              </span>
            </div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="巡航路径" name="second">
        <ul class="curise-ul">
          <li v-for="(item,index) in curiseList" :key="item.ptzCmd" :class="{actived:index===curIndex}">
            <span class="curise-index">{{index+1}}</span>
            {{item.presetCruiseName}}
            <div class="curise-tool">
              <span class="tool-icon-star" @click="fnStartCruise(item,index)">
                <i class="el-icon-caret-right"></i>
              </span>
              <span class="tool-icon-stop" @click="fnStopCruise(item)">
                <i></i>
              </span>
            </div>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getPresetData, getCruiseData, postStartCruiseData, postStopCruiseData } from '../apis/index'
export default {
  props: {
    cameraData: {
      type: Object,
      default: {}
    }
  },
  name: 'cameraPreset',
  data () {
    return {
      parentId: '',
      activeTab: 'first',
      presetList: [],
      curiseList: [],
      ptzCmdItem: null,
      curIndex: -1
    }
  },
  beforeDestroy () {
    if (this.ptzCmdItem) {
      this.fnStopCruise(this.ptzCmdItem)
    }
  },
  methods: {
    // 获取预置点
    fnGetPreset () {
      // this.presetList = []
      getPresetData().then(result => {
        this.presetList = result.data.data || []
        console.log('预置点')
      })
    },
    // 获取巡航点
    fnGetCruise () {
      getCruiseData().then(
        result => {
          this.curiseList = result.data.data || []
        }
      )
    },
    // 开始预置点
    fnStartPreset (item) {
      let reqData = {
        'deviceId': this.cameraData.cameraId,
        'parentId': this.cameraData.cameraId, // 暂时和设备id一样
        'ptzCmd': item.ptzCmd
      }
      postStartCruiseData(reqData).then(
        result => {
          this.ptzCmdItem = item
          console.log('haha')
        }
      )
    },
    // 开始预置点巡航点
    fnStartCruise (item, index) {
      this.curIndex = index
      this.fnStartPreset(item)
    },
    // 停止预置点巡航点
    fnStopCruise (item) {
      let reqData = {
        'deviceId': this.cameraData.cameraId,
        'parentId': this.cameraData.cameraId,
        'ptzCmd': item.ptzCmd
      }
      postStopCruiseData(reqData).then(
        result => {
          console.log('riri')
        }
      )
    },
    // 关闭的时候回到第一个栏选中
    closePreset () {
      this.activeTab = 'first'
      this.presetList = []
      if (this.ptzCmdItem) {
        this.fnStopCruise(this.ptzCmdItem)
      }
      this.curIndex = -1
    }
  }
}
</script>
<style lang="less" scoped>
.preset-li {
  height: 58px;
  line-height: 58px;
  font-size: 13px;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  text-align: left;
  padding-left: 18px;
  position: relative;
}
.preset-index,
.curise-index {
  display: block;
  float: left;
  margin-right: 20px;
}
.preset-name {
  display: inline-block;
  height: 58px;
  line-height: 58px;
  width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.preset-ul {
  height: 539px;
  width: 100%;
  li {
    .preset-li;
  }
  li:hover {
    background-color: rgb(242, 242, 242);
    .preset-tool {
      display: block;
    }
  }
}
.curise-ul {
  li {
    .preset-li;
  }
  li:hover {
    background-color: rgb(242, 242, 242);
    .curise-tool {
      display: block;
    }
  }
}
.preset-tool {
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;
  height: 58px;
  line-height: 40px;
  display: none;
  // display: block;
  text-align: center;
  .preset-icon-star {
    height: 20px;
    line-height: 20px;
    width: 20px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    position: absolute;
    top: 16px;
    right: 13px;
    i {
      font-size: 25px;
      color: #444444;
      text-align: center;
    }
    i:hover {
      color: #1d8fd1;
    }
  }
}
.actived .curise-tool {
  display: block;
}
.curise-tool {
  .preset-tool;
  height: 58px;
  width: 48px;
  right: 5px;
  top: 0;
}
.tool-icon-star {
  height: 20px;
  line-height: 20px;
  width: 20px;
  color: #409eff;
  text-align: center;
  font-size: 16px;
  display: inline-block;
  cursor: pointer;
  position: absolute;
  top: 16px;
  left: 0;
  i {
    font-size: 25px;
    color: #444444;
    text-align: center;
  }
  i:hover {
    color: #1d8fd1;
  }
}
.tool-icon-stop {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 19px;
  right: 0;
  cursor: pointer;
  i {
    display: block;
    width: 12px;
    height: 12px;
    background: #444444;
    position: absolute;
    top: 3px;
    left: 1px;
  }
  i:hover {
    background: #1d8fd1;
  }
}
</style>
<style lang="less">
.preset-points {
  width: 182px;
  height: 594px;
  float: right;
  overflow: hidden;
  .el-tabs {
    width: 100%;
    height: 594px;
  }
  .el-tabs__header {
    width: 100%;
    height: 58px;
    border: none;
    border-top: 1px solid #ccc;
    // border-bottom: 1px solid #ccc;
    .el-tabs__nav-wrap {
      height: 58px;
    }
    .el-tabs__nav-scroll {
      height: 58px;
      position: relative;
      .el-tabs__nav {
        width: 182px;
        height: 56px;
        line-height: 54px;
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 10px;
        margin: 0;
        margin-left: 0;
        border: none;
        border-radius: 0;
        transform: translateX(0) !important;
        box-sizing: border-box;
        z-index: 10;
        border-bottom: 1px solid #1d8fd1;
        .el-tabs__item {
          width: 50%;
          height: 56px;
          line-height: 54px;
          padding: 0;
          margin: 0;
          font-size: 16px;
          font-weight: 300;
          border: none;
        }
        .el-tabs__item.is-active {
          color: #1d8fd1;
          border: 1px solid #1d8fd1;
          border-top: 4px solid #1d8fd1;
          border-bottom: 1px solid #fff;
        }
      }
    }
    // .el-tabs__nav::after {
    //   content: "";
    //   position: absolute;
    //   top: 0;
    //   left: 50%;
    //   margin-left: -1px;
    //   width: 2px;
    //   height: 40px;
    //   background: #1d8fd1;
    //   top: 7px;
    // }
  }
  .el-tabs__nav-wrap.is-scrollable {
    width: 100%;
    padding: 0 !important;
  }
  .el-tabs__content {
    margin: 0;
    border: none;
    width: 100%;
    height: 539px;
    overflow: hidden;
    .preset-ul {
      width: 100%;
      height: 539px;
    }
  }
  .el-tabs__nav {
    position: relative;
  }
}
</style>
