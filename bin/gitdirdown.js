#!/usr/bin/env node

'use strict';

const cmd = require("commander");
const gitDownload = require("../index");
const pkg = require("../package.json");

cmd
    .usage('<options>')
    .description("A git repo download tool, support sub dir or file.")
    .option("-u, --url <url>", "git repository url (项目url，必须)")
    .option("-p, --path <path>", "git repository sub directory (子目录或文件路径)")
    .option("-b, --branch <branch>", "git repository branch (项目分支)")
    .option("-s, --save <path>", "folder for the download file (下载文件保存的文件夹)")
    .version(pkg.version, "-v, --version")
    .parse(process.argv);

var uri = cmd.url;
if(!uri)  throw("Error: argument --url is necessary");

var u = new (require("url").URL)(uri);

var site = "";
if(u.host=="github.com") site = "github";
else if(u.host=="gitee.com") site = "gitee";
else throw ("Error: wrong url.");

var m = u.pathname.match(/^\/([\w\-\.]+)\/([\w\-\.]+)(\/tree\/([\w\-\.]+)\/([\w\-\.\/]+))?/);

if(!m) throw ("Error: wrong url.");

// gitDownload
console.log("Ready: " + uri);

gitDownload({
    site: site,
    owner: m[1],
    repo: m[2],
    branch: cmd.branch || m[4] || "",
    path: (cmd.path || m[5] || "").replace(/\/$/, ""),
    save: cmd.save || "",
    onComplete: function() {
        console.log("Mission complete!");
    }
});

