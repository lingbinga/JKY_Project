import request from '@/utils/request'
import { getToken } from '@/utils/token'

// 获取所有频道列表
export const getAllChannelsAPI = () => {
    return request({
        url: '/v1_0/channels'
    })
}

// 用户认证（登录注册）
export const loginAPI = ({ mobile, code }) => {
    return request({
        url: '/v1_0/authorizations',
        method: 'POST',
        data: {
            mobile,
            code
        }
    })
}
  
// 获取用户的频道
export const getUserChannelsAPI = () => {
    return request({
        url: '/v1_0/user/channels',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

// 获取文章新闻推荐
export const recommendArticleAPI = ({ channelId,timestamp }) => {
    return request({
        url: '/v1_0/articles',
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        params: {
            channel_id: channelId,
            timestamp
        }
    })
}

// 对文章不喜欢
export const dislikeArtAPI = ({ artId }) => {
    return request({
        url: '/v1_0/article/dislikes',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        data: {
            target: artId
        }
    })
}

// 举报文章
export const reportArtAPI = ({ target, type }) => {
    return request({
        url: '/v1_0/article/reports',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        data: {
            target,
            type,
            remark: "其他问题 的附加说明"
        }
    })
}