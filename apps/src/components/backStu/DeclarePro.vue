<template>
    <div id="header">
        <span id="tit">{{ projectInfo.projectName }}</span>
        <span>项目申报</span>
    </div>
    <el-divider />
    <el-form ref="formRef" :model="declareInfo" label-width="120px" label-position="left" require-asterisk-position="left"
         status-icon id="elFrom"> 
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
                <el-upload 
                    class="upload-demo" 
                    accept=".pdf,.word,.ppt,.zip,.rar" 
                    action="#"
                    v-model:file-list="bpList"
                    :before-upload="handleBeforeUpload" 
                    :limit=1
                    :on-exceed="handleExceed"
                    :http-request="uploadFileBp" 
                >
                    <el-button type="primary">上传项目计划书</el-button>
                    <span class="tips"> (文件大小应小于20M) </span>
                    <!-- <span>{{ progress.bp }}</span> -->
                </el-upload>
                <el-progress
                        :text-inside="true"
                        :stroke-width="24"
                        :percentage="progress.bp"
                        status="success"
                        v-show="showProgress.bp"
                    />
            </div>
        </el-form-item>
        <el-form-item label="项目展示PPT">
            <div class="upload">
                <el-upload class="upload-demo" 
                v-model:file-list="pptList"
                accept=".pdf,.word,.ppt,.zip,.rar" action="#"
                    :before-upload="handleBeforeUpload"  :limit="1" :http-request="uploadFilePpt">
                    <el-button type="primary">上传项目展示PPT</el-button>
                    <span class="tips"> (文件大小应小于20M) </span>
                    
                </el-upload>
                <el-progress
                        :text-inside="true"
                        :stroke-width="24"
                        :percentage="progress.ppt"
                        status="success"
                        v-show="showProgress.ppt"
                    />
            </div>
        </el-form-item>
        <el-form-item label="项目展示视频">
            <div class="upload">
                <el-upload class="upload-demo" 
                v-model:file-list="videoList"
                accept=".pdf,.word,.ppt,.zip,.rar" action="#"
                    :before-upload="handleBeforeUpload" :limit="1" 
                    :http-request="uploadFileVideo">
                    <el-button type="primary">上传项目展示视频</el-button>
                    <span class="tips"> (文件大小应小于20M) </span>
                </el-upload>
                <el-progress
                        :text-inside="true"
                        :stroke-width="24"
                        :percentage="progress.video"
                        status="success"
                        v-show="showProgress.video"
                    />
            </div>
        </el-form-item>
        <el-divider />
        <el-form-item label="专利">
            <el-col :span="5">
                <el-input v-model="patent.name" placeholder="专利名称" />
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="5">
                <el-input v-model="patent.owner" placeholder="专利人" />
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="5">
                <el-input v-model="patent.number" placeholder="专利号" />
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="4">
                <el-input v-model="patent.data" placeholder="授权日期" />
            </el-col>
            <el-col :span="2">
                <el-button type="warning" @click="addPatent(patent,declareInfo.otherInfo.patent)">添加</el-button>
            </el-col>
            <div id="patentList" class="patList">
                <el-card v-for="o in declareInfo.otherInfo.patent" class="box-card" :key="o">
                    <div id="delete" @click="removeItem(o,declareInfo.otherInfo.patent)">
                        删除
                    </div>
                    <div class="cardLine">
                        <div class="tit">软件名称:</div>
                        <div class="con">{{o.name}}</div>
                    </div>
                    <div class="cardLine">
                        <div class="tit">著作权人:</div>
                        <div class="con">{{o.owner}}</div>
                    </div>
                    <div class="cardLine">
                        <div class="tit">著作权号:</div>
                        <div class="con">{{o.data}}</div>
                    </div>
                    <div class="cardLine">
                        <div class="tit">发证日期:</div>
                        <div class="con">{{o.number}}</div>
                    </div>
                </el-card>
            </div>
        </el-form-item>
        <el-form-item label="软件著作权">
            <el-col :span="5">
                <el-input v-model="cpcc.name" placeholder="软件名称" />
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="5">
                <el-input v-model="cpcc.owner" placeholder="著作权人" />
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="5">
                <el-input v-model="cpcc.number" placeholder="著作权号" />
            </el-col>
            
            <el-col :span="1"></el-col>
            <el-col :span="4">
                <el-input v-model="cpcc.data" placeholder="发证日期" />
            </el-col>
            <el-col :span="2">
                <el-button type="warning" @click="addPatent(cpcc,declareInfo.otherInfo.cpcc)">添加</el-button>
            </el-col>
            <div id="cpccList" class="patList">
                <el-card v-for="o in declareInfo.otherInfo.cpcc" class="box-card" :key="o">
                    <div id="delete" @click="removeItem(o,declareInfo.otherInfo.cpcc)">
                        删除
                    </div>
                    <div class="cardLine">
                        <div class="tit">软件名称:</div>
                        <div class="con">{{o.name}}</div>
                    </div>
                    <div class="cardLine">
                        <div class="tit">著作权人:</div>
                        <div class="con">{{o.owner}}</div>
                    </div>
                    <div class="cardLine">
                        <div class="tit">著作权号:</div>
                        <div class="con">{{o.data}}</div>
                    </div>
                    <div class="cardLine">
                        <div class="tit">发证日期:</div>
                        <div class="con">{{o.number}}</div>
                    </div>
                </el-card>
            </div>
        </el-form-item>
        <el-form-item label="论文" class="addPaper">
            <el-col :span="11">
                <el-input v-model="paper.name" placeholder="论文名称" />
            </el-col>
            <el-col :span="1"></el-col>
            <!-- <el-col :span="5">
                <el-input v-model="paper.owner" placeholder="作者" />
            </el-col>
            <el-col :span="1"></el-col> -->
            <el-col :span="11">
                <el-input v-model="paper.publicationName" placeholder="期刊名称" />
            </el-col>
            
            <el-col :span="1"></el-col>
            <el-col :span="5">
                <el-input v-model="paper.level" placeholder="期刊等级，SCI/EI/..." />
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="3">
                <el-input v-model="paper.firstAuthor" placeholder="第一作者" />
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="7">
                <el-input v-model="paper.otherAuthor" placeholder="其他作者" />
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="4">
                <el-input v-model="paper.date" placeholder="发表日期" />
            </el-col>
            <el-col :span="2">
                <el-button type="warning" @click="addPatent(paper,declareInfo.otherInfo.paper)">添加</el-button>
            </el-col>
            <div id="paperList" class="patList">
                <el-card v-for="o in declareInfo.otherInfo.paper" class="box-card" :key="o">
                    <div id="delete" @click="removeItem(o,declareInfo.otherInfo.paper)">
                        删除
                    </div>
                    <div class="cardLine">
                        <div class="tit">论文名称:</div>
                        <div class="con">{{o.name}}</div>
                    </div>
                    <div class="cardLine">
                        <div class="tit">期刊名称:</div>
                        <div class="con">{{o.publicationName}}</div>
                    </div>
                    <div class="cardLine">
                        <div class="tit">期刊等级:</div>
                        <div class="con">{{o.publicationName}}</div>
                    </div>
                    <div class="cardLine">
                        <div class="tit">第一作者:</div>
                        <div class="con">{{o.firstAuthor}}</div>
                    </div>
                    <div class="cardLine">
                        <div class="tit">其他作者:</div>
                        <div class="con">{{o.otherAuthor}}</div>
                    </div>
                    <div class="cardLine">
                        <div class="tit">发表日期:</div>
                        <div class="con">{{o.date}}</div>
                    </div>
                </el-card>
            </div>
        </el-form-item>
        <el-form-item label="项目获奖">
            <el-col :span="8">
                <el-input v-model="award.awardLevel" placeholder="奖项名称" />
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="8">
                <el-input v-model="award.awarder" placeholder="获奖人（按顺序）" />
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="4">
                <el-input v-model="award.date" placeholder="获奖日期" />
            </el-col>
            <el-col :span="2">
                <el-button type="warning" @click="addPatent(award,declareInfo.otherInfo.award)">添加</el-button>
            </el-col>
            <div id="awardList" class="patList">
                <el-card v-for="o in declareInfo.otherInfo.award" class="box-card" :key="o">
                    <div id="delete" @click="removeItem(o,declareInfo.otherInfo.award)">
                        删除
                    </div>
                    <div class="cardLine">
                        <div class="tit">奖项名称:</div>
                        <div class="con">{{o.awardLevel}}</div>
                    </div>
                    <div class="cardLine">
                        <div class="tit">获奖人（按顺序）:</div>
                        <div class="con">{{o.awarder}}</div>
                    </div>
                    <div class="cardLine">
                        <div class="tit">获奖日期:</div>
                        <div class="con">{{o.date}}</div>
                    </div>
                    
                </el-card>
            </div>
        </el-form-item>
        <el-divider />
        <el-form-item label="项目成员">
            <el-col :span="5">
                <el-input v-model="stuPhone" placeholder="输入手机号搜索">
                <template #append>
                    <el-button @click="searchStu(stuPhone)">搜索</el-button>
                </template>
                </el-input>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="18" v-show="searchRShow">
                <el-row class="row-bg">
                <el-col :span="2">
                    <span>姓名：</span>
                </el-col>
                <el-col :span="2">
                    <span>{{ seachOutUserInfo.name }}</span>
                </el-col>
                <el-col :span="1"></el-col>
                <el-col :span="2">
                    <span>学院：</span>
                </el-col>
                <el-col :span="4">
                    <span>{{ seachOutUserInfo.college }}</span>
                </el-col>
                <el-col :span="2">
                <el-button type="warning" @click="addPatent(seachOutUserInfo,declareInfo.projectMember)">添加</el-button>
                
            </el-col>
        </el-row>
            </el-col>
            <div id="memberList" class="patList">
                <el-card v-for="o in declareInfo.projectMember" class="box-card" :key="o">
                    <div id="delete" @click="removeItem(o,declareInfo.projectMember)">
                        删除
                    </div>
                    <div class="cardLine">
                        <div class="tit">真实姓名:</div>
                        <div class="con">{{o.name}}</div>
                    </div>
                    <div class="cardLine">
                        <div class="tit">学院:</div>
                        <div class="con">{{o.college}}</div>
                    </div>
                </el-card>
            </div>
        </el-form-item>
        <el-form-item label="指导教师">
            <el-col :span="3">
                <el-input v-model="teacher.name" placeholder="真实姓名" />
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="3">
                <el-input v-model="teacher.phoneNumber" placeholder="手机号码" />
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="4">
                <el-input v-model="teacher.school" placeholder="工作单位" />
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="4">
                <el-input v-model="teacher.department" placeholder="所在部门" />
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="4">
                <el-input v-model="teacher.pt" placeholder="导师职称" />
            </el-col>
            <el-col :span="2">
                <el-button type="warning" @click="addPatent(teacher,declareInfo.teacher)">添加</el-button>
            </el-col>
            <div id="teacherList" class="patList">
                <el-card v-for="o in declareInfo.teacher" class="box-card" :key="o">
                    <div id="delete" @click="removeItem(o,declareInfo.teacher)">
                        删除
                    </div>
                    <div class="cardLine">
                        <div class="tit">真实姓名:</div>
                        <div class="con">{{o.name}}</div>
                    </div>
                    <div class="cardLine">
                        <div class="tit">手机号码:</div>
                        <div class="con">{{o.phoneNumber}}</div>
                    </div>
                    <div class="cardLine">
                        <div class="tit">工作单位:</div>
                        <div class="con">{{o.school}}</div>
                    </div>
                    <div class="cardLine">
                        <div class="tit">所在部门:</div>
                        <div class="con">{{o.department}}</div>
                    </div>
                    <div class="cardLine">
                        <div class="tit">导师职称:</div>
                        <div class="con">{{o.pt}}</div>
                    </div>

                </el-card>
            </div>
        </el-form-item>
        <el-divider />
        <el-button type="primary" @click="submit(declareInfo,'1')">提交</el-button>
        <el-button type="primary" @click="submit(declareInfo,'0')">暂存</el-button>
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
    .tips{
        font-size: 13px;
        margin-left: 40px;
    }
    .addPaper{
        .el-col{
            margin-bottom: 20px;
        }
    }
    .patList{
        display: flex;
        width: 100%;
        // justify-content: space-between;
        flex-wrap: wrap;
        .el-card {
            width: 23%;
            margin-top: 20px;
            margin-right: 20px;
            padding-top: 0px;
            .cardLine {
                width: 100%;
                text-align: left;
                div{
                    display: inline-block;
                    text-align: left;
                    margin-left: 10px;
                    &.tit {
                        font-size: 14px;
                    }
                    &.con {
                        font-size: 15px;
                    }
                }
            }
            #delete{
                text-align: right;
                color: red;
                cursor: pointer;
            }
        }
    }
}
</style>
<script setup>
// import { routerPush } from "../../js/index";
import { useRoute, useRouter } from "vue-router";
import apiRequest from '../../../http'
import errMsgPopup from "../../utils/errorHandle";
import {routerBack, routerPush} from '../../js/index'
import cos from '../../../http/ossSts'
// import COS from 'cos-js-sdk-v5';
import { onMounted, reactive,ref } from "vue";
const route = useRoute();
const router = useRouter();
const progress = reactive({
    bp: 0,
    ppt: 0,
    video: 0
})
const showProgress = reactive({
    bp: false,
    ppt: false,
    video: false
})
const bpList = ref([])
const pptList = ref([])
const videoList = ref([])
const projectInfo = reactive({})
const searchRShow = ref(false)
const seachOutUserInfo = reactive({
    name: "",
    grade: "",
    phoneNumber: "",
    role: "",
    studentId: "",
    systemrole: "",
    _id: ""
})
const cpcc = reactive({
    name: "",
    owner: "",
    data: "",
    number: ""
})
const patent = reactive({
    name: "",
    owner: "",
    data: "",
    number: ""
})
const paper = reactive({
    name: "",
    publicationName: "",
    level: "",
    firstAuthor: "",
    otherAuthor: "",
    date: ""
})
const award = reactive({
    awardLevel: "",
    awarder: "",
    date: ""
})
const teacher = reactive({
    name: "",
    phoneNumber: "",
    school: "",
    department: "",
    pt: "" // 职称
})
const stuPhone = ref("")
const declareInfo = reactive({
    projectName: "",
    Grouping: "", // 分组
    projectSummary: "",
    projectStage: "",   // 项目进展
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
    projectMemberId: [],
    teacher: [], //id
    status: 0  //0 暂存 // 提交
})
const addPatent = (value,collection)=>{
    const newObj = { ...value}
    collection.push(newObj)
    Object.keys(value).forEach(key => {
    value[key] = ''
    })

}

