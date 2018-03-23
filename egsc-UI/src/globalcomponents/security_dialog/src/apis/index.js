import Axios from '../../../../assets/js/AxiosPlugin'
// 根据ID查询保安信息
export const getGurdInfoData = (params) => {
  return Axios.get('/scp-patrolapp/patrolTaskMng/getSecurityById', { params: params })
}
