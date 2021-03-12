<template>
    <div class="warning">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/adminHome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>预警管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-form :inline="true" :model="warningForm" ref="searchWarningFormRef">
                <el-form-item label="登录账号" prop="user_name">
                    <el-input placeholder="请输入登录账号" v-model="warningForm.user_name"></el-input>
                </el-form-item>
                <el-form-item label="预警时间" prop="selectedDate">
                    <el-date-picker
                            placeholder="选择日期"
                            type="date"
                            v-model="warningForm.selectedDate">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" plain size="small" type="primary">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="this.$store.state.warning.warningList" border stripe v-loading="loading">
                <el-table-column align="center" label="序号" type="index" width="70px"></el-table-column>
                <el-table-column align="center" label="预警编号" prop="record_id" width="120px"></el-table-column>
                <el-table-column align="center" label="登录账号" prop="user_id" width="120px"></el-table-column>
                <el-table-column align="center" label="预警时间" prop="record_time" width="180px"></el-table-column>
                <el-table-column align="center" label="预警地点" prop="record_location"></el-table-column>
                <el-table-column align="center" label="预警原因" prop="record_reason"></el-table-column>
                <el-table-column align="center" label="视频编号" prop="video_id" width="120px">
                    <template slot-scope="props">
                        <el-link :underline="false" type="danger">
                            <el-icon class="el-icon-link"/>
                            {{props.row.video_id}}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-tooltip :enterable="false" content="评定" effect="dark" placement="top">
                            <el-button @click="deleteUserById(scope.row.id)" icon="el-icon-edit" size="mini"
                                       type="warning">评定
                            </el-button>
                        </el-tooltip>
                        <el-tooltip :enterable="false" content="删除" effect="dark" placement="top">
                            <el-button @click="setRole(scope.row)" icon="el-icon-delete" size="mini" type="danger">删除
                            </el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!--            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="5" :page-sizes="[1,2,5,10]" :page-size="5" layout="total,sizes,prev,pager,next,jumper" :total="20"></el-pagination>-->
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Warning",
        data() {
            return {
                warningForm: {
                    user_name: '',
                    selectedDate: ''
                },
                loading: true,
                warningList: []
            }
        },
        created() {
            this.getWarningList()
        },
        methods: {
            async getWarningList() {


                this.loading = false
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

    .el-select /deep/ .el-input__inner {
        width: 100px;
    }

    .el-button {
        border-radius: 1px;
        border: 1px solid #cccccc;
    }
</style>
