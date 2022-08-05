<template>
    <div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" 
        :finished="finished" 
        finished-text="没有更多了"
        offset="50"
        :immediate-check = "false"
        @load="onLoad">
        <ArticleItem 
        v-for="obj in list" 
        :key="obj.art_id" 
        :artObj="obj"
        @dislikeEV = "dislikeFn"
        @reportEV = "reportFn"
        ></ArticleItem>
        </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { recommendArticleAPI, dislikeArtAPI,reportArtAPI } from '@/api'
import { Notify } from 'vant'
export default {
    props: {
        // list: Array
        channelId: Number
    },
    data() {
        // 这里存放数据
        return {
            list: [],
            loading: false,
            finished: false,
            theTime: new Date().getTime(),
            isLoading: false
        }
    },
    async created() {
        const res2 = await recommendArticleAPI({
            channelId: this.channelId,
            timestamp: this.theTime
        })
        // console.log(res2)
        this.list = res2.data.data.results
        this.theTime = res2.data.data.pre_timestamp
    },
    methods: {
        // 专门负责发送请求
        async getArticleListFn() {
             // pre_timestamp
            const res2 = await recommendArticleAPI({
            channelId: this.channelId,
            timestamp: this.theTime
            })

            // console.log(res2)
            this.list = [...this.list, ...res2.data.data.results]
            this.theTime = res2.data.data.pre_timestamp
            //底部加载
            this.loading = false
            if(res2.data.data.pre_timestamp === null) {
                this.finished = true
            }
            //下拉加载
            this.isLoading = false
        },
        async onLoad() {
            if(this.list.length ===0) {
                this.loading = false
                return
            }
            this.getArticleListFn()             
        },
        async onRefresh() {
            // pre_timestamp
            this.list = []
            this.theTime = new Date().getTime()
            this.getArticleListFn()           
        },
        // 反馈不感兴趣
        async dislikeFn(artId) {
            try {
                await dislikeArtAPI({
                    artId
                })
                Notify({ type: 'success', message: '反馈成功' })
            }catch(err) {
                Notify({ type: 'warning', message: '反馈失败-联系程序员' })
            }
        },
        // 举报文章
        async reportFn(target, type) {
            try {
                await reportArtAPI({
                    target,
                    type
                })
                Notify({ type: 'success', message: '举报成功' })
            } catch (err) {
                Notify({ type: 'warning', message: '举报失败' })
            }
        }
    },
    components: {
        ArticleItem
    }
}
</script>

<style lang='less' scoped>
</style>
