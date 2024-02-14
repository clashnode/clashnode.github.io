define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'xcblog/xcblogauthorinfo/index' + location.search,
                    add_url: 'xcblog/xcblogauthorinfo/add',
                    edit_url: 'xcblog/xcblogauthorinfo/edit',
                    del_url: 'xcblog/xcblogauthorinfo/del',
                    table: 'xcblog_author_info',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                fixedColumns: true,
                fixedRightNumber: 1,
                searchFormVisible: true,
                search: false,
                columns: [
                    [
                        {field: 'id', title: __('Id'), operate: false},
                        {field: 'nickname', title: __('Nickname'), operate: 'LIKE'},
                        {field: 'realname', title: __('Realname'), operate: 'LIKE'},
                        {field: 'sex', title: __('Sex'), searchList: {"0":__('Sex 0'),"1":__('Sex 1')}, formatter: Table.api.formatter.normal},
                        {field: 'headimgurl', title: __('Headimgurl'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'state', title: __('State'), searchList: {"0":__('State 0'),"1":__('State 1'),"-1":__('State -1')}, formatter: Table.api.formatter.status},
                        {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'updatedby', title: __('Updatedby'), formatter: function(value, row, index) {
                            return row['updatedby_nickname']
                        }, operate: false},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});
