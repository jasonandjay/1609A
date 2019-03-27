<template>
  <div class="wrap">
    <header>
      <div class="avatar">
        <image src="/static/images/my.png" lazy-load="false"></image>
      </div>
      <p>{{formatPhone}}</p>
    </header>
    <ul>
      <li @click="goSignList">
        <icon type="waiting" size="18px" />
        <span>
          我的面试
        </span>
        <image src="/static/images/arrow.svg"></image>
      </li>
      <button open-type="contact" class="concat">
        <icon type="info" size="18px" />
        <span>客服中心</span>
        <image src="/static/images/arrow.svg"></image>
      </button>
    </ul>
    <div class="phone" v-if="showPhoneDialog" @click="hideMask" data-id=1>
      <p>为了更好的使用我们的服务，我们需要获取你的手机号码</p>
      <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">同意</button>
    </div>
  </div>
</template>

<script>
import {getLocation, getAuth} from '@/utils/index.js'
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  data () {
    return {
      showPhoneDialog: false
    }
  },

  computed: {
    ...mapState({
      info: state=>state.info,
      phone: state=>state.user.phone
    }),
    formatPhone(){
      let phone = this.info.phone || this.phone;
      if (phone){
        return phone.slice(0,3)+'****'+phone.slice(7,11)
      }else{
        return '************';
      }
    }
  },

  methods: {
    ...mapActions({
      bindPhoneNumber: 'user/getPhoneNumber'
    }),
    ...mapMutations({
      updateState: 'updateState'
    }),
    async getPhoneNumber(e){
      let data = await this.bindPhoneNumber({
        iv: e.target.iv,
        encryptedData: e.target.encryptedData
      })
      this.showPhoneDialog = false;
      if (data.data.phoneNumber){
        wx.showToast({
          title: '绑定手机号成功', //提示的内容,
        });
        // 更新全局state
        this.updateState({...this.info, phone: data.data.phoneNumber});
      }else{
          wx.showToast({
          title: '绑定手机号失败', //提示的内容,
        });
      }
    },
    goSignList(){
      wx.navigateTo({ url: '/pages/sign/list/main' });
    },
    hideMask(e){
      if (e.target.dataset.id == 1){
        this.showPhoneDialog = false;
      }
    }
  },

  onShow() {
    console.log('this.info...', this.info);
    if (!this.info.phone){
      this.showPhoneDialog = true;
    }
  }
}
</script>

<style lang="scss" scoped>
header{
  background: #F4F6F9;
  width: 100%;
  height: 350rpx;
  box-sizing: border-box;
  padding: 50rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .avatar{
    width: 100rpx;
    height: 100rpx;
    background: #fff;
    text-align: center;
    padding: 20rpx;
    border-radius: 50%;
  }
  image{
    width: 90%;
    height: 90%;
  }
}
.phone{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, .3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p{
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
    width:70%;
    background:#fff;
    padding:20rpx 15rpx;
    line-height: 1.5;
    font-size:34rpx;
    box-sizing:border-box;
  }
  button{
    width: 70%;
    background: #197DBF;
    color: #fff;
    border-bottom-left-radius: 20rpx;
    border-bottom-right-radius: 20rpx;
  }
}
li,button.concat{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 30rpx 40rpx;
  border-bottom: 1rpx solid #eee;
  span:nth-child(2){
    flex: 1;
    margin-left: 40rpx;
    color: #666;
    font-size: 36rpx;
    background: transparent;
    text-align: left;
  }
  image{
    width: 40rpx;
    height: 40rpx;
  }
}
</style>
