// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"cloud1-9glg0vgtb964e281"
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection("worldData").get({
    success(res){
      return res
    },fail(err){
      return err
    }
  })
}