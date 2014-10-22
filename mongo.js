
var mongodb = require('mongodb'),
    uri = 'MONGOLAB_URI';

mongodb.MongoClient.connect(uri, function(err, db) {
  if(err) throw err;

});