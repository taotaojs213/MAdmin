
$(function() {
    //初始化证照属性设置表
    initnewAttributeTable();
});

//证照属性设置表

function initnewAttributeTable() {
    console.log("执行中");
    console.log($('table').html());
    var table = $('#newAttributeTable').dataTable({
        "paging": false, //翻页
        //"bPaginate" : true,      //显示分页器
        //"iDisplayLength":28,
        "ordering": false,
        "searching": false, //搜索框
        //"bLengthChange":true,//改变每行显示数据数量
        //"aLengthMenu": [[10, 30, 50, -1], [10, 30, 50, "All"]],
        "bInfo": false, //页脚
        'bStateSave': true,
        "bAutoWidth": false,
        "bSort": true,
        "processing": false,
        "serverSide": false,
        "sServerMethod": "get", //post
        "bDestroy": true,
        "ajax": {
            "url": "../demo/table.json",
            //"dataSrc": "data",//默认为data
            "type": "get",
            "dataSrc": "object",
            "error": function() {},
            success: function(result){
                console.log(result);
            }
        },
        "columns": [{
            "data": null,
            "title": "序号",
            "sWidth": "30px",
            "sClass": "text-tables-center",
            "createdCell": function(nTd, sData, oData, iRow, iCol) {
                var startnum = this.api().page() * (this.api().page.info().length);
                $(nTd).html(iRow + 1 + startnum); //分页行号累加：$(nTd).html(iRow+1);
            }
        }, {
            "data": "typeName",
            "title": "证照属性设置"
        }, {
            "data": null,
            "title": "操作"
        }],
        "columnDefs": [{
            "targets": [1],
            "data": "typeName",
            "render": function(data, type, row) {
                //isLockStatus:true：显示有锁   false:显示没有锁
                if (row.isLockStatus == true) {
                    return "" + row.typeName + "&nbsp;&nbsp;<i class='fa fa-lock l-fa' style='cursor: pointer'></i>";
                } else {
                    return row.typeName;
                }
            }
        }, {
            "targets": [2],
            "data": "id",
            "sWidth": "60px",
            "sClass": "text-tables-center",
            "render": function(data, type, row) {
                var id = row.id == undefined ? -1 : row.id; //-1说明是新增，其余表示为编辑
                if (row.isLockStatus == true) {
                    return "-";
                } else {
                    return "<i class='fa fa-pencil l-fa edit-btn' style='cursor: pointer' id=\'" + id + "\'></i>&nbsp;&nbsp;<i class='fa fa-trash-o m-fa del-btn' style='cursor: pointer' id=\'" + id + "\'></i>";
                }
            }
        }, {
            sDefaultContent: '',
            aTargets: ['_all']
        }]
    })

    //新增一行表格
    $("#newAttribute").unbind('click').click(function() {
        if ($("#newAttributeTable tbody tr:last td i").eq(0).attr('id') == -1) {
            return;
        }
        $('#newAttributeTable').dataTable().fnAddData([]);
        var nTrsLength = $("#newAttributeTable tbody tr").length;
        var nTrs = $("#newAttributeTable tbody tr").eq(nTrsLength - 1);
        var nIs = nTrs.find("td").eq(2).find("i").eq(0)
        nIs.click();
    });
    //点击编辑图标出现编辑框
    $("#newAttributeTable tbody").unbind('click').on("click", ".edit-btn", function() {
        var tds = $(this).parents("tr").children();
        var i;
        $.each(tds, function(i, val) {
            var jqob = $(val);
            var txt = jqob.text();
            if (i == 1) {
                var put = $("<input type='text' class='form-control' style='width:100%'>");
                put.val(txt);
                jqob.html(put);
            }
        });
        $(this).toggleClass("edit-btn fa-pencil");
        $(this).toggleClass("save-btn fa-save");
    });
    //保存按钮
    $("#newAttributeTable tbody").on("click", ".save-btn", function() {
        var id = $(this).attr("id");
        var tds = $(this).parents("tr").children();
        var sTds = tds.length;
        var lisval = [];
        for (var i = 0; i < sTds; i++) {
            if (i < sTds - 1)
                lisval.push(tds.eq(i).children("input").val());
            else lisval.push(tds.eq(i).children("input").val())
        }
        if (i == sTds - 1) lisval.push();
        if (lisval[1] == "") {
            toNotification("警告！", "证照属性设置不能为空！", "warning");
            return false;
        } else if (lisval[1].length > 10) {
            toNotification("警告！", "证照属性设置不能超过十个字符！", "warning");
            return false;
        } else {
            $.each(tds, function(i, val) {
                var jqob = $(val);
                //把input变为字符串
                if (!jqob.has('i').length) {
                    var txt = jqob.children("input").val();
                    jqob.html(txt);
                }
            });
            $(this).toggleClass("edit-btn fa-pencil");
            $(this).toggleClass("save-btn fa-save");
            //保存数据
            SaveData(lisval[1], id);
        }
    });

    //证照属性设置保存信息
    function SaveData(msg, id) {
        var data = {
            id: id, //-1表示是新增
            typeName: msg
        }
        var url = encodeURI("${pageContext.request.contextPath}/ajax/certificate/saveCertificateType");
        actionRequest(data, url, function(data) {
            if (data.successed) {
                toNotification("提示！", "操作成功！", "success");
                //刷新表格
                initnewAttributeTable();
            } else {
                toNotification("操作失败！", data.message, "error");
                //刷新表格
                initnewAttributeTable();
            }
        });
    }

    //证照属性设置删除
    $("#newAttributeTable tbody").on("click", ".del-btn", function() {
        var id = $(this).attr("id");
        if (id == -1) {
            var trs = $(this).parents("tr");
            initnewAttributeTable();
            return false;
        } else {
            var tds = $(this).parents("tr").children();
            var data = {
                id: id
            };
            var url = "/ajax/certificate/deleteCertificateType";
            //执行删除
            toConfirm(data, url, function(data) {
                if (data.successed) {
                    swal({
                        title: "删除成功",
                        text: "<small>1秒后自动关闭<small>",
                        type: "success",
                        html: true,
                        timer: 1000
                    });
                    initnewAttributeTable();
                } else {
                    swal("删除失败!", data.message, "error");
                }
            });
        }
    });
    console.log("执行结束");
}
//获得标识

function getActionId() {
    return new Date().getTime();
}