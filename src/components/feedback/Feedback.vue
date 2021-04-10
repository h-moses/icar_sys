<template>
    <div class="feedback">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/adminHome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>工单管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-form :inline="true" :model="feedbackForm" ref="searchUserFormRef">
                <!--                <el-form-item label="工单编号" prop="feedback_id">-->
                <!--                    <el-input placeholder="请输入工单编号" v-model="feedbackForm.feedback_id"></el-input>-->
                <!--                </el-form-item>-->
                <el-form-item label="联系电话" prop="user_phone">
                    <el-input placeholder="请输入联系电话" v-model="feedbackForm.user_phone"></el-input>
                </el-form-item>
                <el-form-item label="处理状态" prop="feedback_state">
                    <el-select placeholder="请选择处理状态" v-model="feedbackForm.feedback_state">
                        <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in this.feedback_states"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchOrder" icon="el-icon-search" plain size="small" type="primary">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="this.feedbackList" border stripe v-loading="loading">
                <el-table-column align="center" label="序号" type="index" width="100px"></el-table-column>
                <el-table-column align="center" label="工单编号" prop="feedbackID"></el-table-column>
                <el-table-column align="center" label="登录账号" prop="userName"></el-table-column>
<!--                <el-table-column align="center" label="联系电话" prop="userPhone" width="120px"></el-table-column>-->
                <el-table-column align="center" label="工单内容" prop="feedbackContent"></el-table-column>
                <el-table-column align="center" label="提交时间" prop="feedbackTime"></el-table-column>
                <el-table-column align="center" label="处理状态" prop="feedbackState" width="100px">
                    <template slot-scope="props">
                        <el-tag type="success" v-if="props.row.feedbackState === '已处理'">
                            <i class="el-icon-success"/>
                            已处理
                        </el-tag>
                        <el-tag type="warning" v-else-if="props.row.feedbackState === '处理中'">
                            <i class="el-icon-remove"/>
                            处理中
                        </el-tag>
                        <el-tag type="danger" v-else>
                            <i class="el-icon-warning"/>
                            未处理
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showReplyPage(scope.row)" icon="el-icon-edit" size="mini" type="warning">处理</el-button>
                        <el-button @click="deleteOrder(scope.row)" icon="el-icon-delete" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--            <el-pagination :current-page="5" :page-size="5" :page-sizes="[1,2,5,10]"-->
            <!--                           :total="20" @current-change="handleCurrentChange" @size-change="handleSizeChange"-->
            <!--                           background layout="total,sizes,prev,pager,next,jumper"></el-pagination>-->
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Feedback",
        data() {
            return {
                feedbackForm: {
                    user_phone: '',
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
                ],
                feedbackList: [],
                loading: true
            }
        },
        created() {
            this.getFeedbackList()
        },
        methods: {
            showReplyPage(row) {
                this.$router.push(`/reply/${row.feedbackID}`)
            },
            async deleteOrder(row) {
                const confirmResult = await this.$confirm('确认删除该条工单记录?', '删除工单记录', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showCancelButton: true,
                    type: 'warning'
                }).catch(err => err)
                if (confirmResult !== 'confirm') {
                    return this.$message.info('取消删除')
                }
                const data = new FormData()
                data.append('feedback_id', row.feedbackID)
                const {data: res} = await this.$http.post('feedback/delete', data)
                if (res.code !== 200) {
                    return this.$message.error("删除失败")
                }
                await this.getFeedbackList()
                this.$message.success("删除成功")
            },
            async getFeedbackList() {
                const {data: res} = await this.$http.post('feedback/view')
                if (res.code !== 200) {
                    return this.$message.error("获取失败")
                }
                this.feedbackList = res.data.feedbackRecord['list']
                console.log(this.feedbackList)
                this.loading = false
            },
            async searchOrder() {
                const {data: res} = await this.$http.post('feedback/view', this.feedbackForm)
                if (res.code !== 200) {
                    return this.$message.error("查询失败")
                }
                this.feedbackList = res.data.feedbackRecord
            }
        }
    }
</script>

<style lang="less" scoped>
    .feedback {
        padding: 20px;
    }

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
