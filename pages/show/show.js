// 初始化变量
let picurl =''//图片
let day = ""//截止日期
let title =''//主题
let comment =""//备注
let name =""//发起人
let money =""//钱
let id = ""//搜索的key
let id_ =""//抢单的匹配的id
// pages/index/index.js
const app = getApp();
var that = this;
Page({
// 查找数据（搜索框）
   // 得到数据
   getData(){
    Db.get({
      success(res){
        console.log("查询成功",res)
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    tag:"感谢大家使用我们的小程序，点赞转发谢谢啦~~",//只能放20个字
    ne:[],
    title:"",
    page:"",
    tabs: [{title:"快递",tap:"kD_1"}, 
        {title:"集市",tap:"jS_1"}, 
      {title:"打印文件",tap:"dY_1"}
  ],
    activeIndex: 0,
    openid:""
  },
  tabClick: function(e) {
    that.setData({
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    
  },

   /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.bindAnimation();
  },
 
  bindAnimation(){
    var this_ = this;
      var animation = wx.createAnimation({
        duration: 5000,
        timingFunction: 'linear',
        transformOrigin:"100% 0 0"
      })
      animation.translateX('-100%').step();
      this.setData({
        animation:animation.export(),
      })
      //设置循环动画
      this.animation = animation;
      setInterval(function(){
        //第二个动画 文字位置初始化
        this.Animation2();
 
        //延迟播放滚动动画（效果会更好点）
        setTimeout(function(){
          this.animation.translateX('-100%').step();
          this.setData({
            animation: animation.export(),
          })
        }.bind(this),200);
 
        
      }.bind(this),5000);
 
  },
 
  /**
   * 第二个动画 文字位置初始化
   */
  Animation2(){
    var this_ = this;
    var animation2 = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear',
      transformOrigin:"100% 0 0"
    })
    animation2.translateX('100%').step();
    this_.setData({
      animation:animation2.export(),
    })
  },
 
  /**
   * 解决小程序退出、隐藏后台动画停止
   */
  onHide: function () {
    //解决小程序退出、隐藏后台动画停止
    //重新触发动画方法即可
    this.bindAnimation();
},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //数据库信息处理

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

  },
  //刷新页面
  flash:function(e){
    this.onLoad(e)
  },
  //跳转页面
  tZ_2(){
wx.navigateTo({
  url: '/pages/function_3/function_3',
})
  },
  //跳转快递
  tZ_1:function(e){
    wx.navigateTo({
      url: '/pages/function_2/function_2',
    })
  },
  //留言墙
  tZ_4:function(e){
    wx.navigateTo({
      url: '/pages/function_5/function_5',
    })
  },//学习资料
  tZ_3:function(){
    wx.navigateTo({
      url: '/pages/function_4/function_4',
    })
  },//点击跳蚤集市
  jS_1(e ){
    var that = this;
    //调用云数据库
    //得到openID
    wx.cloud.callFunction({
      name:'getopenid',
      success(res){
        that.setData({
          openid:res.result.openid
        })
        console.log("获取openid",res.result.openid)
      },fail(err){
        console.log("获取失败",err)
      }
    })
    const DB= wx.cloud.database()
    //查询数据
    DB.collection("jishiData").where({
      _openid:that.data.openid
    }). get({
      success:res=>{
        // console.log(res.data)
        that.setData({
          ne:res.data,
          title:res.data[0].title,
          page:"show_2_2"
        })
      },fail:err=>{
        console.log("无法得到数据")
      }
    })
  },//快递
  kD_1(e){
    var that = this;
     //得到openID
     wx.cloud.callFunction({
      name:'getopenid',
      success(res){
        that.setData({
          openid:res.result.openid
        })
        console.log("获取openid",res.result.openid)
      },fail(err){
        console.log("获取失败",err)
      }
    })
    //调用云数据库
    const DB= wx.cloud.database()
    //查询数据
    DB.collection("userData").where({
      _openid:that.data.openid
    }). get({
      success:res=>{
        // console.log(res.data)
        that.setData({
          ne:res.data,
          title:res.data[0].title,
          page:"show_1_1"
          
        })
      },fail:err=>{
        console.log("无法得到数据")
      }
    })
  },//打印文件
  dY_1(){
    var that = this;
     //得到openID
     wx.cloud.callFunction({
      name:'getopenid',
      success(res){
        that.setData({
          openid:res.result.openid
        })
        console.log("获取openid",res.result.openid)
      },fail(err){
        console.log("获取失败",err)
      }
    })
    //调用云数据库
    const DB= wx.cloud.database()
    //查询数据
    DB.collection("worldData").where({
      _openid:that.data.openid
    }). get({
      success:res=>{
        // console.log(res.data)
        that.setData({
          ne:res.data,
          title:res.data[0].title,
          page:"show_6_6"
          
        })
      },fail:err=>{
        console.log("无法得到数据")
      }
    })
  },//打印跳转
  tZ_5(){
    wx.navigateTo({
      url: '/pages/function_6/function_6',
    })
  }
})