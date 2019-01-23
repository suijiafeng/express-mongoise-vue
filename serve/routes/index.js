var express = require('express');
var router = express.Router();
// var md5 = require("js-md5")
var jwt = require("jsonwebtoken")
// var db = require('../db')
var mySchema = require("../db/mySchema")
var regSchema = require("../db/regSchema")

/* GET home page. */

router.get('/profile', function (req, res, next) {
  mySchema.find(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json({
        code: 'ok',
        data: [
          {
            type: "String",
          describe: "String",
          expend: 1,
          income: 2,
          cash: 3,
          remark: 4,
          date: new Date()
        },
          {
            type: "String",
          describe: "String",
          expend: 2,
          income: 3,
          cash: 4,
          remark: 5,
          date: new Date()
        }
      ],
        message: '请求成功'
      });
      console.log(result);
    }
  });

});
router.post('/login', function (req, res, next) {
  let data = req.body
  regSchema.findOne({
    email: data.email
  }, function (err, docs) {
    if (err) {
      console.log(err)
    } else {
      if (docs !== null) {
        // let md5Password= md5(data.password)
        if (docs.password === data.password) {
          console.log("认证信息", req.headers.authorization)
          console.log("浏览器信息", req.headers.cookie)
          let content = {
            email: req.body.email,
            name: docs.name,
            time: new Date().getTime()
          }; // 要生成token的主题信息
          let secretOrPrivateKey = "suiyi" // 这是加密的key（密钥） 
          var token = jwt.sign(content, secretOrPrivateKey, {
            // expiresIn: 60*60*1  // 1小时过期
            expiresIn: 60 * 1 // 1小时过期
          });
          docs.update({
            token: token
          }, err => {
            if (!err) {
              console.log("数据库", docs)
              console.log("成功保存认证", token)
            } else {
              console.log("err", err)
            }
          })
          res.json({
            code: '0',
            data: {
              username: docs.name,
              email: docs.email,
              role: docs.identity
            },
            message: '登录成功',
            token: token
          });
        } else {
          res.json({
            code: 'no',
            data: 'err',
            message: '用户名或密码不正确'
          })
        }
      } else {
        res.json({
          code: 'no',
          data: 'err',
          message: '该用户不存在'
        })

        console.log("该用户不存在")
      }
      // console.log(docs.pwd)

    }
  })

});

router.post('/register', function (req, res, next) {
  let data = req.body
  const reg = new regSchema(data)
  regSchema.find({
    name: data.name
  }, function (err, docs) {
    if (err) {
      console.log(err)
    } else {
      if (docs.length > 0) {
        res.json({
          code: 'bad',
          data: "注册失败",
          message: `该"${req.body.name}"用户名已被占用`,
          t: new Date().getTime()
        });


      } else {
        // reg.save(err=>{
        // if(err){
        //   console.log("err",err)
        // }else {
        //   console.log("保存成功")
        // }
        regSchema.create(data, err => {
          if (err) {
            console.log("err", err)
          } else {
            console.log("保存成功")
          }
        })
        res.json({
          code: '0',
          data: [],
          message: '注册成功',
          t: new Date().getTime()
        });
      }
    }
    // console.log(docs.length)
    // console.log(typeof docs)


  })

  console.log(data)

})

module.exports = router;