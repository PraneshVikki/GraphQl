const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema({
    _id:{type:Number},
    name:{type:String},
    genre:{type:String},
    authorId:{type:Number},

})
module.exports = mongoose.model('Book',mongooseSchema);