const tencentcloud = require("tencentcloud-sdk-nodejs")
const smsClient = tencentcloud.sms.v20210111.Client
import errorCode from "../../errorhandle/errorCode"
import { storeSmsCode, GetCodeByPhoneNumber } from "../../mongo/operation/sms"
import { config } from "../../config"
const {
  timeStampSecond,
  randomVerificationCode
} = require('../../utils')
const client = new smsClient({
  credential: {
    /* 必填：腾讯云账户密钥对secretId，secretKey。
     * 这里采用的是从环境变量读取的方式，需要在环境变量中先设置这两个值。
     * 你也可以直接在代码中写死密钥对，但是小心不要将代码复制、上传或者分享给他人，
     * 以免泄露密钥对危及你的财产安全。
     * SecretId、SecretKey 查询: https://console.cloud.tencent.com/cam/capi */
     secretId: config.secretId,
     secretKey: config.secretKey,
  },
  /* 必填：地域信息，可以直接填写字符串ap-guangzhou，支持的地域列表参考 https://cloud.tencent.com/document/api/382/52071#.E5.9C.B0.E5.9F.9F.E5.88.97.E8.A1.A8 */
  region: "ap-guangzhou",
  /* 非必填:
   * 客户端配置对象，可以指定超时时间等配置 */
  profile: {
    /* SDK默认用TC3-HMAC-SHA256进行签名，非必要请不要修改这个字段 */
    signMethod: "HmacSHA256",
    httpProfile: {
      /* SDK默认使用POST方法。
       * 如果你一定要使用GET方法，可以在这里设置。GET方法无法处理一些较大的请求 */
      reqMethod: "POST",
      /* SDK有默认的超时时间，非必要请不要进行调整
       * 如有需要请在代码中查阅以获取最新的默认值 */
      reqTimeout: 30,
      /**
       * 指定接入地域域名，默认就近地域接入域名为 sms.tencentcloudapi.com ，也支持指定地域域名访问，例如广州地域的域名为 sms.ap-guangzhou.tencentcloudapi.com
       */
      endpoint: "sms.tencentcloudapi.com"
    },
  },
})

/* 帮助链接：
* 短信控制台: https://console.cloud.tencent.com/smsv2
* 腾讯云短信小助手: https://cloud.tencent.com/document/product/382/3773#.E6.8A.80.E6.9C.AF.E4.BA.A4.E6.B5.81 */
const params = {
  /* 短信应用ID: 短信SmsSdkAppId在 [短信控制台] 添加应用后生成的实际SmsSdkAppId，示例如1400006666 */
  // 应用 ID 可前往 [短信控制台](https://console.cloud.tencent.com/smsv2/app-manage) 查看
  SmsSdkAppId: "1400728707",
  /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名 */
  // 签名信息可前往 [国内短信](https://console.cloud.tencent.com/smsv2/csms-sign) 或 [国际/港澳台短信](https://console.cloud.tencent.com/smsv2/isms-sign) 的签名管理查看
  SignName: "学习前端个人网",
  /* 模板 ID: 必须填写已审核通过的模板 ID */
  // 模板 ID 可前往 [国内短信](https://console.cloud.tencent.com/smsv2/csms-template) 或 [国际/港澳台短信](https://console.cloud.tencent.com/smsv2/isms-template) 的正文模板管理查看
  TemplateId: "1522847",
  /* 模板参数: 模板参数的个数需要与 TemplateId 对应模板的变量个数保持一致，若无模板参数，则设置为空 */
  TemplateParamSet: [],
  /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
   * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
  PhoneNumberSet: [],
  /* 用户的 session 内容（无需要可忽略）: 可以携带用户侧 ID 等上下文信息，server 会原样返回 */
  SessionContext: "",
  /* 短信码号扩展号（无需要可忽略）: 默认未开通，如需开通请联系 [腾讯云短信小助手] */
  ExtendCode: "",
  /* 国际/港澳台短信 senderid（无需要可忽略）: 国内短信填空，默认未开通，如需开通请联系 [腾讯云短信小助手] */
  SenderId: "",
}
const verifyParams = {
  BeginTime: timeStampSecond() - 1800,
  Offset: 0,
  Limit: 100,
  PhoneNumber: "",
  SmsSdkAppId: "1400728707"
}
const sendSms = async (phoneNumbers) => {
  const code = randomVerificationCode()
  params.TemplateId = 1522847
  params.TemplateParamSet = [code, 1]
  params.PhoneNumberSet = phoneNumbers
  const resp = await client.SendSms(params)
  const respInfo = resp.SendStatusSet[0]
  if (respInfo.Code != 'Ok') {
    let failInfo = errorCode.SmsSendFail
    failInfo.msg = respInfo.Message
    return failInfo
  }
  let storeField = {
    phoneNumber: respInfo.PhoneNumber,
    verificationCode: code,
    SerialNo: respInfo.SerialNo
  }
  storeSmsCode(storeField)
  let success = errorCode.Success
  success.msg = {
    SerialNo: respInfo.SerialNo
  }
  return success
}

const codeVerify = async (reqBody) => {
  verifyParams.PhoneNumber = reqBody.phoneNumber
  const verificationCode = reqBody.verificationCode
  const dbResp = await GetCodeByPhoneNumber(verifyParams.PhoneNumber)
  const SerialNo = dbResp.SerialNo
  if (parseInt(verificationCode) != dbResp.verificationCode) {
    let failInfo = errorCode.VerifyFail
    failInfo.msg = '验证码和手机号不匹配,或者验证码不是最新的'
    return failInfo
  }
  const tencentResp = await client.PullSmsSendStatusByPhoneNumber(verifyParams)
  const codeListLength = tencentResp.PullSmsSendStatusSet.length
  if (codeListLength == 0) {
    let failInfo = errorCode.VerifyFail
    failInfo.msg = '短信未发送成功'
    return failInfo
  }
  const latestSms = tencentResp.PullSmsSendStatusSet[codeListLength-1]

  const latestCode = latestSms.SerialNo == SerialNo
  if (!latestCode) {
    let failInfo = errorCode.VerifyFail
    failInfo.msg = '已经发送了新的验证码，请使用最新的验证码'
    return failInfo
  }
  const timevaild = (timeStampSecond() - latestSms.UserReceiveTime) < 1800
  if (!timevaild) {
    let failInfo = errorCode.VerifyFail
    failInfo.msg = '验证码过期'
    return failInfo
  }
  let success = errorCode.Success
  success.msg = true
  return success
}
export {
  sendSms,
  codeVerify
}