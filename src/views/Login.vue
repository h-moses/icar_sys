<template>
    <div class="login-container">
        <el-row :gutter="0" class="bk_row">
            <img alt="" src="../assets/bk.png">
            <el-col :span="16"></el-col>
            <el-col :offset="16" :span="8" class="login_region">
                <!--头像区域-->
                <div class="avatar_box">
                    <img alt="" src="../assets/logo.png">
                </div>
                <el-form :model="this.login_form" :rules="this.loginFormRules" class="login_form" label-width="0"
                         ref="loginFormRef">
                    <el-form-item prop="username">
                        <el-input placeholder="请输入账号" prefix-icon="icar_sys icaruser"
                                  v-model="this.login_form.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input placeholder="请输入密码" prefix-icon="icar_sys icarmima" type="password"
                                  v-model="this.login_form.password"></el-input>
                    </el-form-item>
                    <el-form-item class="register-link">
                        <el-link :underline="false" @click="register" style="font-size: 0.7rem" type="danger">
                            尚未注册账号？立即注册
                        </el-link>
                    </el-form-item>
                    <!--                    <el-form-item class="type-selector">-->
                    <!--                        <template>-->
                    <!--                            <el-radio-group v-model="this.$store.state.login.userType" text-color="#EB87CE" fill="#EB87CE">-->
                    <!--                                <el-radio :label="0">驾驶员</el-radio>-->
                    <!--                                <el-radio :label="1">管理员</el-radio>-->
                    <!--                            </el-radio-group>-->
                    <!--                        </template>-->
                    <!--                    </el-form-item>-->
                    <el-form-item class="btns">
                        <el-button @click="login" type="primary">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                login_form: {
                    username: '',
                    password: ''
                },
                loginFormRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 10, message: '账号在3到10个字符', trigger: 'input'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                // userType:0
            }
        },
        methods: {
            async login() {
                await this.$router.push('/adminHome')
            },
            register() {

            }
        }
    }
</script>

<style lang="less" scoped>
    .login-container {
        background-color: #849FC4;
        height: 100%;
    }

    .bk_row {
        height: 100%;
        width: 100%;

        img {
            width: 100%;
            height: 100%;
            float: left;
        }
    }

    .login_region {
        position: fixed;
        top: 1%;
        bottom: 1%;
        right: 1%;
        width: 30%;
        height: 98%;
        border-radius: 1%;
        background-color: #C7D7EE;
        opacity: 0.94;
    }

    .avatar_box {
        height: 130px;
        width: 130px;
        border: solid 1px #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #eee;
        position: absolute;
        top: 25%;
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
        width: 100%;
        height: 300px;
        top: 40%;
        padding: 0 20%;
        box-sizing: border-box;
    }

    .register-link {
        position: absolute;
        top: 30%;
        padding-left: 30%;
    }

    .btns {
        position: relative;
        left: 40%;
        width: 60%;
        top: 10%;
    }
</style>
