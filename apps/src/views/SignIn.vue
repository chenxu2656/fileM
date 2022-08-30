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

                    <input type="text" class="inputData" placeholder="真实姓名" v-model="registerInfo.name">
                    <input type="text" class="inputData" placeholder="学号" v-model="registerInfo.studentId">
                    <input type="text" class="inputData" placeholder="手机号" v-model="registerInfo.phoneNumber">
                    <div id="verificationCode" class="line2">
                        <input type="text" class="inputData verification" placeholder="验证码"
                            v-model="registerInfo.verificationCode">
                        <button id="getcode" v-on:click="sendSms(registerInfo.phoneNumber)">获取验证码</button>
                    </div>
                    <div id="grade" class="line2">
                        <select v-model="select" id='grade' placeholder="Select"  class="selectGrade" style="width: 115px">
                            <option label="请选择身份" value="本科生"/>
                            <option label="本科生" value="本科生"/>
                            <option label="研究生" value="研究生"/>
                            <option label="老师" value="老师"/>
                        </select>
                            <select v-model="select" id='year' placeholder="Select"  class="selectGrade" style="width: 115px">
                            <option label="Restaurant" value="1" />
                            <option label="Order No." value="2" />
                            <option label="Tel" value="3" />
                        </select>
                    </div>
                    <input type="password" class="inputData" placeholder="密码" v-model="registerInfo.password">
                    <input type="password" class="inputData" placeholder="确认密码" v-model="registerInfo.confirmPw">
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

const registerInfo = reactive({
    name: "",
    phoneNumber: "",
    password: "",
    confirmPw: "",
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
        console.log(resp);
    }).catch((err) => {
        console.log(err);
    })
}
const registerInfoVerify = (registerInfo) => {
    for (const key in registerInfo) {
        if (Object.hasOwnProperty.call(registerInfo, key)) {
            console.log(`key: ${key},value: ${registerInfo[key]}`);
            if (!registerInfo[key]) {
                return false
            }          
        }
    }
    return true
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
    if (!infoVerify){
        console.log('信息每填完');
        return false
    }
        
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

                .line2 {
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
                    #getcode {
                        width: 40%;
                        background-color: #2d67bb;
                        border: none;
                        color: white;
                        border-radius: 27px;
                        height: 54px;
                    }
                    .selectGrade{
                        // width: 40%!important;
                        box-sizing: content-box;
                        padding: 14px 20px;
                        height: 20px;
                        border-radius: 24px;
                        &#grade{
                            width: 40%!important;
                        }
                        &#year{
                            width: 27%!important;
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