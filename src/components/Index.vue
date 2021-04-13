<template>
    <div class="index">
        <dv-loading v-if="this.loading">Loading...</dv-loading>
        <el-col v-else>
            <div class="header">
                <div class="header-top">
                    <span>驭鹰数据平台</span>
                </div>
                <div class="header-center">
                    <!--         <img src="../assets/header.png" alt=""/>-->
                    <dv-decoration-8 :reverse="true" style="width:300px;height:50px;"/>
                    <dv-decoration-2 style="width:200px;height:5px;"/>
                    <dv-decoration-5 style="width:300px;height:40px;"/>
                    <dv-decoration-2 style="width:200px;height:5px; transform: rotateY(180deg)"/>
                    <dv-decoration-8 style="width:300px;height:50px;"/>
                </div>
                <div class="header-bottom">
                    <dv-decoration-10 class="dot-line" style="width:30%;height:5px;"/>
                    <dv-decoration-10 class="dot-line" style="width:30%;height:5px; transform: rotateY(180deg)"/>
                </div>
            </div>
            <div class="main">
                <el-row>
                    <div class="left">
                        <el-col>
                            <dv-decoration-11 class="title-degree">风险等级</dv-decoration-11>
                            <warning-degree-radar-chart class="degree-radar" style="width: 80%" :chart-data="radarMap"></warning-degree-radar-chart>
                            <dv-decoration-11 class="title-user-number">用户走势图</dv-decoration-11>
                            <warning-number-line-chart class="line-user-number" style="width: 95%;height: 230px" :chart-data="this.userTrend"></warning-number-line-chart>
                        </el-col>
                    </div>
                    <div class="center">
                        <el-col>
                            <el-row>
                                <dv-border-box-8 class="border-text">
                                    <div class="inner-text inner-title">用户总人数</div>
                                    <div class="inner-text inner-content">{{this.userSize}}</div>
                                </dv-border-box-8>
                                <dv-border-box-8 class="border-text">
                                    <div class="inner-text inner-title">当天预警数</div>
                                    <div class="inner-text inner-content">{{this.todaySize}}</div>
                                </dv-border-box-8>
                                <dv-border-box-8 class="border-text">
                                    <div class="inner-text inner-title">预警总数</div>
                                    <div class="inner-text inner-content">{{this.alarmSize}}</div>
                                </dv-border-box-8>
                            </el-row>
                            <vue-core-video-player class="video-player" src="https://car-recognition.oss-cn-beijing.aliyuncs.com/detect.mp4"></vue-core-video-player>
                            <dv-decoration-11 class="title-number">预警走势图</dv-decoration-11>
                            <warning-number-line-chart class="warning-line" style="height: 230px" :chart-data="this.alarmTrend"></warning-number-line-chart>
                        </el-col>
                    </div>
                    <div class="right">
                        <el-col>
                            <dv-decoration-11 class="title-board">实时预警事件</dv-decoration-11>
                            <scroll-board class-name="warning_board" :data-config="latestWarning"/>
                            <dv-decoration-11 class="title-rank">预警数城市排行</dv-decoration-11>
                                <dv-capsule-chart :config="config" class="warning-rank"/>
                        </el-col>
                    </div>
                </el-row>
            </div>
        </el-col>
    </div>
</template>

