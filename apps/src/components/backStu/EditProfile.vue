<template>
    <div id="contain">
        <el-form ref="formRef" :model="profile" label-width="120px" label-position="top"
            require-asterisk-position="right" :rules="profileRules" status-icon>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="profile.name" />
            </el-form-item>

            <el-form-item label="学号" prop="studentId">
                <el-input v-model="profile.studentId" />
            </el-form-item>
            <el-form-item label="手机号" prop="phoneNumber" >
                <el-input v-model="profile.phoneNumber" disabled />
            </el-form-item>
            <el-form-item label="学院 & 年级 " prop="role">
                <div id="college">
                    <el-select v-model="profile.college" >
                            <el-option v-for="col in College" :key="col">{{col}}</el-option>
                        </el-select>
                <el-select v-model="profile.role">
                            <el-option v-for="role in roleList" :key="role">{{role}}</el-option>
                        </el-select>
                        <el-select v-model="profile.grade" >
                            <el-option v-for="grade in gradeList" :key="grade">{{grade}}</el-option>
                        </el-select>
                </div>
                <div id="butArea">
                    <el-button type="success" @click="updateProfile(profile)">保存</el-button>  
            <el-button @click="routerBack(router)">返回上一页</el-button>  
                </div>
            </el-form-item>

            <!-- <el-form-item label="提交起始日期" prop="sTime">
                <el-col :span="11">
                    <el-date-picker v-model="profile.sTime" type="date" placeholder="Pick a date" style="width: 100%" />
                </el-col>
                <el-col :span="2" class="text-center">
                    <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                    <el-date-picker v-model="profile.eTime" type="date" placeholder="Pick a date" style="width: 100%" />
                </el-col>
            </el-form-item>
            <el-form-item label="项目负责人及联系方式">
                <el-col :span="11">
                    <el-input v-model="profile.contact" :span="11" placeholder="联系人" />
                </el-col>

                <el-col :span="2" class="text-center">
                    <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                    <el-input v-model="profile.contactInfo" :span="11" placeholder="联系方式" />
                </el-col>

            </el-form-item>
            <el-form-item label="关联到新闻">
                <el-input v-model="profile.relatedNews" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="Submit(formRef, profile)">创建或更新</el-button>
                <el-button @click="routerBack(router)">返回</el-button>
            </el-form-item> -->
        </el-form>
    </div>
</template>
<style lang="scss" scoped>
#contain {
    width: 60vw;
    margin: 40px auto;
    #college{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .el-select{
            width: 30%;
        }
    }
    #butArea{
        width: 100%;
        margin-top: 100px;

        text-align: right;
    }
}
</style>
<script  setup>
import { reactive, ref,onMounted } from 'vue'
import { routerBack } from '../../js/index'
import { useRouter } from 'vue-router';
import apiRequest from '../../../http/index'
import errMsgPopup from '../../utils/errorHandle/index'
const roleList = ref(['本科生','研究生'])
const College = ref(['生物医学工程学院','生命科学学院','第一临床医学院','第二临床医学院','生命科学学院','马克思主医学院',"基础医学院","公共卫生学院","口腔医学院","卫生管理学院","药学院","护理学院","巢湖临床医学院","国际教育学院","人文医学院","精神卫生与心理科学学院","法学院","继续教育学院","临床药理研究所"])
const gradeList = ref([2016,2017,2018,2019,2020,2021,2022])
const router = useRouter()
let profile = reactive({

})
const getProfile = async(uid) => {
    apiRequest({
        url: `/api/user/${uid}`,
        method: "get"
    }).then((resp) => {
        if (resp.status == 200) {
            Object.assign(profile,resp.msg)
        }
    }).catch((err) => {
        errMsgPopup.generalPopUp(err.msg)
        return
    })
}
const updateProfile = (profile)=>{
    apiRequest({
        method: "put",
        url: `/api/user/`,
        params: profile
    }).then(resp=>{
        if (resp.status==200) {
            localStorage.setItem('userName',profile.name)
            localStorage.setItem('uid',profile.phoneNumber)
            errMsgPopup.generalPopUp('个人信息更新成功',1000)
            routerBack(router)
        }else {
            errMsgPopup.errorPopup('好像遇到了一些问题，请稍后再试')
        }
        
        
    }).catch(err=>{
        console.log(err);
        console.log('更新失败');
    })

    
}
onMounted(async () => {
    const uid = localStorage.getItem('uid')
    await getProfile(uid)
})
</script>
  