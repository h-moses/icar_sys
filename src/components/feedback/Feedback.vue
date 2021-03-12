<template>
    <div class="feedback">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/adminHome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>预警管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-form :inline="true" :model="feedbackForm" ref="searchUserFormRef">
                <el-form-item label="工单编号" prop="feedback_id">
                    <el-input placeholder="请输入工单编号" v-model="feedbackForm.feedback_id"></el-input>
                </el-form-item>
                <el-form-item label="登录账号" prop="user_name">
                    <el-input placeholder="请输入登录账号" v-model="feedbackForm.user_name"></el-input>
                </el-form-item>
                <el-form-item label="处理状态" prop="feedback_state">
                    <el-select placeholder="请选择处理状态" v-model="value">
                        <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in this.feedback_states"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" plain size="small" type="primary">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="this.$store.state.feedback.orderList" border stripe>
                <el-table-column align="center" label="序号" type="index" width="100px"></el-table-column>
                <el-table-column align="center" label="工单编号" prop="feedback_id"></el-table-column>
                <el-table-column align="center" label="登录账号" prop="user_id"></el-table-column>
                <el-table-column align="center" label="提交时间" prop="feedback_time"></el-table-column>
                <el-table-column align="center" label="处理状态" prop="feedback_state">
                    <template>
                        <el-tag type="success">
                            <i class="el-icon-success"/>
                            处理完成
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-tooltip :enterable="false" content="处理" effect="dark" placement="top">
                            <el-button @click="showReplyPage(scope.row)" icon="el-icon-edit" size="mini" type="warning">
                                处理
                            </el-button>
                        </el-tooltip>
                        <el-tooltip :enterable="false" content="删除" effect="dark" placement="top">
                            <el-button @click="deleteUserById(scope.row.id)" icon="el-icon-delete" size="mini"
                                       type="danger">删除
                            </el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :current-page="5" :page-size="5" :page-sizes="[1,2,5,10]"
                           :total="20" @current-change="handleCurrentChange" @size-change="handleSizeChange"
                           background layout="total,sizes,prev,pager,next,jumper"></el-pagination>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Feedback",
        data() {
            return {
                feedbackForm: {
                    feedback_id: '',
                    user_name: '',
                    feedback_state: ''
                },
                feedback_states: [
                    {
                        'value': 0,
                        'label': '未处理'
                    },
                    {
                        'value': 1,
                        'label': '处理中'
                    },
                    {
                        'value': 2,
                        'label': '已处理'
                    }
                ]
            }
        },
        methods: {
            showReplyPage() {
                this.$router.push('/reply')
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

    .el-button {
        border-radius: 1px;
        border: 1px solid #cccccc;
    }
</style>
