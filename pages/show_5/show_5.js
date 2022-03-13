// pages/liuyan/liuyan.js
let url = "/pages/index/index?id="
const DB= wx.cloud.database().collection('liuYan')
let name1=""
Page({
  // 得到收件人数据
onName(e){
  name1 = e.detail.value;
 
  
  return name1
},
  /**
  * 页面的初始数据
  */
  data: {
    name1:"",
    a:"",
    imgbox: [],//选择图片
    fileIDs: [],//上传云存储后的返回值
  msgData:
  [
   {
   child_id: 1,
   msg:
   "那样的柔软诵着手中月镜中花，然后守着一个人得天荒地老。",
   checked:''
   },//双引号
   {
   child_id: 2,
   msg:
   "爱与被爱的差别，大概就是玩捉迷藏的时候我找不到你，就会着急，而你找不到我，你就会回家。",
   checked: ''
   },
   {
   child_id: 3,
   msg:
   "如果爱情不是我们所能赋予的寄托，一早就应该拒绝彼此的要求。",
   checked: ''
   },
   {
   child_id: 4,
   msg:
   "我对这个小程序的意见有：",
   checked: ''
   },
   {
   child_id: 5,
   msg:
   "我想对他说",
   checked: ''
   },
   {
   child_id: 6,
   msg:
   "我想对她说：",
    checked:''
   }
  ],
  message: '',
  message_id:[],
  },//图片
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


  // 留言
  bindTextAreaChange: function(e){
  var that = this
  that.setData({
   message:e.detail.value
  })
  },
  
  click:function(e){
  var that = this;
  let id = e.currentTarget.dataset.id;
  let index = e.currentTarget.dataset.index;
  var value = [];
  value = this.data.message_id;
  var array_i = this.in_array(id, value);
  var chekeds = that.data.msgData;
  var msg = chekeds[index].msg;
  var message = that.data.message;
  if (!e.currentTarget.dataset.checked){ 
   chekeds[index].checked = true
   that.setData({
   message: message + msg
   })
  }else{
   chekeds[index].checked = false
   that.setData({
   message: message.replace(msg, '')
   })
  }
  that.setData({
   msgData: chekeds
  })
  if (array_i) {
   value.splice(array_i, 1);
  } else {
   value.push(id);
  }
  this.setData({
   message_id: value,
  })
  },
  in_array: function (search, array) {
  for (var i in array) {
   if (array[i] == search) {
   return i;
   }
  }
  return false;
  },
  submit:function(e){
  var value = [];
  var message = this.data.message;
  var msgData = this.data.msgData;
  var a1 =""
  if (message == '' && !value.length) {
   wx.showToast({
   title: '暂无选择项目',
   icon:'none'
   })
   return;
  }else if (!this.data.imgbox.length) {
    wx.showToast({
     icon: 'none',
     title: '图片类容为空'
    });
   }else{
  //message    这就是数据
  

     a1 = message;
    console.log(a1)
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
              message:a1,
               image_url: a,
               name:name1
              
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
 },
  
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
  var that = this;
 
  
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