/****************************

#!name = 酷我音乐
#!desc = 〔 酷我音乐&酷我畅听 〕解锁会员
#!author = 影子
#!openUrl = https://napi.ltd
#!homepage = https://napi.ltd
#!icon = https://file.napi.ltd/Static/Image/KuWo.png
#!date = 2024-05-05


[Rule]
USER-AGENT,KWPlayer*,DIRECT
HOST-SUFFIX,kuwo.cn,DIRECT

[Script]
http-response ^(?!.*img).*?kuwo\.cn(/vip|/openapi)?(/enc|/audi.tion|/v[\d]/(user/vip\?(vers|apiVersion|platform|op\=ui|_t)|theme\?op=gd|sysinfo\?op=getRePayAndDoPayBoxNew|api(/pay)?/((user/personal/)?user/info|payInfo/kwplayer/payMiniBar|advert/(myPage|iListen|album))|album/(adBar|myRec/vipMusic))|/kuwopay/vip-tab/setting|/(audioApi/)?a\.p($|\?op\=getvip|.*?ptype\=vip)|/mobi\.s\?f\=kwxs|/(EcomResource|(Mobile)?Ad)Serv(er|ice)) script-path=https://raw.githubusercontent.com/Yuclaude/rewrite/main/QX/js/kuwo1.js, requires-body=true, timeout=60, tag=酷我音乐, img-url=https://file.napi.ltd/Static/Image/KuWo.png


[Mitm]
hostname = *.kuwo.cn

****************************/