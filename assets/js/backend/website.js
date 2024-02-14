define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'website/index' + location.search,
                    add_url: 'website/add',
                    edit_url: 'website/edit',
                    del_url: 'website/del',
                    multi_url: 'website/multi',
                    import_url: 'website/import',
                    table: 'website',
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
                search: false,
                columns: [
                    [
                        {field: 'id', title: __('Id'), operate: false},
                        {field: 'name', title: __('Name'), operate: 'LIKE'},
                        {field: 'domain', title: __('Domain'), operate: 'LIKE'},
                        {field: 'code', title: __('Code'), operate: 'LIKE'},
                        {field: 'weigh', title: __('Weigh'), operate: false},
                        {field: 'state', title: __('State'), searchList: {"0":__('State 0'),"1":__('State 1'),"-1":__('State -1')}, formatter: Table.api.formatter.status},
                        {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'updatedby', title: __('Updatedby'), formatter: function(value, row, index) {
                            return row['updatedby_nickname']
                        }, operate: false},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate, buttons: [
                                {
                                    name: 'create_homepage',
                                    text: __('生成首页'),
                                    title: __('生成首页'),
                                    classname: 'btn btn-xs btn-danger btn-dialog',
                                    icon: 'fa fa-list',
                                    url: function(row) {
                                        return 'website/create_homepage?website_id=' + row['id']
                                    },
                                    callback: function (data) {
                                        Layer.alert("接收到回传数据：" + JSON.stringify(data), {title: "回传数据"});
                                    },
                                    visible: function (row) {
                                        //返回true时按钮显示,返回false隐藏
                                        return true;
                                    }
                                },
                                {
                                    name: 'create_category',
                                    text: __('生成栏目'),
                                    title: __('生成栏目'),
                                    classname: 'btn btn-xs btn-info btn-dialog',
                                    icon: 'fa fa-list',
                                    url: function(row) {
                                        return 'website/create_category?website_id=' + row['id']
                                    },
                                    callback: function (data) {
                                        Layer.alert("接收到回传数据：" + JSON.stringify(data), {title: "回传数据"});
                                    },
                                    visible: function (row) {
                                        //返回true时按钮显示,返回false隐藏
                                        return true;
                                    }
                                },
                                {
                                    name: 'create_blog',
                                    text: __('生成博客'),
                                    title: __('生成博客'),
                                    classname: 'btn btn-xs btn-success btn-dialog',
                                    icon: 'fa fa-list',
                                    url: function(row) {
                                        return 'website/create_blog?website_id=' + row['id']
                                    },
                                    callback: function (data) {
                                        Layer.alert("接收到回传数据：" + JSON.stringify(data), {title: "回传数据"});
                                    },
                                    visible: function (row) {
                                        //返回true时按钮显示,返回false隐藏
                                        return true;
                                    }
                                },
                            ]
                        }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);

            $('#js_create_blog').click(function(){
                var that = $(this);
                var url = that.data('url');
                var title = that.data('title');

                Fast.api.open(url, title, {"area":["50%","50%"]});
            });
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
