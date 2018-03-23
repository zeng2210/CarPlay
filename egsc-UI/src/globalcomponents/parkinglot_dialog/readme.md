##弹框组件使用说明

### 1.组件引用
`import ParkinglotDialog from '@/globalcomponents/parkinglot_dialog/src/ParkinglotDialog'`

### 2.全局组件注册
`Vue.use(ParkinglotDialog)`

### 3.组件使用
`  <ParkinglotDialog :parkinglotData="parkinglotData" :open.sync="isParkinglotDialogVisible" v-if="isParkinglotDialogVisible"></ParkinglotDialog>`
#### 3.1参数说明
| 参数名 | 类型 | 默认值 | 必选 | 说明 |
| :-----: | :----: | :------: | :---: | :---- |
| open | Boolean | false | - | 显示(true)/隐藏(false)对话框 |
| parkinglotData | Object | 参见属性说明 | - | 传入获取信息的参数|

##### 3.1.1alarmData属性说明
| 属性名 | 属性 | 类型 | 默认值 | 必选 | 说明 |
| :-----: | :----: | :----: | :------: | :---: | :---- |
| 窗口类型| type  | String | - | - | parkinglotoccupied车位占用;carexception车辆异常
| 窗口类型| dialogTitle  | String | - | - | 如:'固定车位被占预警';车辆异常(长时停放)




