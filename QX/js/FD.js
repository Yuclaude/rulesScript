/****************************************

脚本功能：樊登读书 樊登讲书+非凡精读+李蕾阅读+付费课程
下载地址：appstore
软件版本：所有
脚本作者：伟人
更新时间：2023-06-30
问题反馈：QQ+
QQ会员群：添加作者
TG反馈群：https://t.me/WeiRenOvO
TG频道群：https://t.me/WeiRenQAQ
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

**************************************

[mitm]

hostname = *dushu*


[rewrite_local]

^http[s]?:\/\/.+dushu.+(v101|v100|program\/v100)\/(content|play\/duration|index|list|userInfo|vipInfo|info|ceiltip|mainList|getMarketInfoByType|share).*$ url script-response-body https://raw.githubusercontent.com/WeiRen0/Scripts/main/FD.js
^http[s]?:\/\/.+dushu.+(v101\/content|book\/v100\/info|\/play\/duration|\/v100\/index|lilei-talk-orch\/program\/v100\/info).*$ url script-request-body https://raw.githubusercontent.com/WeiRen0/Scripts/main/FDTK.js
^http[s]?:\/\/.*dushu365\.com\/resource-orchestration-system\/play\/duration url reject-200

***************************************/
