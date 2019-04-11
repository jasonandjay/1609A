<template>
  <!-- 首页地图模块 -->
  <div>
    <map
      id="map"
      :longitude="location.longitude"
      :latitude="location.latitude"
      subkey="X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL"
      show-location
      show-compass
      :circles="circle"
      :include-points="points"
      :markers="markers"
      @markertap="markertap"
      @regionchange="regionChange"
    >
  </map>
    <cover-view class="current">
      <cover-image class="location" @click="goCurrent" src="/static/images/location.png" />
    </cover-view>
  </div>

</template>

<script>
import {getLocation, getAuth} from '@/utils/index.js'
import getDistance from '@/utils/distance.js'


export default {
  data() {
    return {
      // 用户当前位置
      location: {
        latitude: 40.03298,
        longitude: 116.29891
      },
      distance: 0
    }
  },
  computed: {
    points(){
      return [this.location, ...this.markers]
    },
    circle(){
      if (!this.markers.length){
        return []
      }else{
        return [{
          ...this.markers[0],
          color:  this.distance>100?'#C9394A': '#197DBF',
          fillColor: 'rgba(0,0,0, .3)',
          radius: 100,
          strokeWidth: 2
        }]
      }
    }
  },
  watch: {
    reLocation(){
      // 检测重新定位当前位置
      this.goCurrent();
    }
  },
  props: {
    markers: {
      type: Array,
      default: []
    },
    markertap: {
      type: Function,
      default: ()=>{}
    },
    reginonChange: {
      type: Function,
      default: ()=>{}
    },
    reLocation: {
      type: Boolean,
      default: false
    },
    updateDistance: {
      typef: Function,
      default: ()=>{}
    }
  },
  mounted() {
    this.goCurrent();
  },
  methods: {
    goCurrent(){
      getAuth('scope.userLocation', async ()=>{
        let location = await getLocation();
        this.location = location;

        console.log('scope.userLocation...', this.location, this.markers[0]);
        // 重新计算距离
        if (this.updateDistance){
          this.distance = getDistance(this.location.latitude, this.location.longitude, this.markers[0].latitude, this.markers[0].longitude)
          this.updateDistance(this.distance)
        }
      })
    }
  }
}
</script>

<style scoped>
div{
  position: relative;
  height: 100%;
}
map{
  width: 100%;
  height: 100%;
}
.current{
  position: absolute;
  z-index: 1001;
  bottom: 60rpx;
  left: 20rpx;
}
.location{
  height: 80rpx;
  width: 80rpx;
}
</style>
