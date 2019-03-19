<template>
  <div class="wrap">
    我的页面
  </div>
</template>

<script>
import card from '@/components/card'
import {getLocation, getAuth} from '@/utils/index.js'
import {mapState, mapMutations} from 'vuex'

export default {
  data () {
    return {
      // 用户当前位置
      location: {
        latitude: 40.03298,
        longitude: 116.29891
      },
      markers: [{
        iconPath: '/static/images/job.png',
        id: 0,
        latitude: 40.03298,
        longitude: 116.29891,
        width: 50,
        height: 50
      }]
    }
  },

  computed: {
    ...mapState({
      state: state=>state.index.count,
      state2: state=>state.index.count,
    })
  },

  components: {
    card
  },

  methods: {
    ...mapMutations({
      changeNum: 'index/changeCount'
    }),
    btnClick(type){
      this.changeNum(type);
    },
    regionChange(e){

    },
    // 点击标注物
    marketTap(e){

    },
    // 重新定位
    goCurrent(){
      getAuth('scope.userLocation', async ()=>{
        let location = await getLocation();
        wx.setStorageSync('location', location)
        this.location = location;
      })
    },
    // 去我的页面
    goMy(){
      wx.navigateTo({ url: '/pages/my/main' });
    }
  },

  created () {
    let location = wx.getStorageSync('location');
    this.location = location;
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  height: 100%;
}
map{
  width: 100%;
  height: 100%;
}
.location{
  position: fixed;
  bottom: 100rpx;
  width: 80rpx;
  height: 80rpx;
  left: 20rpx;
}
.my{
  position: fixed;
  background: #fff;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  bottom: 100rpx;
  width: 120rpx;
  height: 90rpx;
  right: 0;
  cover-image{
    width: 70rpx;
    height: 70rpx;
    margin-top:10rpx;
    margin-left:20rpx;
    background: #eee;
    border-radius: 50%;
  }
}
</style>
