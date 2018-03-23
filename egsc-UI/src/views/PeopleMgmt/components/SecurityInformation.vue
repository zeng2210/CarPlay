<template>
  <div>
    <div class="security-information">
      <div class="people-msg clearfix">
        <div class="people-img fl"><img :src="gardenData.propertyDto.facePic" alt=""></div>
        <div class="people-information fl">
          <div class="people-security">
            <span class="security-name">{{ gardenData.propertyDto.name}}</span>
            <span class="security-duty">保安</span>
          </div>
          <p class="phone-color"><img src="../assets/images/u15709.png" alt="">{{ gardenData.propertyDto.phone }}</p>
          <p>{{ gardenData.propertyDto.company }}</p>
          <el-button type="primary" @click="sentInfo">发送消息</el-button>
          <transition>
            <p class="show-msg" v-show="infoSentnSucc">消息发送成功</p>
          </transition>
        </div>
      </div>
      <el-scrollbar :native="false" :noresize="true" class="parksafe-table">
        <div class="security-number">
          <el-table :data="gardenData.patrolHistoryPoints">
            <el-table-column prop="orderNo" label="序号" width="100" align="center">
            </el-table-column>
            <el-table-column prop="pointName" label="巡更点" align="center" show-overflow-tooltip width="160">
            </el-table-column>
            <el-table-column prop="pointTime" label="打卡时间" align="center" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gardenData: {
      require: false,
      type: Object,
      default: {
        propertyDto: {
          facePic: '',
          name: '',
          phone: '',
          company: ''
        },
        patrolHistoryPoints: {
          orderNo: '',
          pointName: '',
          pointTime: ''
        }
      }
    }
  },
  data () {
    return {
      infoSentnSucc: false
    }
  },
  methods: {
    // 发送消息
    sentInfo () {
      this.$emit('sentInfo', this.gardenData.deviceId)
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../assets/less/variable.less");
.security-information {
  background-color: @white;
  .people-security {
    line-height: 29px;
    margin-bottom: 20px;
  }
  .people-msg {
    padding: 20px;
    border-bottom: 1px solid #c7d1d9;
  }
  .people-img {
    img {
      box-sizing: border-box;
      border: 1px solid #c7d1d9;
      width: 111px;
      height: 111px;
      vertical-align: middle;
    }
  }
  .people-information {
    font-weight: 400;
    font-style: normal;
    padding-left: 29px;
    font-family: "PingFangSC-Medium";
    font-size: 14px;
    color: #5a6b78;
    letter-spacing: 0;
    text-align: left;
    .security-name {
      font-family: "PingFangSC-Semibold";
      font-size: 18px;
      letter-spacing: 0;
      text-align: left;
      margin-right: 12px;
    }
    .security-duty {
      color: #b0b1b2;
    }
    .el-button {
      background: #144ea1;
      border-radius: 2px;
      width: 80px;
      height: 34px;
      padding: 0;
      line-height: 20px;
      position: absolute;
      right: 40px;
      top: 58px;
    }
    .el-button--primary {
      border: none;
    }
  }
  .show-msg {
    color: #fff;
    background: rgba(23, 23, 24, 0.8);
    border-radius: 2px;
    width: 300px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -20%);
    z-index: 99;
  }
  .phone-color {
    font-family: "PingFangSC-Medium";
    margin-bottom: 7px;
    img {
      width: 16px;
      position: relative;
      top: 3px;
    }
  }
}
</style>
<style lang="less">
.security-information {
  height: 307px;
  width: 466px;
  .el-scrollbar {
    height: 150px;
    width: 100%;
    .el-table {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
    }
  }
  .el-table__body-wrapper {
    overflow-x: hidden !important;
  }
  .el-table {
    color: #5a6b78;
    margin-top: 5px;
    td,
    th {
      padding: 3px 0;
    }
  }
  .el-table::before {
    width: 0;
  }
}
</style>
