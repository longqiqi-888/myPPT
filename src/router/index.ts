import { RouteRecordRaw, createRouter,createWebHashHistory } from 'vue-router'

const routes:RouteRecordRaw[] = [
    {
        path:'/',
        name:'首页',
        meta:{
            title:'首页'
        },
        component:()=>import("../components/HelloWorld.vue"),
        children:[
            {
                path:'test',
                name:'测试',
                meta:{
                    title:'测试'
                },
                component:()=>import("../components/FileInput.vue"),
            }
        ]
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router