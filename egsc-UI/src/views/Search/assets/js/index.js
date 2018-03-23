import {Loading} from 'element-ui'

export const processList = (oldList, cols, emptyObj) => {
  if (oldList && oldList.length && (oldList.length > 0)) {
    let remain = oldList.length % cols
    if (remain === 0) {
      return oldList
    } else {
      let newList = oldList.slice()
      for (let i = 0; i < (cols - remain); i++) {
        newList.push(emptyObj)
      }
      return newList
    }
  }
  return []
}
export const showLoading = (txt) => {
  if (!txt) {
    txt = '正在查询，请稍候...'
  }
  return Loading.service({
    target: '.search-root',
    text: txt
  })
}

export const closeLoading = (loading) => {
  if (loading) {
    loading.close()
  }
}

export const isNull = (object, key) => {
  if (object === null) {
    return true
  }
  let val = object[key]
  if (typeof val === 'undefined' || val === null) {
    return true
  }
  return false
}

export const isBlank = (object, key) => {
  let isNullResult = isNull(object, key)
  if (isNullResult) {
    return true
  }
  let val = object[key] + ''
  if (val.trim() === '') {
    return true
  }
  return false
}

export const formatCarInTime = (str) => {
  if (typeof str === 'undefined' || str === null || str === '') {
    return '未入场'
  }
  return str
}
