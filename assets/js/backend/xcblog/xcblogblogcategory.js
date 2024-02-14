define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'xcblog/xcblogblogcategory/index' + location.search,
                    add_url: 'xcblog/xcblogblogcategory/add',
                    edit_url: 'xcblog/xcblogblogcategory/edit',
                    del_url: 'xcblog/xcblogblogcategory/del',
                    table: 'xcblog_blog_category',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'weigh',
                fixedColumns: true,
                fixedRightNumber: 1,
                searchFormVisible: true,
                commonSearch: false,
                search: false,
                pagination: false,
                columns: [
                    [
                        {field: 'id', title: __('Id'), operate: false},
                        {field: 'name', title: __('Name'), align: 'left', formatter:function (value, row, index) {
                            var html = value.toString().replace(/(&|&amp;)nbsp;/g, '&nbsp;');
                            html += row['is_recommend'] == 1 ? ' <span class="label label-success">推荐</span>' : '';
                            return html;
                        }, operate: false},
                        {field: 'url', title: __('Url'), operate: 'LIKE', formatter: Table.api.formatter.url},
                        {field: 'show_model', title: __('Show_model'), searchList: {"list":__('列表'),"waterfall":__('瀑布流')}, formatter: Table.api.formatter.normal},
                        {field: 'state', title: __('State'), searchList: {"0":__('State 0'),"1":__('State 1'),"-1":__('State -1')}, formatter: Table.api.formatter.status},
                        {field: 'weigh', title: __('Weigh'), operate: false},
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
