const mongoose = require("mongoose");
const db = require("./index")
const Schema = mongoose.Schema

const user = new Schema({
    userName:String,
    pwd:String,
    t:Date

})

module.exports = db.model('user',user,)