<template>
    <div>
      <p class="title">{{msg}}</p>
      <section class="seat-porgress">
        <p class="prog-text">全部车位<em>{{total}}</em>/剩余车位<em>{{idleTotal}}个</em></p>
        <!-- <el-progress :percentage="idleTotalPerce" :show-text="false"></el-progress> -->
        <div class="press-outer">
          <div class="press-inter" style="background-color:#4c84ff" id="idleTotal"></div>
        </div>
        <ul class="prog-list">
          <li>
            <img :src="seatFixed"><span class="total-text" v-text="fixed"></span>
            <p class="prog-text">剩余固定车位 {{idleFixed}} 个</p>
            <div class="press-outer">
              <div class="press-inter" style="background-color:#7fc87e" id="idleFixed"></div>
            </div>
            <!-- <el-progress :percentage="fixedPerce" :show-text="false" style="background-color:#000"></el-progress> -->
          </li>
          <li>
            <img :src="seatMonth"><span class="total-text" v-text="month"></span>
            <p class="prog-text">剩余月保车位 {{idleMonth}} 个</p>
            <div class="press-outer">
              <div class="press-inter" style="background-color:#d78962" id="idleMonth"></div>
            </div>
            <!-- <el-progress :percentage="monthPerce" :show-text="false"></el-progress> -->
          </li>
          <li>
            <img :src="seatTemp"><span class="total-text" v-text="temp"></span>
            <p class="prog-text">剩余临时车位 {{idleTemp}} 个</p>
            <!-- <el-progress :percentage="tempPerce" :show-text="false"></el-progress> -->
            <div class="press-outer">
              <div class="press-inter" style="background-color:#bb6ff9" id="idleTemp"></div>
            </div>
          </li>
          <li>
            <img :src="seatUnuse"><span class="total-text" v-text="unavailable"></span>
            <p class="prog-text">不可用车位 {{unavailable}}个</p>
          </li>
        </ul>
      </section>
    </div>  
</template>
<script>
import { getCarPortInfo } from '../apis/index'
import seatFixed from '@/assets/images/seat_fixed.png'
import seatMonth from '@/assets/images/seat_month.png'
import seatTemp from '@/assets/images/seat_temp.png'
import seatUnuse from '@/assets/images/seat_unavailable.png'
export default {
  name: 'carport-report',
  data() {
    return {
      msg: '车位信息',
      total: 0,                     // 全部车位
      idleTotal: 0,                 // 剩余车位
      idleFixed: 0,                 // 剩余固定车位
      idleMonth: 0,                 // 剩余月保车位
      idleTemp: 0,                  // 剩余临时车位
      unavailable: 0,                // 不可用车位
      fixed: 0,                       // 固定车位
      month: 0,                       // 月保车位
      temp: 0,                       // 临时车位
      seatFixed: seatFixed,
      seatMonth: seatMonth,
      seatTemp: seatTemp,
      seatUnuse: seatUnuse
    }
  },
  mounted () {
    getCarPortInfo().then(res => {
      this.total = res.data.data.total
      this.idleTotal = res.data.data.idleTotal || 0
      this.idleFixed = res.data.data.idleFixed || 0
      this.idleMonth = res.data.data.idleMonth || 0
      this.idleTemp = res.data.data.idleTemp || 0
      this.unavailable = res.data.data.unavailable || 0
      this.fixed = res.data.data.fixed || 0
      this.month = res.data.data.month || 0
      this.temp = res.data.data.temp || 0
      document.getElementById('idleFixed').style.width = res.data.data.fixScale + '%'
      document.getElementById('idleTotal').style.width = res.data.data.totleScale + '%'
      document.getElementById('idleMonth').style.width = res.data.data.monthScale + '%'
      document.getElementById('idleTemp').style.width = res.data.data.tempScale + '%'
      // this.idleTotalPerce = res.data.data.totleScale
      // this.fixedPerce = res.data.data.fixScale
      // this.monthPerce = res.data.data.monthScale
      // this.tempPerce = res.data.data.tempScale
    })
  }
}
</script>
<style lang="less" scoped>
.title{
  height: 85px;
  line-height: 85px;
  text-align: left;
  text-indent: 20px;
  font-size: 18px;
  color: #5b6c79;
}
.seat-porgress{
  border-top: 1px solid #e5e9ed;
  padding: 32px 70px 0 30px
}
.prog-text{
  color: #5a6b78;
  font-size: 14px;
  margin-bottom: 12px;
  em{
    font-style: normal;
    color: #4c84ff;
    margin: 0 6px;
  }
}
.prog-list{
  margin-top: 52px;
  overflow: hidden;
  li{
    box-sizing: border-box;
    margin-bottom: 30px;
    width: 50%;
    float: left;
    .total-text{
      font-size: 20px;
      margin-left: 16px;
      color: #5b6c79;
    }
    &:nth-child(odd){
      padding-right: 48px;
    }
    &:nth-child(even){
      padding-left: 48px;
    }
    .el-progress-bar{
      background: #000;
    }
  }
}
.press-outer{
  height: 4px;
  background:#cfd8dc;
  border-radius:3px;
  position: relative;
  .press-inter{
    height:100%;
    line-height: 1;
    border-radius: 3px;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
