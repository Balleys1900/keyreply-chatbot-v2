const mongoose = require('mongoose');
const Button = require('./Button.js');
const Condition = require('./Condition');

const LanguageSchema = new mongoose.Schema({
    value:{
        type:String,
        require:true,
    } ,
    text:{
        type:String,
        require:true,
    } ,
    buttons:[Button],
    conditions:[Condition],
    regex:{
        type:String,
    },
});

const Language= mongoose.model('language',LanguageSchema);
module.exports = LanguageSchema;