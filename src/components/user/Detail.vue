<template>
    <div class="detail">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/adminHome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/user'}">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户详情</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card v-loading="loading">
            <el-row style="height: 170px" type="flex">
                <el-avatar :size="170" :src="this.userDetail.userAvatar" fit="cover" shape="square"></el-avatar>
            </el-row>
            <el-row justify="start" type="flex">
                <el-col :span="8">
                    <div style="font-family: '微软雅黑',serif;font-size: 18px">用户信息</div>
                    <el-divider/>
                    <el-form :model="this.userDetail" label-position="right" label-width="auto">
                        <el-form-item label="登录账号：" prop="userName">
                            <el-input v-model="this.userDetail.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话：" prop="userPhone">
                            <el-input v-model="this.userDetail.userPhone"></el-input>
                        </el-form-item>
                        <el-form-item label="注册时间：" prop="registerTime">
                            <el-input disabled v-model="this.userDetail.registerTime"></el-input>
                        </el-form-item>
                        <el-form-item label="最近登录：" prop="lastLogin">
                            <el-input disabled v-model="this.userDetail.lastLogin"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :offset="3" :span="8">
                    <div style="font-family: '微软雅黑',serif;font-size: 18px">行车信息</div>
                    <el-divider/>
                    <el-form :model="this.carDetail" label-position="right" label-width="auto">
                        <el-form-item label="车牌号码：" prop="carLicense">
                            <el-input v-model="this.carDetail.carLicense"></el-input>
                        </el-form-item>
                        <el-form-item label="车型信息：" prop="carModel">
                            <el-input v-model="this.carDetail.carModel"></el-input>
                        </el-form-item>
                        <el-form-item label="预警次数：">
                            <el-input v-model="this.carDetail.alarmTotals"></el-input>
                        </el-form-item>
                        <el-form-item label="驾车评级：">
                            <el-input v-model="this.userDetail.userRating"></el-input>
                        </el-form-item>
                    </el-form>
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
                carDetail: {},
                // alarmTotals:0,
                loading: true
            }
        },
        created() {
            this.getUserDetail()
        },
        methods: {
            async getUserDetail() {
                const {data: res} = await this.$http.post('userInfo/edit')
                if (res.code !== 200) {
                    return this.$message.error("获取用户详情失败")
                }

                this.userDetail = res.data.users
                this.carDetail = res.data.carInfo
                this.carDetail.alarmTotals = res.data.alarmTotals
                console.log(this.carDetail)
                this.loading = false
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-card {
        margin-top: 15px;
        height: 100%;

        .el-divider {
            height: 2px;
        }

        .el-avatar {
            position: absolute;
            right: 30px;
            top: 20px;
        }

        .el-form-item {
            font-size: 20px;
            font-family: 微软雅黑, serif;

            .el-input /deep/ .el-input__inner {
                height: 32px;
                padding: 6px;
                font-size: 12px;
                border-radius: 0;
                border: 1px solid #cccccc;
            }
        }
    }
</style>
