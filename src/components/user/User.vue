<template>
    <div class="user">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/adminHome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card v-loading="loading">
            <el-form :inline="true" :model="queryForm" ref="searchUserFormRef">
                <el-form-item label="登录账号" prop="user_name">
                    <el-input placeholder="请输入登录账号" v-model="queryForm.user_name" @keyup.enter.native="searchUser"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="user_phone">
                    <el-input placeholder="请输入联系电话" v-model="queryForm.user_phone" @keyup.enter.native="searchUser"></el-input>
                </el-form-item>
                <el-form-item label="注册时间" prop="register_time">
                    <el-date-picker placeholder="选择注册日期" ref="RegisterTimePickerRef" type="date" v-model="queryForm.register_time" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchUser" icon="el-icon-search" plain size="small" type="primary">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="this.userList" border stripe>
                <el-table-column align="center" label="序号" type="index" width="100px"></el-table-column>
                <el-table-column align="center" label="用户名称" prop="userName"></el-table-column>
                <el-table-column align="center" label="联系电话" prop="userPhone"></el-table-column>
                <el-table-column align="center" label="注册时间" prop="registerTime"></el-table-column>
                <el-table-column align="center" label="最近登录" prop="lastLogin"></el-table-column>
                <el-table-column align="center" label="驾驶评级" prop="userRating" :filters="filterDegree" :filter-method="handleFilter">
                    <template slot-scope="scope">
                        <el-tag :type="ratingTags[scope.row.userRating]" effect="plain">{{scope.row.userRating}}</el-tag>

                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showUserDetails(scope.row.userPhone)" icon="el-icon-view" size="mini" type="primary">查看</el-button>
                        <el-button @click="deleteUserInfo(scope.row.userPhone)" icon="el-icon-delete" size="mini" type="danger">删除</el-button>
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
                queryForm: {
                    "user_name": "",
                    "user_phone": "",
                    "register_time": "",
                },
                userFormRules: {},
                userList: [],
                // total:''
                loading: true,
                filterDegree: [
                    {
                        text: 'A',
                        value: 'A'
                    },
                    {
                        text: 'B',
                        value: 'B'
                    },
                    {
                        text: 'C',
                        value: 'C'
                    },
                    {
                        text: 'D',
                        value: 'D'
                    }
                ],
                ratingTags: {
                    'A':'success',
                    'B':'primary',
                    'C':'warning',
                    'D':'danger'
                }
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
            async showUserDetails(user_phone) {
                await this.$router.push({name: 'Detail', params: {'user_phone':user_phone}})
            },
            async deleteUserInfo(user_phone) {
                const confirmResult = await this.$confirm('确认删除该用户?', '删除用户', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showCancelButton: true,
                    type: 'warning'
                }).catch(err => err)
                if (confirmResult !== 'confirm') {
                    return this.$message.info('取消删除用户')
                }
                // const params = new FormData()
                // params.append('user_id', user_phone)
                const {data: res} = await this.$http.post('deleteUser', user_phone)
                if (res.code !== 200) {
                    return this.$message.error("删除用户失败")
                }
                this.$message.success("成功删除用户")
                await this.getUserList()
            },
            async getUserList() {
                const {data: res} = await this.$http.post('userInfo')
                if (res.code !== 200) {
                    return this.$message.error("获取用户记录失败")
                }
                this.userList = res.data.users
                this.loading = false
            },
            async searchUser() {
                const formData = new FormData()
                if (this.queryForm.user_phone !== "") {
                    formData.append('user_phone',this.queryForm.user_phone)
                }
                const {data: res} = await this.$http.post('userInfo', this.queryForm)
                if (res.code !== 200) {
                    return this.$message.error("查询用户失败")
                }
                console.log(res.data.users)
                this.$message.success("查询用户成功")
                this.userList = res.data.users
            },
            handleFilter(value,row,column) {
                const property = column['property']
                return row[property] === value
            }
        }
    }
</script>

<style lang="less" scoped>
    .user {
        padding: 20px;
    }

    .el-card {
        margin-top: 15px;
        height: 100%;

        .el-pagination {
            margin-top: 15px;
        }

        /deep/ .el-icon-arrow-down {
            width: 20px;
            height: 18px;
            box-sizing: border-box;
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
