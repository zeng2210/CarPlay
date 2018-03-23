##弹框组件使用说明

### 1.组件引用
`import accessDialog from '@/globalcomponents/doorAccess_dialog/src/AccessWarnDialog'`

### 2.全局组件注册
`Vue.use(AccessDialog)`

### 3.组件使用
`  <accessDialog :alarmData="alarmData" :open.sync="isPopOut" v-if="isPopOut"></accessDialog>`
#### 3.1参数说明
| 参数名 | 类型 | 默认值 | 必选 | 说明 |
| :-----: | :----: | :------: | :---: | :---- |
| open | Boolean | false | - | 显示(true)/隐藏(false)对话框 |
| alarmData | Object | 参见属性说明 | - | 传入获取信息的参数|

##### 3.1.1alarmData属性说明
| 属性名 | 属性 | 类型 | 默认值 | 必选 | 说明 |
| :-----: | :----: | :----: | :------: | :---: | :---- |
| 窗口类型| type  | String | - | - | onEntranceDeviceWarming门禁弹窗;onSidewalkDeviceWarming人行道闸弹窗




