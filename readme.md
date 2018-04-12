gitdirdown
====

一个用来下载git下文件的小工具。  
A git repo download tool.

- 支持下载一个git仓库的所有文件 (download total project)
- 支持下载一个git仓库的某个目录或文件 (specify sub path)
- 下载时可以指定branch (specify branch)
- 目前支持github/gitee

```
下载git仓库内所有内容到指定目录
gitdirdown -u https://github.com/dxinef/gitdirdown -s temp

下载git仓库某个目录下所有内容，并指定分支
gitdirdown -u https://github.com/dxinef/gitdirdown -p lib -b master

下载git仓库特定文件
gitdirdown -u https://github.com/dxinef/gitdirdown -p lib/gitDownload.js 

查看帮助
gitdirdown -h

查看版本号
gitdirdown -v
```
