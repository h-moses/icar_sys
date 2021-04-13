<template>
    <div :class="className" :style="{width: width,height: height}"></div>
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons')

    const animationDuration = 3000

    export default {
        name: "WarningDegreeRadarChart",
        props:{
            className: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default:'100%'
            },
            height: {
                type:String,
                default: '250px'
            },
            chartData: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                chart: null,
            }
        },
        watch: {
            chartData: {
                deep: true,
                handler() {
                    this.setOption()
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initChart()
            })
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        methods: {
            initChart() {
                this.chart = echarts.init(this.$el, 'macarons')
                this.setOptions()
            },
            setOptions() {
                let option;

                option = {
                    tooltip: {
                        show: true,
                        trigger:'item',
                        formatter:function (params) {
                            let res = params.seriesName + '<br/>';
                            for (let i = 0; i < params.value.length; i++) {
                                res += params.name[i] + "：" + params.value[i] + "<br/>"
                            }
                            return res
                        }
                    },
                    radar: {
                        shape: 'circle',
                        splitNumber: 3,
                        axisName: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#061437',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: [
                            { name: '一级', max: 800},
                            { name: '二级', max: 800},
                            { name: '三级', max: 800},
                        ]
                    },
                    series: [{
                        name: '预警风险等级对比',
                        type: 'radar',
                        areaStyle: {normal:{}},
                        data: [
                            {
                                value: [this.chartData['oneDegree'],this.chartData['twoDegree'],this.chartData['threeDegree']],
                                name: ['一级','二级','三级']
                            },
                        ]
                    }],
                    animationDuration: animationDuration
                };

                option && this.chart.setOption(option)
            }
        }
    }
</script>

<style scoped>

</style>
