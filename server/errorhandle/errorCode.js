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
    loginNameRepeat: {
        status: 410,
        msg: "登录名重复"
    },
    SignInfoFail: {
        status: 411,
        msg: "未知错误，请稍后再试"
    },
    userNotExist: {
        status: 420,
        msg: "用户不存在"
    },
    pwIncorrect: {
        status: 421,
        msg: "密码不正确"
    },
    errNodefine: {
        status: 431,
        msg: ""
    },
    Success: {
        status: 200,
        msg: {}
    }
}