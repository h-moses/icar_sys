<template>
    <dv-scroll-board :class="className" :config="chartData" :dataConfig="dataConfig"></dv-scroll-board>
</template>

<script>
    import Vue from 'vue'
    import dataV from '@jiaminghi/data-view'
    Vue.use(dataV)

    export default {
        name: "ScrollBoard",
        props: {
            className: {
                type: String,
                required: true
            },
            dataConfig: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                chartData: {
                    header: ['用户', '描述', '距离', '风险'],
                    data: this.dataConfig,
                    align: ['center','center','center','center'],
                    columnWidth: [100,200,90,100],
                    headerBGC: 'transparent',
                    oddRowBGC: 'transparent',
                    evenRowBGC: '#2B3043',
                    rowNum: 6,
                },
            }
        },
        watch: {
            dataConfig: {
                deep: true,
                handler(val) {
                    this.chartData.data = val
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    dv-scroll-board {
        width: 100%;
        height: 250px;
    }
</style>
