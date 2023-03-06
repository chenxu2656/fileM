<template>
    <div id="contain">
        <div id="title">
            <div class="title">创建项目</div>
        </div>
        <el-divider></el-divider>
        <el-form 
            ref="formRef"
            :model="projectInfo" 
            label-width="120px" 
            label-position="top" 
            size="large"
            require-asterisk-position="right"
            :rules="projectInfoRules" 
            status-icon
        >
            <el-form-item  label="项目名称"  prop="projectName">
                <el-input v-model="projectInfo.projectName" />
            </el-form-item>

            <el-form-item label="提交起始日期" prop="sTime">
                <el-col :span="11">
                    <el-date-picker v-model="projectInfo.sTime" type="date" placeholder="Pick a date" style="width: 100%" />
                </el-col>
                <el-col :span="2" class="text-center">
                    <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                    <el-date-picker v-model="projectInfo.eTime" type="date" placeholder="Pick a date" style="width: 100%" />
                </el-col>
            </el-form-item>
            <el-form-item label="项目负责人及联系方式">
                <el-col :span="11">
                    <el-input v-model="projectInfo.contact" :span="11" placeholder="联系人" />
                </el-col>

                <el-col :span="2" class="text-center">
                    <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                    <el-input v-model="projectInfo.contactInfo" :span="11" placeholder="联系方式" />
                </el-col>

            </el-form-item>
            <el-form-item label="关联到新闻">
                <el-input v-model="projectInfo.relatedNews" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="Submit(formRef,projectInfo)">创建或更新</el-button>
                <el-button @click="routerBack(router)">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang="scss" scoped>
#contain {
    width: 70vw;
    margin: auto;
    #title{
        color: #323d51;
        font-size: 30px;
        font-weight: 700;
    }
    .el-divider{
        background-color: white;
    }
}
</style>
<script  setup>
import { reactive ,ref,onMounted} from 'vue'
import { routerBack } from '../../js/index'
import { useRouter } from 'vue-router';
import apiRequest from '../../../http/index'
import errMsgPopup from '../../utils/errorHandle/index'
const formRef = ref()
const router = useRouter();
let popMsg = '项目创建成功'
const projectInfo = reactive({
    projectName: '',
    sTime: '',
    eTime: '',
    contact: '',
    contactInfo: '',
    relatedNews: "",
    createId: "", // 创建人id
    _id: ""
})
const projectInfoRules = reactive({
    projectName: [
        { required: true, message: '请输入项目名称', trigger: 'blur' },
    ],
    sTime: [
        {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change',
        },
    ],
    eTime: [
        {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change',
        },
    ]
})
const createProject = async (projectInfo) => {
    await apiRequest({
        method: 'post',
        url: '/api/project/create',
        params: projectInfo
    }).then((resp) => {
        if (resp.status == 200) {
            localStorage.removeItem('editInfo')
            errMsgPopup.generalPopUp(popMsg, '1000')
        }
    }).catch((err) => {
        errMsgPopup.registerError(err.msg)
        return
    })
}

const Submit = (projectInfoV,projectInfo) => {
    if (!projectInfoV) {
        return
    }
    projectInfoV.validate(async (valid)=>{
        if (valid) {
            await createProject(projectInfo)
            setTimeout(()=>{
                routerBack(router)
            },1000)
            return 
        }
        return
    })
    
}
onMounted(() => {
    let editInfo = localStorage.getItem('editInfo')  
                ? JSON.parse(localStorage.getItem('editInfo'))
                : {}

    if (editInfo._id) {
        Object.assign(projectInfo,editInfo)
        popMsg = "项目更新成功"
    }
})
</script>
  