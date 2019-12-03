# gitdirdown

> 一个用来下载git下文件的小工具。\
> A git repo download tool.

## Features

- 下载所有文件\
  Download full project
- 下载文件夹或文件\
  Specify sub path
- 下载指定分支\
  Specify branch
- 支持 [github](https://www.github.com/) 和 [gitee](https://www.gitee.com/)

## Usage

```bash
gitdirdown -u https://github.com/dxinef/
```

```console
$ gitdirdown --help

Usage: gitdirdown <options>

A git repo download tool, support sub dir or file.

Options:
  -u, --url <url>        git repository url (项目url，必须)
  -p, --path <path>      git repository sub directory (子目录或文件路径)
  -b, --branch <branch>  git repository branch (项目分支)
  -s, --save <path>      folder for the download file (下载文件保存的文件夹)
  -v, --version          output the version number
  -h, --help             output usage information
```

### flags

#### url

项目url

```bash
# 下载git仓库内所有内容到当前目录
gitdirdown -u https://github.com/dxinef/
```

#### save

保存文件夹, 默认 当前文件夹

```bash
gitdirdown -u https://github.com/dxinef/ -s path/to/directory
```

#### branch

项目分支, 默认 master

```bash
gitdirdown -u https://github.com/dxinef/gitdirdown -b master
```

#### path

文件夹或文件路径

```bash
# 文件夹
gitdirdown -u https://github.com/dxinef/gitdirdown -p lib

# 文件
gitdirdown -u https://github.com/dxinef/gitdirdown -p lib/gitDownload.js 
```

#### help

显示帮助内容

```bash
gitdirdown -h
```

#### version

```bash
gitdirdown -v
```
