$(function(){
    var cookie = $.cookie('uAdminCookie');
    console.log(cookie);
    if(cookie!=undefined){
        $.ajax({
            //url:'https://www.ntjingui.cn/cookie',
            url:'http://localhost:8090/cookie',
            type: "GET",
            cache: false,
            async: true,
            data: {
                cookie: cookie
            },
            success: function(obj){
                if(obj.success == 1){
                    //showIndex();
                }else{
                    alert(obj.msg)
                    location.href="/login.html"
                }
            },
            error: function(d,msg){
                bootbox.alert({
                    title: '错误',
                    message: msg,
                    backdrop: true,
                });
            }
        })
    }else{
        alert("请先登录！")
        location.href="/login.html"
    }
})

function showIndex (){
    var staffList = getActivityStaff();
    console.log(staffList);
    var chartData;
    staffList.forEach(function(value, index){
        $('#page-wrapper .page-content .row').append(getIndexPanel({
            no: value.staffNo,
            title: value.staffName,
            style: "panel-green"
        }));
        chartData = getLastWeekDossier(value.id, value.staffNo);//staffId,staffNo
        newTwoDataChartLine({
            name: value.staffNo,
            data1: chartData[0],
            data2: chartData[1],

        })
    })
}