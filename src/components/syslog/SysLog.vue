<template>
    <div class="syslog">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
<!--            <el-breadcrumb-item :to="{path:'/adminHome'}">首页</el-breadcrumb-item>-->
            <el-breadcrumb-item>系统日志</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card v-loading="loading">
            <el-form :inline="true" :model="queryLogForm" ref="queryLogFormRules">
                <el-form-item label="日志时间" prop="date">
                    <el-date-picker
                            format="yyyy 年 MM 月 dd 日"
                            placeholder="选择日期"
                            type="date"
                            v-model="queryLogForm.date"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="日志类型" prop="type">
                    <el-select clearable placeholder="请选择日志类型" v-model="queryLogForm.type">
                        <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in this.logTypes"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchLog" icon="el-icon-search" size="small" type="primary">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="logList" border stripe>
                <el-table-column align="center" label="序号" type="index" width="100px"></el-table-column>
                <el-table-column align="center" label="日志编号" prop="logID"></el-table-column>
                <el-table-column align="center" label="日志时间" prop="logTime"></el-table-column>
                <el-table-column align="center" label="组件实例" prop="reportObj"></el-table-column>
                <el-table-column align="center" label="日志描述" prop="logDescription"></el-table-column>
                <el-table-column align="center" label="日志类型" prop="logType">
                    <template slot-scope="scope">
                        <el-tag :type="typesTag[scope.row.logType]">{{scope.row.logType}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="deleteLog(scope.row.logID)" icon="el-icon-delete" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "SysLog",
        data() {
            return {
                queryLogForm: {
                    date: '',
                    type: ''
                },
                logTypes: [
                    {
                        'value': 'error',
                        'label': '错误'
                    },
                    {
                        'value': 'warn',
                        'label': '警告'
                    }
                ],
                queryLogFormRules: {},
                logList: [],
                loading: false,
                typesTag: {
                    'error':'danger',
                    'warn':'warning'
                }
            }
        },

        created() {
            this.getLogList()
        },
        methods: {
            async searchLog() {
                const data = {}
                if (this.queryLogForm.date !== '') {
                    data['date'] = this.queryLogForm.date
                }
                if (this.queryLogForm.type !== '') {
                    data['type'] = this.queryLogForm.type
                }
                const {data:res} = await this.$http.post('viewLog',data)
                if (res.code !== 200) {
                    return this.$message.error('查询日志失败')
                }
                this.logList = res.data.logs
            },
            async getLogList() {
                const {data:res} = await this.$http.post('viewLog')
                if (res.code !== 200) {
                    return this.$message.error("获取日志失败")
                }
                this.logList = res.data.logs
                this.loading = false
            },
            async deleteLog(logId) {
                const confirmResult = await this.$confirm('确认删除该日志?', '删除日志', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showCancelButton: true,
                    type: 'warning'
                }).catch(err => err)
                if (confirmResult !== 'confirm') {
                    return this.$message.info('取消删除')
                }
                const {data: res} = await this.$http.post('deleteLog', {'logId':logId})
                if (res.code !== 200) {
                    return this.$message.error("删除失败")
                }
                this.$message.success("成功删除")
                await this.getLogList()
            }
        }
    }
</script>

<style lang="less" scoped>
    .syslog {
        padding: 20px;
    }

    .el-card {
        margin-top: 15px;
        height: 100%;
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
