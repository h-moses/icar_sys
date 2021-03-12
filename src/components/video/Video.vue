<template>
    <div class="video">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/adminHome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>视频管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-form :inline="true" :model="videoForm" ref="searchUserFormRef">
                <el-form-item label="视频编号" prop="video_id">
                    <el-input placeholder="请输入账号ID" v-model="videoForm.video_id"></el-input>
                </el-form-item>
                <el-form-item label="登录账号" prop="user_name">
                    <el-input placeholder="请输入登录账号" v-model="videoForm.user_name"></el-input>
                </el-form-item>
                <el-form-item label="拍摄时间" prop="selectedDate">
                    <el-date-picker
                            placeholder="选择日期"
                            type="date"
                            v-model="videoForm.selectedDate">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" plain size="small" type="primary">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="this.$store.state.video.videoList" border stripe>
                <el-table-column align="center" label="序号" type="index" width="100px"></el-table-column>
                <el-table-column align="center" label="视频编号" prop="video_id"></el-table-column>
                <el-table-column align="center" label="登录账号" prop="user_id"></el-table-column>
                <el-table-column align="center" label="拍摄时间" prop="video_time"></el-table-column>
                <el-table-column align="center" label="记录时长" prop="video_duration"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-tooltip :enterable="false" content="预览" effect="dark" placement="top">
                            <el-button @click="showEditDialog(scope.row.id)" icon="el-icon-view" size="mini"
                                       type="primary"></el-button>
                        </el-tooltip>
                        <el-tooltip :enterable="false" content="下载" effect="dark" placement="top">
                            <el-button @click="deleteUserById(scope.row.id)" icon="el-icon-download" size="mini"
                                       type="danger"></el-button>
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
        name: "Video",
        data() {
            return {
                videoForm: {
                    video_id: '',
                    user_name: '',
                    selectedDate: ''
                }
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
