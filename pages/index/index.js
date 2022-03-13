// 初始化变量
let picurl =''//图片
let day = ""//截止日期
let comment =""//备注
let name =""//发起人
let money =""//钱
let id = ""//搜索的key
let id_ =""//抢单的匹配的id
let title=""
let numk=0
let numj=0
let numd=0
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
    tabs: [{title:"快递",tap:"kD_1_1"}, 
        {title:"集市",tap:"jS_1_1"}, 
      {title:"打印文件",tap:"dY_1_1"}
  ],
    activeIndex: 0,
    total:11,//默认的总数
    total_1:11,
    total_2:11,
  },
  tabClick: function(e) {
    that.setData({
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 生命周期函数--监听页面加载 getuserData
   */
  onLoad: function (options) {
    that=this
    that.kD_1_1()
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
    if(this.data.title=="快递"){
      this.kD_1()
    }else if(this.data.title=="集市"){
      this.jS_1()
    }else{
      this.dY_1()
    }
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
  },//点击跳蚤集市 getjishiData
  jS_1_1(e){
    let that=this
    //使用数据库调运数据
    const db=wx.cloud.database()
    wx.showLoading({
      title: '加载中',
    })
    db.collection('jishiData')
  .limit(10)
  .get()
  .then(res=>{
    wx.hideLoading({})
    // console.log(res)
         that.setData({
          ne:res.data,
          title:res.data[0].title,
          page:"show_2",
        })
        numj= 10
        numk=numd=0
        return numk,numj,numd
  })
  .catch(console.error)
  },
  jS_1(e ){
    that = this;
    //判断是否达到底部数据
    wx.cloud.database().collection("jishiData")
    .count()
    .then(res=>{
      that.setData({
        total_1:res.total
      })
    })
    //判断是否拿到了数据
    if(numj>=this.data.total_1){
      wx.showToast({
        title: '数据加载完成',
     
      })
    }else{
    // //调用云函数拿取数据
    // var that = this;
    // wx.cloud.callFunction({
    //   name:"getjishiData",
    //   success(res){
    //     console.log("拿到数据",res)
    //          that.setData({
    //       ne:res.result.data,
    //       title:res.result.data[0].title,
    //       page:"show_2"
    //     })
    //   },fail(){
    //     console.log("拿取数据失败")
    //   }
    // })
    //使用数据库调运数据
    const db=wx.cloud.database()
    wx.showLoading({
      title: '加载中',
    })
    db.collection('jishiData').skip(numj)
  .limit(10)
  .get()
  .then(res=>{
    wx.hideLoading({})
    // console.log(res)
         that.setData({
          ne:that.data.ne.concat(res.data),
          title:res.data[0].title,
          page:"show_1",
        })
        numj= res.data.length+numj
        return numj
  })
  .catch(console.error)
    }
  },//快递
  kD_1_1(e){
    let that=this
    //使用数据库调运数据
    const db=wx.cloud.database()
    wx.showLoading({
      title: '加载中',
    })
    db.collection('userData')
  .limit(10)
  .get()
  .then(res=>{
    wx.hideLoading({})
    // console.log(res)
         that.setData({
          ne:res.data,
          title:res.data[0].title,
          page:"show_1",
        })
        numk= 10
        numj=numd=0
        return numk,numj,numd
  })
  .catch(console.error)
  },
  kD_1(e){ 
    console.log(numk)
    that = this;
    //判断是否达到底部数据
    wx.cloud.database().collection("userData")
    .count()
    .then(res=>{
      that.setData({
        total:res.total
      })
    })
    //判断是否拿到了数据
    if(numk>=this.data.total){
      wx.showToast({
        title: '数据加载完成',
     
      })
    }else{
   
    //   //调用云函数拿到数据
    // wx.cloud.callFunction({
    //   name:"getuserData",
    //   success(res){
    //     console.log("拿到数据",res)
    //     that.setData({
    //       ne:res.result.data,
    //       title:res.result.data[0].title,
    //       page:"show_1",
    //       Zpagesize:Math.ceil(res.result.data.length/that.data.size)
    //     })
    //     console.log(that.data.Zpagesize)
    //   },fail(err){
    //     console.log("没有拿到数据")
    //   }
    // })
    //使用数据库调运数据
    const db=wx.cloud.database()
    wx.showLoading({
      title: '加载中',
    })
    db.collection('userData').skip(numk)
  .limit(10)
  .get()
  .then(res=>{
    wx.hideLoading({})
    // console.log(res)
         that.setData({
          ne:that.data.ne.concat(res.data),
          title:res.data[0].title,
          page:"show_1",
        })
        numk= res.data.length+numk
        numj=numd=0
        return numk,numj,numd
  })
  .catch(console.error)
    }
  },//打印文件
  dY_1_1(e){
    let that=this
    //使用数据库调运数据
    const db=wx.cloud.database()
    wx.showLoading({
      title: '加载中',
    })
    db.collection('worldData')
  .limit(10)
  .get()
  .then(res=>{
    wx.hideLoading({})
    // console.log(res)
         that.setData({
          ne:res.data,
          title:res.data[0].title,
          page:"show_6",
        })
        numd= 10
        numj=numk=0
        return numk,numj,numd
  })
  .catch(console.error)
  },
  dY_1(){
    console.log(numd)
    that = this;
    //判断是否达到底部数据
    wx.cloud.database().collection("worldData")
    .count()
    .then(res=>{
      that.setData({
        total_2:res.total
      })
    })
    //判断是否拿到了数据
    if(numd>=this.data.total_2){
      wx.showToast({
        title: '数据加载完成',
     
      })
    }else{
    // that = this;
    // //调用云函数拿到数据
    // wx.cloud.callFunction({
    //   name:"getworldData",
    //      success:res=>{
    //     console.log(res.result.data)
    //     that.setData({
    //       ne:res.result.data,
    //       title:res.result.data[0].title,
    //       page:"show_6"
          
    //     })
    //   },fail:err=>{
    //     console.log("无法得到数据")
    //   }
    // })
        //使用数据库调运数据
        const db=wx.cloud.database()
        wx.showLoading({
          title: '加载中',
        })
        db.collection('worldData').skip(numd)
      .limit(10)
      .get()
      .then(res=>{
        wx.hideLoading({})
        // console.log(res)
             that.setData({
              ne:that.data.ne.concat(res.data),
              title:res.data[0].title,
              page:"show_1",
            })
            numk= res.data.length+numk
            numj=numd=0
            return numk,numj,numd
      })
      .catch(console.error)
        }
  },//打印跳转
  tZ_5(){
    wx.navigateTo({
      url: '/pages/function_6/function_6',
    })
  }
})