const removeItem = (item,collection)=>{
    const index = collection.findIndex(i => i.name === item.name);
    collection.splice(index,1)
}
const handleExceed = () => {
  errMsgPopup.errorPopup('限制一个文件，请删除原文件重新上传')
}
const handleBeforeUpload = (file) => {
    if (file.size / 1024 / 1024 > 20) {
        errMsgPopup.errorPopup('文件大小应小于10M')
        return false
    }
    return true
}
const uploadFileBp = (params) => {
    showProgress.bp = true
    cos.putObject({
        Bucket: 'filem-1253997872', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-guangzhou',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: `fileM/${declareInfo.projectId}/${declareInfo.createName}-${declareInfo.projectName}-项目计划书.${params.file.name.split('.')[1]}`,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: params.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function (progressData) {
            // 上传进度的回掉
            progress.bp = progressData.percent * 100
            if(progress.bp==100) {
                errMsgPopup.generalPopUp('上传成功',1000)
                showProgress.bp = false
            }
        }
    }, function (err, data) {
        console.log(data.Location);
        declareInfo.attachmentList.bp = data.Location
        if (err) {
            errMsgPopup.errorPopup('上传失败，请稍后再试')
        }
    });
}
const uploadFilePpt = (params) => {
    showProgress.ppt = true
    cos.putObject({
        Bucket: 'filem-1253997872', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-guangzhou',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: `fileM/${declareInfo.projectId}/${declareInfo.createName}-${declareInfo.projectName}-ppt.${params.file.name.split('.')[1]}`,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: params.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function (progressData) {
            // 上传进度的回掉
            progress.ppt = progressData.percent * 100
            if(progress.ppt==100) {
                errMsgPopup.generalPopUp('上传成功',1000)
                showProgress.ppt = false
            }
        }
    }, function (err, data) {
        declareInfo.attachmentList.ppt = data.Location
        if (err) {
            errMsgPopup.errorPopup('上传失败，请稍后再试')
        }
        
    });
}
const uploadFileVideo = (params) => {
    showProgress.video = true
    cos.putObject({
        Bucket: 'filem-1253997872', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-guangzhou',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: `fileM/${declareInfo.projectId}/${declareInfo.createName}-${declareInfo.projectName}-项目演示视频.${params.file.name.split('.')[1]}`,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: params.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function (progressData) {
            progress.video = progressData.percent * 100
            if(progress.video==100) {
                errMsgPopup.generalPopUp('上传成功',1000)
                showProgress.video = false
            }
        }
    }, function (err, data) {
        declareInfo.attachmentList.video = data.Location
        if (err) {
            errMsgPopup.errorPopup('上传失败，请稍后再试')
        }
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
    if (!uid) {
        errMsgPopup.errorPopup('请输出手机号')
        return 
    }
    const resp = await apiRequest({
        url: `/api/user/${uid}`,
        method: "get"
    })
    if (resp.status == '200') {
        return resp.msg
    } else {
        errMsgPopup.generalPopUp(resp.msg)
        return
    }
}
const searchStu = async (uid)=>{
    const resp = await getUserInfo(uid)
    if(!resp){
        errMsgPopup.errorPopup('没搜到信息，请确认用户是否注册或者检查手机号')
        return  
    }
    if (resp.name) {
        searchRShow.value=true
        Object.assign(seachOutUserInfo,resp)
    }else {
        errMsgPopup.errorPopup('没搜到信息，请确认用户是否注册')
        return 
    }
    
}
const submit = async(declareInfo,status)=>{
    declareInfo.status = status // 提交
    const resp = await apiRequest({
        url: "/api/declare/create",
        method: 'post',
        params: declareInfo
    })
    if (resp.status == '200') {
        errMsgPopup.generalPopUp('申报成功，可以在申报记录中查看申报历史')
        setTimeout(() => {
            routerPush(router,'/stuAdmin')
        }, 2000);
    } else {
        errMsgPopup.errorPopup('提交失败，请重新提交')
    }
    return resp
}

onMounted(async () => {
    const id = route.query.id            // 项目id
    if (!id) {
        errMsgPopup.errorPopup('未查询到项目编号，无法填写，请从申报列表点击进入')
        setTimeout(() => {
            routerBack(router)
        }, 2000);
        return 
    }
    const uid = localStorage.getItem('uid')  // 当前用户信息
    await getProjectInfo(id)
    declareInfo.projectId = projectInfo._id
    const userInfo = await getUserInfo(uid)
    declareInfo.createName = userInfo.name
    declareInfo.createStuId = userInfo.studentId
    declareInfo.createId = userInfo._id
    declareInfo.createStuPhone = userInfo.phoneNumber
})

</script>