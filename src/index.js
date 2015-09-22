var async = require('async')
  ;

var https = require('./helpers/https_wrapper')
  , config = require('./config.json')
  , buildPath = (word) => {
      return `/api/2/${config.apiKey}/${word}/json/`;
    }
  ;



module.exports = (string) => {
  let lexors = string.split(' ')
    , httpConfig = {
        host: 'words.bighugelabs.com',
        path: '',
        port: 443,
        method: 'GET'
      }
    , mappedLexors = lexors.map((word) => {
        let path = buildPath(word);

        httpConfig.path = path;

        return (function (cb) {
          return https(httpConfig, cb);
        });
      })
    ;

  async.parallel(mappedLexors, (data) => {
    console.log(data);
  });
};