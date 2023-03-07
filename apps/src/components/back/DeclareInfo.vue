<template>
    <el-divider />
    <el-form ref="formRef" :model="declareInfo" label-width="120px" label-position="top" require-asterisk-position="left"
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
            <div></div>
        <el-divider />
        <el-form-item label="项目计划书" prop="projectName" v-show="!!declareInfo.attachmentList.bp">
            <div id="bp" class="show" @click="getFileInfo(declareInfo.attachmentList.bp)">
                <img src="../../../public/images/icons/pdf.svg" alt="">
                <span>项目计划书.pdf</span>
            </div>
        </el-form-item>
        <el-form-item label="项目展示ppt" prop="projectSummary" v-show="!!declareInfo.attachmentList.ppt">
            <div id="ppt" class="show" @click="getFileInfo(declareInfo.attachmentList.ppt)">
                <img src="../../../public/images/icons/pdf.svg" alt="">
                <span>项目演示ppt</span>
            </div>
        </el-form-item>
        <el-form-item label="项目展示视频" prop="projectSummary" v-show="!!declareInfo.attachmentList.video">
            <div id="video" class="show" @click="getFileInfo(declareInfo.attachmentList.video)">
                <img src="../../../public/images/icons/pdf.svg" alt="">
                <span>项目演示视频</span>
            </div>
        </el-form-item>
        <el-divider />
        <el-form-item label="专利">
            <div id="patentList" class="patList">
                <el-card v-for="o in declareInfo.otherInfo.patent" class="box-card" :key="o">
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
            <div id="cpccList" class="patList">
                <el-card v-for="o in declareInfo.otherInfo.cpcc" class="box-card" :key="o">
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
            <div id="paperList" class="patList">
                <el-card v-for="o in declareInfo.otherInfo.paper" class="box-card" :key="o">
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
            <div id="awardList" class="patList">
                <el-card v-for="o in declareInfo.otherInfo.award" class="box-card" :key="o">
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
        
            <div id="memberList" class="patList">
                <el-card v-for="o in declareInfo.projectMember" class="box-card" :key="o">
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
            <div id="teacherList" class="patList">
                <el-card v-for="o in declareInfo.teacher" class="box-card" :key="o">
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
    .show{
        height: 80px;
        width: 200px;
        border: 1px solid #fff;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        margin: 20px 30px;
        cursor: pointer;
        justify-content: space-around;
        img {
            height: 50px;
            margin-top: 15px;
            display: inline-block;
        }
        span{
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: left;
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
// import { useRoute, useRouter } from "vue-router";
// import apiRequest from '../../../http'
// import errMsgPopup from "../../utils/errorHandle";
// import {routerPush} from '../../js/index'
import cos from '../../../http/ossSts'
// // import COS from 'cos-js-sdk-v5';
import { onMounted,reactive } from "vue";
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
const getFileInfo = async(url) => {
    let decodeURIUrl = decodeURI(url.replace('filem-1253997872.cos.ap-guangzhou.myqcloud.com/',""))
    cos.getObject({
        Bucket: 'filem-1253997872', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-guangzhou',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: decodeURIUrl,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        DataType: 'blob', 
        ResponseContentEncoding: "utf-8",
        onProgress: function (progressData) {
            console.log(JSON.stringify(progressData));
    }
    },   function(err, data) {
        let url = window.URL.createObjectURL(data.Body)//获得一个pdf的url对象
    window.open(url, '_blank')//打开一个新窗口


    console.log(err || data.Body);
})}
onMounted(async () => {
    const detailInfo = JSON.parse(localStorage.getItem('detailInfo'))
    Object.assign(declareInfo,detailInfo)
    console.log(declareInfo);
})

</script>