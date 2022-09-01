<template>
    <div class="home">
        <div id="title">
            项目申报管理系统
        </div>
        <div id="container">
            <div id="login" v-if="login" class="sign">
                <div id="tit">登录</div>
                <div id="forms">
                    <input type="text" class="inputData" placeholder="手机号">
                    <input type="password" class="inputData" placeholder="密码">
                    <button class="loginInButton">登录</button>
                    <div id="loginOther" class="otherinfo">
                        <div class="forgetPw">忘记密码</div>
                        <div class="signUp" v-on:click="switchSign()">还没有账号?立即注册</div>
                    </div>
                </div>
            </div>
            <div id="register" v-if="!login" class="sign">
                <div id="tit">注册</div>
                <div id="forms">

                    <input type="text" class="inputData" placeholder="真实姓名">
                    <input type="text" class="inputData" placeholder="学号">
                    <input type="text" class="inputData" placeholder="手机号" v-model="registerInfo.phoneNumber">
                    <div id="verificationCode">
                        <input type="text" class="inputData verification" placeholder="验证码"
                            v-model="registerInfo.verificationCode">
                        <button id="getCode" class="getCode" v-on:click="sendSms(registerInfo.phoneNumber)" v-if="!waitingSmsCode">获取验证码</button>
                        <button id="downCount" class="getCode" v-if="waitingSmsCode">{{countDown}}</button>
                    </div>
                    <input type="password" class="inputData" placeholder="密码">
                    <input type="password" class="inputData" placeholder="确认密码">
                    <button class="loginInButton" v-on:click="register(registerInfo)">注册</button>
                    <div id="registerOther" class="otherinfo">
                        <div class="signUp" v-on:click="switchSign()">已有账号?立即登陆</div>
                    </div>
                </div>
            </div>
            <div id="img">
                <img src="../../public/images/icons/signin.svg" class="imgIcon" alt="">
            </div>
        </div>
        <div id="copyright">
            <p class="copy-footer-29">© 2022. All rights reserved | Design by <a href="http://blog.xccit.cn">chen.xu</a>
            </p>
        </div>
    </div>
</template>

<script setup>
// @ is an alias to /src
import { reactive, ref } from 'vue'
import apiRequest from '../../http/index'
import { phonNumberVerify } from '../../src/js'
import errMsgPopup from '../utils/errorHandle/index'
const login = ref(false)
const waitingSmsCode = ref(false)
const countDown = ref('60s后重新获取')
const registerInfo = reactive({
    name: "",
    phoneNumber: "",
    password: "",
    studentId: "",
    role: "",
    grade: "",
    verificationCode: ""
})
/**
 * switch signin or signup
 */
// const registerApi = async (requestInfo) => {
//     await apiRequest({
//         method: "post",
//         url: '/api/user',
//         params: requestInfo
//     }).then((resp) => {
//         console.log(resp);
//     }).catch((err) => {
//         console.log(err);
//     })
// }
const countDownFunc = (value)=>{
    const cdown = setInterval(() => {
        countDown.value = `${value--}s后重新获取`
        if (value==0) {
            clearInterval(cdown)
            waitingSmsCode.value = false
        }
    },1000);
}
const sendSms = async (phoneNumber) => {
    const phoneVerify = phonNumberVerify(phoneNumber)
    if (!phoneVerify) {
        errMsgPopup.phoneNumberError()
        return
    }
    const phoneNumbers = []
    phoneNumbers.push(`+86${phoneNumber}`)
    await apiRequest({
        method: 'post',
        url: '/api/sms/',
        params: {
            phonenumber: phoneNumbers
        }
    }).then((resp) => {
        countDownFunc(60)
        waitingSmsCode.value = true

        console.log(resp);
    }).catch((err) => {
        console.log(err);
    })
}
const registerInfoVerify = (registerInfo) => {
    if (registerInfo) {
        return true
    }
    return false
}
const cmsCodeVerify = async (phoneNumber, verificationCode) => {
    const phoneNumbers = `+86${phoneNumber}`
    const smsVerify = await apiRequest({
        method: 'post',
        url: '/api/sms/verify',
        params: {
            phoneNumber: phoneNumbers,
            verificationCode: verificationCode
        }
    })
    if (smsVerify.status == 200) {
        return true
    }
    return false
}
const register = async (registerInfo) => {
    // 验证信息完整性
    const infoVerify = registerInfoVerify(registerInfo)
    if (!infoVerify)
        return false
    // 验证验证码准确定、实效性
    const smsVerify = await cmsCodeVerify(registerInfo.phoneNumber, registerInfo.verificationCode)
    if (smsVerify) {
        console.log('dui');
    }
    // if (verify) {
    //     return await registerApi(registerInfo)
    // }
    // return false
}
const switchSign = () => {
    login.value = !login.value
}
</script>
<style lang="scss" scoped>
.home {
    // height: 0vh;
    box-sizing: border-box;
    min-height: 100vh;
    padding: 40px;
    background-color: #2d67bb;
    display: grid;
    justify-content: center;
    align-items: center;

    .errmsg {
        text-align: left;
    }

    #title {
        display: block;
        width: 100%;
        text-align: center;
        color: white;
        font-weight: 700;
        font-size: 40px;

    }

    #container {
        min-width: 890px;
        max-width: 1000px;
        // height: 100px;
        margin: 40px 0;
        background-color: white;
        border-radius: 8px;
        margin-top: 70px;
        display: flex;

        button {
            cursor: pointer;
        }

        .sign {
            flex-basis: 50%;
            padding: 3em 3em;
            box-sizing: border-box;
            background-color: white;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;

            #tit {
                font-size: 30px;
                line-height: 40px;
                margin-bottom: 5px;
                font-weight: 900;
                color: #272346;
                text-align: center;
            }

            #forms {
                .inputData {
                    width: 80%;
                    height: 20px;
                    border-radius: 27px;
                    margin-top: 20px;
                    border: none;
                    border: 1px solid #e5e5e5;
                    background: #f7fafc;
                    padding: 14px 20px;
                    transition: 0.3s ease;
                    font-size: 16px;
                    color: #999;
                }

                #verificationCode {
                    display: flex;
                    margin: auto;
                    justify-content: space-between;
                    width: 92%;
                    margin-top: 20px;
                    align-items: center;

                    .verification {
                        width: 40%;
                        margin-top: 0px;
                    }

                    // padding: 14px 20px;
                    .getcode {
                        width: 40%;
                        background-color: #2d67bb;
                        border: none;
                        color: white;
                        border-radius: 27px;
                        height: 54px;
                        &#downCount{
                            background-color: #e1e1e2;
                        }
                    }
                }

                .loginInButton {
                    width: 200px;
                    margin-top: 20px;
                    height: 40px;
                    background: none;
                    border: none;
                    border: 1px solid #e5e5e5;
                    border-radius: 20px;
                    background-color: #2d67bb;
                    color: white;
                }
            }

            .otherinfo {
                width: 100%;
                text-align: right;
                margin-top: 50px;
                display: flex;
                justify-content: space-between;

                &#registerOther {
                    justify-content: flex-end;
                }
            }
        }

        #img {
            // height: 500px;
            flex-basis: 50%;
            background-color: #f4f9fd;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
            display: flex;
            width: 50%;

            .imgIcon {
                display: block;
                margin: auto;
            }
        }
    }

    #copyright {
        color: white;
        font-size: 20px;

        a {
            color: white;
        }
    }
}
</style>