<template>
  <div class="wrap">
    <!-- 首页地图模块 -->
    <div class="map">
      <Map :markers="markers"/>
    </div>
    <!-- 打卡按钮 -->
    <cover-view class="current">
      <button class="add" @tap="goAdd">打卡</button>
    </cover-view>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Map from '@/components/map.vue'

export default {
  data () {
    return {
      // markers: []
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
    ...mapState({
      info: state=>state.sign.info
    }),
    markers(){
      if (this.info && Object.keys(this.info)){
        return [{
          iconPath: '/static/images/job.png',
          latitude: this.info.latitude,
          longitude: this.info.longitude,
          title: this.info.company,
          width: 20,
          height: 20
        }]
      }else{
        return []
      }
    }
  },

  methods: {
    // 点击标注物
    marketTap(e){

    }
  },

  async onShow(){
    // 修改标题
    wx.setNavigationBarTitle({ title: '打卡: '+this.info.company });
  },
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
