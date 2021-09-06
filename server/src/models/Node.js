const mongoose = require('mongoose');
const Language = require('./Language');

const NodeSchema = new mongoose.Schema({
    id:String,
    language:[Language],
});

const Node= mongoose.model('node',NodeSchema);
module.exports = NodeSchema;