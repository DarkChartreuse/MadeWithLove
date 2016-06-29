var Q = require('q');
var knox = require('knox');
var keys = require('../../../config.env');

var ImageUploader = function(options) {
  var deferred = Q.defer();
  var buf = new Buffer(options.data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64');
  knoxClient = knox.createClient({
  	key: keys.S3_ACCESS_KEY,
  	secret: keys.S3_SECRET_KEY,
  	bucket: 'spontaneousmoth'
  });

  req = knoxClient.put(options.filename, {
  	'Content-Length': buf.length,
  	'Content-Type': options.filetype,
  	'x-amz-acl': 'public-read'
  });
  req.on('response', function(res) {
  	if(res.statusCode === 200) {
  	  deferred.resolve(req.url);
  	} else {
  	  deferred.reject({error: 'true'});
  	}
  });
  req.end(buf);
  return deferred.promise;
  
}

module.exports = ImageUploader;