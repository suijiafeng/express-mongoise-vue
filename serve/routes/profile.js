const express = require('express');
const router = express.Router();
const profileSchema = require("../db/profileSchema")

router.get('/', function (req, res, next) {
  profileSchema.find(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json({
        code: 'ok',
        data:[...result],
        message: '请求成功'
      });
      // console.log(result);
    }
  });

});
router.post('/addProfileData', (req, res, next) => {
  let addProfile = Object.assign({t:new Date()},req.body) 
  profileSchema.create(addProfile,function(err,docs){
  res.json({
    code:0,
    data: [],
    message:"添加成功"
  })

  })
})
router.post('/delete',(req,res,next)=>{
  profileSchema.deleteOne(req.body,function(err,docs){
   if(!err){
    res.json({
      code:0,
      message:"删除成功",
      data:[]
    })
   }
  })
})
module.exports = router;