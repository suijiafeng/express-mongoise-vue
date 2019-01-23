const mongoose = require('mongoose');
const  db = require('./index');
const Schema = mongoose.Schema

const  profileSchema = new Schema({
    type: String,
    describe: String,
    income: Number,
    expend: Number,
    cash: Number,
    remark: Number,
    t: Date
})

module.exports = db.model('profile',profileSchema);