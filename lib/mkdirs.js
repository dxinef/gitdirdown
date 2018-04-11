'use strict';

/*
fs.mkdir增强 可一次创建多级目录
*/

const fs = require("fs");
const util = require("util");

const md = util.promisify(fs.mkdir);

function mkdirs(dirpath) {
    if(fs.existsSync(dirpath)) return Promise.resolve();

    return md(dirpath)
      .then(
        function(){
          return Promise.resolve()
        },
        function(err){
          var parent = dirpath.replace(/(?:^|[\\\/])[^\\\/]*[\\\/]?$/, "");
          if(parent.length && !/^[\\\/]$/.test(parent)){
            mkdirs(parent)
              .then(function(){
                mkdirs(dirpath);
              })
          }
          else {
            return Promise.reject()
          }
        }
      );
}

function mkdirsSync(dirpath) {
    if(fs.existsSync(dirpath)) return;
    try {
        fs.mkdirSync(dirpath);
    }
    catch(e) {
        var parent = dirpath.replace(/(?:^|[\\\/])[^\\\/]*[\\\/]?$/, "");
        mkdirsSync(parent);
        mkdirsSync(dirpath);
    }
}

module.exports.mkdirs = mkdirs;
module.exports.mkdirsSync = mkdirsSync;