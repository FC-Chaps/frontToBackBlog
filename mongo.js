
var mongodb = require('mongodb'),
    uri = 'mongodb://heroku_app30917416:jf75lna2ssor5uptu23b3stgam@ds047050.mongolab.com:47050/heroku_app3091741';

mongodb.MongoClient.connect(uri, function(err, db) {
  if(err) throw err;

});