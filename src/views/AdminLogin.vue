<template>
    <div class="login_container">
        <div id="head-title">
            <div>驭鹰</div>
            <div>后台管理系统</div>
        </div>
        <div class="login_box">
<!--            登录表单区域-->
            <div class="login-title">Welcome</div>
            <el-form :model="loginForm" :rules="loginFormRules" class="login_form" label-width="0" ref="loginFormRef">
                <el-form-item prop="admin_name">
                    <el-input clearable prefix-icon="icar_sys icaruser" v-model="loginForm.admin_name" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item prop="admin_pwd">
                    <el-input clearable prefix-icon="icar_sys icarmima" type="password" v-model="loginForm.admin_pwd" @keyup.enter.native="login" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" :loading="loading" @click="login">登录<span v-if="loading === true">中</span> </el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AdminLogin",
        data() {
            return {
                loginForm: {
                    admin_name: '',
                    admin_pwd: ''
                },
                loginFormRules: {
                    admin_name: [
                        {required: true, message: '请输入登录账号', trigger: 'blur'}
                    ],
                    admin_pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                loading: false
            }
        },
        methods: {
            login() {
                this.$refs.loginFormRef.validate(async valid => {
                    if (!valid) return
                    this.loading = true
                    const {data: res} = await this.$http.post('admin_login', this.loginForm)
                    if (res.code !== 200) {
                        this.loading = false
                        return this.$message.error("登录失败")
                    }
                    window.sessionStorage.setItem("adminName",res.data.admin['adminName'])
                    window.sessionStorage.setItem("adminID",res.data.admin['adminID'])
                    window.sessionStorage.setItem('token',res.data['token'])
                    this.$message.success("登录成功")
                    await this.$router.push('/adminHome')
                })

            }
        }
    }
</script>

<style lang="less" scoped>
    .login_container {
        width: 100%;
        height: 100%;
        background: center/cover no-repeat url("../assets/background.png");

        #head-title {
            position: absolute;
            top: 90px;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            letter-spacing: 5px;

            div:nth-child(1) {
                font-size: 30px;
                color: #ffffff;
                font-weight: bold;
            }

            div:nth-child(2) {
                margin-top: 10px;
                font-size: 20px;
                color: #ffffff;
            }
        }
    }

    .login_box {
        width: 400px;
        height: 400px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .login-title {
            font-size: 25px;
            margin: 20px 0 40px;
        }
    }

    .login_form {
        bottom: 0;
        width: 300px;
        height: 150px;
        padding: 0;
        box-sizing: border-box;

        /deep/ .el-input__inner {
            border: 0;
            border-bottom: 2px solid black;
        }

        /deep/ .el-input__inner::-webkit-input-placeholder {
            text-align: center;
        }
    }

    .el-button {
        width: 300px;
        height: 40px;
        background-color: #3F79CA;
        border: 0;
        border-radius: 20px;
        margin-bottom: 20px;
    }

</style>
