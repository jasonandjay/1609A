<template>
  <!-- 首页地图模块 -->
  <map
    id="map"
    :longitude="location.longitude"
    :latitude="location.latitude"
    subkey="X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL"
    scale="14"
    show-location
    show-compass
    :circles="circle"
    :include-points="points"
    :markers="markers"
    @markertap="markertap"
    @regionchange="regionChange"
  >
  </map>
</template>

<script>
import {getLocation, getAuth} from '@/utils/index.js'

export default {
  data() {
    return {
      // 用户当前位置
      location: {
        latitude: 40.03298,
        longitude: 116.29891
      },
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
          color: '#197DBF',
          fillColor: 'rgba(0,0,0, .3)',
          radius: 500,
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
    }
  },
  onShow(){
    this.goCurrent();
  },
  methods: {
    goCurrent(){
      getAuth('scope.userLocation', async ()=>{
        let location = await getLocation();
        wx.setStorageSync('location', location)
        this.location = location;
      })
    }
  }
}
</script>

<style>
map{
  width: 100%;
  height: 100%;
}
</style>
