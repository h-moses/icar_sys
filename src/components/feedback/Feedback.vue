<template>
    <div class="feedback">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
<!--            <el-breadcrumb-item :to="{path:'/adminHome'}">首页</el-breadcrumb-item>-->
            <el-breadcrumb-item>工单管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-form :inline="true" :model="feedbackForm" ref="searchUserFormRef">
                <el-form-item label="联系电话" prop="user_phone">
                    <el-input placeholder="请输入联系电话" v-model="feedbackForm.user_phone" @keyup.enter.native="searchOrder" clearable></el-input>
                </el-form-item>
                <el-form-item label="处理状态" prop="feedback_state">
                    <el-select placeholder="请选择处理状态" v-model="feedbackForm.feedback_state" clearable>
                        <el-option :key="item.value" :label="item.label" :value="item.label" v-for="item in this.feedback_states"></el-option>
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
                <el-table-column align="center" label="联系电话" prop="userPhone" width="120px"></el-table-column>
                <el-table-column align="center" label="工单内容" prop="feedbackContent"></el-table-column>
                <el-table-column align="center" label="提交时间" prop="feedbackTime"></el-table-column>
                <el-table-column align="center" label="处理状态" prop="feedbackState" width="100px" :filters="filterState" :filter-method="handleFilter">
                    <template slot-scope="props">
                        <el-tag type="info" v-if="props.row.feedbackState === '已关闭'">
                            <i class="el-icon-success"/>
                            已关闭
                        </el-tag>
                        <el-tag type="warning" v-else-if="props.row.feedbackState === '处理中'">
                            <i class="el-icon-remove"/>
                            处理中
                        </el-tag>
                        <el-tag type="danger" v-else>
                            <i class="el-icon-warning"/>
                            已提交
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showReplyPage(scope.row.feedbackID)" icon="el-icon-edit" size="mini" type="warning">处理</el-button>
                        <el-button @click="deleteOrder(scope.row.feedbackID)" icon="el-icon-delete" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :current-page="queryInfo.currentPage" :page-size="queryInfo.pageSize" :page-sizes="[1,2,5,10]"
                           :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange"
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
                    user_phone: '',
                    feedback_state: ''
                },
                feedback_states: [
                    {
                        'value': 0,
                        'label': '已提交'
                    },
                    {
                        'value': 1,
                        'label': '处理中'
                    },
                    {
                        'value': 2,
                        'label': '已关闭'
                    }
                ],
                feedbackList: [],
                loading: true,
                queryInfo: {
                    currentPage: 1,
                    pageSize: 5,
                },
                total: 0,
                filterState: [
                    {
                        text: '已提交',
                        value: '已提交'
                    },
                    {
                        text: '处理中',
                        value: '处理中'
                    },
                    {
                        text: '已关闭',
                        value: '已关闭'
                    },
                ],
            }
        },
        created() {
            this.getFeedbackList()
        },
        methods: {
            async showReplyPage(feedbackID) {
                await this.$router.push(`/reply/${feedbackID}`)
            },
            async deleteOrder(feedbackID) {
                const confirmResult = await this.$confirm('确认删除此工单?', '删除工单', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showCancelButton: true,
                    type: 'warning'
                }).catch(err => err)
                if (confirmResult !== 'confirm') {
                    return this.$message.info('取消删除')
                }
                const data = {'feedback_id': feedbackID}
                const {data: res} = await this.$http.post('feedback/delete', data)
                if (res.code !== 200) {
                    return this.$message.error("删除失败")
                }
                await this.getFeedbackList()
                this.$message.success("删除成功")
            },
            async getFeedbackList() {
                const {data: res} = await this.$http.post('feedback/view', this.queryInfo)
                if (res.code !== 200) {
                    return this.$message.error("获取失败")
                }
                this.feedbackList = res.data.feedbackRecord['list']
                this.total = res.data.feedbackRecord['total']
                this.loading = false
            },
            async searchOrder() {
                const data = {}
                data['currentPage'] = parseInt(this.queryInfo.currentPage)
                data['pageSize'] = parseInt(this.queryInfo.pageSize)
                if (this.feedbackForm.user_phone !== '') {
                    data['user_phone'] = this.feedbackForm.user_phone
                }
                if (this.feedbackForm.feedback_state !== '') {
                    data['feedback_state'] = this.feedbackForm.feedback_state
                }
                console.log(data)
                const {data: res} = await this.$http.post('feedback/view', data)
                if (res.code !== 200) {
                    return this.$message.error("查询失败")
                }
                this.feedbackList = res.data.feedbackRecord['list']
                this.total = res.data.feedbackRecord['total']
            },
            handleCurrentChange(newPage) {
                this.queryInfo.currentPage = newPage
                this.getFeedbackList()
            },
            handleSizeChange(newSize) {
                this.queryInfo.pageSize = newSize
                this.getFeedbackList()
            },
            handleFilter(value,row,column) {
                const property = column['property']
                return row[property] === value
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

    .el-button {
        border-radius: 1px;
        border: 1px solid #cccccc;
    }
</style>
