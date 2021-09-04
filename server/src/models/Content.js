const mongoose = require('mongoose');
const Language = require('./Language');

const ContentSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    } ,
    language:[Language],
});

const Content= mongoose.model('content',ContentSchema);
module.exports = Content;