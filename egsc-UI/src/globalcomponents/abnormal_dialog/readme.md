##弹框组件使用说明

### 1.组件引用
`import globalCom from '@/globalcomponents'`

### 2.全局组件注册
`Vue.use(globalCom)`

### 3.组件使用
` <abnormal-dialog :abnormalData="abnormalData" :open.sync="abnormaVisible" @close="handleAbnormalClose" @onAbnormalToVideo="handleAbnormalToVideo"> </abnormal-dialog>`
#### 3.1参数说明
| 参数名 | 类型 | 默认值 | 必选 | 说明 |
| :-----: | :----: | :------: | :---: | :---- |
| open | Boolean | false | - | 显示(true)/隐藏(false)对话框 |
| abnormalData | Object | 参见属性说明 | - | 传入获取信息的参数|
| abnormaVisible | Boolean | false | 必选 | 组件是否显示|
##### 3.2.方法说明
| 方法名 | 作用 | 必选 |
| :-----: | :----: | :---: |
| @close="handleAbnormalClose" | 关闭预览 | 必须 |
| @onAbnormalToVideo="handleAbnormalToVideo" | 异常视频转入预览 | 异常视频转入预览界面需要此方法 |
##### 3.1.1abnormalData属性说明
| 属性名 | 属性 | 类型 | 默认值 | 必选 | 说明 |
| :-----: | :----: | :----: | :------: | :---: | :---- |
| deviceId| type  | String | '' | 必须 | 设备ID |




