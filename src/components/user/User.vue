<template>
    <div class="user">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
<!--            <el-breadcrumb-item :to="{path:'/adminHome'}">首页</el-breadcrumb-item>-->
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card v-loading="loading">
            <el-form :inline="true" :model="queryForm" ref="searchUserFormRef">
                <el-form-item label="登录账号" prop="user_name">
                    <el-input placeholder="请输入登录账号" v-model="queryForm.user_name" @keyup.enter.native="searchUser" clearable></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="user_phone">
                    <el-input placeholder="请输入联系电话" v-model="queryForm.user_phone" @keyup.enter.native="searchUser" clearable></el-input>
                </el-form-item>
                <el-form-item label="注册时间" prop="register_time">
                    <el-date-picker placeholder="选择注册日期" ref="RegisterTimePickerRef" type="date" v-model="queryForm.register_time" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchUser" icon="el-icon-search" size="small" type="primary">查询</el-button>
                </el-form-item>
            </el-form>
            <el-button class="add-button" type="primary" size="mini" @click="showDialog" icon="el-icon-plus" plain>新增</el-button>
            <el-table :data="this.userList" border stripe>
                <el-table-column align="center" label="序号" type="index" width="100px"></el-table-column>
                <el-table-column align="center" label="用户名称" prop="userName"></el-table-column>
                <el-table-column align="center" label="联系电话" prop="userPhone"></el-table-column>
                <el-table-column align="center" label="注册时间" prop="registerTime"></el-table-column>
                <el-table-column align="center" label="最近登录" prop="lastLogin"></el-table-column>
                <el-table-column align="center" label="驾驶评级" prop="userRating" :filters="filterDegree" :filter-method="handleFilter">
                    <template slot-scope="scope">
                        <el-tag :type="ratingTags[scope.row.userRating]" effect="plain">{{scope.row.userRating}}级</el-tag>

                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showUserDetails(scope.row.userPhone)" icon="el-icon-view" size="mini" type="primary" plain>查看</el-button>
                        <el-button @click="deleteUserInfo(scope.row.userID)" icon="el-icon-delete" size="mini" type="danger" plain>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.currentPage" :page-sizes="[1,2,5,10]" :page-size="queryInfo.pageSize" layout="total,sizes,prev,pager,next,jumper" :total="total"></el-pagination>
        </el-card>
        <!--    添加用户对话框-->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="addForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="userPassword">
                    <el-input v-model="addForm.userPassword"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="realName">
                    <el-input v-model="addForm.realName"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="userPhone">
                    <el-input v-model="addForm.userPhone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="userEmail">
                    <el-input v-model="addForm.userEmail"></el-input>
                </el-form-item>
                <el-form-item label="用户性别" prop="userGender">
                    <el-select v-model="addForm.userGender" placeholder="请选择">
                        <el-option
                                v-for="item in genders"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="驾车评级" prop="userRating">
                    <el-select v-model="addForm.userRating" placeholder="请选择">
                        <el-option
                                v-for="item in ratings"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="亲友号码" prop="relativePhone">
                    <el-input v-model="addForm.relativePhone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible=false" size="medium">取 消</el-button>
        <el-button type="primary" @click="addUser" plain size="medium">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "User",
        data() {
            const checkEmail = (rule, value, cb) => {
                const regEmail = /^([a-zA-Z0-9_-])+@([A-Za-z0-9_-])+(\.[a-zA-Z0-9_-])+/
                if (regEmail.test(value)) {
                    return cb()
                }
                cb(new Error('请输入合法的邮箱'))
            }
            const checkMobile = (rule, value, cb) => {
                const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]]|18[0-9]|14[57])[0-9]{8}$/
                if (regMobile.test(value)) {
                    return cb()
                }
                cb(new Error('请输入合法的手机号'))
            }
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
                },
                queryInfo: {
                    currentPage: 1,
                    pageSize: 5
                },
                total: 0,
                addDialogVisible: false,
                addForm: {},
                addFormRules: {
                    userName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    userPassword: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                    realName: [
                        {required: true, message: '请输入用户名称', trigger: 'blur'},
                    ],
                    userEmail: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {validator: checkEmail, trigger: 'blur'}
                    ],
                    userPhone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'}
                    ],
                    userGender: [
                        {required: true, message: '请选择性别', trigger: 'blur'},
                    ]
                },
                genders: [
                    {
                        value: '男',
                        label: '男'
                    },
                    {
                        value: '女',
                        label: '女'
                    }
                ],
                ratings: [
                    {
                        value: 'A',
                        label: 'A'
                    },
                    {
                        value: 'B',
                        label: 'B'
                    },
                    {
                        value: 'C',
                        label: 'C'
                    },
                    {
                        value: 'D',
                        label: 'D'
                    }
                ]
            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            handleSizeChange(newSize) {
                this.queryInfo.pageSize = newSize
                this.searchUser()
            },
            handleCurrentChange(newPage) {
                this.queryInfo.currentPage = newPage
                this.searchUser()
            },
            async showUserDetails(user_phone) {
                await this.$router.push({name: 'Detail', params: {'user_phone':user_phone}})
            },
            async deleteUserInfo(userID) {
                const confirmResult = await this.$confirm('确认删除该用户?', '删除用户', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showCancelButton: true,
                    type: 'warning'
                }).catch(err => err)
                if (confirmResult !== 'confirm') {
                    return this.$message.info('取消删除用户')
                }
                const {data: res} = await this.$http.post('deleteUser', {'user_id':userID})
                if (res.code !== 200) {
                    return this.$message.error("删除用户失败")
                }
                this.$message.success("成功删除用户")
                await this.getUserList()
            },
            async getUserList() {
                const {data: res} = await this.$http.post('userInfo',this.queryInfo)
                if (res.code !== 200) {
                    return this.$message.error("获取用户记录失败")
                }
                this.userList = res.data.users['list']
                this.total = res.data.users['total']
                this.loading = false
            },
            async searchUser() {
                const searchForm = {}
                if (this.queryForm.user_name !== "") {
                    searchForm['user_name'] = this.queryForm.user_name
                }
                if (this.queryForm.user_phone !== "") {
                    searchForm['user_phone'] = this.queryForm.user_phone
                }
                if (this.queryForm.register_time !== '') {
                    if (this.queryForm.register_time !== null) {
                        searchForm['register_time'] = this.queryForm.register_time
                    }
                }
                searchForm['currentPage'] = parseInt(this.queryInfo.currentPage)
                searchForm['pageSize'] = parseInt(this.queryInfo.pageSize)
                console.log(searchForm)
                const {data: res} = await this.$http.post('userInfo', searchForm)
                if (res.code !== 200) {
                    return this.$message.error("查询用户失败")
                }
                this.userList = res.data.users['list']
                this.total = res.data.users['total']
            },
            handleFilter(value,row,column) {
                const property = column['property']
                return row[property] === value
            },
            showDialog() {
                this.addDialogVisible = true
            },
            addDialogClosed() {
                this.$refs.addFormRef.resetFields()
            },
            async addUser() {
                console.log(this.addForm)
                const {data:res} = await this.$http.post('userInfo/addUser',this.addForm)
                if (res.code !== 200) {
                    return this.$message.error("添加失败")
                }
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

    /deep/ .el-form-item__content {
        width: 200px;
    }

    /deep/ .el-form-item__label {
        font-weight: 700;
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
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

    .add-button {
        margin-bottom: 20px;
    }

    /deep/ .el-dialog {
        width: 600px !important;
        height: 450px;

        .el-form-item {
            width: 170px;
            margin: 0 100px 20px 0;
            display: inline-block;
        }

        .el-form-item__content {
            width: 170px;
            margin-left: 80px !important;
        }

        .el-form-item__label {
            width: 80px !important;
        }

        .el-select {
            width: 100%;
        }

        .el-input__inner {
            width: 100%;
        }

        .el-button {
            border-radius: 1px;
            border: 1px solid #cccccc;
        }

        .el-dialog__footer {
            margin-right: 40px;
        }
    }
</style>
