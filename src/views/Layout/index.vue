<template>
    <div>
        <!-- 原路由挂载点 -->
        <div class="home_container">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <!-- 底部导航 -->
        <van-tabbar v-model="active" route>
            <van-tabbar-item to="/layout/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item replace to="/layout/user" icon="setting-o">我的</van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>

export default {
    data() {
        return {
            active: 0
        }
    }
}
</script>

<style lang='less' scoped>
/* 内容底部内边距(把内容往上挤压, 防止内部被底部导航挡住) */
.home_container {
  padding-bottom: 50px;
}
/* 底部导航上边框 */
.van-tabbar {
  border-top: 1px solid #f8f8f8;
}
</style>
