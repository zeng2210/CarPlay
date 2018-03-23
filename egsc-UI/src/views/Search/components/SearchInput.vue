<template>
  <div class="container">
    <!-- 输入框和搜索按钮 BEGIN -->
    <el-row>
      <el-col :span="21" class="input-container">
        <el-input v-model="inputText" size="max" :placeholder="hintText" :maxlength="20"
                  @input="_showPopList" @keyup.enter.native="_clickItem(SEARCH_TARGETS.NAME, SEARCH_PATHS.NAME)"></el-input>
      </el-col>
      <el-col :span="3">
        <div v-show="!isShowUploadPopup" class="btn-camera" @click="_toggleUpload">
          <img :src="cameraIcon">
        </div>
      </el-col>
      <el-col :span="3">
        <el-button v-show="!isShowUploadPopup" type="primary" class="btn-search" @click="_clickItem(SEARCH_TARGETS.ALL, SEARCH_PATHS.ALL)">搜索</el-button>
        <el-button v-show="isShowUploadPopup" type="primary" class="btn-search" @click="_closeUpload()">
          <img :src="cameraIconHover">
        </el-button>
      </el-col>
    </el-row>
    <!-- 输入框和搜索按钮 END -->

    <!-- 四个弹出选项 BEGIN -->
    <el-collapse-transition>
      <div class="drop-list" v-show="isShowDropList">
        <div class="drop-list-item" @click="_clickItem(SEARCH_TARGETS.NAME, SEARCH_PATHS.NAME)" @mouseover="iconName = iconNameHover" @mouseout="iconName = iconNameNormal">
          <div class="item-icon">
            <img :src="iconName" alt="找人">
          </div>
          <div class="title">找人：</div>
          <div class="keyword">{{inputText}}</div>
        </div>
        <div class="drop-list-item" @click="_clickItem(SEARCH_TARGETS.CAR, SEARCH_PATHS.CAR)" @mouseover="iconCar = iconCarHover" @mouseout="iconCar = iconCarNormal">
          <div class="item-icon">
            <img :src="iconCar" alt="找车：">
          </div>
          <div class="title">找车：</div>
          <div class="keyword">{{inputText}}</div>
        </div>
        <div class="drop-list-item" @click="_clickItem(SEARCH_TARGETS.DEVICE, SEARCH_PATHS.DEVICE)" @mouseover="iconDevice = iconDeviceHover" @mouseout="iconDevice = iconDeviceNormal">
          <div class="item-icon">
            <img :src="iconDevice" alt="找设备：">
          </div>
          <div class="title">找设备：</div>
          <div class="keyword">{{inputText}}</div>
        </div>

        <div class="drop-list-item" @click="_clickItem(SEARCH_TARGETS.CAMERA, SEARCH_PATHS.CAMERA)" @mouseover="iconCamera = iconCameraHover" @mouseout="iconCamera = iconCameraNormal">
          <div class="item-icon">
            <img :src="iconCamera" alt="找摄像头：">
          </div>
          <div class="title">找摄像头：</div>
          <div class="keyword">{{inputText}}</div>
        </div>
      </div>
    </el-collapse-transition>
    <!-- 四个弹出选项 END -->

    <!-- 上传弹窗 BEGIN -->
    <div class="upload-popup" v-show="isShowUploadPopup">
      <div class="upload-icon">
        <div class="upload-icon-left">
          <img :src="uploadIcon" alt="上传图片">
        </div>
        <div class="upload-icon-right">
          <!--<input type="file"/>-->
          <el-upload action="" :show-file-list="false" :auto-upload="false" list-type="picture" :on-change="handleFileChange">
            <el-button type="text" class="btn-upload">本地上传图片</el-button>
          </el-upload>
        </div>
      </div>
      <div class="btn-close-upload" @click="_closeUpload">
        <img :src="closeDigIcon" alt="关闭上传">
      </div>
    </div>
    <!-- 上传弹窗 END -->
  </div>
</template>

