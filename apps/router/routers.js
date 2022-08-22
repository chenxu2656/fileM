const FrontPage =require('../src/views/FrontPage.vue')
const HomeView =require('../src/views/HomeView.vue')
const DeclareList=require('../src/views/DeclareList.vue')
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
            }
        ]
    },
]
export default routes