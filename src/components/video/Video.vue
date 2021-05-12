<template>
    <div class="video">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>视频管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card v-loading="loading">
            <el-form :inline="true" :model="videoForm" ref="searchUserFormRef">
                <el-form-item label="用户名称" prop="user_name">
                    <el-input placeholder="请输入用户名称" v-model="videoForm.user_name" @keyup.enter.native="searchVideo" clearable></el-input>
                </el-form-item>
                <el-form-item label="拍摄时间" prop="selectedDate">
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
                    <el-button icon="el-icon-search" plain size="small" type="primary" @click="searchVideo">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="videoList" border stripe>
                <el-table-column align="center" label="序号" type="index" width="100px"></el-table-column>
                <el-table-column align="center" label="视频编号" prop="videoID"></el-table-column>
                <el-table-column align="center" label="登录账号" prop="userName"></el-table-column>
                <el-table-column align="center" label="拍摄时间" prop="videoTime"></el-table-column>
                <el-table-column align="center" label="记录时长" prop="videoDuration"></el-table-column>
                <el-table-column align="center" label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button @click="scanVideo(scope.row.videoLink)" icon="el-icon-view" size="mini" type="primary">预览</el-button>
<!--                        <el-button icon="el-icon-download" size="mini" type="warning" @click="downloadVideo">下载</el-button>-->
                        <el-button icon="el-icon-delete" size="mini" type="danger" @click="deleteVideo(scope.row.videoID)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="视频预览" :visible.sync="scanDialogVisible" width="50%" @close="scanDialogVisibleClosed">
            <vue-core-video-player class="video-player" :src="videoSrc"></vue-core-video-player>
        </el-dialog>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueCoreVideoPlayer from 'vue-core-video-player'
    // import Client from 'ali-oss'
    //
    // Vue.use(Client)
    Vue.use(VueCoreVideoPlayer)

    export default {
        name: "Video",
        data() {
            return {
                videoForm: {},
                loading: true,
                videoList: [],
                selectedDate: [],
                scanDialogVisible: false,
                videoSrc: '',
                // client: null
            }
        },
        created() {
            this.getVideoList()
            // this.getClient()
        },
        methods: {
            async getVideoList() {
                const {data: res} = await this.$http.post('driveVideo')
                if (res.code !== 200) {
                    return this.$message.error("获取数据失败")
                }
                this.videoList = res.data.videos
                this.loading = false
            },
            scanVideo(videoLink) {
                this.scanDialogVisible = true
                this.videoSrc = videoLink
            },
            scanDialogVisibleClosed() {
                this.videoSrc = ""
            },
            async searchVideo() {
                const searchForm = {}
                if (this.selectedDate.length > 0) {
                    searchForm['start'] = this.selectedDate[0]
                    searchForm['end'] = this.selectedDate[1]
                }
                if (this.videoForm.user_name !== "") {
                    searchForm['user_name'] = this.videoForm.user_name
                }
                const {data: res} = await this.$http.post('driveVideo', searchForm)
                if (res.code !== 200) {
                    return this.$message.error("查询失败")
                }
                this.videoList = res.data.videos
            },
            // getClient() {
            //     let _this = this
            //     _this.client = new OSS({
            //         region: 'oss-cn-beijing',
            //         accessKeyId: 'LTAI5tNg9iMZjan1EGiYN6S9',
            //         accessKeySecret: 'BbqvbhbM0Itz8JfuVV1TKAqjud1EJT',
            //         bucket: 'car-recognition'
            //     })
            // },
            // async downloadVideo() {
            //     let client = new Client({
            //         region: 'oss-cn-beijing',
            //         accessKeyId: 'LTAI5tNg9iMZjan1EGiYN6S9',
            //         accessKeySecret: 'BbqvbhbM0Itz8JfuVV1TKAqjud1EJT',
            //         bucket: 'car-recognition'
            //     })
            //     const filename = 'detection.mp4' // 自定义文件名。
            //     const response = {
            //         'content-disposition': `attachment; filename=${encodeURIComponent(filename)}`
            //     }
            //     let url = await client.signatureUrl(filename, {response})
            //     const a = document.createElement('a')
            //     a.setAttribute('download','aaa')
            //     a.setAttribute('href',url)
            //     a.click()
            // }
            async deleteVideo(id) {
                const confirmResult = await this.$confirm('确认删除?', '删除视频', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showCancelButton: true,
                    type: 'warning'
                }).catch(err => err)
                if (confirmResult !== 'confirm') {
                    return this.$message.info('取消删除')
                }
                const {data:res} = await this.$http.post('deleteVideo',{"video_id":id})
                if (res.code !== 200) {
                    return this.$message.error("删除失败")
                }
                this.$message.success("删除成功")
                await this.getVideoList()
            }
        }
    }
</script>

<style lang="less" scoped>
    .video {
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
