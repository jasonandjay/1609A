// pages/A/A.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    goMiniApp(){
        wx.navigateToMiniProgram({
            appId: 'wx498804a16e220d3c'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('onLoadA...')
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log('onReadyA...')
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log('onShowA...')
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log('onHideA...')
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log('onUnloadA...')
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        console.log('pull down...')
        setTimeout(function(){
            wx.stopPullDownRefresh();
        }, 30000);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log('reach bottom...');
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: 'A页面转发',
            path: '/pages/A/A',
            imageUrl: 'https://res.wx.qq.com/mpres/zh_CN/htmledition/pages/login/loginpage/images/bg_banner4273fb.png'
        }
    }
})