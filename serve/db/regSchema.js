const mongoose = require("mongoose");
const db = require("./index")
const Schema = mongoose.Schema

const user = new Schema({
    email:String,
    identity: String,
    name: String,
    password: String,
    password2: String,
    createDate:Date

})

module.exports = db.model('user',user,)