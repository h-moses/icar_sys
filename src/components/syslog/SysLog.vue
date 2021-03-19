<template>
    <div class="syslog">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/adminHome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统日志</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card v-loading="loading">
            <el-form :inline="true" :model="queryLogForm" ref="queryLogFormRules">
                <el-form-item label="日志时间" prop="logDateTime">
                    <el-date-picker
                            format="yyyy 年 MM 月 dd 日"
                            placeholder="选择日期"
                            type="date"
                            v-model="queryLogForm.logDateTime"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="日志类型" prop="logType">
                    <el-select clearable placeholder="请选择日志类型" v-model="queryLogForm.logType">
                        <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in this.logTypes"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchLog" icon="el-icon-search" plain size="small" type="primary">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="this.logList" border stripe>
                <!--                <el-table-column type="expand">-->
                <!--                    <template slot-scope="props">-->
                <!--                        <el-form inline label-position="left">-->
                <!--                            <el-form-item label="登录账号">{{props.row.userName}}</el-form-item>-->
                <!--                            <el-form-item label="联系电话">{{props.row.userPhone}}</el-form-item>-->
                <!--                            <el-form-item label="注册时间">{{props.row.registerTime}}</el-form-item>-->
                <!--                            <el-form-item label="最近登录">{{props.row.lastLogin}}</el-form-item>-->
                <!--                            <el-form-item label="车牌号码">{{props.row.userName}}</el-form-item>-->
                <!--                            <el-form-item label="预警次数">{{props.row.userName}}</el-form-item>-->
                <!--                            <el-form-item label="驾车评级">{{props.row.userName}}</el-form-item>-->
                <!--                        </el-form>-->
                <!--                    </template>-->
                <!--                </el-table-column>-->
                <el-table-column align="center" label="序号" type="index" width="100px"></el-table-column>
                <el-table-column align="center" label="日志编号" prop="userName"></el-table-column>
                <el-table-column align="center" label="日志时间" prop="userName"></el-table-column>
                <el-table-column align="center" label="组件实例" prop="userPhone"></el-table-column>
                <el-table-column align="center" label="日志描述" prop="registerTime"></el-table-column>
                <el-table-column align="center" label="错误定位" prop="registerTime"></el-table-column>
                <el-table-column align="center" label="日志类别" prop="userRating">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.userRating === 'A'">{{scope.row.userRating}}</el-tag>
                        <el-tag v-else-if="scope.row.userRating === 'B'">{{scope.row.userRating}}</el-tag>
                        <el-tag type="warning" v-else-if="scope.row.userRating === 'C'">{{scope.row.userRating}}</el-tag>
                        <el-tag type="danger" v-else-if="scope.row.userRating === 'D'">{{scope.row.userRating}}</el-tag>
                        <el-tag type="info" v-else>未评级</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showUserDetails(scope.row)" icon="el-icon-view" size="mini" type="primary">下载</el-button>
                        <el-button @click="deleteUserInfo(scope.row)" icon="el-icon-delete" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="5" :page-sizes="[1,2,5,10]" :page-size="5" layout="total,sizes,prev,pager,next,jumper" :total="this.total"></el-pagination>-->
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "SysLog",
        data() {
            return {
                queryLogForm: {
                    logDateTime: '',
                    logType: ''
                },
                logTypes: [
                    {
                        'value': 0,
                        'label': '错误'
                    },
                    {
                        'value': 1,
                        'label': '警告'
                    }
                ],
                queryLogFormRules: {},
                logList: [],
                loading: false
            }
        },

        created() {
            this.getLogList()
        },
        methods: {
            async searchLog() {

            },
            async getLogList() {
                this.loading = false
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
