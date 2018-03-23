##弹框组件使用说明

### 1.组件引用
`import globalCom from '@/globalcomponents'`

### 2.全局组件注册
`Vue.use(globalCom)`

### 3.组件使用
`<el-button type="success" @click="alertBroadcastDialog('broadcastDetail')">表格弹窗</el-button>`
`<el-button type="success" @click="alertBroadcastDialog('broadcastPage')">分页弹窗</el-button>`
`<el-button type="success" @click="alertBroadcastDialog('broadcastView')">广播</el-button>`
`<BroadcastDialog :broadcastData="broadcastData" :open.sync="broadcastVisible"></BroadcastDialog>`
#### 3.1参数说明
| 参数名 | 类型 | 默认值 | 必选 | 说明 |
| :-----: | :----: | :------: | :---: | :---- |
| open | Boolean | false | - | 显示(true)/隐藏(false)对话框 |
| broadcastData | Object | 参见属性说明 | - | 传入获取信息的参数|

##### 3.1.1commonData属性说明
| 属性名 | 属性 | 类型 | 默认值 | 必选 | 说明 |
| :-----: | :----: | :----: | :------: | :---: | :---- |
| 窗口类型| type  | String | 'broadcastDetail' | - | 
| 摄像头ID| monitorID  | String | '1' | - | 用以调用摄像头监控、摄像头位置、控制摄像头角度、获取周围保安等使用|
| 地图ID| mapID  | String | '1' | type为videoDetail时必传 | 用以调用后台地图定位摄像头 |


