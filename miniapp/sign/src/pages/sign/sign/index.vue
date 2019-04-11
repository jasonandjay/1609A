<template>
  <div class="wrap">
    <!-- 首页地图模块 -->
    <div class="map">
      <Map :markers="markers" :updateDistance="updateDistance"/>
    </div>
    <!-- 打卡按钮 -->
    <cover-view class="current">
      <button class="add" @tap="goSign">打卡</button>
    </cover-view>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Map from '@/components/map.vue'

export default {
  data () {
    return {
      distance: 0
    }
  },
  components: {
    Map
  },
  computed: {
    ...mapState({
      info: state=>state.sign.info
    }),
    distance(){
      return getDistance(this.info.latitude, this.info.longitude, )
    },
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
    ...mapActions({
      updateDetail: 'sign/updateDetail'
    }),
    // 点击标注物
    marketTap(e){

    },
    updateDistance(distance){
      console.log('distance...', distance);
      this.distance = distance;
    },
    async goSign(){
      let distance = this.distance;
      if (this.distance < 100){
        let result = await this.updateDetail({
          id: this.info.id,
          params: {
            status: 0,
            sign_time: +new Date()
          }
        })
        console.log('result...', result);
        wx.showToast({
          title: '打卡成功', //提示的内容,
          icon: 'none' //图标,
        });
      }else{
          if (this.distance > 1000){
            distance = (this.distance/1000).toFixed(2)+'公里'
          }else{
            distance = this.distance+'米'
          }
          console.log('distance...', distance, this.distance);
          wx.showToast({
            title: `你距目的地还有${distance},暂时还不能打卡`, //提示的内容
            icon: 'none'
          });
      }
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
