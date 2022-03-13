// pages/show_1/show_1.js
let id1 = ''//拿到参数id
let url="/pages/yuantu/yuantu?id="//拿到图片的url 
let image_url=""
let people_name=""
let people_telephon=""
const db = wx.cloud.database()

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
   list:[],
   
  //  image_url:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    // console.log(options.id)
    let a=""
    id1=options.id
    var that = this;
    //得到id
    // 1. 获取数据库引用
    console.log(id1)
// 2. 构造查询语句
// collection 方法获取一个集合的引用
// where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
// get 方法会触发网络请求，往数据库取数据
db.collection('jishiData').where({
  _id: id1
}).get({
  success: function(res) {
  // 输出 [{ "title": "The Catcher in the Rye", ... }]
  console.log(res)
  that.setData({
    list:res.data[0]
  })
 },fail:function(err){
  console.log("无法得到数据")
}
})
return id1
},//查看原图
yuantu(){
 var that =this

  wx.navigateTo({
    url: url+this.data.list.image_url,
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

  },//得到接单人的名字
  onPeople_name(e){
    people_name=e.detail.value
    return people_name
  },//得到接单人的电话号码
  onPeople_telephone(e){
    people_telephon=e.detail.value
    //验证号码
  let phoneNumber = e.detail.value
  if (phoneNumber.length === 11) {
  let checkedNum = this.checkPhoneNum(phoneNumber)
  }
    },
    checkPhoneNum: function (phoneNumber) {
    let str = /^1\d{10}$/
    if (str.test(phoneNumber)) {
    return true
    } else {
    wx.showToast({
    title: '手机号不正确',
    image: '/static/image/preview.jpg'
    })
    return false
    }
    return people_telephon
  },//接下订单
  onClick(e){
    
    let a = id1
 
    console.log(a)
    if (people_name==""||people_telephon==""){
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
        //先找的数据 再更改
        db.collection('jishiData').doc(a).update({
          data:{
            people_name:people_name,
            people_telephon:people_telephon,
            zhuangtai:"已"
          },
          success(res){
            console.log("更新成功",res)
          },fail(res){
            console.log(res)
          }}),
          wx.switchTab({
            url: '/pages/index/index',
          }),
          wx.showToast({
            title: "上传成功",
           })
}}
})