const mongoose = require("mongoose");
const db = require("./index")
const Schema = mongoose.Schema

const healthSchema = new Schema({
    name:String,
    describe:String,
    expend:Number,
    income:Number,
    cash:Number,
    remark:Number,
    date:Date

})

module.exports = db.model('mongoose',healthSchema,'health')