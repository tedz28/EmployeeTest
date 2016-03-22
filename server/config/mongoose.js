var mongoose = require('mongoose');

module.exports = function(config) {
    //connect to mongodb
    //mongoose.connect('mongodb://localhost/employeehub');
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('employeehub db opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String
    });
    var User = mongoose.model('User',userSchema);
    User.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            User.create({firstName:'Joe',lastName:'Doe',username:'joe'});
            User.create({firstName:'Sam',lastName:'Doe',username:'sam'});
            User.create({firstName:'Ted',lastName:'Doe',username:'ted'});
        }
    })

};