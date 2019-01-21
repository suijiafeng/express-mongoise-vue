var express = require('express');
var router = express.Router();
// var db = require('../db')
var mySchema = require("../db/mySchema")
var regSchema = require("../db/regSchema")

/* GET home page. */
router.get('/tableTree', function(req, res, next) {
  mySchema.find(function(err,result){
    if(err){
        console.log(err);
    }else{
      res.json({
        code:'ok',
        data:result,
        message:'请求成功'
      });
        console.log(result);
    }
});

});
router.post('/login', function(req, res, next) {
  let data = req.body
  regSchema.findOne({userName:data.userName},function(err,docs){
    if(err){
      console.log(err)
    }else{
      if(docs!==null){
      if(docs.pwd===data.pwd){
        res.json({
          code:'ok',
          data:'成功',
          message:'登录成功'
        });
      }else {
        res.json({
          code:'no',
          data:'err',
          message:'用户名或密码不正确'
        })
      }
      }else {
        res.json({
          code:'no',
          data:'err',
          message:'该用户不存在'
        })

        console.log("该用户不存在")
      }
      // console.log(docs.pwd)
     
    }
  })
 
});

router.post('/register', function(req, res, next){
  let data=req.body
  const reg = new regSchema(data)
  regSchema.find({name:data.name},function(err,docs){
    if(err){
      console.log(err)
    }else{
     if(docs.length>0){
        res.json({
            code:'bad',
            data:"注册失败",
            message: `该"${req.body.name}"用户名已被占用`,
            t:new Date().getTime()
          });

    
     }else{
        // reg.save(err=>{
        // if(err){
        //   console.log("err",err)
        // }else {
        //   console.log("保存成功")
        // }
        regSchema.create(data,err=>{
        if(err){
          console.log("err",err)
        }else {
          console.log("保存成功")
        }
      })
      res.json({
        code:'0',
        data:[],
        message:'注册成功',
        t:new Date().getTime()
      });
    }}
    // console.log(docs.length)
    // console.log(typeof docs)
  
    
  })
  
  console.log(data)
  
})

module.exports = router;
