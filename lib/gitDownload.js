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

/**
* 主函数
* 注意：参数中的 path 应 encodeURI
*/
function gitDownload(opt) {
    site = opt.site || "github";
    branch = opt.branch || "master";
    repoPath = opt.path || "";
    savePath = opt.save || process.cwd();
    if(!opt.owner || !opt.repo) {
        throw("Error: Not Found.");
    }
    owner = opt.owner;
    repo = opt.repo;
    onComplete = opt.onComplete || onComplete;
    start();
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
                throw("Error: Not Found.");
            }
            console.log("Fetch data success.");
            traversal(data);
        }
    );
}

// traversal
function traversal(list) {
    let filesPath = [];
    let reg = repoPath ? new RegExp("^" + decodeURI(repoPath) + "[$/]") : "";
    list.forEach((item)=>{
        let saveFilePath = item.path;
        // 如果指定了子级目录
        if(reg) {
            // 如果指定的路径为文件，直接下载保存在根级目录
            if(saveFilePath == decodeURI(repoPath) && item.type == "blob") {
                saveFilePath = saveFilePath.match(/(?:\/)([^\/]+)$/)[1];
                if(savePath) mkdirs(savePath);
            }
            // 如果指定的路径为文件夹
            else if(reg.test(saveFilePath)) {
                saveFilePath = item.path.replace(reg, "");
            }
            else return;
        }

        if(item.type=="tree") {
            mkdirs(path.join(savePath, saveFilePath));
        }
        else if(item.type=="blob") {
            filesPath.push({
                origin: item.path,
                local: saveFilePath
            });
        }
    });

    mission = filesPath.map(savafile);
    Promise.all(mission).then(()=>{
        loading.stop();
        onComplete();
    });
}

// savafile
function savafile(filePath) {
    return new Promise((res, rej)=>{
        let uri = geturi(site, "raw", owner, repo, branch, filePath.origin);
        let stream = fs.createWriteStream(path.join(savePath, filePath.local));
        httpsreq(uri, 
            (chunk)=> {
                stream.write(chunk);
            },
            ()=> {
                // console.log(filePath.origin + " \x1b[36mdownload\x1b[0m");
                res();
            }
        );
    })
    
}