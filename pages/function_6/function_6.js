// pages/show/show.js
//初始化数据库
let name1="";//姓名
let telephone="";//电话
let adress = "";//地址
let number=""//快递单号
let deadline="";//截止时间
let money = "";//支付金额
let id = ""//判断的id
let url = "/pages/index/index?id="//跳转的页面
let title1 = "打印"//分类的显示
let beizhu =""//备注
let zhuangtai="未"//状态
let image_url =""
let people_name="无"
let people_telephon="无"
let fil_name =""

const DB= wx.cloud.database().collection('worldData')
Page({ 
//获得输入的数据发送到数据库
// 得到收件人数据
onName(e){
  name1 = e.detail.value
  return name1
},//获得联系电话
onTelephone(e){
  telephone= e.detail.value
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
    return telephone
},//获得收货地址
onAddress(e){
  adress = e.detail.value
  return adress
},//快递单号
onNumber(e){
  number=  e.detail.value
  return number
},//截止服务时间
onDeadline(e){
  deadline =  e.detail.value
  return deadline
},//支付费用
onMoney(e){
  money =  e.detail.value
  return money
},
//得到用户的id
getId(e){
  id= e._id
  id_=id
  return id_
},//跳转页面
forWard(){
  wx.navigateTo({
    url: 'a',
  })
},//得到备注
onItem(e){
  beizhu =  e.detail.value
  
  return beizhu
},
 
      // 判定输入为非空字符
formSubmit: function (e) {

  if (name1==""||telephone==""||deadline==""){
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
    //添加数据
    var that = this;
    DB.add({
      data:{
        name:name1,
        telephone:telephone,
        adress:adress,
        number:number,
        deadline:deadline,
        money:money,
        title:title1,
        beizhu:beizhu,
      },success(res){
        id=res._id
        console.log(id)
        url1= url+id_
        console.log(url)
        console.log("添加成功",res);
        
      }
    }),
    wx.navigateTo({
      url: url1,
    })
    reslove();
      wx.hideLoading();
      wx.showToast({
       title: "上传成功",
      })
  }  
  },
  /**添加图片 */

 
 // 选择图片 &&&
 addPic1: function (e) {
  //上传文件
  let that = this
  wx.chooseMessageFile({
    count: 1,
    type:"all",
    success(res){
      console.log(res)
      //保存路径
      const tempFiles_path=res.tempFiles
      let temfile = res.tempFiles[0]
      that.setData({
        temfile_name:temfile.name,
        tempFiles_path:temfile.path,
      })
    }
  })
 },

 //发布按钮
fb: function (e) {
  let that = this;
 if (name1==""||telephone==""||deadline==""){
  wx.showModal({
  title: '提示',
  content: '请输入完整信息！', 
  success: function (res) {
  if (res.confirm) {
  console.log('用户点击确定') 
  }
  }
  }) 
  }else{
  //上传图片到云存储  
  //通过uploadFile上传文件
  let tempFiles_path= that.data.tempFiles_path
  let temfile_name=that.data.temfile_name
  wx.cloud.uploadFile({
    cloudPath: temfile_name, //仅为示例，非真实的接口地址
    filePath: tempFiles_path,
    success (res){
      that.setData({
        fileIDs:res.fileID
      })
      console.log(res.fileID)
      var  a= res.fileID;
      console.log(res.fileID)//输出上传后图片的返回地址
          //添加数据
          DB.add({
            data:{
              name:name1,
              telephone:telephone,
              adress:adress,
              deadline:deadline,
              money:money,
              file_url: a,
              image_url:"https://img0.baidu.com/it/u=1697148622,3160789974&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=938",
              title:title1,
              beizhu:beizhu,
              zhuangtai:zhuangtai,
              people_name:people_name,
              people_telephon:people_telephon,
              fil_name:temfile_name
            },success(res){
              id=res._id
              console.log(id)
              url1= url+id_
              console.log(url)
              console.log("添加成功",res);
              
            }
          }),
          wx.switchTab({
            url: url,
          })
      wx.showToast({
       title: "上传成功",
      })
    }
  })//添加数据


}},
  //选择框
  checkboxChange(e) {
   var that = this;
   let checkboxValues = null;
   let checkboxItems = this.data.checkboxItems, values = e.detail.value;
   for(var i = 0,lenI =checkboxItems.Length;i<lenI;i++){
     if(checkboxItems[i].value == values.length-1){
       checkboxItems[i].checked=true;
       checkboxValues = checkboxItems[i].value;
     }
     else{
       checkboxItems[i].checked =false;
     }
     }
     console.log(checkboxValues)
     that.setData({
       checkboxItems,checkboxValues
     })
   },
  /**
   * 页面的初始数据
   */
  data: {
    imageList:[   
  ],
  checkboxItems: [
    {value: 'USA', name: '1kg以下'},
    {value: 'CHN', name: '1-3kg',},
    {value: 'BRA', name: '3kg以上'}
  ],
  imgbox: [],//选择图片
  fileIDs: [],//上传云存储后的返回值
  temfile_name:"",
  tempFiles_path:"",
 

   
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