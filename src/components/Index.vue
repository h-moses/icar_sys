<template>
    <div class="index">
        <el-card>

        </el-card>
    </div>
</template>

<script>
    import * as echarts from 'echarts'
    export default {
        name: "Index",
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
.index {
    width: 100%;
    height: 100%;
}
</style>
