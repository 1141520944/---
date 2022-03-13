// https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
const DB= wx.cloud.database().collection('people_adress')
Page({
  data: {
    userInfo: {},
    location:"",
    ne:""
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(this.data.userInfo._openid)
      }
    })
  },
  ShowNews() {
    wx.requestSubscribeDeviceMessage({
      tmplIds: ['Ra9IPhrQExQG9rPa8x3ahTk9-6zRh3Q0EdWT-X6L49Y'],
      success(res) {
        console.log(res)
      }
    })
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    const DB= wx.cloud.database()
    //查询数据
    DB.collection("people_adress").where({
      _openid:that.data.openid
    }). get({
      success:res=>{
        console.log(res.data)
        that.setData({
          ne:res.data[0].adressMR,
        })
      },fail:err=>{
        console.log("无法得到数据")
      }
    })    
  },

  
})