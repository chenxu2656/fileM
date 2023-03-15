const FrontPage =require('../src/views/FrontPage.vue')
const HomeView =require('../src/views/HomeView.vue')
const DeclareList=require('../src/views/DeclareList.vue')

const SignIn = require('../src/views/SignIn.vue')
const SignInAdmin = require('../src/views/SignInAdmin.vue')
const SignInJudge = require('../src/views/SignInJudge.vue')
const BackPage = require('../src/views/BackPage.vue')
const StuBackPage = require('../src/views/StuBackPage.vue')
const CompeTition = require('../src/components/back/CompeTition.vue')
const DeclarationDetail = require('../src/components/back/DeclarationDetail.vue')
const CreateItem = require('../src/components/back/CreateItem')

const EditProfile = require('../src/components/backStu/EditProfile.vue')
const ProjectList = require('../src/components/backStu/ProjectList.vue')
const DeclarePro = require('../src/components/backStu/DeclarePro.vue') 
const DeclareInfo = require('../src/components/back/DeclareInfo.vue')

const StuAccount = require('../src/components/back/StuAccount.vue')
const AdminAccount = require('../src/components/back/AdminAccount.vue')
const JudgeAccount = require('../src/components/back/JudgeAccount.vue')

const InstituteManagement = require('../src/components/back/InstituteManagement')

const CreateBlog = require('../src/components/back/blog/CreateBlog.vue')
const FolderManagement = require('../src/components/back/blog/FolderManagement.vue')
const DashBoard = require('../src/components/back/DashBoard.vue')
const getPayloadOfJwt = (jwt)=>{
    const payloadJwtURI = jwt.split('.')[1]
    const payloadBase64 = payloadJwtURI.replace(/-/g, '+').replace(/_/g, '/')
    const payloadJson = decodeURIComponent(atob(payloadBase64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    const payload = JSON.parse(payloadJson); // 将字符串解析成 JSON 对象
    return payload
}  
const routes = [
    {
        path: "/",
        components: FrontPage,
        children:[
            {
                path: "/",
                components: HomeView
            },
            {
                path: 'stu',
                components: DeclareList
            },
        ]
    },
    {
        path: '/sign',
        components: SignIn
    },
    {
        path: '/signAdmin',
        components: SignInAdmin
    },
    {
        path: '/signJudge',
        components: SignInJudge
    },
    {
        path: '/admin',
        components: BackPage,
        children: [
            {
                path: "",
                components: DashBoard
            },
            {
                path: 'account/admin',
                components: AdminAccount,
                // beforeEnter: () => {
                //     const token = localStorage.getItem('token')
                //     const payLoad = getPayloadOfJwt(token)
                //     if (payLoad.role.roleCode != 1000) {
                //      return {
                //          path: "signAdmin"
                //      }
                //     }
                //  },
            },
            {
                path: 'account/stu',
                components: StuAccount
            },
            {
                path: 'account/judge',
                components: JudgeAccount
            },
            {
                path: 'account/institute',
                components: InstituteManagement
            },
            {
                path: 'competition',
                components: CompeTition,
            },
            {
                path: 'competition/declarelist',
                components: DeclarationDetail
            },
            {
                path: 'competition/declarelist/detail',
                components: DeclareInfo
            },
            {
                path: 'creatItem',
                components: CreateItem
            },
            {
                path: 'website/folder',
                components: FolderManagement
            },
            {
                path: 'website/createBlog',
                components: CreateBlog
            }
        ],
        beforeEnter: () => {
           const token = localStorage.getItem('token')
           if (!token) {
            return {
                path: "signAdmin"
            }
           } 
           const payLoad = getPayloadOfJwt(token)
           if (payLoad.platform != 'admin') {
            return {
                path: "signAdmin"
            }
           }
           console.log(payLoad); 
        },
    },
    {
        path: '/stuAdmin',
        components: StuBackPage,
        children: [
            {
                path: "",
                components: ProjectList
            },
            {
                path: "upload",
                components: DeclarePro
            },
            {
                path: "editp",
                components: EditProfile
            }
        ],
        beforeEnter: () => {
            const token = localStorage.getItem('token')
            if (!token) {
             return {
                 path: "sign"
             }
            } 
            const payLoad = getPayloadOfJwt(token)
            if (payLoad.platform != 'stu') {
             return {
                 path: "sign"
             }
            }
         },
    }
]
export default routes