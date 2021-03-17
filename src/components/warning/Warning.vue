<template>
    <div class="warning">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/adminHome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>预警管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card v-loading="loading">
            <el-form :inline="true" :model="queryWarningForm" ref="searchWarningFormRef">
                <el-form-item label="登录账号" prop="user_name">
                    <el-input placeholder="请输入登录账号" v-model="queryWarningForm.user_name"></el-input>
                </el-form-item>
                <el-form-item label="预警时间" prop="selectedDate">
                    <el-date-picker
                            end-placeholder="结束日期"
                            format="yyyy 年 MM 月 dd 日"
                            placeholder="选择日期"
                            range-separator="至"
                            start-placeholder="开始日期"
                            type="daterange"
                            v-model="queryWarningForm.selectedDate"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchWarning" icon="el-icon-search" plain size="small" type="primary">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="this.warningList" border stripe v-loading="loading">
                <el-table-column align="center" label="序号" type="index" width="70px"></el-table-column>
                <el-table-column align="center" label="预警编号" prop="recordID" width="120px"></el-table-column>
                <el-table-column align="center" label="登录账号" prop="userID" width="120px"></el-table-column>
                <el-table-column align="center" label="预警时间" prop="alarmTime" width="180px"></el-table-column>
                <el-table-column align="center" label="预警地点" prop="location"></el-table-column>
                <el-table-column align="center" label="预警原因" prop="alarmReason"></el-table-column>
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
                            <el-button @click="deleteWarning(scope.row)" icon="el-icon-delete" size="mini" type="danger">删除
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
                queryWarningForm: {
                    user_phone: '',
                    selectedDate: []
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
                const {data: res} = await this.$http.post('alarm/view', this.queryWarningForm)
                if (res.code !== 200) {
                    return this.$message.error("获取预警记录失败")
                }
                this.warningList = res.data
                this.loading = false
            },
            async deleteWarning(row) {
                const confirmResult = await this.$confirm('确认删除该条预警记录?', '删除预警记录', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showCancelButton: true,
                    type: 'warning'
                }).catch(err => err)
                if (confirmResult !== 'confirm') {
                    return this.$message.info('取消删除')
                }
                const data = new FormData()
                data.append("record_id", row.alarmID)
                const {data: res} = await this.$http.post('alarm/delete', data)
                if (res.code !== 200) {
                    return this.$message.error("删除失败")
                }
                this.$message.success("成功删除")
                await this.getWarningList()
            },
            async searchWarning() {
                const data = new FormData()
                data.append("user_phone", this.queryWarningForm.user_phone)
                data.append('start', this.queryWarningForm.selectedDate[0])
                data.append('end', this.queryWarningForm.selectedDate[1])
                const {data: res} = await this.$http.post('alarm/view', this.queryWarningForm)
                if (res.code !== 200) {
                    return this.$message.error("查询失败")
                }
                this.warningList = res.data
            }
        },

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

    .el-input /deep/ .el-input__inner {
        height: 32px;
        font-size: 12px;
        border-radius: 0;
        border: 1px solid #cccccc;
    }

    .el-date-editor--daterange {
        height: 32px;
        border-radius: 0;

        /deep/ .el-range__icon, /deep/ .el-range-input,/deep/ .el-range__close-icon {
            height: 30px;
            margin-bottom: 1px;
            font-size: 12px;
        }

        /deep/ .el-range-separator {
            height: 30px;
            margin-bottom: 2px;
        }
    }

    .el-button {
        border-radius: 1px;
        border: 1px solid #cccccc;
    }
</style>
