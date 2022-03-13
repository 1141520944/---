// pages/function_5/function_5.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ne:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //调用云数据库
    const DB= wx.cloud.database()
    //查询数据
    DB.collection("liuYan").get({
      success:res=>{
        // console.log(res.data)
        that.setData({
          ne:res.data
        })
      },fail:err=>{
        console.log("无法得到数据")
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },//按钮
  LOVE(e){
    console.log(this.data.ne)
    wx.navigateTo({
      url: '/pages/show_5/show_5',
    })
  }
})