<script>
import { uploadImage } from '../apis/index'
import { showLoading, closeLoading } from '../assets/js/index'
import {CONFIG} from '../assets/js/config'
export default {
  name: 'SearchInput',
  props: {
    keyword: {  // 关键字
      require: true,
      type: String,
      default: ''
    },
    'current': { // 当前路由名称
      require: true
    }
  },
  data () {
    return {
      inputText: '',
      isShowDropList: false,
      isShowUploadPopup: false,
      closeDigIcon: require('../assets/images/closeDigIcon.png'),
      cameraIcon: require('../assets/images/icon_search_input_pic.png'),
      cameraIconHover: require('../assets/images/icon_search_input_pic_hover.png'),
      uploadIcon: require('../assets/images/icon_upload.png'),
      iconNameNormal: require('../assets/images/icon_search_name.png'),
      iconNameHover: require('../assets/images/icon_search_name_hover.png'),
      iconDeviceNormal: require('../assets/images/icon_search_device.png'),
      iconDeviceHover: require('../assets/images/icon_search_device_hover.png'),
      iconCarNormal: require('../assets/images/icon_search_car.png'),
      iconCarHover: require('../assets/images/icon_search_car_hover.png'),
      iconCameraNormal: require('../assets/images/icon_search_camera.png'),
      iconCameraHover: require('../assets/images/icon_search_camera_hover.png'),
      iconName: this.iconNameNormal,
      iconDevice: this.iconDeviceNormal,
      iconCar: this.iconCarNormal,
      iconCamera: this.iconCameraNormal,
      loading: null,
      hintText: '请输入姓名/车牌/设备号/摄像头名称',
      SEARCH_TARGETS: {},
      SEARCH_PATHS: {}
    }
  },
  methods: {
    /**
     * 文件上传组件事件
     */
    handleFileChange (file) {
      // Defect Fix [EGSCDT-1570] 仅支持jpg格式图片上传
      let fileName = file.name
      let suffix = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase()
      if (suffix !== 'jpg' && suffix !== 'jpeg') {
        this.$message.error('图片格式错误，请上传jpg格式的图片')
        return
      }

      this.loading = showLoading()
      this.changePicToBase64(file.raw, (result) => {
        let data = {}
        data.imageName = file.name
        data.facePic = result
        this.uploadImage(data)
      })
    },
    /**
     * 调用图片上传接口
     * @param data
     */
    uploadImage (data) {
      uploadImage(data).then(
        function (result) {
          console.log(result)
          closeLoading(this.loading)
          if (result && result.data) {
            this.searchPic(result.data)
          }
        }.bind(this)
      ).catch(
        function (error) {
          closeLoading(this.loading)
          console.log(error)
        }.bind(this)
        )
    },
    /**
     * 将图片转为Base64
     */
    changePicToBase64 (blob, callback) {
      var reader = new FileReader()
      reader.onload = (e) => {
        callback(e.target.result)
      }
      reader.readAsDataURL(blob)
    },
    _showPopList (value) {
      this.isShowUploadPopup = false
      if (value !== null && value.trim() !== '') {
        this.isShowDropList = true
      } else {
        this.isShowDropList = false
      }
    },
    _clickItem (targetName, path) {
      if ((this.inputText.trim() === '')) {
        this.$message.error('请输入关键字')
        return
      }
      this.inputText = this.inputText.trim()
      if (!/^[A-Za-z0-9\s\u4e00-\u9fa5]+$/gi.test(this.inputText)) {
        this.$message.error('请输入正确的关键字')
        return
      }
      this.isShowDropList = false
      if (this.current === targetName) {
        this.$emit(targetName, this.inputText)
      } else {
        this.$router.push({
          path: CONFIG.ROUTE_PATH.PREFIX + path,
          query: {
            keyword: this.inputText
          }
        })
      }
    },
    searchPic (imageUrl) {
      this.isShowUploadPopup = false
      const picName = CONFIG.ROUTE_NAME.PIC
      if (this.current === picName) {
        this.$emit(picName, imageUrl)
      } else {
        this.$router.push({
          path: CONFIG.ROUTE_PATH.PREFIX + CONFIG.ROUTE_PATH.PIC,
          query: {
            imageUrl: imageUrl
          }
        })
      }
    },
    /**
     * 显示图片上传
     * @private
     */
    _toggleUpload () {
      this.isShowDropList = false
      this.isShowUploadPopup = true
    },
    /**
     * 关闭图片上传
     * @private
     */
    _closeUpload () {
      this.isShowUploadPopup = false
      this.hintText = '请输入姓名/车牌/设备号/摄像头名称'
    }
  },
  mounted () {
    this.isShowDropList = false
    this.isShowUploadPopup = false
    this.iconName = this.iconNameNormal
    this.iconDevice = this.iconDeviceNormal
    this.iconCar = this.iconCarNormal
    this.iconCamera = this.iconCameraNormal
    this.SEARCH_TARGETS = CONFIG.ROUTE_NAME
    this.SEARCH_PATHS = CONFIG.ROUTE_PATH
    // 延迟100ms可解决IE中的问题（跳转搜索结果页时会弹出下拉选项）
    setTimeout(() => {
      this.inputText = this.keyword
    }, 100)
  }
}
</script>

