<template>
    <div class="login_container">
        <div class="title-login">
            <span>驭 鹰 后 台 管 理 系 统</span>
        </div>
        <div class="login_box">
            <!--头像区域-->
            <div class="avatar_box">
                <img alt="" src="../assets/logo.png">
            </div>
<!--            登录表单区域-->
            <el-form :model="loginForm" :rules="loginFormRules" class="login_form" label-width="0" ref="loginFormRef">
                <el-form-item prop="admin_name">
                    <el-input clearable prefix-icon="icar_sys icaruser" v-model="loginForm.admin_name"></el-input>
                </el-form-item>
                <el-form-item prop="admin_pwd">
                    <el-input clearable prefix-icon="icar_sys icarmima" type="password" v-model="loginForm.admin_pwd" @keyup.enter.native="login"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" :loading="loading" @click="login">登录<span v-if="loading === true">中</span> </el-button>
                </el-form-item>
            </el-form>
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
                        {required: true, message: '请输入登录账号', trigger: 'blur'},
                    ],
                    admin_pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
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
        height: 100%;
        background-image: linear-gradient(135deg, #92fe9d 0%, #00c9ff 100%);

        > .title-login {
            padding-top: 40px;
            display: flex;
            justify-content: center;
            font-size: 50px;
            color: white;
        }
    }

    .login_box {
        width: 450px;
        height: 300px;
        /*background-color: #fff;*/
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .avatar_box {
        height: 130px;
        width: 130px;
        border: solid 1px #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #eee;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }

    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .btns {

        .el-button {
            width: 410px;
            height: 40px;
            background-color: #009efd;
            border: 0;
            border-radius: 0;
        }
    }
</style>
