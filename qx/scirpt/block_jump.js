/*
文件名：manga_guard.js
功能：通用型防跳转脚本
说明：通过 QX 配置文件传入目标域名参数
*/

// 1. 获取外部传入的参数 (核心修改)
// 如果没传参数，或者参数为空，就直接停止运行，避免误杀
if (typeof $argument === "undefined" || !$argument) {
    // 没有参数时直接放行，不拦截
    $done({});
}

// 在最开头加上这一句用于测试
console.log(`🔍 [检测中] 来源: ${$request.headers['Referer'] || '无'} -> 目标: ${$request.url}`);

// 获取传入的域名，例如 "xxx.com"
const targetSite = $argument.trim();

// 2. 动态生成白名单
// 自动把传入的主站域名加入白名单，同时加上常用的图片/CDN后缀
const whiteListKeywords = [
    targetSite, // 允许主站
    ".jpg", ".jpeg", ".png", ".webp", ".gif", // 图片
    ".css", ".js", ".woff", ".svg", // 样式与脚本
    "cdn", "img", "static", "upload" // 常见资源路径
];

const url = $request.url.toLowerCase();
const headers = $request.headers;
// 兼容处理 Referer 的大小写
const referer = headers['Referer'] || headers['referer'];

// 3. 核心拦截逻辑
if (referer && referer.indexOf(targetSite) !== -1) {

    // 检查目标 URL 是否包含白名单关键词
    let isSafe = false;
    for (let keyword of whiteListKeywords) {
        if (url.indexOf(keyword) !== -1) {
            isSafe = true;
            break;
        }
    }

    if (!isSafe) {
        console.log(`🛡️ [通用拦截] 来源: ${targetSite} -> 拦截目标: ${url}`);
        $done({ status: "HTTP/1.1 403 Forbidden" });
    } else {
        $done({});
    }
} else {
    $done({});
}