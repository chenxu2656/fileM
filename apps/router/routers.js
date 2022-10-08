const FrontPage =require('../src/views/FrontPage.vue')
const HomeView =require('../src/views/HomeView.vue')
const DeclareList=require('../src/views/DeclareList.vue')

const SignIn = require('../src/views/SignIn.vue')
const BackPage = require('../src/views/BackPage.vue')
// const BackHomePage = require('../src/views/BackHomePage.vue')
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
        path: '/admin',
        components: BackPage,
        // children: [
        //     {
        //         path: '',
        //         components: BackHomePage
        //     }
        // ]
    }
]
export default routes