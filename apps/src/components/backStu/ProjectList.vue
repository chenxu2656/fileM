<template>
    <div id="createItem">
        <div id="create">
           <img src="../../../public/images/icons/create.png" alt="" srcset="">
           <div id="tit" @click="routerPush(router, '/admin/creatItem')">创建项目</div>
        </div> 
    </div>
    <el-divider />
    
</template>
<style lang="scss" scoped>

</style>
<script setup>
// import { routerPush } from "../../js/index";
// import { useRouter } from "vue-router";
// import apiRequest from '../../../http'
// import { ref , onMounted} from "vue";
// const router = useRouter();
// const projectList = ref("")
// const getProjectList = async () =>{
//     const resp = await apiRequest({
//         methpd: "get",
//         url: "/api/project/list",
//     })
//     if (resp.status == '200') {
//         return resp.msg
//     } 
//     return []
// }
// const editProject = (project)=>{
//     console.log(project);
//     localStorage.setItem('editInfo',JSON.stringify(project))
//     routerPush(router, '/admin/creatItem')
// }
// onMounted(async () => {
//     projectList.value = await getProjectList()
// })

</script>