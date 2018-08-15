
function sleep(d){
    for(var t = Date.now();Date.now() - t <= d;);
}

function addStaff(no, name, pwd){
    console.log(no);
    console.log(name);
    console.log(pwd);
    var flag = false;
    $.ajax({
        url:'http://127.0.0.1:8090/staff/add',
        type: "GET",
        cache: false,
        async: false,
        data: {
            staffNo: no,
            staffName: name,
            staffPwd: pwd
        },
        success: function(obj){
            toastr.success('添加成功！')
            flag = true;
        },
        error: function(d,msg){
            toastr.error('msg','添加失败')
        }
    })
    return flag;
}

function updateStaff(data){
    var flag = false;
    console.log(JSON.stringify(data))
    console.log(data.staffState)
    var staffState = new Number(data.staffState);
    console.log(staffState)
    $.ajax({
        url:'http://127.0.0.1:8090/staff/update',
        type: "GET",
        cache: false,
        async: false,
        data: {
            id: data.id,
            staffNo: data.staffNo,
            staffPwd: data.staffPwd,
            staffOpenid: data.staffOpenid,
            staffName: data.staffName,
            staffState: staffState
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

function deleteStaff(id){
    var flag = false;
    console.log(id)
    $.ajax({
        url:'http://127.0.0.1:8090/staff/delete',
        type: "GET",
        cache: false,
        async: false,
        data: {
            id: id,
        },
        success: function(obj){
            toastr.success('删除成功！')
            flag = true;
        },
        error: function(d,msg){
            toastr.error('msg','删除失败')
        }
    })

    return flag;
}

function resetStaffPwd(id, pwd){
    var flag = false;
    console.log(id)
    console.log(pwd)
    $.ajax({
        url:'http://127.0.0.1:8090/staff/update',
        type: "GET",
        cache: false,
        async: false,
        data: {
            id: id,
            staffPwd: pwd
        },
        success: function(obj){
            toastr.success('修改密码成功！')
            flag = true;
        },
        error: function(d,msg){
            toastr.error(msg,'修改密码失败')
        }
    })

    return flag;
}

function unbindStaffWX(id){
    var flag = false;
    console.log(id)
    $.ajax({
        url:'http://127.0.0.1:8090/staff/update',
        type: "GET",
        cache: false,
        async: false,
        data: {
            id: id,
            staffOpenid: ''
        },
        success: function(obj){
            toastr.success('解绑成功！')
            flag = true;
        },
        error: function(d,msg){
            toastr.error(msg,'解绑失败')
        }
    })

    return flag;
}
