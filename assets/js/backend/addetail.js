define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            var ad_id = $('#c-ad_id').val();

            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'addetail/index' + location.search,
                    add_url: 'addetail/add?ad_id=' + ad_id,
                    edit_url: 'addetail/edit',
                    del_url: 'addetail/del',
                    multi_url: 'addetail/multi',
                    import_url: 'addetail/import',
                    table: 'ad_detail',
                }
            });

            var table = $("#table");

            //在普通搜索渲染后
            table.on('post-common-search.bs.table', function (event, table) {
                var form = $("form", table.$commonsearch);
                $("input[name='website_id']", form).addClass("selectpage").data("source", "Website/selectpage");

                Form.events.cxselect(form);
                Form.events.selectpage(form);
            });

            table.on('post-body.bs.table',function(){
                $(".btn-add, .btn-editone").data("area",["50%","70%"]);
            });

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                pagination: false,
                fixedColumns: true,
                fixedRightNumber: 1,
                searchFormVisible: true,
                search: false,
                columns: [
                    [
                        {field: 'id', title: __('Id'), operate: false},
                        {field: 'website_id', title: __('Website_id'), formatter: function(value, row) {
                            return row['website_name'];
                        }},
                        {field: 'code', title: __('Code'), operate: 'LIKE'},
                        {field: 'state', title: __('State'), searchList: {"0":__('State 0'),"1":__('State 1'),"-1":__('State -1')}, formatter: Table.api.formatter.status},
                        {field: 'createtime', title: __('Createtime'), operate:false, addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Updatetime'), operate:false, addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
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
