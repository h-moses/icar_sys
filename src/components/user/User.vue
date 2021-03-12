<template>
    <div class="user">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/adminHome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-form :inline="true" :model="userForm" ref="searchUserFormRef">
                <el-form-item label="登录账号" prop="user_name">
                    <el-input placeholder="请输入登录账号" v-model="userForm.user_name"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="user_id">
                    <el-input placeholder="请输入联系电话" v-model="userForm.user_id"></el-input>
                </el-form-item>
                <el-form-item label="注册时间" prop="selectedDate">
                    <el-date-picker placeholder="选择日期" type="date" v-model="userForm.selectedDate"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" plain size="small" type="primary">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="this.userList" border stripe v-loading="loading">
                <!--                <el-table-column type="expand">-->
                <!--                    <template slot-scope="props">-->
                <!--                        <el-form inline label-position="left">-->
                <!--                            <el-form-item label="登录账号">{{props.row.userName}}</el-form-item>-->
                <!--                            <el-form-item label="联系电话">{{props.row.userPhone}}</el-form-item>-->
                <!--                            <el-form-item label="注册时间">{{props.row.registerTime}}</el-form-item>-->
                <!--                            <el-form-item label="最近登录">{{props.row.lastLogin}}</el-form-item>-->
                <!--                            <el-form-item label="车牌号码">{{props.row.userName}}</el-form-item>-->
                <!--                            <el-form-item label="预警次数">{{props.row.userName}}</el-form-item>-->
                <!--                            <el-form-item label="驾车评级">{{props.row.userName}}</el-form-item>-->
                <!--                        </el-form>-->
                <!--                    </template>-->
                <!--                </el-table-column>-->
                <el-table-column align="center" label="序号" type="index" width="100px"></el-table-column>
                <el-table-column align="center" label="登录账号" prop="userName"></el-table-column>
                <el-table-column align="center" label="联系电话" prop="userPhone"></el-table-column>
                <el-table-column align="center" label="注册时间" prop="registerTime"></el-table-column>
                <el-table-column align="center" label="驾驶评级" prop="userRating">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.userRating === 'A'">{{scope.row.userRating}}</el-tag>
                        <el-tag v-else-if="scope.row.userRating === 'B'">{{scope.row.userRating}}</el-tag>
                        <el-tag type="warning" v-else-if="scope.row.userRating === 'C'">{{scope.row.userRating}}</el-tag>
                        <el-tag type="danger" v-else-if="scope.row.userRating === 'D'">{{scope.row.userRating}}</el-tag>
                        <el-tag type="info" v-else>未评级</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showUserDetails(scope.row)" icon="el-icon-view" size="mini" type="primary"></el-button>
                        <el-button @click="deleteUserInfo(scope.row)" icon="el-icon-delete" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="5" :page-sizes="[1,2,5,10]" :page-size="5" layout="total,sizes,prev,pager,next,jumper" :total="this.total"></el-pagination>-->
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "User",
        data() {
            return {
                userForm: {
                    user_name: '',
                    user_id: '',
                    selectedDate: ''
                },
                userFormRules: {},
                userList: [],
                // total:''
                loading: true
            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            // handleSizeChange() {
            //
            // },
            // handleCurrentChange() {
            //
            // },
            async showUserDetails(row) {
                console.log(row)
                await this.$router.push({name: 'Detail', params: {'id': row.user_id}})
            },
            deleteUserInfo() {

            },
            async getUserList() {
                const {data: res} = await this.$http.post('userInfo')
                console.log(res)
                if (res.code !== 200) {
                    return this.$message.error("获取用户记录失败")
                }
                this.userList = res.data.users
                this.loading = false
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-card {
        margin-top: 15px;
        height: 100%;

        .el-pagination {
            margin-top: 15px;
        }
    }

    .el-form-item:not(:first-child) {
        margin-left: 20px;
    }

    .el-select /deep/ .el-input__inner, .el-input /deep/ .el-input__inner {
        height: 32px;
        font-size: 12px;
        border-radius: 0;
        border: 1px solid #cccccc;
    }

    .el-select /deep/ .el-input__inner {
        width: 100px;
    }

    .el-button {
        border-radius: 1px;
        border: 1px solid #cccccc;
    }
</style>
