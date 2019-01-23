var express = require('express');
var router = express.Router();
var regSchema = require("../db/regSchema")
var jwt = require("jsonwebtoken")
/* GET users listing. */

router.post('/user_Auth',(req,res,next)=>{
  let auth=req.headers.authorization
  console.log(auth)
  res.json({name:"Ddddddd"})
})


router.get('/userList', function(req, res, next) {
 
  regSchema.find({},function(err,docs){
    console.log(docs)
    let auth = req.headers.authorization
    let isAuth= (docs[0].token===auth?true:false)
    console.log("auth",isAuth)
   
    if(!err&&isAuth){
      res.json({
        code:"ok",
        data:docs,
        message:"查询成功"
      });
    }else{
      res.json({
        code:"no",
        data:[],
        message:"查询列表失败"
      });
    }
  
  })
});
router.post('/userDel',function(req,res,next){
  let data = req.body
  regSchema.remove({_id:data.id},function(err){
    console.log("你好",data.id)
    if(!err){
      res.json({
        code:"ok",
        data:[],
        message:"删除成功"
      })
    }else {
      res.json({
        code:"no",
        data:[],
        message:"删除失败"
      })
    }
  })

})
router.post('/userUpdate',function(req,res,next){
  let data = req.body
  regSchema.update({_id:data.id},function(err){
    console.log("你好",data.id)
    if(!err){
      res.json({
        code:"ok",
        data:[],
        message:"编辑成功"
      })
    }else {
      res.json({
        code:"no",
        data:[],
        message:"编辑失败"
      })
    }
  })

})

module.exports = router;
