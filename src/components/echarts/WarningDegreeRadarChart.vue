<template>
    <div :class="className" :style="{width: width,height: height}"></div>
</template>

<script>
    import echarts from 'echarts'
    // import * as echarts from 'echarts/core'
    require('echarts/theme/macarons')
    // import {TitleComponent,TooltipComponent,LegendComponent} from 'echarts/components'
    // import {RadarChart} from 'echarts/charts'
    // import {CanvasRenderer} from 'echarts/renderers'
    import resize from "./mixins/resize";
    // echarts.use([TitleComponent,TooltipComponent,LegendComponent,RadarChart,CanvasRenderer])

    const animationDuration = 3000

    export default {
        name: "WarningDegreeRadarChart",
        mixins:[resize],
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
            }
        },
        data() {
            return {
                chart: null
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initRadar()
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
            async getDegreeData() {

            },
            initRadar() {
                this.chart = echarts.init(this.$el,'macarons')
                let option;

                option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        show: true,
                        trigger:'item',
                        formatter:function (params) {
                            let res = params.name + "<br/>";
                            for (let i = 0; i < params.value.length; i++) {
                                res += params.value[i] + "<br/>"
                            }
                            console.log(res)
                            return res
                        }
                    },
                    radar: {
                        shape: 'circle',
                        axisName: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#061437',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: [
                            { name: '一级', max: 6500},
                            { name: '二级', max: 16000},
                            { name: '三级', max: 30000},
                            { name: '四级', max: 38000},

                        ]
                    },
                    series: [{
                        name: '预算 vs 开销（Budget vs spending）',
                        type: 'radar',
                        areaStyle: {normal:{}},
                        data: [
                            {
                                value: [4300, 10000, 28000, 35000],
                                name: '预算分配'
                            },
                            {
                                value: [5000, 14000, 28000, 31000],
                                name: '实际开销'
                            }
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
