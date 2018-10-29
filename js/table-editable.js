$(function () {
    var oTable = getStaffTable();
    console.log("=========================================================================")
    console.log($("#example1 tbody tr"))
    $(".row").on("dblclick","#example1 tbody tr",function (e) { //双击相应事件
        console.log($(this));
        var aData = oTable.fnGetData($(this));
        console.log(aData.id);
        var ajax = getStaff(aData.id);
        console.log(ajax)
        gotoPage("staffWorkTable","<script>var ajaxStr = " + JSON.stringify(ajax) + "</script>");
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
        aData.staffName = rInputs[0].value;
        aData.staffNo = rInputs[1].value;
        var wxNameCheck = $(rInputs[2]).is(':checked');
        if(!wxNameCheck){
            aData.staffOpenid = ''
        }
        aData.staffState = Number($('select', nRow).val())
        // data.id = aData.id;
        // data.staffName = aData.staffName
        if(updateStaff(aData)){
            //oTable.cell(nRow, 2).data("New Text").draw();
            
            oTable.fnUpdate(aData.staffName, nRow, 1, false);
            oTable.fnUpdate(aData.staffNo, nRow, 2, false);
            if(!wxNameCheck){
                oTable.fnUpdate('', nRow, 3, false);//oTable.cell(nRow, 3).data('').draw();
            }
            oTable.fnUpdate(aData.staffState, nRow, 4, false);
        }
    }

    $('#example1').on('click', 'button.delete', function (e) {
        e.preventDefault();
        if (confirm("确定要删除吗？") == false) {
            return;
        }
        var nRow = $(this).parents('tr')[0];
        var aData = oTable.fnGetData(nRow);
        deleteStaff(aData.id);
        oTable.fnDeleteRow(nRow);
    });

    $('#example1').on('click', 'button.cancel', function (e) {
        e.preventDefault();
        rollbackRow(oTable, nEditing);
        nEditing = null;
    });
    $('#example1').on('click', 'button.reset', function (e) {
        var that = this;
        bootbox.prompt({ 
            size: "large",
            title: "确定使用以下密码吗？", 
            callback: function(result){ 
                if(result != null){
                    
                    var nRow = $(that).parents('tr')[0];
                    var aData = oTable.fnGetData(nRow);
                    console.log(aData);

                    if(resetStaffPwd(aData.id, pwdStr)){
                        
                        // try{
                            
                        //     toastr.success('新密码 ' + pwdStr + ' 已成功复制到剪贴板！');
                        //     console.log(11111111)
                        // } catch(err){
                            bootbox.alert({
                                title: '复制',
                                message: '请手动复制密码[ ' + pwdStr + ' ]',
                            });
                        // }finally{
                        //     //console.log($('.modal-dialog input').val());
                        // }
                        
                    }
                }
            },
            backdrop: true,
        })
        var pwdStr = '';
        for(var i=0;i<8;i++){
            pwdStr += Math.floor(Math.random()*10);
        }
        $('.modal-dialog input').val(pwdStr);
        $('.modal-dialog input').change(function(){
            pwdStr = $('.modal-dialog input').val();
        })

        var copyBtn = new ClipboardJS('.modal-dialog .btn-primary');
        copyBtn.on('success', function(e){
            alert("复制成功！")
            console.log(e);
        })
        copyBtn.on('error',function(e){
            console.log(e);
        })

    });

    $('#example1').on('click', 'button.unbind', function (e) {
        var nRow = $(this).parents('tr')[0];
        var data = oTable.fnGetData(nRow);

        if(unbindStaffWX(data.id)){
            //oTable.cell(nRow, 2).data("New Text").draw();
            oTable.fnUpdate('', nRow, 3, false);//oTable.cell(nRow, 3).data('').draw();
            oTable.fnDraw();
        }
    });

    $('#add-staff').on('click',function (e) {
        var giCount = 3;
        var dialog = bootbox.dialog({
            message: getAddStaffForm(),
            title: "新增项目",
            buttons:{
                cancel:{
                    label: "放弃",
                    className: "add_staff_cancel",
                    callback: function () {
                        var flag = false;
                        var confirmFlag = false;
                        console.log('aaaa')
                        var a = bootbox.confirm({
                            title: "提示",
                            message: "确定要取消吗？取消将会丢失当前数据",
                            callback: function(e){
                                console.log(e)
                                flag = e;
                                confirmFlag = true;
                                
                            }
                        })
                        if(confirmFlag) {
                            console.log("true")
                            return flag;
                        }else{
                            console.log("false")
                        };
                        console.log("wtf")
                        console.log(dialog)
                        return false;
                    }
                },
                ok:{
                    label: "提交",
                    className: "btn-primary",
                    callback: function () {
                        var flag = true;
                        var $staffName = $('#add_staffName');
                        var $staffPwd = $('#add_staffPwd');
                        var $staffNo = $('#add_staffNo');
                        var $staffList = $('#staffTags')
                        var staffName = $staffName.val();
                        var staffPwd = $staffPwd.val();
                        var staffNo = $staffNo.val();
                        var staffList = $staffList.val();
                        if(staffName == ''){
                            $staffName.css({"border-color": "red"})
                            $staffName.after(getInputLeftMsg("项目名称不能为空"))
                            flag = false;
                        }
                        if(staffNo == ''){
                            $staffNo.css({"border-color": "red"})
                            $staffNo.after(getInputLeftMsg("项目编号不能为空"))
                            flag = false;
                        }else if(staffNo.length < 4){
                            $staffNo.css({"border-color": "red"})
                            $staffNo.after(getInputLeftMsg("长度至少为四位"))
                            flag = false;
                        }
                        if(staffPwd == ''){
                            $staffPwd.css({"border-color": "red"})
                            $staffPwd.after(getInputLeftMsg("项目密码不能为空"))
                            flag = false;
                        }else if(staffPwd.length < 4){
                            $staffPwd.css({"border-color": "red"})
                            $staffPwd.after(getInputLeftMsg("长度至少为四位"))
                            flag = false;
                        }
                        if(flag && addStaff(staffNo, staffName, staffPwd,staffList)){
                            gotoPage("staffData");
                        }else{
                            flag = false
                        }
                        return flag;
                    }
                }
            }
        })
        // oTable.fnAddData( [
        //     giCount+".1",
        //     giCount+".2",
        //     giCount+".3",
        //     giCount+".4" ]
        // );
        // oTable.fnDraw();
        $("#staffTags").tagsInput({
            'height':'150px', //设置高度
            'width':'300px',  //设置宽度
            'interactive':true, //是否允许添加标签，false为阻止
            'defaultText':'回车分隔工种', //默认文字
            'removeWithBackspace' : true, //是否允许使用退格键删除前面的标签，false为阻止
            'minChars' : 0, //每个标签的小最字符
            'maxChars' : 0, //每个标签的最大字符，如果不设置或者为0，就是无限大
            'placeholderColor' : '#666666' //设置defaultText的颜色
         });
    });

    // $('body').on('click','#add_staff_submit',function(e){
    //     alert("1111");
    //     var staffName = $('#add_staffName').val();
    //     var staffPwd = $('#add_staffPwd').val();
    //     var staffNo = $('#add_staffNo').val();
    //     if(addStaff(staffNo, staffName, staffPwd)){
    //         onEscape();
    //     }
    // });

    $('body').on('click', '#add_staff_cancel', function(e){
        onEscape();
    })

    function rollbackRow(oTable, nRow) {
        var aData = oTable.fnGetData(nRow);
        // var rTds = $('>td', nRow);
        // for (var i = 0, iLen = rTds.length; i < iLen; i++) {
        //     oTable.fnUpdate(aData[i], nRow, i, false);
        // }
        oTable.fnUpdate(aData.staffName, nRow, 1, false);
        oTable.fnUpdate(aData.staffNo, nRow, 2, false);
        oTable.fnUpdate(aData.staffOpenid, nRow, 3, false);
        oTable.fnUpdate(aData.staffState, nRow, 4, false);
        oTable.fnDraw();
    }
    //console.log(oTable);
    //oTable.language.sLengthMenu = "每页显示 _MENU_ 条，共 " + oTable.Rows.Count + " 条shuj。"

    $('body').on('focus', 'input[type="text"]', function(e){
        console.log($('input[type="text"]'))
        var input = e.target;
        $input = $(input);
        $input.css({"border-color": ""})
        $('.text-msg-warning', $input.parent()).remove();
    })

});


