<template>
    <div id="admin-index">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-form :inline="true" :model="referForm" ref="referAdminFormRef">
                <el-form-item label="员工昵称" prop="admin_name">
                    <el-input placeholder="请输入员工昵称" v-model="referForm.admin_name" @keyup.enter.native="referAdmin" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="admin_phone">
                    <el-input placeholder="请输入手机号码" v-model="referForm.admin_phone" @keyup.enter.native="referAdmin" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="referAdmin" icon="el-icon-search" size="small" type="primary">查询</el-button>
                </el-form-item>
            </el-form>
            <el-button class="add-button" type="primary" size="mini" @click="showDialog" icon="el-icon-plus" plain>新增</el-button>
            <el-table :data="adminList" border stripe>
                <el-table-column align="center" label="员工编号" type="index" width="100px"></el-table-column>
                <el-table-column align="center" label="员工昵称" prop="adminName"></el-table-column>
                <el-table-column align="center" label="员工名称" prop="realName"></el-table-column>
                <el-table-column align="center" label="手机号码" prop="adminPhone"></el-table-column>
                <el-table-column align="center" label="注册时间" prop="registerTime"></el-table-column>
                <el-table-column align="center" label="最近登录" prop="lastLogin"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-edit" size="mini" type="warning" plain @click="showAmendDialog(scope.row)">修改</el-button>
                        <el-button icon="el-icon-delete" size="mini" type="danger" plain @click="deleteInfo(scope.row.adminName)" >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!--    添加用户对话框-->
        <el-dialog title="添加员工" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="员工昵称" prop="admin_name">
                    <el-input v-model="addForm.admin_name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="admin_pwd">
                    <el-input v-model="addForm.admin_pwd"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="real_name">
                    <el-input v-model="addForm.real_name"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="admin_phone">
                    <el-input v-model="addForm.admin_phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="admin_email">
                    <el-input v-model="addForm.admin_email"></el-input>
                </el-form-item>
                <el-form-item label="员工性别" prop="admin_gender">
                    <el-select v-model="addForm.admin_gender" placeholder="请选择">
                        <el-option
                                v-for="item in genders"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible=false" size="medium">取 消</el-button>
        <el-button type="primary" @click="addAdmin" plain size="medium">确 定</el-button>
      </span>
        </el-dialog>
        <!--    添加用户对话框-->
        <el-dialog title="修改信息" :visible.sync="amendDialogVisible" width="50%">
            <el-form :model="amendForm" :rules="amendFormRules" ref="amendFormRef" label-width="70px">
                <el-form-item label="员工ID" prop="admin_id">
                    <el-input v-model="amendForm.admin_id" disabled></el-input>
                </el-form-item>
                <el-form-item label="员工昵称" prop="admin_name">
                    <el-input v-model="amendForm.admin_name" @input="change"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="admin_pwd">
                    <el-input v-model="amendForm.admin_pwd" @input="change"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="real_name">
                    <el-input v-model="amendForm.real_name" @input="change"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="admin_phone">
                    <el-input v-model="amendForm.admin_phone" @input="change"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="admin_email">
                    <el-input v-model="amendForm.admin_email" @input="change"></el-input>
                </el-form-item>
                <el-form-item label="员工性别" prop="admin_gender">
                    <el-select v-model="amendForm.admin_gender" placeholder="请选择" @change="change">
                        <el-option
                                v-for="item in genders"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="amendDialogVisible=false" size="medium">取 消</el-button>
        <el-button type="primary" @click="amendInfo" plain size="medium">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "index",
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
                addForm: {},
                addFormRules: {
                    admin_name: [
                        {required: true, message: '请输入员工昵称', trigger: 'blur'},
                    ],
                    admin_pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                    real_name: [
                        {required: true, message: '请输入真实姓名', trigger: 'blur'},
                    ],
                    admin_email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {validator: checkEmail, trigger: 'blur'}
                    ],
                    admin_phone: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'}
                    ],
                    admin_gender: [
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
                referForm: {},
                amendForm: {},
                amendFormRules: {
                    admin_name: [
                        {required: true, message: '请输入员工昵称', trigger: 'blur'},
                    ],
                    admin_pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                    real_name: [
                        {required: true, message: '请输入真实姓名', trigger: 'blur'},
                    ],
                    admin_email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {validator: checkEmail, trigger: 'blur'}
                    ],
                    admin_phone: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'}
                    ],
                    admin_gender: [
                        {required: true, message: '请选择性别', trigger: 'blur'},
                    ]
                },
                adminList: [],
                addDialogVisible: false,
                amendDialogVisible: false

            }
        },
        created() {
            this.getAdminList()
        },
        methods: {
            async getAdminList() {
                const {data:res} = await this.$http.get('admin_info')
                if (res.code !== 200) {
                    return this.$message.error("获取失败")
                }
                this.adminList = res.data.admins
            },
            showDialog() {
                this.addDialogVisible = true
            },
            showAmendDialog(info) {
                this.amendForm.admin_id = info.adminID
                this.amendForm.admin_name = info.adminName
                this.amendForm.admin_pwd = info.adminPwd
                this.amendForm.real_name = info.realName
                this.amendForm.admin_phone = info.adminPhone
                this.amendForm.admin_email = info.adminEmail
                this.amendForm.admin_gender = info.adminGender
                this.amendDialogVisible = true
            },
            addDialogClosed() {
              this.$refs.addFormRef.resetFields()
            },
            async addAdmin() {
                const {data:res} = await this.$http.post('add_admin',this.addForm)
                if (res.code !== 200) {
                    return this.$message.error('新增失败')
                }
                this.addDialogVisible = false
                await this.getAdminList()
            },
            async referAdmin() {
                console.log(this.referForm)
                const {data:res} = await this.$http.post('query_info',this.referForm)
                if (res.code !== 200) {
                    return this.$message.error("查询失败")
                }
                this.adminList = res.data.admins
            },
            async amendInfo() {
                console.log(this.amendForm)
                const{data:res} = await this.$http.post('update_admin',this.amendForm)
                if (res.code !== 200) {
                    return this.$message.error('修改失败')
                }
                this.amendDialogVisible = false
                await this.getAdminList()
                this.$message.success("修改成功")
            },
            async deleteInfo(name) {
                const confirmResult = await this.$confirm('确认删除?', '删除员工', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showCancelButton: true,
                    type: 'warning'
                }).catch(err => err)
                if (confirmResult !== 'confirm') {
                    return this.$message.info('取消删除')
                }
                const {data:res} = await this.$http.post('delete_admin',{'admin_name':name})
                if (res.code !== 200) {
                    return this.$message.error("删除失败")
                }
                await this.getAdminList()
                this.$message.success("删除成功")
            },
            change() {
                this.$forceUpdate()
            }
        }
    }
</script>

<style lang="less" scoped>
    #admin-index {
        padding: 20px;
    }

    .el-card {
        margin-top: 15px;
        height: 100%;

        .add-button {
            margin-bottom: 15px;
        }

        .el-form-item:not(:first-child) {
            margin-left: 20px;
        }

        /deep/ .el-form-item__label {
            font-weight: 700;
            font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
        }

        /deep/ .el-input__inner {
            height: 32px;
            font-size: 12px;
            border-radius: 0;
            border: 1px solid #cccccc;
        }
    }

    /deep/ .el-dialog {
        width: 600px !important;
        height: 430px;

        .el-form-item {
            width: 170px;
            height: 30px;
            margin: 0 100px 30px 0;
            display: inline-block;
        }

        .el-form-item__content {
            width: 170px;
            margin-left: 80px !important;
        }

        .el-form-item__label {
            width: 80px !important;
            font-weight: 700;
            font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
        }

        .el-select {
            width: 100%;
        }

        .el-input__inner {
            width: 100%;
            height: 40px;
            border-radius: 0;
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
