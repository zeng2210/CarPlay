<template>
  <!-- 按姓名搜索 搜索结果的每个item -->
  <div class="result-item">
    <div class="result-item-left">
      <div>
        <img :src="item.imageURL">
      </div>
    </div>
    <div class="result-item-right">
      <el-row>
        <el-col :span="6" class="key">姓名</el-col>
        <el-col :span="17" :offset="1"  class="value">{{item.peopleName}}
          <span v-show="item.peopleType === USERTYPE.OWNER">（<span v-show="item.deleteFlag === '0' || item.deleteFlag === 0">历史</span>业主）</span>
          <span v-show="item.peopleType === USERTYPE.VISITOR">（<span v-show="item.deleteFlag === '0' || item.deleteFlag === 0">历史</span>访客）</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="key">
          <span v-show="item.peopleType === USERTYPE.OWNER">住址</span>
          <span v-show="item.peopleType === USERTYPE.VISITOR">访问住址</span>
          <span v-show="item.peopleType === USERTYPE.MGR">职务</span>
        </el-col>
        <el-col :span="17" :offset="1"  class="value">
          <span v-show="item.peopleType === USERTYPE.OWNER">{{item.address}}</span>
          <span v-show="item.peopleType === USERTYPE.VISITOR">{{item.visitAddress}}</span>
          <span v-show="item.peopleType === USERTYPE.MGR"><span v-show="item.deleteFlag === '0' || item.deleteFlag === 0">历史</span>{{item.job}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="key">手机号</el-col>
        <el-col :span="17" :offset="1"  class="value">{{item.tel}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="key">入园时间</el-col>
        <el-col :span="17" :offset="1"  class="value">{{item.intime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="key">出园时间</el-col>
        <el-col :span="17" :offset="1"  class="value">{{item.outTime}}</el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'people-item',
  props: {
    item: {
      require: true,
      type: Object
    }
  },
  data() {
    return {
      USERTYPE: {
        OWNER: '1',    // 业主
        VISITOR: '2',  // 访客
        MGR: '3'       // 物业
      }
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../assets/css/index";
</style>
