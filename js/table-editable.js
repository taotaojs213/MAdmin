$(function () {
    oTable = $('#example1').dataTable();
    var nEditing = null;

    $('#example1').on('click', 'button.edit', function (e) {
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
        var rTds = $('>td', nRow);
        var wxNameCheck, stateSelect;
        if(aData[2] == '已绑定'){
            wxNameCheck = '<input type="checkbox" checked>';
        }else{
            wxNameCheck = '<input type="checkbox">'
        }
        if(aData[3] == '已完成'){
            stateSelect = '<input type="checkbox" checked>';
        }else{
            stateSelect = '<input type="checkbox">'
        }
        rTds[0].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[0] + '">';
        rTds[1].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[1] + '">';
        rTds[2].innerHTML = wxNameCheck;
        rTds[3].innerHTML = stateSelect;
        rTds[4].innerHTML = getStaffButtonSave();
    }

    function saveRow(oTable, nRow) {
        var rInputs = $('input', nRow);
        var wxNameCheck, stateSelect;
        wxNameCheck = ($(rInputs[2]).is(':checked')) ? "已绑定" : "未绑定";
        stateSelect = ($(rInputs[3]).is(':checked')) ? "已完成" : "未完成";
        console.log(wxNameCheck);
        oTable.fnUpdate(rInputs[0].value, nRow, 0, false);
        oTable.fnUpdate(rInputs[1].value, nRow, 1, false);
        oTable.fnUpdate(wxNameCheck, nRow, 2, false);
        oTable.fnUpdate(stateSelect, nRow, 3, false);
        oTable.fnUpdate(getStaffButton(), nRow, 4, false);
        oTable.fnDraw();
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
        
    });
    function rollbackRow(oTable, nRow) {
        var aData = oTable.fnGetData(nRow);
        var rTds = $('>td', nRow);
        for (var i = 0, iLen = rTds.length; i < iLen; i++) {
            oTable.fnUpdate(aData[i], nRow, i, false);
        }
        oTable.fnDraw();
    }
});


