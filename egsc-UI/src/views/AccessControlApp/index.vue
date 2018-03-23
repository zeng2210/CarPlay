<template>

  <el-container class="access-control">
    <el-header height="70px" class="search-condition">
      <el-tabs v-model="activeName" class="tabStyle" @tab-click="handleTabClick">
        <el-tab-pane label="人员事件" name="personTab" style="font-size:17px"></el-tab-pane>
        <el-tab-pane label="行为事件" name="actionTab" style="font-size:17px"></el-tab-pane>
      </el-tabs>
      <el-form :inline="true" :model="formCondition" class="demo-form-inline" ref="queryForm">
        <el-form-item label="事件范围">
          <el-select v-model="formCondition.exception" size="small" style="width:130px" @change="handleSwitchChange">
            <el-option label="异常" value="true"></el-option>
            <el-option label="全部事件" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="事件类型" v-if="activeName=='actionTab'">
          <el-select v-model="formCondition.eventType" placeholder="事件类型" size="small" style="width:130px" @change="handleSwitchChange">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="园区正常活动" value="0" v-if="formCondition.exception=='false'"></el-option>
            <el-option label="园区越界" value="1"></el-option>
            <el-option label="违停/占道" value="2"></el-option>
            <el-option label="人工湖越界" value="3"></el-option>
            <el-option label="人员徘徊" value="4"></el-option>
            <el-option label="人员脱岗" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员类型" v-if="activeName=='personTab'">
          <el-select v-model="formCondition.userType" placeholder="人员类型" size="small" style="width:130px" @change="handleSwitchChange">
            <el-option label="全部人员" value="0" v-if="formCondition.exception=='false'"></el-option>
            <el-option label="业主" value="1" v-if="formCondition.exception=='false'"></el-option>
            <el-option label="家属" value="2" v-if="formCondition.exception=='false'"></el-option>
            <el-option label="租客" value="3" v-if="formCondition.exception=='false'"></el-option>
            <el-option label="访客" value="4" v-if="formCondition.exception=='false'"></el-option>
            <el-option label="物业" value="5" v-if="formCondition.exception=='false'"></el-option>
            <el-option label="快递" value="6" v-if="false"></el-option>
            <el-option label="外卖" value="7" v-if="false"></el-option>
            <el-option label="未知" value="8" v-if="formCondition.exception=='false'"></el-option>
            <el-option label="重点关注" value="100"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" width="100px">
          <hd-date-picker :result="range"></hd-date-picker>
          <!--
        <el-date-picker v-model="range" type="datetimerange" :editable="editable" range-separator="-" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" size="small" :picker-options="pickerOptions">
        </el-date-picker>
        -->
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model.trim="formCondition.position" placeholder="位置" size="small" @keyup.enter.native="onSubmit" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model.trim="formCondition.userName" placeholder="姓名" size="small" @keyup.enter.native="onSubmit" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="small ">查询</el-button>
        </el-form-item>
        <!-- <el-form-item label="" style="float:right">
        <el-switch
          v-model="formCondition.exception"
          active-text="全部园区事件"
          inactive-text="异常事件"
          @change="handleSwitchChange"
          >
        </el-switch>
      </el-form-item> -->
      </el-form>
    </el-header>
    <el-container>
      <el-aside class="data-area" width="1390px">
        <el-container style="height: 95%">
          <el-main class="table-list">
            <el-table ref="singleTable" :data="records" highlight-current-row @row-click="rowClickHandler" fit size="medium" row-class-name="row-render" header-row-class-name="header-render" class="accessTable" :key="Math.random()" height="100%">
              <EmptyIcon slot="empty"></EmptyIcon>
              <el-table-column type="index" label="序号" width="80" align="center" header-align="center">
              </el-table-column>
              <el-table-column property="eventTime" label="时间" width="240" align="left" header-align="left" :formatter='dateFormatter'>
              </el-table-column>
              <el-table-column property="position" label="位置" width="320" align="left" header-align="left">
              </el-table-column>
              <el-table-column property="userName" label="姓名" width="235" align="left" header-align="left">
                <template slot-scope="scope">
                  {{ scope.row.userName || '未知' }}
                </template>
              </el-table-column>
              <!-- <el-table-column property="userType" label="人员类型" width="220" align="left" header-align="left" :formatter='personTypeFormatter'> -->
              <el-table-column property="userTypeName" label="人员类型" width="220" align="left" header-align="left" v-if="isFirstTab" :key="Math.random()">
                <template slot-scope="scope">
                  {{scope.row.careType!=0?'重点关注': scope.row.userTypeName}}
                </template>
              </el-table-column>
              <el-table-column property="eventTypeName" label="事件类型" width="212" align="left" header-align="left" :imgsrc="imgsrc" v-if="!isFirstTab" :key="Math.random()">
                <template slot-scope="scope">
                  {{scope.row.eventTypeName}}
                  <img :src="imgsrc" v-if="formCondition.exception=='false' && scope.row.exception" style="margin-bottom: -4px;" />
                </template>
              </el-table-column>
              <el-table-column property="careTypeName" label="关注类型" width="212" align="left" header-align="left" :imgsrc="imgsrc" v-if="isFirstTab" :key="Math.random()">
                <template slot-scope="scope">
                  {{scope.row.careTypeName}}
                  <img :src="imgsrc" v-if="formCondition.exception=='false' && scope.row.careType==1" style="margin-bottom: -4px;" />
                </template>
              </el-table-column>
              <el-table-column property="" label="" :render-header="renderHeader" align="left" header-align="right">
              </el-table-column>
            </el-table>
          </el-main>
          <el-footer class="list-pager">
            <el-pagination @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='pageVo.pageIndex' :page-sizes='[10]' :page-size='pageVo.pageSize' layout='total, prev, pager, next, jumper' :total='pageVo.totalCount'>
            </el-pagination>
          </el-footer>
        </el-container>
      </el-aside>
      <el-main class="user-area">
        <el-container>
          <el-main class="no-padding user-view">
            <div class="user-info" v-show="isFirstTab && records.length > 0">
              <div class="view-user">
                <p>
                  <span></span>人员信息</p>
                <div class="photo-info">
                  <user-image-box :imageId='faceUrl'></user-image-box>
                </div>
                <div v-show="userData" class="user-info-detail">
                  <p>姓 名: {{userData.name}}</p>
                  <p>性 别: {{userData.sex}}</p>
                  <p>民 族: {{dictMap.get('nation')? dictMap.get('nation').get(userData.nation):''}}</p>
                  <p>户 籍: {{userData.orgion}}</p>
                  <p>电 话: {{userData.phone}}</p>
                  <p>身份证: {{userData.idenNum}}</p>
                </div>
              </div>
            </div>
            <div class="user-photo" v-show="records.length > 0">
              <p>
                <span></span>抓拍信息</p>
              <div class="device-code">
                <el-button class="device-icon" @click="handleShowAbnormalDialog" v-if="showCameraICon()"></el-button>
                <span v-if="false" v-show="deviceCode" class="device-desc">设备号：{{deviceCode}}</span>
              </div>
              <image-box :imageId='imageUrl'></image-box>
              <video-dialog :previewData="previewData" :warnShow="warnShow" :abnormalShow="abnormalShow" :open.sync="previewVisible" @close="handleVideoClose" @onPreviewBackToWarn="handlePreviewBackToWarn" @onPreviewBackToAbnormal="handlePreviewBackToAbnormal"></video-dialog>
              <abnormal-dialog :abnormalData="abnormalData" :open.sync="abnormalVisible" @close="handleAbnormalClose" @onAbnormalToVideo="handleAbnormalToPreview"> </abnormal-dialog>
            </div>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>

