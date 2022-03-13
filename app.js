// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    wx.cloud.init({
      env:"cloud1-9glg0vgtb964e281"
    })
  },
  globalData: {
    userInfo: null
  }
})
