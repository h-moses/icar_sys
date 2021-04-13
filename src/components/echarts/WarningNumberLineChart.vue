<template>
    <div :class="className" :style="{width: width,height: height}"></div>
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons')

    export default {
        name: "WarningNumberLineChart",
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
                type:Array,
                default: null
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initChart()
            })
        },
        data() {
          return {
              chart: null,
              months: [],
              nums: []
          }
        },
        watch: {
            chartData: {
                deep: true,
                handler(val) {
                    this.setOption(val)
                }
            }
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
                this.setOptions(this.chartData)
            },
            setOptions(val) {
                let option;

                for (let i = 0;i < val.length;++i) {
                    this.months.push(val[i].month + '月')
                    this.nums.push(val[i].num)
                }
                option = {
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.months
                    },
                    yAxis: {
                        type: 'value'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        },
                        formatter: '{a} <br/>{b} : {c}'
                    },
                    toolbox: {
                        show: true,
                        itemGap: 5,
                        top:'20',
                        right:'60',
                        feature: {
                            magicType: {
                                type: ['line', 'bar']
                            },
                            restore: {},
                            saveAsImage: {
                                name:'预警走势',
                            }
                        }
                    },
                    series: [{
                        name: '预警数量',
                        data: this.nums,
                        type: 'line',
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x:0,
                                y:0,
                                x2:0,
                                y2:1,
                                colorStops: [{
                                    offset:0,color:'#2DF0FF'
                                },{
                                    offset:1,color:'rgba(255,255,255,0)'
                                }
                                ],
                                global:false
                            }
                        },
                        animationDuration: 2800,
                        animationEasing: 'cubicInOut'
                    }]
                };

                if (option && typeof option === 'object') {
                    this.chart.setOption(option)
                }
            }
        }
    }
</script>

<style lang="less" scoped>
</style>
