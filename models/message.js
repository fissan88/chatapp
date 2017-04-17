/**
 * Created by eaajejen54 on 17-04-2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var message = new Schema({
    name: String,
    message: String,
    time: String
});

module.exports = mongoose.model('Message', message);