/*
功能：锁定 se8.us，禁止跳转
*/

// 1. 直接把你要拦截的网站写死在这里
const targetSite = "se8.us";

// 2. 白名单 (允许加载图片和样式)
const whiteListKeywords = [
    targetSite,
    ".jpg", ".jpeg", ".png", ".webp", ".gif",
    ".css", ".js", ".woff",
    "cdn", "img", "static", "upload"
];

const url = $request.url.toLowerCase();
const headers = $request.headers;
const referer = headers['Referer'] || headers['referer'];

// 只有来源是 se8.us 时才干活
if (referer && referer.indexOf(targetSite) !== -1) {
    let isSafe = false;
    for (let keyword of whiteListKeywords) {
        if (url.indexOf(keyword) !== -1) {
            isSafe = true;
            break;
        }
    }

    if (!isSafe) {
        console.log(`�️ [漫画防跳] 拦截了从 ${targetSite} 跳转到 -> ${url}`);
        $done({ status: "HTTP/1.1 403 Forbidden" });
    } else {
        $done({});
    }
} else {
    $done({});
}