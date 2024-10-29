/*
https://raw.githubusercontent.com/Yuclaude/rewrite/main/QX/node/shadowshareGet.js

*/


[MITM]
hostname = gitee.com


let obj = JSON.parse($response.body);
    obj=obj.getContent();
$done({
  body: JSON.stringify(obj)
});



