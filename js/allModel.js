function getTextInput(){
    alert("111111");
}

function getStaffButton(){
    var str = '<button type="button" class="btn btn-danger btn-xs mbs edit"><i class="fa fa-trash-o"></i> 修改</button>   '
    str += '<button type="button" class="btn btn-danger btn-xs mbs delete"><i class="fa fa-trash-o"></i> 删除</button>   '
    str += '<button type="button" class="btn btn-danger btn-xs mbs"><i class="fa fa-trash-o"></i> 重置密码</button>   '
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