<template>
  <div class="wrap">
    <header>
      <span @click="tabChange(index)" v-for="(item, index) in types" :key="index" :class="(active+3)%4===index?'active':''">{{item}}</span>
    </header>
    <signList :list="list"></signList>
    <p class="more" v-if="list.length && list.length>=10">{{hasMore?'上拉加载更多': '我是有底线的'}}</p>
  </div>
</template>

<script>
import signList from '@/components/signList.vue'
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  data(){
    return {
      types: ['未开始','已打卡','已放弃','全部']
    }
  },
  computed: {
    ...mapState({
      active: state=>state.sign.active,
      list: state=>state.sign.list,
      page: state=>state.sign.page,
      hasMore: state=>state.sign.hasMore
    })
  },
  methods: {
    ...mapMutations({
      updateState: 'sign/updateState'
    }),
    ...mapActions({
      getList: 'sign/getList'
    }),
    tabChange(index){
      this.updateState({active: (index+1)%4, page: 1});
      this.getList();
    }
  },
  components: {
    signList
  },
  onShow(){
    this.getList();
  },
  onReachBottom(){
    if (this.hasMore){
      this.updateState({page: this.page+1});
      this.getList();
    }
  }
}

</script>

<style lang="scss" scoped>
.wrap{
  height: 100%;
}
header{
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 99;
  width: 100%;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid #eee;
  span{
    line-height: 88rpx;
    text-align: center;
    box-sizing: border-box;
    border-bottom: 2rpx solid #fff;
  }
  span.active{
    color: #197DBF;
    font-weight: 500;
    border-bottom: 3rpx solid #197DBF;
  }
}
.more{
  text-align: center;
  font-size: 32rpx;
  line-height: 2;
  color: #999;
  // border-bottom: 20rpx solid #eee;
  border-top: 20rpx solid #eee;
}
</style>
