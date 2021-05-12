/*
 * @Author: your name
 * @Date: 2021-03-19 20:06:47
 * @LastEditTime: 2021-05-10 13:53:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \undefinede:\workspace_web\icar_sys\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminHome from "../views/AdminHome";
import User from "../components/user/User";
import Video from "../components/video/Video";
import Warning from "../components/warning/Warning";
import Feedback from "../components/feedback/Feedback";
import Detail from "../components/user/Detail";
import Reply from "../components/feedback/Reply";
import AdminLogin from "../views/AdminLogin";
import SysLog from "../components/syslog/SysLog";
import index from "../components/admin/index";

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
                component: index
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
              path: '/admin',
              name: 'Admin',
              component: index
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
    routes,
    mode: 'history',
    base: '/yuying/'
})

export default router
