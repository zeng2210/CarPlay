##弹框组件使用说明

### 1.组件引用

`import globalCom from '@/globalcomponents'`

### 2.全局组件注册

`Vue.use(globalCom)`

### 3.组件使用

```html
<GPSDeviceMap ref="GPSDeviceMap"></GPSDeviceMap>
```

```javascript
this.$refs.GPSDeviceMap.showMap({
  width: '1000px',
  height: '600px',
  type: 1,
  GPS: [113.621698, 23.30521], //GPS坐标与地图中心点GPS的范围限制 小数点前三位一样
  zoom: 3 //选填，默认值是2.5
})
```
