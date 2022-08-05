<template>
  <!-- 一条文章单元格 -->
  <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{artObj.title}}</span>
        <!-- 单图 -->
    	<img v-if="artObj.cover.type===1" class="thumb" :src="artObj.cover.images" />
      </div>
       <!-- 三张图片 -->
	  <div v-if="artObj.cover.type===3" class="thumb-box">
    	<img 
        v-for="(item,index) in artObj.cover.images"
        :key = "index"
        class="thumb"
        :src="item" />    
      </div>
    </template>
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{ artObj.aut_name}}</span>
          <span>{{artObj.comm_count}}评论</span>
          <span>{{formatDate(artObj.pubdate)}}</span>
        </div>
        <div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click="showFn" />
          <van-action-sheet 
          v-model="show" 
          :actions="actions" 
          @select="onSelect" 
          @cancel = "cancelFn"
          get-container="body" 
          :cancel-text="cancelText"/>
        </div>
      </div>
    </template>
  </van-cell>
</template>

<script>
import { timeAgo } from '@/utils/date'
import { firstActions, secondActions } from '@/api/report'
export default {
    props: {
        artObj: Object
    },
    data() {
      return {
        show: false,
        actions: firstActions,
        cancelText: '取消'
      } 
    },
    methods: {
        formatDate: timeAgo,
        showFn() {
            this.show = true
        },
        onSelect(item) {
        // 默认情况下点击选项时不会自动收起
        // 可以通过 close-on-click-action 属性开启自动收起
            // console.log(item)
            if(item.name === '反馈垃圾内容'){
                this.actions = secondActions
                // return
                this.cancelText = '返回'
            }else if(item.name === '不感兴趣') {
                this.$emit('dislikeEV',this.artObj.art_id)
                this.show = false
            }else {
                this.$emit('reportEV',this.artObj.art_id,this.actions.value)
                // console.log(this.actions)
                this.actions = firstActions
                this.show = false
            }

        },
        cancelFn() {
            if(this.cancelText === '返回'){
                this.actions = firstActions
                this.cancelText = '取消'
                this.show = true
            }
        }
    }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span{
    margin: 0 3px;
    &:first-child{
        margin-left: 0;
    }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>