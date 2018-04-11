'use strict';

const https = require("https");
const path = require("path");
const fs = require("fs");

const mkdirs = require("./mkdirs").mkdirsSync;
const httpsreq = require("./req");
const geturi = require("./gituri");
const loading = require("./loading");

let savePath = "",
    site = "",
    owner = "",
    repo = "",
    branch = "",
    repoPath = "";

let mission = [],
    onComplete = function(){};

function gitDownload(opt) {
    site = opt.site || "github";
    branch = opt.branch || "master";
    repoPath = opt.path || "";
    savePath = opt.save || process.cwd();
    if(!opt.owner || !opt.repo) {
        console.log("Error: Not Found.");
        return;
    }
    owner = opt.owner;
    repo = opt.repo;
    onComplete = opt.onComplete || onComplete;
    start();

    // return Promise.all(mission);
}

module.exports = gitDownload;

// start
function start() {
    let uri = geturi(site, "repo", owner, repo, branch);
    let data = "";
    loading.start();
    httpsreq(uri,
        (chunk)=> {
            data += chunk;
        },
        ()=> {
            data = JSON.parse(data).tree;
            if(!data) {
                console.log("Error: Not Found.");
                return;
            }
            console.log("数据获取成功");
            traversal(data);
        }
    );
}

// traversal
function traversal(list) {
    let filesPath = [];
    list.forEach((item)=>{
        if(new RegExp("^" + repoPath).test(item.path)) {
            if(item.type=="tree") {
                mkdirs(path.join(savePath, item.path));
            }
            else if(item.type=="blob") {
                filesPath.push(item.path);
            }
        }
    });
    mission = filesPath.map(savafile);
    Promise.all(mission).then(()=>{
        loading.stop();
        onComplete();
        // console.log("任务完成!")
    });
}

// savafile
function savafile(filePath) {
    return new Promise((res, rej)=>{
        let uri = geturi(site, "raw", owner, repo, branch, filePath);
        let stream = fs.createWriteStream(path.join(savePath, filePath));
        httpsreq(uri, 
            (chunk)=> {
                stream.write(chunk);
            },
            ()=> {
                console.log(filePath + " \x1b[36m已下载\x1b[0m");
                res();
            }
        );
    })
    
}