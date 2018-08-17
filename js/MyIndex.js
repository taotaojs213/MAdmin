$(function(){
    var cookie = $.cookie('uAdminCookie');
    
    $.ajax({
        url:'https://www.ntjingui.cn/user/cookie',
        type: "GET",
        cache: false,
        async: true,
        data: {
            cookie: cookie
        },
        success: function(obj){
            if(obj.success == 1){
                showIndex();
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

})

function showIndex (){
    var staffList = getActivityStaff();
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