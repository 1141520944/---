// pages/show/show.js
//初始化数据库
let name1="";//姓名
let telephone="";//电话
let adress = "";//地址
let deadline="";//截止时间
let money = "";//支付金额
let id = ""//判断的id
let url = "/pages/index/index?id="//跳转的页面
let title1 = "集市"//分类的显示
let beizhu =""//备注
let zhuangtai="未"//状态
let people_name="无"
let people_telephon="无"

const DB= wx.cloud.database().collection('jishiData')
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
  this.setData({
  address:adress
  })
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

  if (name1==""||telephone==""||adress==""||deadline==""||money==""){
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
  }  
  },
  /**添加图片 */

 // 删除照片 &&
 imgDelete1: function (e) {
  let that = this;
  let index = e.currentTarget.dataset.deindex;
  let imgbox = this.data.imgbox;
  imgbox.splice(index, 1)
  that.setData({
   imgbox: imgbox
  });
 },
 // 选择图片 &&&
 addPic1: function (e) {
  var imgbox = this.data.imgbox;
  console.log(imgbox)
  var that = this;
  var n = 5;
  if (5 > imgbox.length > 0) {
   n = 5 - imgbox.length;
  } else if (imgbox.length == 5) {
   n = 1;
  }
  wx.chooseImage({
   count: n, // 默认9，设置图片张数
   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
   success: function (res) {
    // console.log(res.tempFilePaths)
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    var tempFilePaths = res.tempFilePaths

    if (imgbox.length == 0) {
     imgbox = tempFilePaths
    } else if (5 > imgbox.length) {
     imgbox = imgbox.concat(tempFilePaths);
    }
    that.setData({
     imgbox: imgbox
    });
   }
  })
 },

 //图片
 imgbox: function (e) {
  this.setData({
   imgbox: e.detail.value
  })
 },


 //发布按钮
fb: function (e) {
if (!this.data.imgbox.length) {
 wx.showToast({
  icon: 'none',
  title: '图片类容为空'
 });
} else if (name1==""||telephone==""||this.data.address==""||deadline==""||money==""){
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
  wx.showLoading({
   title: '上传中',
  })
  let promiseArr = [];//图片传输问题只能有一张this.data.imgbox.length;
  for (let i = 0; i < 1; i++) {
   promiseArr.push(new Promise((reslove, reject) => {
    let item = this.data.imgbox[i];
    let suffix = /\.\w+$/.exec(item)[0];//正则表达式返回文件的扩展名
    wx.cloud.uploadFile({
     cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
     filePath: item, // 小程序临时文件路径
     success: res => {
      this.setData({
       fileIDs: this.data.fileIDs.concat(res.fileID)
      });
      var  a= res.fileID;
      console.log(res.fileID)//输出上传后图片的返回地址
          //添加数据
          DB.add({
            data:{
              people_openid:this.data.openid,
              name:name1,
              telephone:telephone,
              adress:this.data.address,
              deadline:deadline,
              money:money,
              image_url: a,
              title:title1,
              beizhu:beizhu,
              zhuangtai:zhuangtai,
              people_name:people_name,
              people_telephon:people_telephon
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
      reslove();
      wx.hideLoading();
      wx.showToast({
       title: "上传成功",
      })
     },
     fail: res=>{
      wx.hideLoading();
      wx.showToast({
       title: "上传失败",
      })
     }

    })
   }));
  }
  Promise.all(promiseArr).then(res => {//等数组都做完后做then方法
   console.log("图片上传完成后再执行")
   this.setData({
    imgbox:[]
   })
  })

 }
},//选择框
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
  openid:"",
  address:""

   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //得到openID
    let that=this
    wx.cloud.callFunction({
      name:'getopenid',
      success(res){
        that.setData({
          openid:res.result.openid
        })
        console.log("获取openid",res.result.openid)
        const db= wx.cloud.database()
        //查询数据 得到默认地址
        db.collection("people_adress").where({
          _openid:that.data.openid 
        }). get({
          success:res=>{
            console.log(res)
            that.setData({
              address:res.data[0].adressMR,
            })
            console.log(that.data.address)
          },fail:err=>{
            console.log("无法得到数据")
          }
        }) 
      },fail(err){
        console.log("获取失败",err)
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

  }
})