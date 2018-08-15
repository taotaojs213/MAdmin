function getTextInput(){
    alert("111111");
}

function getStaffButton(){
    var str = '<button type="button" class="btn btn-danger btn-xs mbs edit"><i class="fa fa-trash-o"></i> 修改</button>   '
    str += '<button type="button" class="btn btn-danger btn-xs mbs delete"><i class="fa fa-trash-o"></i> 删除</button>   '
    str += '<button type="button" class="btn btn-danger btn-xs mbs reset"><i class="fa fa-trash-o"></i> 重置密码</button>   '
    str += '<button type="button" class="btn btn-danger btn-xs mbs unbind"><i class="fa fa-trash-o"></i> 解绑</button>   '
    return str;
}

function getStaffButtonSave(){
    var str = '<button type="button" class="btn btn-danger btn-xs mbs edit"><i class="fa fa-trash-o"></i> 保存</button>   '
    str += '<button type="button" class="btn btn-danger btn-xs mbs cancel"><i class="fa fa-trash-o"></i> 取消</button>   '
    return str;
}

function getStateSelect(state){
    stateSelect = '<select class="form-control">';
    if(state == 0){
        stateSelect += '<option value="0" selected>未完成</option>';
        stateSelect += '<option value="1">已完成</option>';
        stateSelect += '<option value="-1">中断</option>';
    }else if(state == 1){
        stateSelect += '<option value="0">未完成</option>';
        stateSelect += '<option value="1" selected>已完成</option>';
        stateSelect += '<option value="-1">中断</option>';
    }else if(state == -1){
        stateSelect += '<option value="0">未完成</option>';
        stateSelect += '<option value="1">已完成</option>';
        stateSelect += '<option value="-1" selected>中断</option>';
    }else{
        stateSelect += '<option value="0">未完成</option>';
        stateSelect += '<option value="1">已完成</option>';
        stateSelect += '<option value="-1">中断</option>';
    }
    stateSelect += '</select>';
    return stateSelect;
}

function getAddStaffForm(){
    var str = '<form action=":javaScript" class="form-horizontal form-bordered">';
    str += '    <div class="form-body">';
    str += '        <div class="form-group">';
    str += '            <label for="" class="col-md-3 control-label">项目名称：</label>';
    str += '            <div class="col-md-6">';
    str += '                <input id="add_staffName" type="text" value="" placeholder="以项目地点自定义" class="form-control" />';
    str += '            </div>';
    str += '        </div>';
    str += '        <div class="form-group">';
    str += '            <label for="" class="col-md-3 control-label">项目编号：</label>';
    str += '            <div class="col-md-6">';
    str += '                <input id="add_staffNo" type="text" value="" placeholder="大于八位" class="form-control" />';
    str += '            </div>';
    str += '        </div>';
    str += '        <div class="form-group">';
    str += '            <label for="" class="col-md-3 control-label">项目密码：</label>';
    str += '            <div class="col-md-6">';
    str += '                <input id="add_staffPwd" type="text" value="" placeholder="大于八位" class="form-control" />';
    str += '            </div>';
    str += '        </div>';
    //str += '        <div class="form-group">';
    //str += '            <label for="" class="col-md-3 control-label"></label>';
    //str += '            <div class="col-md-9">';
    //str += '                <button id="add_staff_cancel" onClick="addStaffCancel(e)" type="button" class="btn btn-primary">取消</button>';
    //str += '                <button id="add_staff_submit" onClick="addStaffSubmit(e)" type="button" class="btn btn-success">提交</button>';
    //str += '            </div>';
    //str += '        </div>';
    str += '    </div>';
    str += '</form>';
    return str;
}

function getInputLeftMsg(msg){
    var str = '';
    str += '<span class="text-warning mts help-block-right text-msg-warning">';
    str += msg;
    str += '</span>';
    return str;
}