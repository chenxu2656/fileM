import { createRouter, createWebHistory } from "vue-router";
import routes from './routers'
//单页
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})
export default router
