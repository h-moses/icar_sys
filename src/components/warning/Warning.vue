<template>
    <div class="warning">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
<!--            <el-breadcrumb-item :to="{path:'/adminHome'}">首页</el-breadcrumb-item>-->
            <el-breadcrumb-item>预警管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-form :inline="true" :model="queryWarningForm" ref="searchWarningFormRef">
                <el-form-item label="登录账号" prop="user_name">
                    <el-input placeholder="请输入登录账号" v-model="queryWarningForm.user_name" @keyup.enter.native="searchWarning" clearable></el-input>
                </el-form-item>
                <el-form-item label="绑定手机" prop="user_phone">
                    <el-input placeholder="请输入手机号码" v-model="queryWarningForm.user_phone" @keyup.enter.native="searchWarning" clearable></el-input>
                </el-form-item>
                <el-form-item label="预警时间" prop="selectedDate">
                    <el-date-picker
                            end-placeholder="结束日期"
                            format="yyyy 年 MM 月 dd 日"
                            placeholder="选择日期"
                            range-separator="至"
                            start-placeholder="开始日期"
                            type="daterange"
                            v-model="selectedDate"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchWarning" icon="el-icon-search" size="small" type="primary">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="this.warningList" border stripe v-loading="loading">
                <el-table-column align="center" label="序号" type="index" width="70px"></el-table-column>
                <el-table-column align="center" label="预警编号" prop="recordID" width="120px"></el-table-column>
                <el-table-column align="center" label="用户名称" prop="userName" width="120px"></el-table-column>
                <el-table-column align="center" label="联系方式" prop="userPhone" width="120px"></el-table-column>
                <el-table-column align="center" label="预警时间" prop="alarmTime" width="180px"></el-table-column>
                <el-table-column align="center" label="预警地点" prop="location"></el-table-column>
                <el-table-column align="center" label="预警原因" prop="alarmReason"></el-table-column>
                <el-table-column align="center" label="风险等级" prop="alarmDegree" width="100" :filters="filterDegree" :filter-method="handleFilter">
                    <template slot-scope="scope">
                        <el-tag :type="degreeTags[scope.row.alarmDegree]" effect="plain">{{scope.row.alarmDegree}}</el-tag>
                    </template>
                </el-table-column>
<!--                <el-table-column align="center" label="视频编号" prop="video_id" width="120px">-->
<!--                    <template slot-scope="props">-->
<!--                        <el-link :underline="false" type="danger">-->
<!--                            <el-icon class="el-icon-link"/>-->
<!--                            {{props.row.video_id}}-->
<!--                        </el-link>-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="visualDialog(scope.row.recordID,scope.row.alarmDegree)" icon="el-icon-edit" size="mini" type="warning" plain>更定</el-button>
                        <el-button @click="deleteWarning(scope.row.recordID)" icon="el-icon-delete" size="mini" type="danger" plain>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.currentPage" :page-sizes="[1,2,5,10]" :page-size="queryInfo.pageSize" layout="total,sizes,prev,pager,next,jumper" :total="total"></el-pagination>
        </el-card>
        <el-dialog title="更定评级" :visible.sync="modifyDialogVisible" width="50%" @close="modifyDialogClosed">
            <el-form :model="modifyForm" ref="modifyFormRef" label-width="70px">
                <el-form-item label="风险等级" prop="degree">
                    <el-select v-model="modifyForm['degree']">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifyDialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="modifyDegree">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Warning",
        data() {
            return {
                queryWarningForm: {
                    user_name:'',
                    user_phone: '',

                },
                loading: true,
                warningList: [],
                selectedDate: [],
                modifyForm: {
                    record_id: '',
                    degree: ''
                },
                modifyDialogVisible: false,
                options: [
                    {
                        value: '一级',
                        label: '一级'
                    },
                    {
                        value: '二级',
                        label: '二级'
                    },
                    {
                        value: '三级',
                        label: '三级'
                    },
                ],
                degreeTags: {
                    '一级': 'danger',
                    '二级': 'warning',
                    '三级': 'primary'
                },
                filterDegree: [
                    {
                        text: '一级',
                        value: '一级'
                    },
                    {
                        text: '二级',
                        value: '二级'
                    },
                    {
                        text: '三级',
                        value: '三级'
                    }
                ],
                total: 0,
                queryInfo: {
                    currentPage: 1,
                    pageSize: 5
                }
            }
        },
        created() {
            this.getWarningList()
        },
        methods: {
            async getWarningList() {
                const {data: res} = await this.$http.post('alarm/view', this.queryInfo)
                if (res.code !== 200) {
                    return this.$message.error("获取预警记录失败")
                }
                this.warningList = res.data.alarmRecord['list']
                this.total = res.data.alarmRecord['total']
                this.loading = false
            },
            async deleteWarning(recordID) {
                const confirmResult = await this.$confirm('确认删除该条预警记录?', '删除预警记录', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showCancelButton: true,
                    type: 'warning'
                }).catch(err => err)
                if (confirmResult !== 'confirm') {
                    return this.$message.info('取消删除')
                }
                const {data: res} = await this.$http.post('alarm/delete', {"record_id":recordID})
                if (res.code !== 200) {
                    return this.$message.error("删除失败")
                }
                this.$message.success("成功删除")
                await this.getWarningList()
            },
            async searchWarning() {
                const searchForm = {}
                if (null !== this.selectedDate) {
                    searchForm['start'] = this.selectedDate[0]
                    searchForm['end'] = this.selectedDate[1]
                }
                if (this.queryWarningForm.user_name !== "") {
                    searchForm['user_name'] = this.queryWarningForm.user_name
                }
                if (this.queryWarningForm.user_phone !== "") {
                    searchForm['user_phone'] = this.queryWarningForm.user_phone
                }
                searchForm['currentPage'] = parseInt(this.queryInfo.currentPage)
                searchForm['pageSize'] = parseInt(this.queryInfo.pageSize)
                const {data: res} = await this.$http.post('alarm/view', searchForm)
                if (res.code !== 200) {
                    return this.$message.error("查询失败")
                }
                this.warningList = res.data.alarmRecord['list']
                this.total = res.data.alarmRecord['total']
            },
            modifyDialogClosed() {
                this.$refs.modifyFormRef.resetFields()
            },
            async modifyDegree() {
                const {data:res} = await this.$http.post('alarm/update',this.modifyForm)
                if (res.code !== 200) {
                    return this.$message.error("更定评级失败")
                }
                await this.getWarningList()
                this.$message.success("更定评级成功")
                this.modifyDialogVisible = false
            },
            visualDialog(recordID,recordDegree) {
                this.modifyForm['record_id'] = recordID
                this.modifyForm['degree'] = recordDegree
                this.modifyDialogVisible = true
            },
            handleFilter(value,row,column) {
                const property = column['property']
                return row[property] === value
            },
            handleSizeChange(newSize) {
                this.queryInfo.pageSize = newSize
                this.searchWarning()
            },
            handleCurrentChange(newPage) {
                this.queryInfo.currentPage = newPage
                this.searchWarning()
            }
        },

    }
</script>

<style lang="less" scoped>
    .warning {
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

    .el-input /deep/ .el-input__inner {
        height: 32px;
        font-size: 12px;
        border-radius: 0;
        border: 1px solid #cccccc;
    }

    .el-date-editor--daterange {
        height: 32px;
        border-radius: 0;

        /deep/ .el-range__icon, /deep/ .el-range-input, /deep/ .el-range__close-icon {
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
