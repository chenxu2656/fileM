<template>
    <div id="header">
        <span id="tit">{{ projectInfo.projectName }}</span>
        <span>项目申报</span>
    </div>
    <el-divider />
    <el-form ref="formRef" :model="declareInfo" label-width="120px" label-position="left" require-asterisk-position="left"
        :rules="profileRules" status-icon id="elFrom">
        <el-form-item label="申报人信息" prop="createName">
            <el-col :span="7">
                <el-input v-model="declareInfo.createName" placeholder="姓名" />
            </el-col>
            <el-col :span="2"></el-col>
            <el-col :span="7">
                <el-input v-model="declareInfo.createStuId" placeholder="学号" />
            </el-col>
            <el-col :span="2"></el-col>
            <el-col :span="6">
                <el-input v-model="declareInfo.createStuPhone" placeholder="手机号" />
            </el-col>
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="declareInfo.projectName" />
        </el-form-item>
        <el-form-item label="项目概述" prop="projectSummary">
            <el-input v-model="declareInfo.projectSummary" type="textarea" maxlength="500" :rows="6" show-word-limit />
        </el-form-item>
        <el-form-item label="项目计划书">
            <div class="upload">
                <el-upload class="upload-demo" accept=".pdf,.word,.ppt,.zip,.rar" action="#"
                    :before-upload="handleBeforeUpload" :http-request="uploadFile">
                    <el-button type="primary">上传项目计划书</el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            jpg/png files with a size less than 500kb
                        </div>
                    </template>
                </el-upload>
            </div>
        </el-form-item>
        <el-form-item label="项目展示PPT">
            <div class="upload">
                <el-upload class="upload-demo" accept=".pdf,.word,.ppt,.zip,.rar" action="#"
                    :before-upload="handleBeforeUpload" :http-request="uploadFile">
                    <el-button type="primary">上传项目展示PPT</el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            jpg/png files with a size less than 500kb
                        </div>
                    </template>
                </el-upload>
            </div>
        </el-form-item>
        <el-form-item label="项目展示视频">
            <div class="upload">
                <el-upload class="upload-demo" accept=".pdf,.word,.ppt,.zip,.rar" action="#"
                    :before-upload="handleBeforeUpload" :http-request="uploadFile">
                    <el-button type="primary">上传项目展示视频</el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            jpg/png files with a size less than 500kb
                        </div>
                    </template>
                </el-upload>
            </div>
        </el-form-item>
        <el-divider />
    </el-form>
</template>
<style lang="scss" scoped>
#header {
    span {
        line-height: 40px;
        padding: 10px;

        &#tit {
            font-size: 24px;
        }
    }

}

.el-form {
    width: 70vw;
    margin: auto;

    .el-form-item>.el-form-item__label {
        font-size: 400px !important;
    }
}
</style>
<script setup>
// import { routerPush } from "../../js/index";
import { useRoute } from "vue-router";
import apiRequest from '../../../http'
import errMsgPopup from "../../utils/errorHandle";
import cos from '../../../http/ossSts'
// import COS from 'cos-js-sdk-v5';
import { onMounted, reactive } from "vue";
const router = useRoute();

const projectInfo = reactive({})
const userInfo = reactive({
    name: "",
    grade: "",
    phoneNumber: "",
    role: "",
    studentId: "",
    systemrole: "",
    _id: ""
})
const declareInfo = reactive({
    projectName: "",
    projectSummary: "",
    projectProgress: "",   // 项目进展
    attachmentList: {
        bp: "",
        ppt: "",
        video: ""
    },
    otherInfo: {
        patent: [],
        cpcc: [],
        paper: [],
        award: []
    },
    createName: "",
    createStuId: "",
    createStuPhone: "",
    createId: "",
    projectId: "",
    projectMember: [],  //id
    teacher: [] //id
})

const handleBeforeUpload = (file) => {
    if (file.size / 1024 / 1024 > 100) {
        errMsgPopup.errorPopup('文件大小应小于10M')
        return false
    }
    return true
}
const uploadFile = (params) => {
    console.log(params);
    cos.putObject({
        Bucket: 'filem-1253997872', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-guangzhou',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: `fileM/${params.file.name}`,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: params.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function (progressData) {
            // 上传进度的回掉
            console.log(JSON.stringify(progressData));
        }
    }, function (err, data) {
        console.log(err || data);
    });
}
const getProjectInfo = async (id) => {
    if (!id) {
        return
    }
    const resp = await apiRequest({
        methpd: "get",
        url: `/api/project/detail/${id}`,
    })
    if (resp.status == '200') {
        Object.assign(projectInfo, resp.msg)
        return
    } else {
        errMsgPopup.generalPopUp(resp.msg)
        return
    }
}
const getUserInfo = async (uid) => {
    const resp = await apiRequest({
        url: `/api/user/${uid}`,
        method: "get"
    })
    if (resp.status == '200') {
        Object.assign(userInfo, resp.msg)
        return
    } else {
        errMsgPopup.generalPopUp(resp.msg)
        return
    }
}
onMounted(async () => {
    const id = router.query.id            // 项目id
    const uid = localStorage.getItem('uid')  // 当前用户信息
    await getProjectInfo(id)
    await getUserInfo(uid)
    declareInfo.createName = userInfo.name
    declareInfo.createStuId = userInfo.studentId
    declareInfo.createStuPhone = userInfo.phoneNumber
})

</script>