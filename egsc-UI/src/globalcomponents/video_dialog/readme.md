##弹框组件使用说明

### 1.组件引用
`import globalCom from '@/globalcomponents'`

### 2.全局组件注册
`Vue.use(globalCom)`

### 3.组件使用
` <el-button type="primary" @click="alertDialog('videoDetail')">视频弹窗</el-button>`
`<video-dialog :previewData="previewData" :warnShow="warnShow" :abnormalShow="abnormalShow" :open.sync="previewVisible" @close="handleVideoClose" @onPreviewBackToWarn="handlePreviewBackToWarn" @onPreviewBackToAbnormal="handlePreviewBackToAbnormal"></video-dialog>`
#### 3.1参数说明
| 参数名 | 类型 | 默认值 | 必选 | 说明 |
| :-----: | :----: | :------: | :---: | :---- |
| open | Boolean | false | - | 显示(true)/隐藏(false)对话框 |
| previewData | Object | 参见属性说明 | - | 传入获取信息的参数|
| warnShow | Boolean | false | - | 预警跳入预览必传|
| abnormalShow | Boolean | false | - | 异常视频跳入预览必传|
| previewVisible | Boolean | false | - | 组件是否显示|
##### 3.2.方法说明
| 方法名 | 作用 | 必选 |
| :-----: | :----: | :---: |
| @close="handleVideoClose" | 关闭预览 | 必须 |
| @onPreviewBackToWarn="handlePreviewBackToWarn" | 预览回到警报页面 | 预览回到警报时需要此方法 |
| @onPreviewBackToAbnormal="handlePreviewBackToAbnormal | 预览回到异常视频页面 | 预览回到异常视频页面需要此方法 |
##### 3.1.1previewData属性说明
| 属性名 | 属性 | 类型 | 默认值 | 必选 | 说明 |
| :-----: | :----: | :----: | :------: | :---: | :---- |
| deviceId| type  | String | '' | 必须 | 设备ID |



