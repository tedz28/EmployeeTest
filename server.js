var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}


app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(stylus.middleware(
    {
        src:__dirname + '/public',
        compile:compile
    }
));

app.use(express.static(__dirname + '/public'));

//connect to mongodb
//mongoose.connect('mongodb://localhost/employeehub');
mongoose.connect('mongodb://admin:admin@jello.modulusmongo.net:27017/p3uvaQez');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('employeehub db opened');
});
var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, doc) {
    mongoMessage = doc.message;
});

app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function (res, req) {
    req.render('index', {
        mongoMessage: mongoMessage
    });
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port ' + port + '...');
