/*
#https://raw.githubusercontent.com/Yuclaude/rewrite/main/QX/node/shadowshareGet.js


[rewrite_local]
https://gitee.com/api/v5/repos/c0nfigshare/share/contents url script-response-body https://raw.githubusercontent.com/Yuclaude/rewrite/main/QX/node/shadowshareGet.js

[MITM]
hostname = gitee.com
*/


let obj = JSON.parse($response.body);
   var objc=obj.content;
$done({
  body: JSON.stringify(objc)
});



