<template>
  <el-container>
    <el-header>
      <div id="name" class="topbarCon">安徽医科大学无纸化项目申报平台</div>
      <div id="avater">
        <img src="../../public/images/avatar.png" alt="" @click="switchPopUp()">
      </div>
      <div id="popupwin" v-show="popWin">
        <div id="trangle"></div>
        <div id="popUp">
          <div id="profileCon">
            <div id="ava">
              <img src="../../public/images/avatar.png" alt="">
            </div>
            <div id="profile">
              <div id="name">
                <span>colin</span>
              </div>
              <div id="editProfile" @click="editP()">
                <span>更改信息</span>
              </div>
            </div>
          </div>
          <el-divider />
          <div id="menuList">
              <div class="menu">
                申报记录
              </div>
          </div>
        </div>
        

      </div>

    </el-header>
    <el-container id="con">
      <el-main class="el-main">
        <router-view>
          
        </router-view>
      </el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { routerPush } from '@/js/dist/index.dev';
let userName = ref('')
userName.value = localStorage.getItem('userName')
const router = useRouter()
let popWin = ref(false)
const switchPopUp = () => {
  popWin.value = !popWin.value
}
const editP = ()=>{
  switchPopUp()
  routerPush(router,'/stuAdmin/editp')
}
</script>
<style lang="scss" scoped>
.el-header {
  border-bottom: 1px solid gainsboro;
  background-color: #2d67bb;
  display: flex;
  height: 60px;
  color: white;
  justify-content: space-between;

  .topbarCon {
    height: 100%;
    vertical-align: middle;
    display: flex;
    align-items: center;
    font-size: 25px;
    font-weight: 700;
  }
  #avater {
    width: 40px;
    height: 40px;
    margin-right: 45px;
    background-color: #dddfe5;
    border-radius: 20px;
    margin-top: 10px;
    img {
      height: 30px;
      width: 30px;
      margin-top: 5px;
    }
  }
  #popupwin {
    // #popUp{
    z-index: 1000;
    position: absolute;
    height: 210px;
    width: 300px;
    right: 10px;
    top: 60px;
    #trangle {
      width: 0px;
      height: 0px;
      border: 10px solid;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-color: #fff #fff #e1e1e1 #fff;
      margin-left: 215px;

    }
    #popUp {
      width: 300px;
      height: 200px;
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid #e1e1e1;
      box-shadow: 0 0 10px #e1e1e1;
      #profileCon {
        display: flex;
        #ava {
          width: 80px;
          height: 80px;
          margin: 30px 0px 0px 30px;
          border-radius: 40px;
          background-color: #2d67bb;
          border-color: #e1e1e1;
          img {
            width: 50px;
            margin-top: 15px;
            height: 50px;
          }

        }
        #profile {
          // background-color: aqua;
          height: 80px;
          width: 150px;
          margin: 40px 0 0 20px;
          #name {
            height: 40px;
            font-size: 22px;
            font-weight: 700;
            color: #000;
            text-align: left;
          }
          #editProfile {
            color: black;
            text-decoration: underline;
            padding-bottom: 5px;
            border-bottom: 50px;
            text-align: left;
            cursor: pointer;
          }
        }
      }
      .el-divider{
        margin: 10px 0px 10px 0px;
      }
      #menuList {
      width: 300px;
      height: 40px;
      .menu {
        height: 40px;
        color: #000;
        line-height: 40px;
        text-align: left;
        padding-left: 20px;
        font-size: 20px;
        cursor: pointer;
        &:hover {
          background-color: #f5f5f5;
        }
      }
    }
    }


    // }
  }

}

.el-main {
  height: 80vh;
}

.el-footer {
  border-top: 1px solid #dddfe5;
  bottom: 0px;
  height: 60px;
}</style>