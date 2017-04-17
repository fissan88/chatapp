    var express = require('express');
    var app = express();
    var morgan = require('morgan');
    var bodyParser = require('body-parser');
    var router = express.Router();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.raw());
    app.use(morgan('tiny'));
    app.use('/', router);
    app.use(express.static('public'));

    var mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://admin:7y3LCtJLJ@ds163010.mlab.com:63010/jepdb');
    var Message = require('./models/message');

    router.route('/')
        .get(function (req, res) {
            res.sendFile(__dirname + '/index.html');
        });

    router.route('/messages')
        .get(function (req, res) {
            Message.find(function(err, messages) {
                if(err) {
                    console.log("Error getting messages...")
                } else {
                    res.send(messages);
                }
            });
        })
        .post(function (req, res) {
            var message = new Message({
                name: req.body.name,
                message: req.body.msg,
                time: new Date(Date.now())
            });
            message.save(function(err) {
                if(err) {
                    console.log("Error saving message.")
                } else {
                    res.send("Message received.");
                }
            });
        });

    app.listen(8080, function () {
        console.log("Listening on port 8080...");
    });