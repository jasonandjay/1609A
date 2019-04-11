<template>
  <div class="wrap">
    <!-- 首页地图模块 -->
    <div class="map">
      <Map :reLocation="reLocation"/>
    </div>
    <!-- 重新定位图标 -->
    <cover-view class="current">
      <button class="add" @tap="goAdd">添加面试</button>
      <button class="my" @tap="goMy">
        <cover-image src="/static/images/my.png"/>
      </button>
    </cover-view>
  </div>
</template>

<script>
import {getLocation, getAuth} from '@/utils/index.js'
import {mapState, mapMutations} from 'vuex'
import Map from '@/components/map.vue'

export default {
  data () {
    return {
      // 用户当前位置
      reLocation: false,
      markers: []
      // markers: [{
      //   iconPath: '/static/images/job.png',
      //   id: 0,
      //   latitude: 40.03298,
      //   longitude: 116.29891,
      //   width: 50,
      //   height: 50
      // }]
    }
  },
  components: {
    Map
  },
  computed: {

  },

  methods: {
    // 点击标注物
    marketTap(e){

    },
    // 去我的页面
    goMy(){
      wx.navigateTo({ url: '/pages/my/main' });
    },
    // 去添加面试页面
    goAdd(){
      wx.navigateTo({ url: '/pages/sign/add/main' });
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  height: 100%;
}
.map{
  width: 100%;
  height: 100%;
  padding-bottom: 100rpx;
  box-sizing: border-box;
}
.current{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 240rpx;
}
.location{
  position: fixed;
  bottom: 160rpx;
  width: 80rpx;
  height: 80rpx;
  left: 20rpx;
}
.add{
  position: fixed;
  width: 100%;
  height: 100rpx;
  background: #000;
  color: #fff;
  font-weight: 500;
  bottom: 0;
  left: 0;
  font-size: 40rpx;
}
.my{
  position: fixed;
  display: inline-block;
  // background: #fff;
  // border-radius: 50rpx 0 0 50rpx;
  bottom: 150rpx;
  right: 0;
  width: 120rpx;
  height: 100rpx;
  cover-image{
    width: 80rpx;
    height: 80rpx;
    margin-top: 10rpx;
    margin-left: 10rpx;
    background: #000;
    border-radius: 50%;
  }
}
</style>
