$(function (){
    var leftChart = echarts.init(document.querySelector('.echarts_left'));
    var option = {
        // 大标题
        title: {
            text: '2017年注册人数'
        },
        tooltip : {},
        // 图例, 用于解释说明的
        legend: {
            data:['人数', '销量']
        },
        // grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true
        // },
        xAxis : [
            {
                type : 'category',
                data: ["1月","2月","3月","4月","5月","6月"]
            }
        ],
         // y轴的刻度是根据数据自动生成的
        yAxis: {},

        series : [
            {
                name:'人数',
                 // type: 设置图表的类型   bar 柱状图  line 折线图 pie 饼图
                type:'bar',
                data: [500, 202, 360, 1000, 800, 600]
            },
            {
                name: '销量',
                type: 'bar',
                data: [1500, 1202, 1360, 600, 400, 700]
            },
        ]
    };
    leftChart.setOption(option);


    var rightChart = echarts.init(document.querySelector('.echarts_right'));
    var option1 = {
        title : {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x:'center',
      
            // 标题样式
            textStyle: {
              // 颜色
              color: "red",
              // 字体大小
              fontSize: 25
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','新百伦','阿迪王','李宁']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'新百伦'},
                    {value:135, name:'阿迪王'},
                    {value:1548, name:'李宁'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    

    rightChart.setOption(option1);
})