'use strict';

/*
返回对应的链接
目前支持github/gitee
*/

module.exports = function(site, type, owner, repo, branch, path) {
    if(site=="github") {
        if(type=="repo") {
            return `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`
        }
        else if(type=="raw") {
            return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`
        }
    }
    else if(site=="gitee") {
        if(type=="repo") {
            return `https://gitee.com/api/v5/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`
        }
        else if(type=="raw") {
            return `https://gitee.com/${owner}/${repo}/raw/${branch}/${path}`
        }
    }
}



/*
"github":
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${ref}?recursive=1`
    `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${filePath}`
    
"gitee": 
    `https://gitee.com/api/v5/repos/${owner}/${repo}/git/trees/${ref}?recursive=1`
    `https://gitee.com/${owner}/${repo}/raw/${ref}/${filePath}`

"coding":
    `https://coding.net/api/user/dxinef/project/dxinef.coding.me/git/tree/master?recursive=1`
    `https://coding.net/u/dxinef/p/dxinef.coding.me/git/raw/master/index.html`
*/