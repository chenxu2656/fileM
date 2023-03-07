var express = require('express');
import { config } from "../config"
const sts = require('qcloud-cos-sts')
const stsConfig = {
    secretId: config.secretId, // 固定密钥
    secretKey: config.secretKey, // 固定密钥
    proxy: '',
    durationSeconds: 18000,
    // host: 'sts.tencentcloudapi.com', // 域名，非必须，默认为 sts.tencentcloudapi.com
    endpoint: 'sts.tencentcloudapi.com', // 域名，非必须，与host二选一，默认为 sts.tencentcloudapi.com

    // 放行判断相关参数
    bucket: 'filem-1253997872',
    region: 'ap-guangzhou',
    "effect": "allow",
    allowPrefix: '*', // 这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的具体路径，例子： a.jpg 或者 a/* 或者 * (使用通配符*存在重大安全风险, 请谨慎评估使用)
    // 简单上传和分片，需要以下的权限，其他权限列表请看 https://cloud.tencent.com/document/product/436/31923
    allowActions: [
        // 简单上传
        'name/cos:PutObject',
        'name/cos:PostObject',
        "name/cos:GetObject",
        // 分片上传
        'name/cos:InitiateMultipartUpload',
        'name/cos:ListMultipartUploads',
        'name/cos:ListParts',
        'name/cos:UploadPart',
        'name/cos:CompleteMultipartUpload'
    ],
};
const shortBucketName = stsConfig.bucket.split('-')[0]
const appId = stsConfig.bucket.split('-')[1]
const policy = {
    'version': '2.0',
    'statement': [{
        'action': stsConfig.allowActions,
        'effect': 'allow',
        'principal': {'qcs': ['*']},
        'resource': [
            'qcs::cos:' + stsConfig.region + ':uid/' + appId + ':prefix//' + appId + '/' + shortBucketName + '/' + stsConfig.allowPrefix,
        ],
        // condition生效条件，关于 condition 的详细设置规则和COS支持的condition类型可以参考https://cloud.tencent.com/document/product/436/71306
        // 'condition': {
        //   // 比如限定ip访问
        //   'ip_equal': {
        //     'qcs:ip': '10.121.2.10/24'
        //   }
        // }
    }],
};
const router = express.Router();
const getCredential = (req,res)=>{
    sts.getCredential({
        secretId: process.env.OSS_SID,
        secretKey: process.env.OSS_SKEY,
        proxy: stsConfig.proxy,
        durationSeconds: stsConfig.durationSeconds,
        endpoint: stsConfig.endpoint,
        policy: policy,
    }, function (err, tempKeys) {
        if (err) {
            res.status(400).json({
                "msg": JSON.stringify(err)
            })
        } else {
            res.status(200).json({
                "msg": JSON.stringify(tempKeys)
            })
        }
    });
    
}
router.get('/',getCredential)
export default router

