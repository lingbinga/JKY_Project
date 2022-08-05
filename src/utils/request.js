// 基于axios封装网络请求
// 有局限
import theAxios from "axios"
const axios = theAxios.create({
    baseURL: 'http://toutiao.itheima.net',
    timeout: 20000  //超时时间
})

export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
    return axios({
        url,
        method,
        params,
        data,
        headers
    })
}
