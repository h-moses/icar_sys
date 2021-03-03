<template>
    <div class="login-container">
        <el-row class="bk_row" :gutter="0" >
            <el-col :span="16">

            </el-col>
            <el-col class="login_region" :span="8" :offset="16">
                <!--头像区域-->
                <div class="avatar_box">
                    <img src="../assets/logo.png" alt="">
                </div>
                <el-form class="login_form" label-width="0" ref="loginFormRef" :model="login_form" :rules="loginFormRules">
                    <el-form-item prop="username">
                        <el-input v-model="login_form.username" prefix-icon="icar_sys icaruser"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input prefix-icon="icar_sys icarmima" v-model="login_form.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item class="btns">
                        <el-button type="primary">登录</el-button>
                        <el-button class="btn_register" type="danger">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <div class="left_region"></div>
        <div class="form_region">

        </div>
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
                        {required:true,message:'请输入用户名',trigger:'blur'}
                    ],
                    password: [
                        {required:true,message:'请输入密码',trigger:'blur'}
                    ]
                }
            }
        },
        methods: {
            async login () {
            }
        }
    }
</script>

<style lang="less" scoped>
.login-container {
    background-color: #F3F8FB;
    height: 100%;
}
.bk_row {
    height: 100%;
    width: 100%;
}
.login_region {
    height: 100%;
    position: absolute;
    background-color: #95C3DF;
}
.avatar_box{
    height: 130px;
    width: 130px;
    border: solid 1px #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #eee;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}
.login_form {
    position: absolute;
    width: 100%;
    top: 40%;
    padding: 0 20%;
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: space-between;
    .btn_register {
        margin-left: 150px;
    }
}
</style>
