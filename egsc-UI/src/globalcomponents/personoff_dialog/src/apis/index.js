import Axios from '../../../../assets/js/AxiosPlugin'

const contextPath = '/scp-videogatewayapp'
// const contextPath = ''
export const warnEventList = (params) => {
  return Axios.get(contextPath + '/video/event/list', { params: params },
    // return Axios.get('/video/event/list', params,
    {
      headers: { 'Content-Type': 'application/json' }
    })
}
export const updateEvtWarnStatus = (params) => {
  return Axios.post(contextPath + '/video/event/warningStatus/batchUpdate', params,
    // return Axios.post('video/event/batchUpdateWarningStatus', params,
    {
      headers: { 'Content-Type': 'application/json' }
    })
}