<style lang="less" scoped>
@width: 720px; // 组件的宽度
@height: 58px; // 组件的高度
@radius: 2px; // 组件的圆角
@cameraWidth: 30px; // 拍照按钮的宽高
@cameraHeight: 30px;
@cameraMargin: (@height - @cameraHeight) / 2; // 拍照按钮的间距
//@borderColor: #E4E4E4;
@borderColor: #edeef0;
@containerBorderColor: #d4d8dc;
@iconSize: 24px;
@btnSearchWidth: 100px;

.el-input /deep/ input::-ms-clear {
  display: none;
}
.el-row {
  margin: 0;
  padding: 0;
}
.el-input /deep/ .el-input__inner {
  height: @height;
  border-radius: @radius 0 0 @radius;
  padding-right: @height;
  font-size: 16px;
  border: 1px solid #d4d8dc;
  color: #5a6b78;
}
.el-input /deep/ input:-ms-input-placeholder {
  font-size: 16px;
  color: #8d8f93;
}
.el-button + .el-button {
  margin-left: 0px !important;
}
.container {
  width: @width;
  height: auto;
}
.input-container {
  width: @width - @btnSearchWidth;
}
.btn-search {
  width: @btnSearchWidth;
  height: @height;
  border-radius: 0 @radius @radius 0;
  font-size: 16px;
  background-color: #1d8fe1;
  border: 0px none transparent;
}
.btn-camera {
  width: @cameraWidth;
  height: @cameraHeight;
  position: absolute;
  margin-left: -(@cameraWidth + 20px);
  margin-top: @cameraMargin;

  &:hover {
    cursor: pointer;
  }

  & img {
    width: 100%;
    height: 100%;
  }
}

.drop-list {
  width: @width - 2;
  height: auto;
  font-size: 12px;
  text-align: left;
  position: absolute;
  z-index: 100;
  background-color: white;
  border: 1px solid #d4d8dc;
  border-top: none;
}
.drop-list-item {
  width: 100%;
  height: @height;
  align-items: center;
  border-top: 1px solid @borderColor;
  display: flex;
  color: #5a6b78;
  font-size: 16px;
  overflow: hidden;

  &:hover {
    background-color: #1d8fe1;
    cursor: pointer;

    & div {
      color: white;
    }
  }

  & .item-icon {
    width: @iconSize;
    height: @iconSize;
    margin-left: 15px;
    margin-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.drop-list-item .keyword {
  flex: 1 0 0;
  margin-right: 20px;
  flex-wrap: wrap;
}

.upload-popup {
  width: @width - 2;
  height: 235px;
  z-index: 100;
  position: absolute;
  display: flex;
  background-color: white;
  //border: 1px solid @borderColor;
  border: 1px solid #d4d8dc;
  border-top: none;
}

.btn-close-upload {
  width: 14px;
  height: 14px;
  position: absolute;
  margin-top: 10px;
  right: 20px;
  bottom: 20px;

  &:hover {
    cursor: pointer;
  }

  & img {
    width: 14px;
    height: 14px;
  }
}

.upload-icon {
  border: 1px solid #d4d8dc;
  background: white;
  width: 282px;
  height: 87px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload-icon-left {
  width: @iconSize + 4;
  height: @iconSize + 4;
  margin-right: 10px;

  & img {
    width: 100%;
    height: 100%;
  }

  & button {
    color: #229cff;
    font-size: 18px;
  }
}
.btn-upload {
  font-size: 16px;
  color: #1d8fe1;
}
</style>
