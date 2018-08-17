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
function getStaffTable(){
    oTable = $('#example1').dataTable({
        language:table_lang,  // 提示信息
        pagingType: "simple_numbers",
        info: true,
        order: [[4,"desc"]],
        //processing: true,
        stateSave: false,//保存状态
        ajax: {
            url: 'https://www.ntjingui.cn/staff/findByObjList',
            type: 'GET',
            data: {
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
                    case -1: status = '中断'; break;
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
                return getStaffButton();
            }
        },],
        // "infoCallback": function( settings, start, end, max, total, pre ) {
        //     return "显示 _MENU_ 条 | 总共有" + total +"条数据";
        // }
        
    });
    return oTable;
}