<template>
    <div id="header">
        <span id="tit">{{ projectInfo.projectName }}</span>
        <span>项目申报</span>
    </div>
    <div class="upload">
        <el-upload 
            class="upload-demo"
            accept=".pdf,.word,.ppt,.zip,.rar"
            action="#"
            :before-upload="handleBeforeUpload"
            :http-request="uploadFile"
        >
            <el-button type="primary">Click to upload</el-button>
            <template #tip>
                <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                </div>
            </template>
        </el-upload>
        <el-button type="warn" @click="uploadFile()">上传</el-button>
    </div>
    <el-divider />
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
const handleBeforeUpload = (file)=>{
    console.log(file);
    if (file.size/1024/1024 > 2) {
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
            console.log(JSON.stringify(progressData)); 
        }
    }, function (err, data) {
        console.log(err || data);
    });
}
const projectInfo = reactive({})
// const projectList = ref("")
const getProjectInfo = async (id) => {
    const resp = await apiRequest({
        methpd: "get",
        url: `/api/project/detail/${id}`,
    })
    if (resp.status == '200') {
        return resp.msg
    }
    return []
}

onMounted(async () => {
    const id = router.query.id
    let resp = await getProjectInfo(id)
    Object.assign(projectInfo, resp)
})

</script>