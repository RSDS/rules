https://raw.githubusercontent.com/RSDS/rules/refs/heads/main/qx/scirpt/block_jump.js





# 针对 xxx.com 的配置：xxx.com不准跳转到其它网站，只能在本域名内访问
^https?:\/\/.* url script-request-header https://raw.githubusercontent.com/RSDS/rules/refs/heads/main/qx/scirpt/block_jump.js
, xxx.com

^https?:\/\/.* url script-request-header https://raw.githubusercontent.com/RSDS/rules/refs/heads/main/qx/scirpt/block_jump.js
, aaa.net