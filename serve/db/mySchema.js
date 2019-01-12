const mongoose = require("mongoose");
const db = require("./index")
const Schema = mongoose.Schema

const healthSchema = new Schema({
    name:String,
    age:Number,
    student:Boolean,
    date:Date

})

module.exports = db.model('mongoose',healthSchema,'health')