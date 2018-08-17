/** 随机生成十六进制颜色 */
function randomHexColor() { 
    return '#' + ('00000' + (Math.random() * 0x082015 << 0).toString(16)).substr(-6);
}

/** 创建两条数据的折线图 */
function newTwoDataChartLine(data){
    if(data.name == undefined){
        return console.log("name参数不能为空！")
    }
    var name = data.name;
    if(data.color1 == undefined){
        data.color1 = randomHexColor()
    }
    if(data.color2 == undefined){
        data.color2 = randomHexColor()
    }
    console.log(data.data1)
    console.log(data.data2)
    //var data2 = data.data2
    //var data22 = [["",data2[0][1]],["周一",data2[1][1]],["周二",data2[2][1]],["周三",data2[3][1]],["周四",data2[4][1]],["周五",data2[5][1]],["周六",data2[6][1]],["周日",-1]]
    //console.log(data22)
    $.plot("#dossier"+name, [{
        data: data.data1,
        label: "上周记录",
        color: data.color1
    },{
        data: data.data2,
        label: "本周记录",
        color: data.color2
    }], {
        series: {
            lines: {
                show: !1
            },
            splines: {
                show: !0,
                tension: .3,
                lineWidth: 2,
                fill: .6
            },
            points: {
                show: !0,
                radius: 4
            }
        },
        grid: {
            borderColor: "#fafafa",
            borderWidth: 1,
            hoverable: !0
        },
        tooltip: !0,
        tooltipOpts: {
            content: "%x : %y",
            defaultTheme: false
        },
        xaxis: {
            tickColor: "#fafafa",
            mode: "categories"
        },
        yaxis: {
            tickColor: "#fafafa"
        },
        shadowSize: 0
    });
    //END AREA CHART SPLINE
}
