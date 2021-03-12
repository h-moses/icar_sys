<template>
    <el-container class="admin-home">
        <el-header :class="this.$store.state.adminHome.topBarFixed === true ? 'topBarWrap':''">
            <div @click="this.changeCollapse" class="left_region">
                <el-button class="aside-button">
                    <i class="el-icon-menu"></i>
                </el-button>
                <span>鹰卫</span>
            </div>
            <div class="avatar">
                <el-popover placement="bottom-start" trigger="hover" width="300">
                    <div>
                        <el-row :gutter="3" justify="space-between" type="flex">
                            <el-col :span="4">
                                <el-avatar size="large"
                                           src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                            </el-col>
                            <el-col :span="20">
                                <el-row>
                                    <span>h_admin</span>
                                </el-row>
                                <el-row>
                                    <span>709820314</span>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-divider/>
                        <el-button @click="logout" class="btn-logout">退出登录</el-button>
                    </div>
                    <el-avatar slot="reference"
                               src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </el-popover>
            </div>
        </el-header>
        <el-container>
            <el-aside :width="this.$store.state.adminHome.isCollapsed ? '50px': '180px'">
                <el-menu :collapse="this.$store.state.adminHome.isCollapsed" :collapse-transition="false" :default-active="activePath"
                         active-text-color="#409eff"
                         background-color="#FFF" router text-color="#000"
                         unique-opened>
                    <el-menu-item :index="id" :key="id" v-for="(item,id) in this.menu_item">
                        <i :class="menu_icons[id]"/>
                        <template slot="title">
                            <span>{{item}}</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "AdminHome",
        data() {
            return {
                activePath: this.$route.path,
                menu_icons: {
                    'user': 'icar_sys icaryonghu',
                    'warning': 'icar_sys icaryujingjishouxinhoujiankong',
                    'video': 'icar_sys icarshipin2',
                    'feedback': 'icar_sys icardrxx66',
                    'analysis': 'icar_sys icartongjifenxi1'
                },
                menu_item: {
                    'user': '用户管理',
                    'warning': '预警管理',
                    'video': '视频管理',
                    'feedback': '工单管理',
                    'analysis': '统计分析'
                }
            }
        },
        created() {
        },
        mounted() {
            // window.addEventListener('scroll',this.watchScroll)
            this.activePath = this.$route.path
        },
        methods: {
            watchScroll() {
                var scrollTop = window.pageYOffset | document.documentElement.scrollTop | document.body.scrollTop
                if (scrollTop > 10) {
                    this.topFixed({fixed: true})
                } else {
                    this.topFixed({fixed: false})
                }
            },
            async logout() {
                await this.$router.push('/')
            },
            ...mapActions([
                'topFixed',
                'changeCollapse'
            ]),
        }
    }
</script>

<style lang="less" scoped>
    .admin-home {
        height: 100%;
    }

    .topBarWrap {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 999;
    }

    .el-header {
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        font-size: 20px;
        color: #52BCFC;
        background-color: #FFFFFF;

        > .left_region {
            height: 100%;
            display: flex;
            align-items: center;

            .aside-button {
                height: 100%;
                width: 50px;
                background-color: #9ED9FD;
                opacity: 0.9;
                border: 0;
                border-radius: 0;
                color: #FFFFFF;
            }

            .aside-button:active {
                border: 0;
                opacity: 1.0;
            }

            span {
                margin-left: 10px;
            }
        }
    }

    .el-aside {
        background-color: #FFFFFF;

        .el-menu {
            margin-left: 0;
            border-right: none;

            .el-menu-item {
                padding: 0;

                span {
                    margin-left: 20px;
                }
            }
        }
    }

    .el-main {
        background-color: #eaedf1;
    }

    .el-popover {
        span {
            font-size: 12px;
        }
    }

    .el-divider--horizontal {
        margin: 15px 0;
    }

    .btn-logout {
        background-color: #FFFFFF;
        border: 0;
        border-radius: 0;
        width: 100%;
    }
</style>
