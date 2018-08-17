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

function getIndexTable(data){
    var tableData = data.data;
    var tableName = data.tableName;
    var str = '';
    str += '<table class="table table-hover">';
    str += '    <thead><tr>';
    str += '            <th>#</th>';
    tableName.forEach(function(value){
        str += '            <th>' + value + '</th>';
    })
    str += '    </tr></thead>';
    str += '    <tbody>';
    tableData.forEach(function(value,index){
        str += '        <tr>';
        str += '            <td>' + ++index + '</td>';
        str += '            <td>' + timeFormat(new Date(value[0])) + '</td>';
        str += '            <td>' + value[1] + '</td>';
        str += '            <td>' + value[2] + '</td>';
        str += '            <td>' + value[3] + '</td>';
        str += '            <td><span class="label label-sm label-success">查看详情</span></td>';
        str += '        </tr>';
    })
    str += '    </tbody>';
    str += '</table>';
    return str;
}

/* 使用编号创建一个首页panel框
 * no：唯一编号
 * title：Panel标题
 * style：Panel样式
 */
function getIndexPanel(data){
    var index = data.no
    var title = data.title
    var style = data.style;
    var str = '';
    str += '<div class="col-lg-6">';
    str += '<div class="panel ' + style + '">';
    str += '    <div class="panel-heading clearfix"><span class="mts pull-left">' + title + '</span>';
    str += '        <div class="toolbars">';
    str += '            <div class="btn-group mts"><a href="javascript:;"><i class="fa fa-cogs"></i></a><a href="javascript:;"><i class="fa fa-edit"></i></a><a href="javascript:;"><i class="fa fa-download"></i></a><a href="javascript:;"><i class="fa fa-paperclip"></i></a></div>';
    str += '        </div>';
    str += '    </div>';
    str += '    <div class="panel-body">';
    str += '        <div id="dossier' + index + '" style="width: 100%; height:300px"></div>';
    str += '    </div>';
    str += '    <div class="panel-body">';
    str += '       <div id="dossierTable' + index + '"></div>';
    str += '    </div>';
    str += '</div>';
    str += '</div>';
    return str;
}