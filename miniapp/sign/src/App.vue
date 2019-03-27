<script>
import {getLocation, getAuth} from '@/utils/index.js'
import {login} from '@/api/index'
import {mapMutations} from 'vuex'

export default {
  created () {
    // 用户一打开小程序，就做定位
    getAuth('scope.userLocation', async ()=>{
      let location = await getLocation();
      wx.setStorageSync('location', location)
      console.log('location...', location);
    })
    let openid = wx.getStorageSync('openid');
    // if (!openid){
      // 调用登陆获取code
      wx.login({
        success: async res=>{
          console.log('res...', res);
          let data = await login(res.code);
          this.updateState(data.data);
          wx.setStorageSync('openid', data.data.openid);
        }
      })
    // }
  },
  methods: {
    ...mapMutations({
      updateState: 'updateState'
    })
  },
}
</script>

<style>
page{
  height: 100%;
}
.hover{
  background: #eee;
}
button{
  border-radius: 0;
  background: transparent;
  border: none;
  padding: 0;
}
button::after{
  border: none;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
