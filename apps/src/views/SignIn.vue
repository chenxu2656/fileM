<template>
    <div class="home">
        <div id="title">
            项目申报管理系统
        </div>
        <div id="container">
            <div id="login" v-if="login" class="sign">
                <div id="tit">登录</div>
                <div id="forms">
                    <input type="text" v-model="signinInfo.phoneNumber" class="inputData" placeholder="手机号">
                    <input type="password" v-model="signinInfo.pw" class="inputData" placeholder="密码">
                    <button class="loginInButton" v-on:click="signIn(signinInfo)">登录</button>
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
                        <button id="getCode" class="getCode" v-on:click="sendSms(registerInfo.phoneNumber)" v-if="!waitingSmsCode">获取验证码</button>
                        <button id="downCount" class="getCode" v-if="waitingSmsCode">{{countDown}}</button>
                    </div>
                    <div id="grade" class="line2">
                    <select v-model="registerInfo.college" id='college' placeholder="选择学院"  class="selectGrade" style="width: 290px">
                            <option v-for="co in College" :key="co">{{co}}</option>
                        </select>
                    </div>
                    
                    <div id="grade" class="line2">
                        <select v-model="registerInfo.role" id='grade' placeholder="Select"  class="selectGrade" style="width: 115px">
                            <option v-for="role in roleList" :key="role">{{role}}</option>
                        </select>
                            <select v-model="registerInfo.grade" id='year' placeholder="Select"  class="selectGrade" style="width: 115px">
                            <option v-for="grade in gradeList" :key="grade">{{grade}}</option>
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
import { useRouter } from "vue-router";
import apiRequest from '../../http/index'
import { phonNumberVerify } from '../../src/js'
import errMsgPopup from '../utils/errorHandle/index'
const login = ref(true)
const waitingSmsCode = ref(false)
const countDown = ref('60s后重新获取')
const roleList = ref(['本科生','研究生'])
const College = ref(['生物医学工程学院','生命科学学院','第一临床医学院','第二临床医学院','生命科学学院','马克思主医学院',"基础医学院","公共卫生学院","口腔医学院","卫生管理学院","药学院","护理学院","巢湖临床医学院","国际教育学院","人文医学院","精神卫生与心理科学学院","法学院","继续教育学院","临床药理研究所"])
const gradeList = ref([2016,2017,2018,2019,2020,2021,2022])
const router = useRouter();
const registerInfo = reactive({
    name: "",
    phoneNumber: "",
    password: "",
    confirmPw: "",
    studentId: "",
    role: "本科生",
    grade: 2020,
    verificationCode: "",
    college: '生物医学工程学院',
})
const signinInfo = reactive({
    phoneNumber: "",
    pw: ""
})
/**
 * switch signin or signup
 */
const registerApi = async (requestInfo) => {
    await apiRequest({
        method: "post",
        url: '/api/user/register',
        params: requestInfo
    }).then((resp) => {
        if (resp.status!==200) {
            errMsgPopup.errorPopup(resp.msg)
            return
        }
        errMsgPopup.generalPopUp('注册成功，即将自动跳转登录页面',1500)
        switchSign()
    }).catch((err) => {
        console.log(err);
    })
}
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
        if (resp.status == 200) {
            waitingSmsCode.value = true
            countDownFunc(60)
            return
        }
        errMsgPopup.registerError(resp.msg)
    }).catch((err) => {
        errMsgPopup.registerError(err.msg)
        return
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
        errMsgPopup.notFillAllError()
        return false
    }
    // 验证验证码准确定、实效性
    const smsVerify = await cmsCodeVerify(registerInfo.phoneNumber, registerInfo.verificationCode)
    if (!smsVerify) {
        errMsgPopup.smsCodeError()
        return false
    }
    await registerApi(registerInfo)
}
const switchSign = () => {
    login.value = !login.value
}
const signIn = async(signinInfo)=>{
    const login = await apiRequest({
        method: 'post',
        url: '/api/user/login',
        params: {
            phoneNumber: signinInfo.phoneNumber,
            pw: signinInfo.pw
        }
    })
    console.log(login.msg);
    if (login.status == 200) {
        localStorage.setItem('token',login.msg.token)
        localStorage.setItem('uid',login.msg.uid)
        localStorage.setItem('userName', login.msg.userName)
        router.push('/stuAdmin')
        errMsgPopup.generalPopUp('成功',1000)
        return true
    }
    errMsgPopup.errorPopup(login.msg)
    return false
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
                    .getCode {
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
                    .selectGrade{
                        // width: 40%!important;
                        box-sizing: content-box;
                        padding: 14px 20px;
                        height: 20px;
                        border: none;
                        background-color: #f7fafc;
                        border: 1px solid #e5e5e5;
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