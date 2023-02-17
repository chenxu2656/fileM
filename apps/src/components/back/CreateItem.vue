<template>
    <div id="contain">
        <el-form :model="form" label-width="120px" label-position="top">
            <el-form-item label="项目名称">
                <el-input v-model="form.projectName" />
            </el-form-item>

            <el-form-item label="提交起始日期">
                <el-col :span="11">
                    <el-date-picker v-model="form.sTime" type="date" placeholder="Pick a date" style="width: 100%" />
                </el-col>
                <el-col :span="2" class="text-center">
                    <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                    <el-date-picker v-model="form.eTime" type="date" placeholder="Pick a date" style="width: 100%" />
                </el-col>
            </el-form-item>
            <el-form-item label="项目负责人及联系方式">
                <el-col :span="11">
                    <el-input v-model="form.contact" :span="11" placeholder="联系人"  />
                </el-col>

                <el-col :span="2" class="text-center">
                    <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                    <el-input v-model="form.contactInfo" :span="11" placeholder="联系方式" />
                </el-col>
            
            </el-form-item>
            <el-form-item label="关联到新闻">
                <el-input v-model="form.relatedNews" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">创建或更新</el-button>
                <el-button @click="routerBack(router)">返回</el-button>
            </el-form-item>
        </el-form>
</div>
</template>
<style lang="scss" scoped>
#contain {
    width: 60vw;
    margin: auto
}
</style>
<script  setup>
import { reactive } from 'vue'
import {routerBack} from '../../js/index'
import { useRouter } from 'vue-router';
const router = useRouter();
const form = reactive({
    projectName: '',
    sTime: '',
    eTime: '',
    contact: '',
    contactInfo: '',
    relatedNews: "",
    createId: "", // 创建人id
    id: ""
})

const onSubmit = () => {
    console.log('submit!')
}
</script>
  