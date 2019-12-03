<template>
    <div class="text-center">
        list---------
        <br />
        <img :src="require('../../assets/img/icon-thumb.png')" />
        <div class="layout" style="width:500px;">
            <div id="mainBusiness" :style="{width: '100%', height: '250px'}"></div>
        </div>
    </div>
</template>

<script>
import Highcharts from 'highcharts';
import { login } from '../../service/getData';

export default {
    data () {
        return {
            mainBusiness: {
                x: [2014, 2015, 2016, 2017, 2018],
                y: [{
                    name: '总收入',
                    data: [70, 96, 140, 178, 227],
                    width: 32,
                    bottom: 40
                }]
            }
        }
    },
    mounted () {
        this.setHbar('mainBusiness', '', this.mainBusiness.x, this.mainBusiness.y[0].data,);
    },
    methods: {
        setHbar(id, title, xdata,ydata ) {
            this.setHbarOption(id, title, xdata,ydata);
        },
        setHbarOption(id, title, xdata,ydata,) {

            let chart = Highcharts.chart(id, {
                chart: {
                    type: 'column',
                    options3d: {
                        enabled: true,
                        alpha: 10,
                        beta: 0,
                        depth: 30,
                        viewDistance: 25,
                        fitToPlot:true,
                    },
                    backgroundColor: 'transparent',
                    style: {
                        color: '#ddd',
                        fontSize: '20px'
                    },
                },
                credits:{               //去掉水印
                    enabled: false
                },
                title: {
                    text: title,
                    style:{
                        color:'#ddd'
                    }
                },
                // subtitle: {
                //     text: '可通过滑动下方滑块测试'
                // },
                plotOptions: {
                    column: {
                        depth: 50
                    }
                },
                // colors: colors,
                xAxis: {
                    gridLineWidth:0, //去掉x轴方向的横线
                    categories:xdata,
                    // gridLineColor:'transparent',  //网格颜色
                    labels:{
                        style:{
                            color:'#ddd'
                        }
                    },
                    // lineColor:'red'
                    // gridLineDashStyle: 'longdash'  //网格样式
                },
                
                yAxis: {
                    // gridLineWidth: 0,//去掉y轴方向的横线
                    title: {
                        text: '（亿元）',
                        style:{
                            color:'#ddd',
                            fontSize:'12'
                        }
                    },
                    // gridLineColor: 'transparent',
                    labels:{
                        style:{
                            color:'#ddd'
                        }
                    },
                },
                series: [{
                    name:'',
                    data: ydata,
                }],
               legend:{
                   enabled: false,
                //    backgroundColor:'red'
                   itemStyle: {
                        color: '#ddd'
                    },
                    itemHoverStyle: {
                        color: '#ddd'
                    },
               },
               tooltip:{
                   animation:true,
                   backgroundColor:'transparent',
                //    followPointer:true,  //跟随鼠标
                    style:{
                        color:'#ddd'
                    }
               }
            });
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>