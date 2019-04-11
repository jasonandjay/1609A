<template>
  <div class="wrap">
    <ul>
      <li>
        <label for="">面试地址：</label>
        <span>{{info.address && info.address.address}}</span>
      </li>
      <li>
        <label for="">面试时间：</label>
        <span>{{info.start_time}}</span>
      </li>
      <li>
        <label for="">联系方式：</label>
        <span @click="makePhone">{{info.phone}}</span>
      </li>
      <li>
        <label for="">是否提醒：</label>
        <span>{{info.remind?'未提醒':'已提醒'}}</span>
      </li>
      <li>
        <label for="">面试状态：</label>
        <span>{{info.status==-1?'未开始':info.status==0?'已打卡': '已放弃'}}</span>
      </li>
      <li v-if="info.status==-1 && !data.view">
        <label for="">取消提醒：</label>
         <switch :checked="info.remind===1" @change="cancelRemind" />
      </li>
    </ul>
    <section v-if="info.status==-1 && !data.view" class="action">
      <button @click="goSign">去打卡</button>
      <button @click="giveup">放弃面试</button>
    </section>
  </div>
</template>


<script>
import {mapState, mapActions} from "vuex";

export default {
  data(){
    return {
      data: {
        // view: false
      }
    }
  },
  computed: {
    ...mapState({
      info: state=>state.sign.info
    })
  },
  methods: {
    ...mapActions({
      getDetail: 'sign/getDetail',
      updateDetail: 'sign/updateDetail'
    }),
    makePhone(){
      wx.makePhoneCall({ phoneNumber: this.info.phone });
    },
    goSign(){
      // wx.showToast({
        // title: '功能正在紧急开发中', //提示的内容,
        // icon: 'none', //图标,
      // });
      wx.navigateTo({ url: '/pages/sign/sign/main' });
    },
    giveup(){
      wx.showModal({
        title: '温馨提示', //提示的标题,
        content: '确定要放弃本次面试吗?', //提示的内容,
        success: async res => {
          if (res.confirm) {
            await this.updateDetail({
              id: this.id,
              params: {  status: 1}
            })
          }
        }
      });
    },
    cancelRemind(e){
      // 取消提醒
      this.updateDetail({
        id: this.id,
        params: {remind: e.target.value?1:-1}
      })
    }
  },
  onLoad(options){
    // 获取id
    this.id = options.id;
    // 把view属性加到响应监听里面
    this.$set(this.data, 'view', options.view || false)
  },
  async onShow(){
    wx.showLoading({
      title: '加载数据中...', //提示的内容,
      mask: true, //显示透明蒙层，防止触摸穿透,
    });
    await this.getDetail(this.id);
    // 修改标题
    wx.setNavigationBarTitle({ title: this.info.company });
    wx.hideLoading();
  },
  onShareAppMessage() {
    return {
      title: this.info.company+'的面试',
      path: '/pages/sign/detail/main?view=1&id='+this.id,
      success: res => {},
      fail: () => {},
      complete: () => {}
    };
  }
}
</script>

<style lang="scss" scoped>
ul{
  border-top: 1rpx solid #eee;
  border-bottom: 1rpx solid #eee;
  background: #fff;
}
li{
  width: 720rpx;
  min-height: 88rpx;
  margin-left: 30rpx;
  border-bottom: 1rpx solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  label{
    color: #666;
    width: 170rpx;
    font-size: 30rpx;
  }
  span,switch{
    flex: 1;
    // text-align: right;
    font-size: 30rpx;
    color: #333;
    // height: 88rpx;
    // line-height: 88rpx;
    // overflow: hidden;
    // white-space: nowrap;
    // text-overflow: ellipsis;
    padding-right: 30rpx;
    box-sizing: border-box;
  }
}
li:last-child{
  border-bottom: none;
}
.action{
  display: flex;
  margin: 50rpx 15rpx;
  button{
    flex: 1;
    color: #fff;
    margin: 15rpx;
  }
  button:first-child{
    background: #197DBF;
  }
  button:last-child{
    background: #DC4E42;
  }
}
</style>
