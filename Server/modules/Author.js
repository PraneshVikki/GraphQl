const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema({
    _id:{type:Number},
    authorName:{type:String},
    age:{type:Number},

})
module.exports = mongoose.model('Author',mongooseSchema);