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
            url: 'http://localhost:8090/staff/findByObjList',
            //url: "https://www.ntjingui.cn/orderLesheng/staff/findByObjList?staffState=0",
            type: 'GET',
            data: {
            },
            //dataType: 'jsonp',
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



function getStaffTableAction(){
    oTable = $('#example1').dataTable({
        language:table_lang,  // 提示信息
        pagingType: "simple_numbers",
        info: true,
        order: [[4,"desc"]],
        //processing: true,
        stateSave: false,//保存状态
        ajax: {
            url: 'http://localhost:8090/staff/findByObjList',
            //url: "https://www.ntjingui.cn/orderLesheng/staff/findByObjList?staffState=0",
            type: 'GET',
            data: {
                staffState: 0
            },
            //dataType: 'jsonp',
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

// var detailTable = {
//     initAll: function(){
//         this.initVue();
//         this.adjustTable();
//     },
//     initVue: function () {
//         window.vm = new Vue({
//             el: '#div-return-app',
//             data: {
//                 test: [
//                     {
//                         name: '软件实施费',
//                         applyPeople: '张三[1234]',
//                         applyDate: '2017-09-09',
//                         receiptDate: '2017-09-12',
//                         receipt: [{
//                             num: '0121020',
//                             money: '12121212',
//                             money2: '2112121',
//                             money2Date: '2017-08-12',
//                             receiptStatus: '正常',
//                             backStatus: '不可退回',
//                             customerName: '下面的都是假的'
//                         }]
//                     }, {
//                         name: '软件实ss施费ss',
//                         applyPeople: '张三ww[1234]',
//                         applyDate: '2017-09-09',
//                         receiptDate: '2017-09-12',
//                         receipt: [{
//                             num: '0121020',
//                             money: '12121212',
//                             money2: '2112121',
//                             money2Date: '2017-08-12',
//                             receiptStatus: '正常',
//                             backStatus: '可退回',
//                             customerName: '你猜我是什么公司'
//                         }, {
//                             num: '0121020',
//                             money: '12121212',
//                             money2: '2112121',
//                             money2Date: '2017-08-12',
//                             receiptStatus: '正常',
//                             backStatus: '不可退回',
//                             customerName: '你猜不到我是什么公司'
//                         }
//                         ]
//                     },
//                     {
//                         name: '软件实施费2',
//                         applyPeople: '张三2[1234]',
//                         applyDate: '2017-09-092',
//                         receiptDate: '2017-09-122',
//                         receipt: [{
//                             num: '11111111',
//                             money: '11111111',
//                             money2: '1111111',
//                             money2Date: '2017-08-12',
//                             receiptStatus: '22正常',
//                             backStatus: '不可退回',
//                             customerName: '测试公司A'
//                         }, {
//                             num: '2222222',
//                             money: '222222',
//                             money2: '2222222',
//                             money2Date: '2017-08-12',
//                             receiptStatus: '22正常',
//                             backStatus: '可退回',
//                             customerName: '我是一个正经的测试公司'
//                         }, {
//                             num: '333333',
//                             money: '33333',
//                             money2: '333333',
//                             money2Date: '2017-08-12',
//                             receiptStatus: '22正常',
//                             backStatus: '不可退回',
//                             customerName: '上面的不是正经的公司'
//                         }]
//                     }
//                 ]
//             }
//         })
//     },
//     adjustTable: function () {
//         for (var i = 0; i < vm.test.length; i++) {
//             var $tr = $('tr[index=' + i + ']');
//             var rowspanLen = $tr.length;
//             var $height = $tr.find('td:eq(2)').css('height');
//             $tr.eq(0).find('td:gt(7)').attr('rowspan', rowspanLen).css('line-height', Number($height.split('px')[0] * rowspanLen) + 'px');
//             $tr.not(":eq(0)").find('td:gt(7)').css('display', 'none');
//             $('tr:gt(1)').find('td:lt(8)').css('line-height', '35px')
//         }
//     }
// };
$(function(){
    //detailTable.initAll();
})
