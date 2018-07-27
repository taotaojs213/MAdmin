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