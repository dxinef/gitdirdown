'use strict';

/*
https request get
@return promise
*/

const https = require("https");
const url = require("url");
const pkg = require("../package.json");

function httpsReq(uri, ondata, onend) {
    https.get(urlparse(uri), (resp)=>{
        resp.on('data', (chunk) => {
            ondata(chunk);
        });
        resp.on('end', function(){
            onend();
        });
    });
}

function urlparse(uri) {
    let temp = url.parse(encodeURI(uri));
    return {
        protocol: temp.protocol,
        host: temp.host,
        path: temp.path,
        headers: {
          'User-Agent': pkg.name
        }
    }
}

module.exports = httpsReq;