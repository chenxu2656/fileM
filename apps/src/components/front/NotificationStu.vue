<template>
    <div id="con">
        <div id="title">
            <div id="titleCon">项目申报通知（学生)</div>
            <div id="titleConMore">更多内容>></div>
        </div>
        <div id="table">
            <el-table :data="filterTableData"  style="width: 100%">
                <el-table-column prop="name" label="项目名称" width="300" />
                <el-table-column label="开始日期" width="180">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-icon>
                                <timer />
                            </el-icon>
                            <span style="margin-left: 10px">{{ scope.row.startTime }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="截止日期" width="180">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-icon>
                                <timer />
                            </el-icon>
                            <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="admin" label="联系人" width="180" />
                <el-table-column align="right">
                    <template #header>
                        <el-input v-model="searchField" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">立即申报
                        </el-button>
                        <el-button size="small" @click="handleDelete(scope.$index, scope.row)">已截止
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>

</template>
<style lang="scss" scoped>
#con {
    width: 1200px;
    margin: auto;
    margin-top: 30px;

    #title {
        width: 100%;
        height: 40px;
        padding-left: 15px;
        display: flex;
        border-left: 5px solid #21aba5;
        justify-content: space-between;

        #titleCon {
            display: block;
            font-size: 20px;
            line-height: 40px;
        }

        #titleConMore {
            font-size: 15px;
        }
    }

    #table {
        margin-top: 20px;
    }
}
</style>
<script setup>
import { Timer } from '@element-plus/icons-vue'
import {ref,computed} from 'vue'
const searchField = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !searchField.value ||
      data.name.toLowerCase().includes(searchField.value.toLowerCase())
  )
)
const tableData = [
    {
        name: '第八届 “互联网+” 创新创业大赛',
        startTime: '2022-06-22',
        endTime: "2022-08-22",
        admin: '梁振'
    },
    {
        name: '第七届 “挑战杯” 创新创业大赛',
        startTime: '2022-06-22',
        endTime: "2022-08-22",
        admin: '梁振'
    },
    {
        name: '第6届全国大学生计算机大赛',
        startTime: '2022-06-22',
        endTime: "2022-08-22",
        admin: '梁振'
    }
   
]
</script>