<script>
   import Vue from 'vue'
   import dataV from '@jiaminghi/data-view'
   import WarningDegreeRadarChart from "./echarts/WarningDegreeRadarChart"
   import WarningNumberLineChart from "./echarts/WarningNumberLineChart"
   import VueCoreVideoPlayer from 'vue-core-video-player'
   import ScrollBoard from "./echarts/ScrollBoard";

   Vue.use(dataV)
   Vue.use(VueCoreVideoPlayer)
    export default {
        name: "Index",
        components: {ScrollBoard, WarningNumberLineChart, WarningDegreeRadarChart},
        data() {
            return {
                loading: true,
                config: {
                    data: [
                        {
                            name: '上海',
                            value: 1670
                        },
                        {
                            name: '北京',
                            value: 1230
                        },
                        {
                            name: '杭州',
                            value: 980
                        },
                        {
                            name: '南京',
                            value: 750
                        },
                        {
                            name: '湘潭',
                            value: 660
                        },
                    ],
                    unit: '起',
                    showValue: true
                },
                userSize: 0,
                userTrend: [],
                todaySize: 0,
                alarmTrend: [],
                alarmSize: 0,
                latestWarning: undefined,
                radarMap: {},
            }
        },
        created() {
            this.getData()
        },
        methods: {
            async getData() {
                const {data:res} = await this.$http.post('screenInfo')
                if (res.code !== 200) {
                    return this.$message.error("获取数据失败")
                }
                this.userSize = res.data.userSize
                this.userTrend = res.data.userList
                this.todaySize = res.data.todaySize
                this.alarmTrend = res.data.alarmList
                this.alarmSize = res.data.alarmSize
                this.latestWarning = res.data.list
                this.radarMap = res.data.map
                this.loading = false
            }
        }
    }
</script>

<style lang="less" scoped>
    .index {
        position: relative;
        height: 100%;
        display: flex;
        background-color: #061437;

        .header {
            /deep/ .header-top {
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: center;
                font-size: 30px;
                background-image: linear-gradient(135deg, white, dodgerblue);
                -webkit-background-clip: text;
                color: transparent;
            }

            /deep/ .header-center {
                position: relative;
                padding: 0 10px;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
            }

            /deep/ .header-bottom {
                position: relative;
                padding-top: 5px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
        }

        .main {
            padding-top: 10px;

            .left {
                position: absolute;
                width: 30%;
                display: flex;
                flex-direction: column;
                align-items: center;

                /deep/ .title-degree {
                    width: 200px;
                    height: 50px;
                    font-size: 17px;
                    color: white;
                    margin: 0 0 20px 0;
                }

                /deep/ .degree-radar {
                    margin: 0;
                }

                /deep/ .title-user-number {
                    width: 200px;
                    height: 50px;
                    font-size: 17px;
                    color: white;
                    margin: 20px 0 0 0
                }

            }

            .center {
                position: absolute;
                margin: 0 0 0 25%;
                width: 50%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: flex-start;

                /deep/ .border-text {
                    display: inline-flex;
                    width: 200px;
                    height: 100px;

                    .inner-text {
                        margin: 10px;
                        font-size: 20px;
                        font-weight: bold;
                        font-family: 微软雅黑 serif;
                        background-image: linear-gradient(135deg, #EDE8FE, #5498FD);
                        -webkit-background-clip: text;
                        color: transparent;
                    }

                    .inner-content {
                        margin-top: 5px;
                        margin-left: 20px;
                        font-size: 30px;
                        text-shadow: 0 0 1.5rem #2DF0FF;
                    }
                }

                /deep/ .border-text:not(:first-child) {
                    margin-left: 20px;
                }

                .video-player {
                    width: 640px;
                    height: 220px;
                    margin: 10px 50px 0 0;
                }

                /deep/ .title-number {
                    width: 200px;
                    height: 50px;
                    font-size: 17px;
                    color: white;
                    margin: 10px 0 0 30px
                }
            }

            .right {
                position: absolute;
                margin-left: 73%;
                width: 25%;
                height: 100%;
                justify-content: center;

                /deep/ .title-board {
                    width: 200px;
                    height: 50px;
                    font-size: 17px;
                    color: white;
                    margin: 0 0 20px 0;
                }

                .dv-scroll-board {
                    width: 97%;
                    height: 250px;
                }

                /deep/ .title-rank {
                    width: 200px;
                    height: 50px;
                    font-size: 17px;
                    color: white;
                    margin: 20px 0 0 0;
                }

                /deep/ .warning-rank {
                    width: 95%;
                    height: 220px;
                }

            }
        }
    }
</style>
