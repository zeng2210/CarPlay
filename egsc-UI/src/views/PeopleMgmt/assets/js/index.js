// 初始化地图数据结构转换
export const extendObj = (option, object) => {
  for (let key in object) {
    option[key] = object[key]
  }
  return option
}

// 转换坐标xy
export const showLinePoint = (Array) => {
  let count
  Array.forEach((element, i) => {
    count = i + 1
    let borderPoint = [element.pointX, element.pointY]
    Array.push(borderPoint)
  })
  Array.splice(0, count)
  return Array
}

// * {
//   *  id: '111' 线路id
//   *  name: '巡更路线' 线路名称
//   *  lineType: '01' 线路类型
//   *  borderPoints: [[[42.5, 94.9375], [41.5, 33.9375], [151, 39.4375], [151.5, 99.4375], [68.5, 112.9375], [42.5, 93.9375]]]
//   *    边界点list
//   * }
