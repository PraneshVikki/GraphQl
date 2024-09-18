const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema({
    book:{type:String},
    gener:{type:String},
    authorId:{type:String},

})
module.exports = mongoose.model('Book',mongooseSchema);