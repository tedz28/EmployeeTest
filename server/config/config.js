var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/employeehub',
        rootPath: rootPath,
        port: process.env.PORT || 3000
    },
    production: {
        db: 'mongodb://admin:admin@jello.modulusmongo.net:27017/p3uvaQez',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
};