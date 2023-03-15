<template>
    <div class="home">
        <div id="title">
            项目申报管理系统（评审端）
        </div>
        <div id="container">
            <div id="login" v-if="login" class="sign">
                <div id="tit">登录</div>
                <div id="forms">
                    <input type="text" v-model="signinInfo.phoneNumber" class="inputData" placeholder="手机号">
                    <input type="password" v-model="signinInfo.pw" class="inputData" placeholder="密码">
                    <button class="loginInButton" v-on:click="signIn(signinInfo)">登录</button>
                    <div id="loginOther" class="otherinfo">
                        <div class="forgetPw" @click="forgetPw">忘记密码</div>
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
import { reactive, ref ,onMounted} from 'vue'
import { useRouter } from "vue-router";
import apiRequest from '../../http/index'
import errMsgPopup from '../utils/errorHandle/index'
const login = ref(true)
const router = useRouter();
const signinInfo = reactive({
    phoneNumber: "",
    pw: ""
})



const signIn = async(signinInfo)=>{
    const login = await apiRequest({
        method: 'post',
        url: '/api/user/judgeAdmin',
        params: {
            phoneNumber: signinInfo.phoneNumber,
            pw: signinInfo.pw,
            platform: "judge"
        }
    })
    if (login.status == 200) {
        localStorage.setItem('token',login.msg.token)
        localStorage.setItem('uid',login.msg.uid)
        router.push('/admin')
        errMsgPopup.generalPopUp('成功',1000)
        return true
    }
    errMsgPopup.errorPopup(login.msg)
    return false
}
const forgetPw = ()=>{
    errMsgPopup.generalPopUp('请联系管理员')
}
onMounted(() => {
    localStorage.clear()
})
</script>
<style lang="scss" scoped>
.home {
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
        // min-width: 890px;
        max-width: 1000px;
        height: auto;
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
            @media screen and (max-width: 600px) {
                width: 100%;
                flex-basis: 100%;
                border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
            }
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
            @media screen and (max-width: 600px) {
              display: none;
            }
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