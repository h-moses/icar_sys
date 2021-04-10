import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminHome from "../views/AdminHome";
import User from "../components/user/User";
import Video from "../components/video/Video";
import Warning from "../components/warning/Warning";
import Feedback from "../components/feedback/Feedback";
import Analysis from "../components/analysis/Analysis";
import Detail from "../components/user/Detail";
import Reply from "../components/feedback/Reply";
import AdminLogin from "../views/AdminLogin";
import SysLog from "../components/syslog/SysLog";
import Index from "../components/Index";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'AdminLogin',
        component: AdminLogin
    },
    {
        path: '/adminHome',
        name: 'AdminHome',
        redirect: '/index',
        component: AdminHome,
        children: [
            {
                path: '/index',
                name: 'Index',
                component: Index
            },
            {
                path: '/user',
                name: 'User',
                component: User,
            },
            {
                path: '/detail/:user_phone',
                name: 'Detail',
                component: Detail
            },
            {
                path: '/video',
                name: 'Video',
                component: Video
            },
            {
                path: '/warning',
                name: 'Warning',
                component: Warning
            },
            {
                path: '/feedback',
                name: 'Feedback',
                component: Feedback
            },
            {
                path: '/reply/:feedback_id',
                name: 'Reply',
                component: Reply
            },
            {
                path: '/analysis',
                name: 'Analysis',
                component: Analysis
            },
            {
                path: '/syslog',
                name: 'SysLog',
                component: SysLog
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
