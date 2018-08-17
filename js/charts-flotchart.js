$(function () {


    //BEGIN BAR CHART
    var d3 = [["Jan", 93],["Feb", 78],["Mar", 47],["Apr", 35],["May", 48],["Jun", 26],["Jul", 49],["Aug", 96],["Sep", 54],["Oct", 99],["Nov", 92],["Dec", 43]];
    $.plot("#bar-chart", [{
        data: d3,
        label: "Revenue",
        color: "#01b6ad"
    }], {
        series: {
            bars: {
                align: "center",
                lineWidth: 0,
                show: !0,
                barWidth: .6,
                fill: .9
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
    //END BAR CHART

    //BEGIN BAR CHART STACK
    var d4_1 = [["Jan", 126],["Feb", 73],["Mar", 94],["Apr", 54],["May", 92],["Jun", 141],["Jul", 29],["Aug", 44],["Sep", 30],["Oct", 40],["Nov", 67],["Dec", 92]];
    var d4_2 = [["Jan", 58],["Feb", 61],["Mar", 46],["Apr", 35],["May", 55],["Jun", 46],["Jul", 57],["Aug", 80],["Sep", 100],["Oct", 91],["Nov", 35],["Dec", 57]];
    $.plot("#bar-chart-stack", [{
        data: d4_1,
        label: "New Visitor",
        color: "#3DB9D3"
    },{
        data: d4_2,
        label: "Returning Visitor",
        color: "#ffce54"
    }], {
        series: {
            stack: !0,
            bars: {
                align: "center",
                lineWidth: 0,
                show: !0,
                barWidth: .6,
                fill: .9
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
    //END BAR CHART STACK

    //BEGIN AREA CHART
    var d5_1 = [["Jan", 35],["Feb", 60],["Mar", 85],["Apr", 46],["May", 99],["Jun", 82],["Jul", 96]];
    var d5_2 = [["Jan", 47],["Feb", 74],["Mar", 36],["Apr", 83],["May", 39],["Jun", 10],["Jul", 51]];
    $.plot("#area-chart", [{
        data: d5_1,
        label: "New Visitor",
        color: "#ffce54"
    },{
        data: d5_2,
        label: "Returning Visitor",
        color: "#87318c"
    }], {
        series: {
            lines: {
                show: !0,
                fill: .8
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
    //END AREA CHART

    //BEGIN AREA CHART SPLINE
    var d6_1 = [["Jan", 67],["Feb", 91],["Mar", 36],["Apr", 150],["May", 28],["Jun", 123],["Jul", 38]];
    var d6_2 = [["Jan", 59],["Feb", 49],["Mar", 45],["Apr", 94],["May", 76],["Jun", 22],["Jul", 31]];
    $.plot("#area-chart-spline", [{
        data: d6_1,
        label: "New Visitor",
        color: "#a01518"
    },{
        data: d6_2,
        label: "Returning Visitor",
        color: "#01b6ad"
    }], {
        series: {
            lines: {
                show: !1
            },
            splines: {
                show: !0,
                tension: .4,
                lineWidth: 2,
                fill: .8
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


});

