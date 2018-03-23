<template>
  <div class="hello">
    <el-row>
      <el-col :span="4">
        <el-button type="" @click="getMockData"> Get Mock Data!</el-button>
        <el-button type="" @click="getRealInterface">Get InterfaceData</el-button>
      </el-col>
    </el-row>
   {{now}} HelloWorld ! {{msg}}
   <br/>
   <img :src="logopngPath" />
   <div>
      <object id='PlayOcx' type='application/x-vlc-plugin' ref='PlayOcx' classid='clsid:{E3C9EE5C-D51A-4743-AD60-36CC82816A18}' onerror='Load Error!' standby='正在加载...' ></object>
    </div>
    <div><button @click="getOcx">test</button></div>
  </div>
</template>

<script>
import { getTestUserList, getServerData } from './apis/index'
export default {
  name: 'HelloWorld',
  data () {
    return {
      tableData: {},
      total: '',
      msg: 'Welcome to Your Vue.js App index , ',
      now: new Date().toLocaleString()
    }
  },
  mounted () {
    this.getRealInterface()
  },
  methods: {
    getMockData () {
      console.log('Get Mock Data')
      getTestUserList('').then(
        function (result) {
          console.log(result)
        }
      )
    },
    getRealInterface () {
      console.log('Begin to get the interface data')
      getServerData(1, 10, 9008)
        .then(
        function (result) {
          this.tableData = result.user
          console.log(this.tableData)
          this.total = result.pageCount
          console.log(this.total)
        }
        ).catch(
        function (error) {
          console.log(error)
        })
    },
    getOcx () {
      console.log(this.$refs.PlayOcx.GetLocalIP())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--  lang="less" -->
<style lang="less" scoped>
body {
  padding: 0;
  margin: 0;
  height: 100%;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
