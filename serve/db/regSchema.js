const mongoose = require("mongoose");
const db = require("./index")
const Schema = mongoose.Schema

const user = new Schema({
    email:String,
    identity: String,
    name: String,
    password: String,
    token: String,
    createDate:Date

})

module.exports = db.model('user',user,)