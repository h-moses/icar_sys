<template>
    <div class="detail">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/adminHome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/user'}">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户详情</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card v-loading="loading">
           <el-row :gutter="4">
               <el-col :span="4">
                   <el-avatar :size="160" :src="this.userDetail.userAvatar" fit="contain" shape="circle"></el-avatar>
               </el-col>
               <el-col class="detail-list" :span="5" :offset="4">
                   <div style="font-family: '微软雅黑',serif;font-size: 13px; color: #cccccc">用户信息</div>
                   <el-divider/>
                   <el-form :model="this.userDetail" label-position="right" label-width="auto">
                       <el-form-item label="用户ID：" prop="userID">
                           <el-input v-model="this.userDetail.userID" readonly></el-input>
                       </el-form-item>
                       <el-form-item label="用户名称：" prop="userName">
                           <el-input v-model="this.userDetail.userName" readonly></el-input>
                       </el-form-item>
                       <el-form-item label="真实姓名：" prop="realName">
                           <el-input v-model="this.userDetail.realName" readonly></el-input>
                       </el-form-item>
                       <el-form-item label="联系方式：" prop="userPhone">
                           <el-input v-model="this.userDetail.userPhone" readonly></el-input>
                       </el-form-item>
                       <el-form-item label="邮箱：" prop="userEmail">
                           <el-input v-model="this.userDetail.userEmail"></el-input>
                       </el-form-item>
                       <el-form-item label="性别：" prop="userGender">
                           <el-input v-model="this.userDetail.userGender"></el-input>
                       </el-form-item>
                       <el-form-item label="注册时间：" prop="registerTime">
                           <el-input v-model="this.userDetail.registerTime"></el-input>
                       </el-form-item>
                       <el-form-item label="最近登录：" prop="lastLogin">
                           <el-input v-model="this.userDetail.lastLogin"></el-input>
                       </el-form-item>
                       <el-form-item label="驾车评级：" prop="userRating">
                           <el-input v-model="this.userDetail.userRating"></el-input>
                       </el-form-item>
                   </el-form>
                   <el-footer>
                       <el-button type="primary" plain size="small" @click="back">保存</el-button>
                       <el-button type="danger" plain size="small" @click="back">返回</el-button>
                   </el-footer>
               </el-col>
           </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Detail",
        data() {
            return {
                userDetail: {},
                // carDetail: {},
                // alarmTotals:0,
                loading: true
            }
        },
        created() {
            this.getUserDetail()
        },
        methods: {
            async getUserDetail() {
                const data = new FormData()
                data.append("user_phone",this.$route.params['user_phone'])
                const {data: res} = await this.$http.post('userInfo',data)
                if (res.code !== 200) {
                    return this.$message.error("获取用户详情失败")
                }
                this.userDetail = res.data.users[0]
                this.loading = false
            },
            async saveModification() {

            },
            back() {
                this.$router.back()
            }
        }
    }
</script>

<style lang="less" scoped>
    .detail {
        padding: 20px;
    }

    .el-card {
        margin-top: 15px;
        height: 100%;

        /*.el-divider {*/
        /*    height: 2px;*/
        /*}*/

        .el-avatar {
            position: absolute;
            left: 30px;
            top: 20px;
            width: 100px !important;
            height: 100px !important;
        }

        .el-col {

        }

        .detail-list {
            margin-top: 20px;

            .el-divider--horizontal {
                margin: 10px 0;
            }
        }

        .el-form-item {
            font-family: 微软雅黑, serif;

            /deep/ .el-form-item__label {
                font-size: 13px;
            }

            .el-input /deep/ .el-input__inner {
                height: 32px;
                padding: 6px;
                font-size: 12px;
                border-radius: 0;
                border: 1px solid #cccccc;
            }
        }

        .el-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
