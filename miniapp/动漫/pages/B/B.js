// pages/a/a.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        list: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('onLoadB...', options)
        this.options = options;
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log('onReadyB...')
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log('onShowB...', this.options);
        let list = [];
        for (let i=0,len=10;i<len;i++){
            list.push(i);
        }
        this.setData({list});
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log('onHideB...')
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log('onUnloadB...')
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    clickText(e){
        console.log('e...', e);
        let value = e.target.dataset.value;
        wx.showToast({
          title: '点击了标签： '+value, //提示的内容,
          icon: 'none', //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
        });
    },

    catchText(){

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let list = this.data.list,
            length = this.data.list.length;
        for (let i=0,len=10; i<len; i++){
            list.push(length+i);
        }
        this.setData({list})
    },

    /**
     * 用户点击右上角分享
     */
    onShareappMessage: function () {

    }
})