<template>
    <div>
        123123123
    </div>
</template>
<script setup>
import {ref, onMounted} from "vue";
const projectId = ref("")
const handleDeclareList = async(projectId,page,count)=>{
    // 页数、每页条数
}
onMounted(() => {
    projectId.value = localStorage.getItem('projectId')
})
</script>