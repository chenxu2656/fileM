<template>
    <div id="header">
        <span id="tit">{{ projectInfo.projectName }}</span>
        <span>项目申报</span>
    </div>
    <el-divider />
    
</template>
<style lang="scss" scoped>
#header {
    span {
        line-height: 40px;
        padding: 10px;
        &#tit {
        font-size: 24px ;
    }
    }
    
}
</style>
<script setup>
// import { routerPush } from "../../js/index";
import { useRoute } from "vue-router";
import apiRequest from '../../../http'
import COS from 'cos-js-sdk-v5';
import { onMounted,reactive} from "vue";
const router = useRoute();

const projectInfo =  reactive({})
// const projectList = ref("")
const getProjectInfo = async (id) =>{
    const resp = await apiRequest({
        methpd: "get",
        url: `/api/project/detail/${id}`,
    })
    if (resp.status == '200') {
        return resp.msg
    } 
    return []
}
// const editProject = (project)=>{
//     console.log(project);
//     localStorage.setItem('editInfo',JSON.stringify(project))
//     routerPush(router, '/admin/creatItem')
// }
// oss

// 存储桶名称，由 bucketname-appid 组成，appid 必须填入，可以在 COS 控制台查看存储桶名称。 https://console.cloud.tencent.com/cos5/bucket
var Bucket = 'filem-1253997872';  /* 存储桶，必须字段 */

// 存储桶 region 可以在 COS 控制台指定存储桶的概览页查看 https://console.cloud.tencent.com/cos5/bucket/ 
// 关于地域的详情见 https://cloud.tencent.com/document/product/436/6224
var Region = 'ap-guangzhou';     /* 存储桶所在地域，必须字段 */
var cos = new COS({
    SecretId: 'SECRETID',
    SecretKey: 'SECRETKEY',
});
onMounted(async () => {
    const id = router.query.id
    let resp =  await getProjectInfo(id)
    Object.assign(projectInfo,resp)
    console.log(projectInfo);
})

</script>