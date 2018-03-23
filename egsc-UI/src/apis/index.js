import Axios from '@/assets/js/AxiosPlugin'
const BASE_PATH = process.env.DeviceManagement_API_URL
export const getUserList = params => { return Axios.get(`${BASE_PATH}/user/lists`, { params: params }).then(res => res.data) }

let contextPath = '/scp-mapapp'

export const getTestUserList = () => {
  return Axios.get('/demo/demodata'
  ).then(res => res.data)
}
