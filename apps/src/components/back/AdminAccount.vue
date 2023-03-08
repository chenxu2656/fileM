<template>
    <div id="header">
        <el-button>创建管理员账户</el-button>
    </div>
    <div id="con">
        <div id="table">
            <el-table :data="accountList" stripe style="width: 100%" @selection-change="handleSelectionChange" >
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" label="#" />
            <el-table-column prop="createName" label="用户名" width="200" />
            <el-table-column prop="projectName" label="手机号" width="200" />
            <el-table-column prop="createStuPhone" label="登录名（用于登陆）" width="200" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
                <!-- <template #default="scope">
                <el-button size="small" @click="handleDetail(scope.row)">查看信息</el-button>
                <el-button size="small" @click="handleDetail(scope.row)">评分</el-button>
            </template> -->
            </el-table-column>
        </el-table>
        </div>
        
        <div id="createAccount">
            <div id="createAcctit">
                创建账户
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
#header {
    text-align: left;
    margin: 20px 0px;
}

#con {
    display: flex;
    width: 100%;
    #table{
        width: 55%;
        .el-table {
        ::v-deep th .cell {
            font-size: 16px;
            color: rgb(51, 64, 80);
        }
        ::v-deep td .cell {
            font-size: 15px;
            color: rgb(51, 64, 80);
        }
    }
    }
    #createAccount{
        width: 40%;
        margin-left: 2%;
        height: 100px;
    }
}
</style>
<script setup>
import { ref } from 'vue'
let accountList = ref('')
</script>