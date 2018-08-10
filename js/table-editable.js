$(function () {
    var table_lang = {
        "sProcessing": "处理中...",
        "sLengthMenu": "每页显示 _MENU_ 条记录",
        "sZeroRecords": "没有匹配结果",
        "sInfo": "<font color='#aaa'> 当前显示 _START_ - _END_ 项，共 _TOTAL_ 项。</font>",
        //"sInfo": "显示 _MENU_ 条 | 总共有 _TOTAL_ 条数据",
        "sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix": "",
        //"sSearch": "搜索",
        "sUrl": "",
        "sEmptyTable": "表中数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands": ",",
        "oPaginate": {
          "sFirst": "首页",
          "sPrevious": "上一页",
          "sNext": "下一页",
          "sLast": "末页",
          "sJump": "跳转"
        },
        "oAria": {
          "sSortAscending": ": 以升序排列此列",
          "sSortDescending": ": 以降序排列此列"
        }
    };
    var oTable;
    oTable = $('#example1').dataTable({
        language:table_lang,  // 提示信息
        pagingType: "simple_numbers",
        info: true,
        //processing: true,
        stateSave: false,//保存状态
        ajax: {
            url: 'http://127.0.0.1:8090/staff/findByObjList',
            type: 'GET',
            data: {
                staffState: 0,
            },
            dataSrc: function(result){
                //alert(result.object.length);
                
                return result.object;
            },
        },
        columns:[{
            data: 'id',
            title: "序号",
            sWidth: "30px",
            sClass: "text-tables-center",
            createdCell: function(nTd, sData, oData, iRow, iCol) {
                var startnum = this.api().page() * (this.api().page.info().length);
                $(nTd).html(iRow + 1 + startnum); //分页行号累加：$(nTd).html(iRow+1);
            }
        },{
            data: 'staffName',
            title: '项目名称',
        },{
            data: 'staffNo',
            title: '项目编号',
        },{
            data: 'staffOpenid',
            title: '绑定状态',
            render: function(data){
                var status = '';
                if(data == null || data == ''){
                    status = '未绑定';
                }else{
                    status = '已绑定';
                }
                return status;
            }
        },{
            data: 'staffState',
            title: '项目状态',
            render: function(data){
                var status = '';
                switch(data){
                    case 0: status = '未完成'; break;
                    case 1: status = '已完成'; break;
                }
                return status;
            }
        },{
            data: 'id',
            title: '操作',
            render: function(data){
                var dom = '';
                dom += '<td>';
                dom += '    <button type="button" class="btn btn-danger btn-xs mbs edit"><i class="fa fa-trash-o"></i> 修改</button>';
                dom += '    <button type="button" class="btn btn-danger btn-xs mbs delete"><i class="fa fa-trash-o"></i> 删除</button>';
                dom += '    <button type="button" class="btn btn-danger btn-xs mbs repassword"><i class="fa fa-trash-o"></i> 重置密码</button>';
                dom += '</td>';
                return dom;
            }
        },],
        // "infoCallback": function( settings, start, end, max, total, pre ) {
        //     return "显示 _MENU_ 条 | 总共有" + total +"条数据";
        // }
        
    });
    var nEditing = null;

    $('#example1').on('click', 'button.edit', function (e) {
        console.log(e);
        e.preventDefault();
        var nRow = $(this).parents('tr')[0];
        console.log(this.innerHTML);
        if (nEditing !== null && nEditing != nRow) {
            rollbackRow(oTable, nEditing);
            editRow(oTable, nRow);
            nEditing = nRow;
        } else if (nEditing == nRow && this.innerHTML == '<i class="fa fa-trash-o"></i> 保存') {
            saveRow(oTable, nEditing);
            nEditing = null;
        } else {
            editRow(oTable, nRow);
            nEditing = nRow;
        }
    });

    function editRow(oTable, nRow) {
        var aData = oTable.fnGetData(nRow);
        console.log(aData);
        var rTds = $('>td', nRow);
        var wxNameCheck, stateSelect;
        if(aData.staffOpenid == undefined || aData.staffOpenid == null || aData.staffOpenid == ''){
            wxNameCheck = '<input type="checkbox">'
        }else{
            wxNameCheck = '<input type="checkbox" checked="checkbox">';
        }
        
        rTds[0].innerHTML = aData.id;
        rTds[1].innerHTML = '<input type="text" class="form-control input-small" value="' + aData.staffName + '">';
        rTds[2].innerHTML = '<input type="text" class="form-control input-small" value="' + aData.staffNo + '">';
        rTds[3].innerHTML = wxNameCheck;
        rTds[4].innerHTML = getStateSelect(aData.staffState);
        rTds[5].innerHTML = getStaffButtonSave();
    }

    function saveRow(oTable, nRow) {
        var rInputs = $('input', nRow);
        var wxNameCheck, stateSelect;
        var aData = oTable.fnGetData(nRow);
        
        //console.log($("select", nRow).val());
        console.log($("select option:selected",nRow).text());
        var staffName = rInputs[0].value;
        var staffNo = rInputs[1].value;
        var wxNameCheck = $(rInputs[2]).is(':checked');
        var staffState = Number($('select', nRow).val())
        // if(aDatastaffOpenid)
        var data;
        // data.id = aData.id;
        // data.staffName = aData.staffName
        console.log(aData);
        if(updateStaff(aData)){
            //oTable.cell(nRow, 2).data("New Text").draw();
            console.log(staffState);
            oTable.fnUpdate($('td:first',nRow).html(),nRow, 0, false)
            oTable.fnUpdate(rInputs[0].value, nRow, 1, false);
            oTable.fnUpdate(rInputs[1].value, nRow, 2, false);
            if(!$(rInputs[2]).is(':checked')) oTable.fnUpdate('', nRow, 3, false);//oTable.cell(nRow, 3).data('').draw();
            oTable.fnUpdate(staffState, nRow, 4, false);
            console.log(aData.staffState);
            //oTable.fnDraw();
            console.log(aData.staffState);
        }
    }

    $('#example1').on('click', 'button.delete', function (e) {
        e.preventDefault();
        if (confirm("确定要删除吗？") == false) {
            return;
        }
        var nRow = $(this).parents('tr')[0];
        oTable.fnDeleteRow(nRow);
    });

    $('#example1').on('click', 'button.cancel', function (e) {
        e.preventDefault();
        if ($(this).attr("data-mode") == "new") {
            var nRow = $(this).parents('tr')[0];
            oTable.fnDeleteRow(nRow);
        } else {
            rollbackRow(oTable, nEditing);
            nEditing = null;
        }
    });
    $('#example1').on('click', 'button.repassword', function (e) {
        bootbox.prompt({ 
            size: "large",
            title: "确定使用以下密码吗？", 
            callback: function(result){ 
                if(result != null){
                    //TODO 
                    console.log($('.modal-dialog input').val());
                }
            },
            backdrop: true,
        })
        var pwdStr = '';
        for(var i=0;i<8;i++){
            pwdStr += Math.floor(Math.random()*10);
        }
        $('.modal-dialog input').val(pwdStr);
    });
    function rollbackRow(oTable, nRow) {
        var aData = oTable.fnGetData(nRow);
        var rTds = $('>td', nRow);
        for (var i = 0, iLen = rTds.length; i < iLen; i++) {
            oTable.fnUpdate(aData[i], nRow, i, false);
        }
        oTable.fnDraw();
    }
    //console.log(oTable);
    //oTable.language.sLengthMenu = "每页显示 _MENU_ 条，共 " + oTable.Rows.Count + " 条shuj。"
});


