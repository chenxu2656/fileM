<template>
    <div id="header">
        <el-button @click="dialogVisible = !dialogVisible, titleInfo = '创建管理员账户'">创建管理员账户</el-button>
    </div>
    <div id="con">
        <div id="table">
            <el-table :data="filterTableData" stripe style="width: 100%">
                <!-- @selection-change="handleSelectionChange" -->
                <el-table-column type="selection" width="55"/>
                <el-table-column label="#" type="index"/>
                <el-table-column label="用户名" prop="userName" width="150"/>
                <el-table-column label="手机号" prop="phoneNumber" width="150"/>
                <el-table-column label="登录名（用于登陆）" prop="loginName" width="200"/>
                <el-table-column label="权限" prop="role.description" width="150"/>
                <el-table-column label="学院" prop="collage.name" width="200"/>
                <el-table-column align="right" id="operation">
                    <template #header>
                        <el-input v-model="search" placeholder="根据用户名搜索"/>
                    </template>
                    <template #default="scope">
                        <el-button class="editInfo"
                                   size="small"
                                   type="primary"
                                   @click="handleUpdate(scope.row), rowIndex = scope.$index, titleInfo = '更新信息'">
                            修改信息
                        </el-button>
                        <el-button size="small" @click="deleteUser(scope.$index, scope.row._id)" type="danger"
                                   plain>删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <el-dialog v-model="dialogVisible" :title="titleInfo" width="30%" :before-close="handleClose">
        <el-form :model="userInfo" status-icon label-width="80px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="userName">
                <el-input v-model="userInfo.userName" autocomplete="off" />
            </el-form-item>

            <el-form-item label="登录名" prop="loginName">
                <el-input v-model="userInfo.loginName" />
            </el-form-item>
            <el-form-item label="手机号" prop="phoneNumber">
                <el-input v-model="userInfo.phoneNumber" />
            </el-form-item>
            <el-form-item label="密码" prop="phoneNumber">
                <el-input v-model="userInfo.password" type="password" show-password="true" placeholder="此项不填不会修改密码" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select v-model="roleName" placeholder="Select" style="width=100%" @change="handleSelectChange">
                    <el-option v-for="item in roleList" :key="item.roleName" :label="item.description"
                        :value="item.roleName" :disabled="item.disabled" />
                </el-select>
            </el-form-item>
            <el-form-item label="学院" prop="collage" v-show="roleName === 'instituteAdmin'">
                <el-select v-model="collageName" placeholder="Select" style="width=100%"  @change="handleCollageChange">
                    <el-option v-for="item in collageList" :key="item._id" :label="item.name"
                        :value="item.name" :disabled="item.disabled" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="clearReactive(userInfo), dialogVisible = !dialogVisible , roleName = '', collageName= ''" plain>取消</el-button>
                <el-button type="primary"
                    @click="userInfo._id ? updateUser(rowIndex, userInfo) : createUser(userInfo)">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<style lang="scss" scoped>
#header {
    text-align: left;
    margin: 20px 0px;
}

