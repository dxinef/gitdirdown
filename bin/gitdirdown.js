#!/usr/bin/env node

'use strict';

const cmd = require("commander");
const gitDownload = require("../index");
const pkg = require("../package.json");

cmd.version(pkg.version, "-v, --version")
    .usage('gitdirdown <url> [options]')
    .option("-u, --url <url>", "git项目的url，必填")
    .option("-s, --save <path>", "下载文件保存的目录，默认为当前目录")
    .option("-p, --path <path>", "子级目录，默认为空")
    .option("-b, --branch <branch>", "项目分支，默认为master")
    .parse(process.argv);

var uri = cmd.url;
if(!uri)  throw("error: need argument --url");

var u = new (require("url").URL)(uri);

var site = "";
if(u.host=="github.com") site = "github";
else if(u.host=="gitee.com") site = "gitee";
else throw ("error: wrong url.");

var m = u.pathname.match(/^\/([\w\-\.]+)\/([\w\-\.]+)(\/tree\/([\w\-\.]+)\/([\w\-\.\/]+))?/);

if(!m) throw ("error: wrong url");

// gitDownload
console.log("准备就绪: " + uri);

gitDownload({
    site: site,
    owner: m[1],
    repo: m[2],
    branch: cmd.branch || m[4] || "",
    path: (cmd.path || m[5] || "").replace(/\/$/, ""),
    save: cmd.save || "",
    onComplete: function() {
        console.log("任务完成!");
    }
});

