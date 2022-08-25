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
                    <input type="text" class="inputData" placeholder="手机号">
                    <!-- <div id="verificationCode" class="inputData">
                            <input type="text" class="inputData" placeholder="手机号">
                    </div> -->
                    <div id="verificationCode">
                        <input type="text" class="inputData verification" placeholder="验证码">
                        <button id="getcode">获取验证码</button>
                    </div>
                    <input type="password" class="inputData" placeholder="密码">
                    <input type="password" class="inputData" placeholder="确认密码">
                    <button class="loginInButton">注册</button>
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
import {ref} from 'vue'
const login = ref(true)
/**
 * switch signin or signup
 */
const switchSign = () =>{
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
        button{
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
                #verificationCode{
                    display: flex;
                    margin: auto;
                    justify-content: space-between;
                    width: 92%;
                    margin-top: 20px;
                    align-items: center;
                    .verification{
                        width: 40%;
                        margin-top: 0px;
                    }
// padding: 14px 20px;
                    #getcode{
                        width: 40%;
                        background-color: #2d67bb;
                        border: none;
                        color: white;
                        border-radius: 27px;
                        height: 54px;
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
                &#registerOther{
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