#con {
    display: flex;
    width: 100%;

    #table {
        width: 100%;

        .el-table {
            ::v-deep th .cell {
                font-size: 16px;
                color: rgb(51, 64, 80);
                height: 40px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            ::v-deep td .cell {
                font-size: 15px;
                height: 35px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                color: rgb(51, 64, 80);
            }

            ::v-deep tr {
                td:last-child .cell {
                    display: flex;
                    flex-direction: row;
                    justify-content: right;
                    align-items: center;
                    .editInfo {
                        background-color: $base_color_lightBlue;
                    }
                }
            }

        }
    }

    #createAccount {
        width: 40%;
        margin-left: 2%;
        height: 100px;
    }
}
</style>
<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import apiRequest from "../../../http";
import errMsgPopup from '@/utils/errorHandle';
import { clearReactive, roleList } from '@/js/index'
const userList = ref([])
const search = ref('')
const dialogVisible = ref(false)
const titleInfo = ref('创建管理员账户')
const rowIndex = ref()
const collageList = ref([])
const roleName = ref("")
const collageName = ref("")
const userInfo = reactive({
    userName: "",
    phoneNumber: "",
    loginName: "",
    password: "",
    role: "",
    collage: "",   // 如果是学院管理员，此处放置学院id 及学院名
    _id: ""
})
const handleClose = async () => {
    clearReactive(userInfo)
    roleName.value = ""
    collageName.value = ""
    dialogVisible.value = !dialogVisible.value
}
const handleUpdate = async (info) => {
        userInfo.userName = info.userName,
        userInfo.phoneNumber = info.phoneNumber,
        userInfo.loginName = info.loginName,
        userInfo.role = info.role,
        userInfo.collage = info.collage,
        userInfo._id = info._id
        roleName.value = info.role.roleName
        collageName.value = info.collage ? info.collage.name : ''
        dialogVisible.value = !dialogVisible.value
}
const getUserList = async () => {
    const resp = await apiRequest({
        url: "/api/user/userList",
        method: 'get',
        params: {
            type: 'admin'
        }
    })
    if (resp.status == 200) {
        userList.value = resp.msg
    } else {
        errMsgPopup.errorPopup(resp.msg)
    }
}
const deleteUser = async (index, id) => {
    const resp = await apiRequest({
        url: "/api/user/delete",
        method: 'post',
        params: {
            id: id,
            type: 'admin'
        }
    })
    if (resp.status == 200) {
        errMsgPopup.generalPopUp('删除成功', 1000)
        userList.value.splice(index, 1)
    } else {
        errMsgPopup.errorPopup(resp.msg)
    }
}
const createUser = async (info) => {
    const resp = await apiRequest({
        url: "/api/user/register",
        method: 'post',
        params: {
            type: 'admin',
            userName: info.userName,
            role: info.role,
            collage: info.collage,
            loginName: info.loginName,
            password: info.password,
            phoneNumber: info.phoneNumber,
        }
    })
    if (resp.status == 200) {
        userList.value.unshift(resp.msg)
        clearReactive(info)
        roleName.value = ""
        collageName.value = ""
        dialogVisible.value = !dialogVisible.value
    } else {
        errMsgPopup.errorPopup(resp.msg)
    }
}
const updateUser = async (index, info) => {
    console.log(info);
    const resp = await apiRequest({
        url: "/api/user/register",
        method: 'post',
        params: {
            type: 'admin',
            userName: info.userName,
            loginName: info.loginName,
            password: info.password,
            phoneNumber: info.phoneNumber,
            role: info.role,
            collage: info.collage,
            _id: info._id
        }
    })
    if (resp.status == 200) {
        userList.value[index] = resp.msg
        clearReactive(info)
        roleName.value = ""
        collageName.value = ""
        rowIndex.value = null
        dialogVisible.value = !dialogVisible.value
    } else {
        errMsgPopup.errorPopup(resp.msg)
    }
}
const filterTableData = computed(() =>
    userList.value.filter(
        (data) =>
            !search.value ||
            data.userName.toLowerCase().includes(search.value.toLowerCase())
    )
)
const getCollegeList = async()=>{
    const resp = await apiRequest({
        url: "/api/institute",
        method: 'get'
    })
    if (resp.status == 200) {
        collageList.value = resp.msg

    } else {
        errMsgPopup.errorPopup(resp.msg)
    }
}
const handleSelectChange = (val)=>{
    if (val !== 'instituteAdmin') {
        userInfo.collage = ""
    }
    roleList.forEach(item=>{
        if (item.roleName === val) {
            userInfo.role = item
        }
    })
}
const handleCollageChange = val=>{
    collageList.value.forEach(item=>{
        if (item.name === val) {
            userInfo.collage = item
        }
    })
}
onMounted(async () => {
    await getUserList()
    await getCollegeList()
})


</script>