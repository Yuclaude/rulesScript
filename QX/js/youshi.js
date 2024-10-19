/*

有诗 1.0.1https://raw.githubusercontent.com/Yu9191/Rewrite/main/youshi.js

[rewrite_local]
https://youshiapp.com/api/v1/users/me url script-response-body https://raw.githubusercontent.com/Yuclaude/rewrite/main/QX/js/youshi.js

[mitm] 
hostname = youshiapp.com
*/

let obj = JSON.parse($response.body);
obj.has_paid = true;
obj.is_lifetime_member = true;
obj.is_member = true;
$done({
  body: JSON.stringify(obj)
});
