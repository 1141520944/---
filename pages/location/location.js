// pages/location/location.js
let adressMR=""//默认地址
const DB= wx.cloud.database().collection('people_adress')
let url1="/pages/home/home"
Page({
  //得到地址
  getLoction(e){
    // console.log(e.detail.value)
    adressMR=e.detail.value
    return adressMR;
  },
  // 添加奥数据库
  onadressMR(){
    if (adressMR==""){
      wx.showModal({
      title: '提示',
      content: '请输入完整信息！', 
      success: function (res) {
      if (res.confirm) {
      console.log('用户点击确定') 
      }
      }
      }) 
      } else{
        //删除原来数据库中的地址
        var that = this;
     //得到openID
     wx.cloud.callFunction({
      name:'getopenid',
      success(res){
        that.setData({
          openid:res.result.openid
        })
        console.log("获取openid",res.result.openid)
           //查询数据
           DB.where({
            _openid:that.data.openid
          }).remove({
            success(res){
              console.log("删除成功")
            },fail(res){
              console.log("删除失败")
            }
          })
         //添加数据
         DB.add({
          data:{
            adressMR:adressMR
          }})
            wx.switchTab({
              url: url1,
            })
          wx.hideLoading(),
          wx.showToast({
           title: "上传成功",
          })
      },fail(err){
        console.log("获取失败",err)

      }
    })
    
      }  
  },
  /**
   * 页面的初始数据
   */
  data: {
    openid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})