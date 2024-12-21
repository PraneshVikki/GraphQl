const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema({
    _id:{type:Number},
    book:{type:String},
    gener:{type:String},
    authorId:{type:Number},

})
module.exports = mongoose.model('Book',mongooseSchema);