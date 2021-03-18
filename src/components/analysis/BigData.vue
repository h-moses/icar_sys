<template>
    <div class="big-data">
        <div id="main"></div>
    </div>
</template>

<script>
    import * as echarts from 'echarts'
    export default {
        name: "BigData",
        created() {
          this.initChart()
        },
        methods: {
            initChart() {
                var chartDom = document.getElementById(`main`)
                var chart = echarts.init(chartDom)
                var option = {

                }

                option && chart.setOption(option)
            }
        }
    }
</script>

<style lang="less" scoped>
.big-data {
    width: 100%;
    height: 100%;
}
</style>
