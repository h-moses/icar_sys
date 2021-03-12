<template>
    <div class="reply">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/adminHome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/feedback'}">工单管理</el-breadcrumb-item>
            <el-breadcrumb-item>工单处理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="2" class="order-header">
                <el-col :key="index" :span="6" v-for="(item,index) in order_list">
                    <div>
                        <span>{{order_titles[index]}}</span>
                        <span>{{item}}</span>
                    </div>
                </el-col>
            </el-row>
            <el-divider/>
            <el-row class="order-content">
                <el-col>
                    <div>工单内容</div>
                    <el-input autosize v-model="this.orderContent"></el-input>
                    <div>上传材料</div>
                    <el-row>
                        <el-button>
                            <img src=""/>
                        </el-button>
                    </el-row>
                </el-col>
            </el-row>
            <el-row class="order-reply"></el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Reply",
        data() {
            return {
                order_list: {
                    'feedback_id': '20210310',
                    'user_id': '709820314',
                    'feedback_time': '2021-03-10 19:57',
                    'feedback_state': '未审核',
                },
                order_titles: {
                    'feedback_id': '工单编号：',
                    'user_id': '提交账号：',
                    'feedback_time': '提交时间：',
                    'feedback_state': '状态：',
                },
                orderContent: ''
            }
        },
        created() {
            this.getOrderList()
        },
        methods: {
            async getOrderList() {

            },
            // eslint-disable-next-line no-unused-vars
            change(e) {
                this.$forceUpdate()
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-card {
        margin-top: 15px;
        height: 100%;

        .order-header {
            .el-col {
                display: flex;
                padding: 10px;
                justify-content: center;
                font-size: 13px;
            }
        }

        .order-content {
            margin-top: 15px;
            font-size: 14px;
            /deep/ .el-input__inner {
                margin: 20px 0;
                width: 500px;
            }
        }
    }
</style>
