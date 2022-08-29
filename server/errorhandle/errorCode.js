export default  {
    SmsSendFail: {
        status: 401,
        msg: "验证码发送失败"
    },
    VerifyFail: {
        status: 402,
        msg: "短信发送或者验证失败，请重新发送"
    },
    SignInfoRepeat: {
        status: 410,
        msg: "手机号或者学号已被注册"
    },
    SignInfoFail: {
        status: 411,
        msg: "未知错误，请稍后再试"
    },
    Success: {
        status: 200,
        msg: {}
    }
}