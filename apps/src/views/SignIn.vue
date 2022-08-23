<template>
  <div class="home">
    <div id="title">
        项目申报管理系统
    </div>
    <div id="container">
            <div id="login">
                <div id="tit">登录</div>
                <div id="forms">
                    <input type="text" class="inputData" placeholder="手机号">
                    <input type="password" class="inputData" placeholder="密码">
                    <button class="inputData">登录</button>
                </div>
            </div>
            <div id="img"></div>
    </div>
    <div id="copyright">
            <p class="copy-footer-29">© 2022. All rights reserved | Design by <a href="http://blog.xccit.cn">chen.xu</a></p>
        </div>
  </div>
</template>

<script setup>
// @ is an alias to /src
</script>
<style lang="scss" scoped>
.home{
    // height: 0vh;
    box-sizing: border-box;
    min-height: 100vh;
    padding: 40px;
    background-color: #2d67bb;
    display: grid;
    justify-content: center;
    align-items: center;
    #title{
        display: block;
        width: 100%;
        text-align: center;
        color: white;
        font-weight: 700;
        font-size: 40px;
        
    }
    #container{
        min-width: 890px;
        // height: 100px;
        margin: 40px 0;
        background-color: white;
        border-radius: 8px;
        margin-top: 70px;
        display: flex;
        #login{
            flex-basis: 50%;
            padding: 3em 3em;
            box-sizing: border-box;
            background-color: white;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
            #tit{
                font-size: 30px;
                line-height: 40px;
                margin-bottom: 5px;
                font-weight: 900;
                color: #272346;
                text-align: center;
            }
            #forms{
                .inputData{
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
            }
        }
        #img{
            // height: 500px;
            flex-basis: 50%;
            background-color: #f4f9fd;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
        }
    }
    #copyright{
        color: white;
        font-size: 20px;
        a{
            color: white;
        }
    }
}
</style>