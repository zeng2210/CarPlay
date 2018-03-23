import Axios from '@/assets/js/AxiosPlugin'

// export const getAbnormalEventPie = (params) => { return Axios.get('/mock/video/pie/getAbnormalEventPie', { params: params }).then(res => res.data) }
export const getAbnormalEventPie = (params) => { return Axios.get('/scp-videogatewayapp/video/event/warning/statistics', { params: params }) }
