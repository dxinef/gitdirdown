#!/usr/bin/env node

'use strict';

const URL = require('url').URL;
const cmd = require('commander');
const gitDownload = require('../index');
const pkg = require('../package.json');

// 命令行参数
cmd
  .usage('<options>')
  .description('A git repo download tool, support sub dir or file.')
  .option('-u, --url <url>', 'git repository url (项目url，必须)')
  .option(
    '-p, --path <path>',
    'git repository sub directory (子目录或文件路径)'
  )
  .option('-b, --branch <branch>', 'git repository branch (项目分支)')
  .option(
    '-s, --save <path>',
    'folder for the download file (下载文件保存的文件夹)'
  )
  .version(pkg.version, '-v, --version')
  .parse(process.argv);

var uri = cmd.url;
if (!uri) throw 'Error: argument --url is necessary';

// 解析参数的url部分
var opt = parseUri(uri);
if (opt.site != 'github' && opt.site != 'gitee') {
  throw 'Error: unsupported git host.';
} else if (!opt.owner || !opt.repo) {
  throw 'Error: wrong url.';
}

// 整合命令行参数其他部分
opt.branch = cmd.branch || opt.branch;
opt.path = (cmd.path || opt.path).replace(/\/$/, '');

var reqUrl =
  `https://${opt.site}.com/${opt.owner}/${opt.repo}/${opt.type}/${opt.branch}` +
  (opt.path ? '/' + opt.path : '');
// 重新解析一次，并encode
opt = parseUri(new URL(reqUrl).href);

opt.save = cmd.save || '';
opt.onComplete = function () {
  console.log('Mission complete!');
};

// gitDownload
console.log('Ready: ' + reqUrl);
gitDownload(opt);

// parseUri
function parseUri(uri) {
  var m = uri.match(
    /^https\:\/\/(github|gitee)\.com\/([^\/]+)\/([^\/]+)(\/(tree|blob)\/([^\/]+)(?:\/(.+))?)?(?:\/$|$)/
  );
  if (!m) throw 'Error: wrong url.';
  return {
    site: m[1],
    owner: m[2],
    repo: m[3],
    type: m[5] || 'tree',
    branch: m[6] || 'master',
    path: m[7] || '',
  };
}
