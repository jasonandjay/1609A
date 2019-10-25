
<template>
  <img  @click="startFinger" src="/static/images/finger.jpg" mode="widthFix"/>
</template>

<script>
export default {
  methods: {
    startFinger() {
      wx.startSoterAuthentication({
        requestAuthModes: ["fingerPrint"],
        challenge: "每天用指纹解锁一次",
        authContent: "请用指纹解锁",
        success: async res => {
          if (res.errCode === 0) {
            wx.setStorageSync("finger", {
              finger: true,
              timestamp: +new Date()
            });
            wx.navigateBack();
          }
        }
      });
    },
    created() {
      wx.checkIsSupportSoterAuthentication({
        success(res) {
          if (res.supportMode.indexOf("fingerPrint") === -1) {
            wx.setStorageSync("finger", {
              finger: true,
              timestamp: +new Date()
            });
            wx.navigateBack();
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
  page{
    overflow-y: hidden;
  }
  img{
    width: 100%;
  }
</style>
