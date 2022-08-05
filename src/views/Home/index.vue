<template>
  <div>
    <van-nav-bar fixed>
      <template #left>
        <img src="../../assets/logo.png" class="logo">
      </template>
      <template #right>
        <van-icon name="search" size="0.48rem" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="chanId" sticky offset-top="1.226667rem">
      <van-tab v-for="obj in userChannelsList" :key="obj.id" :title="obj.name" :name="obj.id">
        <ArticleList :channelId="chanId"></ArticleList>
      </van-tab>
    </van-tabs>
    <!-- 编辑频道图标 -->
    <van-icon name="plus" size="0.37333334rem" class="moreChannels" @click="showPopup" />
    <!-- 弹出层组件 -->
    <van-popup v-model="show" class="edit_wrap">
      <ChannelEdit></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelsAPI, getAllChannelsAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './ChannelEdit.vue';
export default {
  data() {
    // 这里存放数据
    return {
      chanId: 0,
      userChannelsList: [], //用户已选频道
      allChannelsList: [], //所有频道
      // recommendArtList: []//推荐文章列表
      show: false
    };
  },
  async created() {
    const res = await getUserChannelsAPI()
    // console.log(res);
    //用户已选频道列表
    this.userChannelsList = res.data.data.channels
    // 推荐文章列表
    // this.chanIdchangeFn()
    // 所有频道列表
    const res2 = await getAllChannelsAPI()
    this.allChannelsList = res.data.data.channels
    // console.log(res2)
    
  },
  methods: {
    showPopup() {
      this.show = true
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  }
}
</script>

<style lang='less' scoped>
.logo {
  width: 100px;
  height: 30px;
}

/* tab内容距离tab导航的距离 */
/deep/ .van-tabs__content {
  padding-top: 44px;
}

// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 60px;
  right: 8px;
  z-index: 999;
}
/* 频道编辑弹出层铺满屏幕 */
.edit_wrap{
  width: 100%;
  height: 100%;
}
</style>
