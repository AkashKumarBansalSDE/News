var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var news = new Schema({
    title: String,
    link: String,
});

module.exports = mongoose.model('News',news);