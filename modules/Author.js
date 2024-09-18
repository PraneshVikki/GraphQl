const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema({
    authorName:{type:String},
    age:{type:Number},

})
module.exports = mongoose.model('Author',mongooseSchema);