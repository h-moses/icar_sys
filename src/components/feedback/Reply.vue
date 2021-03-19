<template>
    <div class="reply">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/adminHome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/feedback'}">工单管理</el-breadcrumb-item>
            <el-breadcrumb-item>工单处理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="footer-btn">
            <el-button @click="reply" class="btn-reply" size="small" type="primary">回复</el-button>
            <el-button @click="backLast" class="btn-back" size="small" type="primary">返回</el-button>
        </el-row>
        <el-card v-loading="loading">
            <el-row :gutter="2" class="order-header">
                <el-col :key="index" :span="6" v-for="(item,index) in orderList">
                    <div>
                        <span>{{order_titles[index]}}</span>
                        <span>{{item}}</span>
                    </div>
                </el-col>
            </el-row>
            <el-divider/>
            <el-row class="order-content">
                <el-col>
                    <div>工单内容</div>
                    <el-input autosize readonly type="textarea" v-model="this.feedbackContent"></el-input>
                    <el-row v-if="this.feedbackPics.length !== 0">
                        <div>上传材料</div>
                        <viewer :images="this.feedbackPics" :navbar="false" :toolbar="false" class="viewer" inline>
                            <img :key="src" :src="src" alt="" class="provedImage" v-for="src in this.feedbackPics" width="50">
                        </viewer>
                    </el-row>
                </el-col>
            </el-row>
            <el-divider/>
            <el-row class="order-reply">
                <el-col>
                    <el-input :show-word-limit="true" placeholder="回复区域" type="textarea" v-model="replyContent"></el-input>
                    <el-upload :auto-upload="false" :before-remove="handleBeforeRemove" action="#" list-type="picture-card" multiple ref="upload">
                        <i class="el-icon-upload" slot="default">
                            <div style="height: 10px"><em style="font-size: 12px;font-style: normal;">点击上传</em></div>
                        </i>
                        <div slot="file" slot-scope="{file}">
                            <img :src="file.url" alt="" class="el-upload-list__item-thumbnail" v-if="file.url">
                            <span class="el-upload-list__item-actions">
                                <span @click="handlePictureCardPreview(file)" class="el-upload-list__item-preview">
                                    <i class="el-icon-zoom-in"></i>
                                </span>
                                <span @click="handleRemove(file)" class="el-upload-list__item-delete" v-if="!disabled">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                        <div class="el-upload__tip" slot="tip"><em>只能上传jpg/png文件</em></div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img :src="dialogImageUrl" alt="" width="100%">
                    </el-dialog>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import 'viewerjs/dist/viewer.css'
    import Viewer from 'v-viewer'
    import Vue from 'vue'

    Vue.use(Viewer, {
        defaultOptions: {
            zIndex: 9999
        }
    })
    export default {
        name: "Reply",
        data() {
            return {
                orderList: {
                    'feedbackID': '',
                    'userID': '',
                    'feedbackTime': '',
                    'feedbackState': '',
                },
                order_titles: {
                    'feedbackID': '工单编号：',
                    'userID': '提交账号：',
                    'feedbackTime': '提交时间：',
                    'feedbackState': '状态：',
                },
                feedbackContent: '',
                feedbackPics: [],
                replyContent: '',
                uploadImages: ['https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', 'https://cube.elemecdn.com/0/c7/731d222b16d4537c0dcb5dfdc0402svg.svg', 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'],
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                loading: true,
            }
        },
        created() {
            this.getOrderList()
        },
        methods: {
            // 获取该工单信息
            async getOrderList() {
                const {data: res} = await this.$http.post('feedback/viewById', {feedback_id: this.$route.params.feedback_id})
                if (res.code !== 200) {
                    return this.$message.error("获取失败")
                }
                this.orderList.feedbackID = res.data.feedback.feedbackID
                this.orderList.userID = res.data.feedback.userID
                this.orderList.feedbackTime = res.data.feedback.feedbackTime
                this.orderList.feedbackState = res.data.feedback.feedbackState === 0 ? '未处理' : (res.data.feedback.feedbackState === 1 ? '处理中' : '已处理')
                this.feedbackContent = res.data.feedback.feedbackContent
                this.feedbackPics = res.data.feedback.feedbackPics
                this.loading = false
            },
            // 删除上传图片
            handleRemove(file) {
                this.$refs.upload.handleRemove(file)
            },
            // 预览上传图片
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            // 确定是否删除图片
            async handleBeforeRemove() {
                const result = await this.$confirm('确定删除该图片？', '删除图片', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showCancelButton: true,
                    type: 'warning'
                }).catch(err => err)
                if (result !== 'confirm') {
                    // 取消删除图片
                    this.$message.info("取消删除")
                    return new Promise((resolve, reject) => reject)
                }
            },
            async reply() {
                const confirmResult = await this.$confirm('确认回复内容?', '工单处理', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showCancelButton: true,
                    type: 'info'
                }).catch(err => err)
                if (confirmResult !== 'confirm') {
                    return
                }
                this.$refs.upload.submit()
                this.$message.success("回复成功")
                this.$router.back()
            },
            backLast() {
                this.$router.back()
            }
        },
    }
</script>

<style lang="less" scoped>
    .reply {
        padding: 20px;
    }

    .el-card {
        margin-top: 15px;
        height: 100%;

        /deep/ .el-divider--horizontal {
            background-color: #C7D7EE;
        }

        .order-header {
            .el-col {
                display: flex;
                padding: 10px;
                justify-content: center;
                font-size: 13px;
            }
        }

        .order-content {
            margin-top: 15px;
            font-size: 14px;

            /deep/ .el-textarea__inner {
                margin: 20px 0;
                width: 700px;
                background-color: #f6f6f6;
            }

            /deep/ .viewer {
                img {
                    margin: 20px 10px;
                }

                img:first-child {
                    margin-left: 0;
                }
            }
        }

        .order-reply {
            /deep/ .el-textarea__inner {
                width: 700px;
                height: 100px;
                margin: 20px 0;
                background-color: #f6f6f6;
            }

            /deep/ .el-icon-upload {
                vertical-align: middle;
            }

            /deep/ .el-upload__tip {
                width: 150px;
                text-align: center;
            }
        }
    }

    .footer-btn {
        margin-top: 15px;
        flex: 1;
        text-align: right;

        /deep/ .btn-reply {
            width: 100px;
            background-color: #849FC4;
            border: 1px solid #cccccc;
        }

        /deep/ .btn-back {
            width: 100px;
            background-color: #DFA583;
            border: 1px solid #cccccc;
            margin-left: 20px;
        }

    }
</style>
