
function updateStaff(data){
    var flag = false;
    console.log(data)
    $.ajax({
        url:'http://127.0.0.1:8090/staff/update',
        type: "GET",
        cache: false,
        async: false,
        data: {
            data:data,
        },
        success: function(obj){
            bootbox.alert({
                title: '提示',
                message: "修改成功！",
                backdrop: true,
            });
            flag = true;
        },
        error: function(d,msg){
            bootbox.alert({
                title: '错误',
                message: msg,
                backdrop: true,
            });
        }
    })

    return flag;
}
