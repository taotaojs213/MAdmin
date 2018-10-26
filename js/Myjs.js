var webUrl = 'http://localhost:8090/'

function sleep(d){
    for(var t = Date.now();Date.now() - t <= d;);
}

function addStaff(no, name, pwd, staffList){
    console.log(no);
    console.log(name);
    console.log(pwd);
    console.log(staffList);
    var flag = false;
    $.ajax({
        url: webUrl + 'staff/add',
        type: "GET",
        cache: false,
        async: false,
        data: {
            staffNo: no,
            staffName: name,
            staffPwd: pwd,
            texts: staffList
        },
        success: function(obj){
            if(obj.success == 1){
                toastr.success('添加成功！')
                flag = true;
            }else{
                alert(obj.msg);
                flag = false;
            }
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
        url: webUrl + 'staff/update',
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
            if(obj.success == 1){
                bootbox.alert({
                    title: '提示',
                    message: "修改成功！",
                    backdrop: true,
                });
                flag = true;
            }else{
                bootbox.alert({
                    title: '错误',
                    message: obj.msg,
                    backdrop: true,
                });
                flag = false;
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

    return flag;
}

function deleteStaff(id){
    var flag = false;
    console.log(id)
    $.ajax({
        url: webUrl + 'staff/delete',
        type: "GET",
        cache: false,
        async: false,
        data: {
            id: id,
        },
        success: function(obj){
            if(obj.success == 1){
                toastr.success('删除成功！')
                flag = true;
            }else{
                toastr.error(obj.msg,'删除失败')
            }
            
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
        url: webUrl + 'staff/update',
        type: "GET",
        cache: false,
        async: false,
        data: {
            id: id,
            staffPwd: pwd
        },
        success: function(obj){
            if(obj.success == 1){
                toastr.success('修改密码成功！')
                flag = true;
            }else{
                toastr.error(obj.msg,'修改密码失败')
            }
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
        url: webUrl + 'staff/update',
        type: "GET",
        cache: false,
        async: false,
        data: {
            id: id,
            staffOpenid: ''
        },
        success: function(obj){
            if(obj.success == 1){
                toastr.success('解绑成功！')
                flag = true;
            }else{
                toastr.error(obj.msg,'解绑失败')
            }
        },
        error: function(d,msg){
            toastr.error(msg,'解绑失败')
        }
    })

    return flag;
}

function getLastWeekDossier(staffId, staffNo){
    //console.log(staffId);
    var flag = null;
    $.ajax({
        url: webUrl + 'dossier/findLastWeekDossier',
        type: "GET",
        cache: false,
        async: false,
        data: {
            staffId: staffId
        },
        success: function(success){
            //console.log(success)
            if(success.success == 1){
                var lastList = new Map();
                var laterList = new Map();
                lastList.set('周一',0);lastList.set('周二',0);lastList.set('周三',0);lastList.set('周四',0);lastList.set('周五',0);lastList.set('周六',0);lastList.set('周日',0);
                laterList.set('周一',0);laterList.set('周二',0);laterList.set('周三',0);laterList.set('周四',0);laterList.set('周五',0);laterList.set('周六',0);laterList.set('周日',0);
                var list = []
                var dateFlag = dateToTimestamp(getFirstDayOfWeek(new Date()));
                var obj = success.object
                //console.log(obj);
                obj.forEach(function(value, index){
                    value.sum = value.luRu + value.qieTu + value.saoMiao;
                    if(value.createDate >= dateFlag){
                        list.push([value.createDate,value.luRu,value.qieTu,value.saoMiao])
                        //list.push(new Map(['创建日期', value.createDate],['录入', value.luRu],['切图', value.qieTu],['扫描', value.saoMiao]))
                        laterList.set(timestampToWeek(value.createDate),value.sum)
                    }else{
                        lastList.set(timestampToWeek(value.createDate),value.sum)
                    }
                    
                })
                //console.log(list);
                $('#dossierTable'+staffNo).append(getIndexTable({
                    data: list,
                    tableName: ['创建日期','录入','切图','扫描']
                }));
                var chartData = [];
                var temp = new Array();
                for (var [key, value] of lastList) {
                    temp.push([key, value])
                }
                chartData.push(temp)
                temp = new Array();
                for (var [key, value] of laterList) {
                    temp.push([key, value])
                }
                chartData.push(temp)
                flag = chartData;
            }else{
                alert(success.msg);
            }
        },
        error: function(d,msg){
            toastr.error('msg','添加失败')
        }
    })
    return flag;
}


//index=======================================================
//index=======================================================
function getActivityStaff(){
    var flag = false;
    $.ajax({
        url: webUrl + 'staff/findByObjList',
        type: "GET",
        cache: false,
        async: false,
        timeout : 10000,
        data: {
            staffState: 0,
        },
        success: function(obj){
            //console.log(obj)
            if(obj.success == 1){
                flag = obj.object;
            }else{
                bootbox.alert({
                    title: '错误提示',
                    message: obj.msg,
                });
            }
        },
        error: function(d,msg){
            bootbox.alert({
                title: '错误提示',
                message: '获取服务器信息出错，请刷新重试或联系管理员',
            });
        }
    })
    return flag;
}

function getStaff(id){
    var flag;
    $.ajax({
        url: webUrl + 'staff/getStaff',
        type: "GET",
        cache: false,
        async: false,
        timeout : 10000,
        data: {
            id: id,
        },
        success: function(obj){
            console.log(obj)
            if(obj.success == 1){
                flag = obj.object;
            }else{
                bootbox.alert({
                    title: '错误提示',
                    message: obj.msg,
                });
            }
        },
        error: function(d,msg){
            bootbox.alert({
                title: '错误提示',
                message: '获取服务器信息出错，请刷新重试或联系管理员',
            });
        }
    })
    return flag[0];
}