import {
  gateRecords,
  getDictItem
}
  from '@/views/AccessControlApp/apis'
import ImageBox from '@/views/AccessControlApp/ImageBox'
import UserImageBox from '@/views/AccessControlApp/UserImageBox'
import eventExceptionImg from '@/views/AccessControlApp/assets/images/event-exception.png'
import { formatDate } from '@/views/VideoIntercomApp/assets/js/date.js'
import EmptyIcon from '@/components/EmptyIcon'
import HdDatePicker from '../../components/HdDatePicker'
export default {
  components: {
    ImageBox, UserImageBox, EmptyIcon, HdDatePicker
  },
  data () {
    return {
      formCondition: {
        startTime: '', // 日期起始时间
        endTime: '',
        position: '',
        userName: '',
        userType: '100',
        eventType: '-1',
        mode: 0,
        exception: 'true',
        attentionTypeName: '',
        session: '' + Math.round((Math.random() * 10000))
      },
      editable: false,
      range: [], // 日期范围
      faceUrl: '', // 人脸图片url
      imageUrl: '', // 设备图片url
      deviceCode: '', // 设备编号
      currentUser: {}, // 右侧人物简介对象
      userData: {},
      isCameraDevice: -1, // 1:是摄像/视频设备  0:不是
      cameraCode: '', // 门禁/人行道闸关联的抓拍摄像机的子设备编号
      records: [], // 表格记录数据
      switchOn: false,
      imgsrc: eventExceptionImg,
      pageVo: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0
      },
      pickerOptions: {
        disabledDate: this.handleDisableDate
      },
      isMonitorVisible: false,
      isVideoVisible: false,
      commonData: {},
      activeName: 'personTab',
      isFirstTab: true, // 是否是第一个页签
      dictMap: new Map(), // 数据字典
      abnormalData: {},
      abnormalVisible: false,
      previewData: {},
      warnShow: false,
      previewVisible: false,
      abnormalShow: false,
      videoStartTime: ''
    }
  },
  mounted () {
    this.loadDict()
    this.loadData(this.formCondition)
  },
  methods: {
    loadData: function (params) {
      let that = this
      let parameter = Object.assign({
        pageIndex: this.pageVo.pageIndex,
        pageSize: this.pageVo.pageSize,
        personEvent: this.isFirstTab ? 1 : 0
      }, params)
      this.records = []
      gateRecords(parameter).then(result => {
        that.records = result.rows
        console.log(JSON.stringify(that.records))
        that.pageVo.totalCount = result.total
        if (that.records && that.records.length > 0) {
          that.currentUser.userId = that.records[0].userId
          that.currentUser.userType = that.records[0].userType
          that.imageUrl = that.records[0].imageUrl ? this.constructFullImageURL(that.records[0].imageUrl) : '404_' + Math.round(1000 * Math.random())
          that.deviceCode = that.records[0].deviceCode
          that.isCameraDevice = that.records[0].cameraDevice
          that.cameraCode = that.records[0].cameraCode
          this.videoStartTime = that.records[0].eventTime
          this.userData = { name: that.records[0].userName, sex: that.records[0].sex, nation: that.records[0].nation, orgion: that.records[0].orgion, phone: that.records[0].phone, idenNum: that.records[0].idenNum }
          this.faceUrl = this.constructFullImageURL(that.records[0].faceUrl)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    // 提交查询请求
    onSubmit() {
      if (this.range.length > 1) {
        this.formCondition.startTime = this.range[0]
        this.formCondition.endTime = this.range[1]
      }
      // 验证时间
      // if ((this.formCondition.startTime && new Date(Date.parse(this.formCondition.startTime.replace('-', '/').replace('-', '/'))) > new Date()) || (this.formCondition.endTime && new Date(Date.parse(this.formCondition.endTime.replace('-', '/').replace('-', '/'))) > new Date())) {
      //   this.$message({
      //     type: 'warning',
      //     message: '输入时间不能大于当前时间!'
      //   })
      //   return
      // }
      if ((this.formCondition.startTime && !this.formCondition.endTime) || (!this.formCondition.startTime && this.formCondition.endTime)) {
        this.$message({
          type: 'warning',
          message: '输入时间不能为空!'
        })
        return
      }
      // 位置只能输入数字、中文和大小写英文字母，且长度不能超过30
      var re2 = /^[\da-zA-Z\u4e00-\u9fa5 ]{1,30}$/
      if (this.formCondition.position != null) {
        var result2 = this.formCondition.position.match(re2)
        if (this.formCondition.position && !result2) {
          this.$message({
            type: 'warning',
            message: '位置输入非法!'
          })
          return
        }
      }
      // var re = /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/
      if (this.formCondition.userName != null) {
        var result = this.formCondition.userName.match(re2)
        if (this.formCondition.userName && !result) {
          this.$message({
            type: 'warning',
            message: '姓名输入非法!'
          })
          return
        }
      }
      this.formCondition.mode = 0
      this.pageVo.pageIndex = 1
      this.loadData(this.formCondition)
    },
    handleDisableDate (curDate) {
      console.log(curDate)
      return curDate > new Date()
    },
    // 切换事件范围是异常事件还是全部事件
    handleSwitchChange (newValue) {
      // 清空条件
      this.formCondition.startTime = ''
      this.formCondition.endTime = ''
      this.formCondition.position = ''
      if (newValue === 'true') {
        this.formCondition.userType = '100'
      } else if (newValue === 'false') {
        this.formCondition.userType = '0'
      }
      this.formCondition.userName = ''
      if (newValue === 'true' || newValue === 'false') {
        this.switchOn = newValue
        this.formCondition.eventType = '-1'
      }
      this.range = []
      console.log(newValue)
      this.onSubmit()
    },
    personTypeFormatter: function (row, column) {
      let userType = row.userType
      if (userType === 1) {
        return '业主'
      } else if (userType === 2) {
        return '业主家属'
      } else if (userType === 3) {
        return '租客'
      }
      return '未知'
    },
    eventTypeFormatter: function (row, column) {
      // let eventType = row.eventType
      // if (eventType === 0) {
      //   return '园区正常活动'
      // } else if (eventType === 1) {
      //   return '园区异常活动'
      // }
      // return '园区正常活动'
      return row.eventTypeName
    },
    dateFormatter: function (row, column) {
      function fillZero (num) {
        if (num < 10) {
          return '0' + num
        }
        return num
      }

      let eventTime = row.eventTime
      if (eventTime) {
        let date = new Date()
        date.setTime(eventTime)
        return date.getFullYear() + '-' + fillZero(date.getMonth() + 1) + '-' + fillZero(date.getDate()) + ' ' + fillZero(date.getHours()) + ':' + fillZero(date.getMinutes()) + ':' + fillZero(date.getSeconds())
      }
      return ''
    },
    // 选中行时触发的事件
    rowClickHandler (row, event, column) {
      this.currentUser.userId = row.userId
      this.currentUser.userType = row.userType
      this.imageUrl = row.imageUrl ? this.constructFullImageURL(row.imageUrl) : '404_' + Math.round(1000 * Math.random())
      this.deviceCode = row.deviceCode
      this.isCameraDevice = row.cameraDevice
      this.cameraCode = row.cameraCode
      this.videoStartTime = row.eventTime
      this.userData = { name: row.userName, sex: row.sex, nation: row.nation, orgion: row.orgion, phone: row.phone, idenNum: row.idenNum }
      this.faceUrl = this.constructFullImageURL(row.faceUrl)
      // if (row.userId) {
      //   this.loadUserData()
      // } else {
      //   this.userData = {}
      //   this.faceUrl = '404_' + Math.round(1000 * Math.random())
      // }
    },
    // 改变表格查询页大小
    handleSizeChange (val) {
      this.pageVo.pageSize = val
      this.formCondition.mode = 1
      this.loadData(this.formCondition)
    },
    constructFullImageURL (url) {
      if (url == null || url === '') {
        return null
      }
      if (url.substr(0, 4).toLowerCase() === 'http') {
        return url
      }
      var suffixLen = url.slice(url.lastIndexOf('.')).length
      var fullImgURL = ''
      if (suffixLen > 1 && suffixLen <= 5) {
        fullImgURL = 'http://192.168.0.246:8888' + '/' + url.trim().trimLeft('/')
      } else {
        fullImgURL = 'http://192.168.0.242:39047/VIID/showimages?id=' + url.trim().trimLeft('/')
      }
      return fullImgURL
    },
    handleCurrentChange (val) {
      this.pageVo.pageIndex = val
      this.formCondition.mode = 1
      this.loadData(this.formCondition)
    },
    // 切换页签
    handleTabClick (tab, event) {
      if (tab.name === 'personTab') {
        this.isFirstTab = true
      } else {
        this.isFirstTab = false
      }
      this.formCondition.exception = 'true'
      this.formCondition.userType = '100'
      this.formCondition.eventType = '-1'
      this.formCondition.startTime = ''
      this.formCondition.endTime = ''
      this.formCondition.position = ''
      this.formCondition.userName = ''
      this.range = []
      console.log(this.isFirstTab)
      this.onSubmit()
    },
    // loadUserData: function() {
    //   let that = this
    //   queryUserById({
    //     params: {
    //       userId: that.currentUser.userId,
    //       userType: that.currentUser.userType
    //     }
    //   }).then(result => {
    //     that.userData = result
    //     that.faceUrl = result && (result.facePic ? result.facePic : '404_' + Math.round(1000 * Math.random()))
    //   }).catch(function(error) {
    //     console.log(error)
    //   })
    // },
    // 渲染表头
    renderHeader: function (reander, column, $index) {
      return reander('el-button', {
        attrs: {
          size: 'small',
          type: 'plain'
        },
        on: {
          click: this.onSubmit
        }
      }, ['刷新'])
    },
    // 加载数据字典
    loadDict: function () {
      getDictItem().then(response => {
        console.info('获取字典的结果：' + JSON.stringify(response.data))
        let result = response.data
        if (result.code === '00000') {
          let originDict = result.data
          // let dictMap = new Map();
          let innerMap
          for (var item in originDict) {
            let itemValue = originDict[item]
            innerMap = new Map()
            for (var i in itemValue) {
              innerMap.set(itemValue[i].itemCode, itemValue[i].itemName)
            }
            this.dictMap.set(item, innerMap)
          }
          console.info('转换后的取字典的：' + JSON.stringify(this.dictMap))
        } else {
          this.$message({
            message: '获取数据字典失败',
            type: 'warning'
          })
        }
      }).catch(function (error) {
        console.error(error)
        this.$message({
          message: '获取数据字典异常',
          type: 'warning'
        })
      })
    },
    // 显示异常视频弹窗
    handleShowAbnormalDialog () {
      this.abnormalVisible = true
      let startTimeStr = this.eventTimeFormat(this.videoStartTime)
      this.abnormalData = { pageSize: '1', pageNo: '10', deviceId: this.isCameraDevice === 1 ? this.deviceCode : this.cameraCode, startTime: startTimeStr, endTime: startTimeStr }
    },
    // 关闭异常视频弹窗
    handleAbnormalClose () {
      this.abnormalVisible = false
    },
    handleAbnormalToPreview () {
      this.abnormalVisible = false
      this.previewVisible = true
      this.abnormalShow = true
      this.previewData = {
        // deviceId: this.warningData.deviceId
        deviceId: this.isCameraDevice === 1 ? this.deviceCode : this.cameraCode
      }
    },
    handleVideoClose () {
      this.previewVisible = false
      this.warnShow = false
      this.abnormalShow = false
    },
    handlePreviewBackToWarn () {
      this.previewVisible = false
      this.warningVisible = true
    },
    // 点击返回异常视屏或者预警的时候关闭视频弹窗
    handlePreviewBackToAbnormal () {
      this.abnormalVisible = true
      this.previewVisible = false
      this.abnormalShow = false
      this.warnShow = true
    },
    // 时间格式化
    eventTimeFormat: function (eventTime) {
      let date = ''
      if (eventTime) {
        date = new Date(parseInt(eventTime))
      } else {
        date = new Date()
      }
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    // 是否显示摄像机图标
    showCameraICon () {
      console.log('isCameraDevice:' + this.isCameraDevice + ',cameraCode:' + this.cameraCode)
      return this.isCameraDevice === 1 || (this.isCameraDevice === 0 && !this.isNull(this.cameraCode))
    },
    // 判读字符串是否为空
    isNull (str) {
      if (str === undefined || str === null || str === '') return true
      var regu = '^[ ]+$'
      var re = new RegExp(regu)
      return re.test(str)
    }
  },

  watch: {
    range: {
      handler: function (newRange, oldRange) {
        if (newRange) {
          this.formCondition.startTime = newRange[0]
          this.formCondition.endTime = newRange[1]
        } else {
          this.formCondition.startTime = null
          this.formCondition.endTime = null
        }
      },
      deep: true
    }
    // ,
    // 'formCondition.userName': function (newVal, oldVal) {
    //   window.sessionStorage.setItem('USERNAME', this.formCondition.userName)
    // },
    // 'formCondition.position': function (newVal, oldVal) {
    //   window.sessionStorage.setItem('POSITION', this.formCondition.position)
    // }
  }
}
</script>

<style lang="css" scoped>
.access-control {
  margin: 0;
  padding: 0;
  height: 737px;
  /* overflow-x: hidden; */
}

.access-control .el-main,
.access-control .el-aside {
  background-color: #fff;
  line-height: 1px;
  overflow: inherit;
}

.search-condition {
  text-align: left;
  vertical-align: middle;
  background-color: #fff;
  margin-top: 10px;
  padding-top: 10px;
  font-family: PingFang-SC-Regular, "PingFang SC";
  font-size: 14px;
}
.search-condition .tabStyle {
  float: left;
  margin-right: 100px;
  font-size: 17px !important;
}

.search-condition:first-child {
  line-height: 30px;
}
/* 修改输入框名称大小 */
/* .search-condition:first-child > form > div > :first-child{
  font-size: 14px;
} */

.data-area {
  height: 687px !important;
}

.table-list {
  padding: 0;
  height: 600px !important;
  border-top: 1px solid #ebeef5;
  line-height: 1px;
}

.user-area {
  height: 687px !important;
  padding: 0;
}

.user-view {
  padding: 0;
  height: 687px !important;
  border: 1px solid #ebeef5;
}

.list-pager {
  text-align: right;
  padding-top: 5px;
  height: 52px !important;
  line-height: 30px !important;
  background-color: #fff;
}

.list-pager:first-child {
  line-height: 30px;
}

.user-info {
  padding: 20px 34px;
  height: 257px;
  /* border-bottom: 1px solid #EBEEF5; */
}

.user-photo {
  padding: 24px 34px;
}

.user-photo p {
  margin-top: 0;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  font-weight: 700;
  font-size: 16px;
  font-style: normal;
  color: #5a6b78;
  text-align: left;
  line-height: 21px;
  margin-bottom: 16px;
  display: inline-block;
  float: left;
}

.user-photo > p > span {
  width: 4px;
  height: 14px;
  margin-right: 12px;
  background-color: #1d8fe1;
  display: inline-block;
  line-height: 21px;
}

.user-photo img {
  width: 440px;
  height: 294px;
}

.user-photo .device-code {
  /* float: right; */
  height: 21px;
  line-height: 21px;
  margin-bottom: 16px;
  margin-right: 16px;
}

.user-photo .device-code .device-desc {
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  font-size: 14px;
  color: #5a6b78;
  float: right;
  margin-right: 12px;
}

.user-photo .device-code .device-icon {
  width: 18px;
  height: 20px;
  background-image: url("./assets/images/camera.png");
  display: inline-block;
  float: right;
  background-repeat: repeat-y;
  border: none;
  margin-left: 5px;
}

.view-user > div {
  float: left;
}

.view-user > p {
  margin-top: 0;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  font-weight: 700;
  font-size: 16px;
  font-style: normal;
  color: #5a6b78;
  text-align: left;
  line-height: 21px;
  margin-bottom: 16px;
}

.view-user > p > span {
  width: 4px;
  height: 14px;
  margin-right: 12px;
  background-color: #1d8fe1;
  display: inline-block;
  line-height: 21px;
}

.photo-info > img {
  width: 206px;
  height: 206px;
}

.user-info-detail {
  height: 100%;
  width: 200px;
  padding-left: 10px;
  overflow: hidden;
}

.user-info-detail:first-child {
  margin-top: 7px;
}

.user-info-detail > p {
  /* font-family: 'MicrosoftYaHei', '微软雅黑'; */
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #5a6b78;
  text-align: left;
  line-height: 19px;
  margin-bottom: 15px;
  text-align: left;
}

.flush-btn {
  border-radius: 3px;
  border: 1px solid red;
}
</style>

<style >
/** 设置数据行的样式 */
.access-control .row-render {
  font-family: "PingFang-SC-Regular", "PingFang SC";
  height: 55px;
  font-size: 14px;
}
/** 设置表头的样式 */
.access-control .header-render {
  font-family: "PingFang-SC-Regular", "PingFang SC";
  font-style: normal;
  color: #5a6b78;
  font-weight: 400;
}
.access-control .header-render button {
  background-color: #ebeef5;
}
.access-control .header-render th {
  font-weight: 400;
}
.access-control .el-switch span {
  font-size: 14px;
}
.access-control .accessTable {
  height: 100%;
}
.access-control .accessTable .el-table__body-wrapper {
  overflow-y: hidden;
  height: 100%;
}
.access-control .accessTable .el-table__row .cell {
  padding-left: 10px;
}
.search-condition div.el-tabs__item {
  font-size: 16px;
}
.search-condition .el-tabs__nav-wrap::after {
  background: #fff;
}
.el-table::before {
  display: none;
}
.access-control .el-table__header-wrapper {
  margin-top: 0px;
  width: 85%;
}
</style>
