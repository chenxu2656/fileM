import COS from 'cos-js-sdk-v5';
// 初始化实例
const cos = new COS({
    // getAuthorization 必选参数
    getAuthorization: function (options, callback) {
        // 初始化时不会调用，只有调用 cos 方法（例如 cos.putObject）时才会进入
        // 异步获取临时密钥
        // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
        // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
        // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048

        var url = '/api/sts'; // url 替换成您自己的后端服务
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        let data = {}
        xhr.onload = function (e) {
            try {
              console.log(e);
              data = JSON.parse(JSON.parse(e.target.responseText).msg);
            } catch (e) {
              console.log(e);
            }
            if (!data) {
              return console.error('credentials invalid:\n' + JSON.stringify(data, null, 2))
            }
            callback({
              TmpSecretId: data.credentials.tmpSecretId,
              TmpSecretKey: data.credentials.tmpSecretKey,
              SecurityToken: data.credentials.sessionToken,
              // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
              StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
              ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
          });
        };
        xhr.send();
    }
});
export default cos
// 接下来可以通过 cos 实例调用 COS 请求。
