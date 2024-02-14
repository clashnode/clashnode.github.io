define(['jquery', 'bootstrap', 'backend', 'table', 'form', 'jstree'], function ($, undefined, Backend, Table, Form) {
    var elTree = $('#treeview');// 目录元素

    var Controller = {
        fun: {
            BindData: function(t, cid){
                $('#table').bootstrapTable('refresh', {
                    url: 'xcblog/xcblogbloginfo/getList?cid=' + cid
                });
            },
        },
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    // index_url: 'xcblog/xcblogbloginfo/index' + location.search,
                    index_url: 'xcblog/xcblogbloginfo/getList?cid=-1',
                    add_url: 'xcblog/xcblogbloginfo/add',
                    edit_url: 'xcblog/xcblogbloginfo/edit',
                    del_url: 'xcblog/xcblogbloginfo/del',
                    table: 'xcblog_blog_info',
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
                        {field: 'category_id', title: __('Category_id'), formatter: function(value, row, index) {
                            return row['category_name'];
                        }, operate: false},
                        {field: 'title', title: __('Title'), operate: 'LIKE', align: 'left'},
                        {field: 'url', title: __('Url'), operate: 'LIKE', formatter: Table.api.formatter.url},
                        {field: 'list_image', title: __('List_image'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'author_id', title: __('Author_id'), formatter: function(value, row, index) {
                            return row['author_realname'];
                        }, operate: false},
                        {field: 'visits', title: __('Visits'), operate: false},
                        {field: 'state', title: __('State'), searchList: {"0":__('State 0'),"1":__('State 1'),"-1":__('State -1')}, formatter: Table.api.formatter.status},
                        {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'updatedby', title: __('Updatedby'), formatter: function(value, row, index) {
                            return row['updatedby_nickname']
                        }, operate: false},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate, buttons: [
                            {
                                name: 'submit_baidu',
                                text: __('提交百度'),
                                title: __('提交百度'),
                                classname: 'btn btn-xs btn-info btn-dialog',
                                icon: 'fa fa-bold',
                                url: function(row){
                                    return 'xcblog/xcblogbloginfo/submit_baidu/ids/' + row['id'];
                                },
                                callback: function (data) {
                                    // Layer.alert("接收到回传数据：" + JSON.stringify(data), {title: "回传数据"});
                                },
                                visible: function (row) {
                                    //返回true时按钮显示,返回false隐藏
                                    return true;
                                }
                            },
                            {
                                name: 'submit_bing',
                                text: __('提交Bing'),
                                title: __('提交Bing'),
                                classname: 'btn btn-xs btn-info btn-dialog',
                                icon: 'fa fa-behance',
                                url: function(row){
                                    return 'xcblog/xcblogbloginfo/submit_bing/ids/' + row['id'];
                                },
                                callback: function (data) {
                                    // Layer.alert("接收到回传数据：" + JSON.stringify(data), {title: "回传数据"});
                                },
                                visible: function (row) {
                                    //返回true时按钮显示,返回false隐藏
                                    return true;
                                }
                            }
                        ]}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
            elTree.jstree("destroy");
            Controller.api.rendertree(nodeData);
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

                $('#c-seo_title').parents('.form-group').find('label.control-label span').text($('#c-seo_title').val().length);
                $('#c-seo_keywords').parents('.form-group').find('label.control-label span').text($('#c-seo_keywords').val().length);
                $('#c-seo_description').parents('.form-group').find('label.control-label span').text($('#c-seo_description').val().length);
                $('#c-seo_title, #c-seo_keywords, #c-seo_description').keyup(function(){
                    var num = $(this).val().length;
                    $(this).parents('.form-group').find('label.control-label span').text(num);
                })
            },
            rendertree: function (content) {
                elTree
                    .on("changed.jstree", function (e, data) {
                        if (data['action'] == "select_node")
                        {
                            // console.log(data['node']);
                            var id = data['node']['id'];
                            var text = id == -1 ? '全部' : data['node']['text'];

                            $('.nav-tabs a').text(text);
                            Controller.fun.BindData($("#table"), id);

                            $('.bootstrap-table .search input').val('');
                        }
                    })
                    .on('open_node.jstree',function(e, data){
                        // console.log(data.node);
                    })
                    .jstree({
                        "themes": {"stripes": true},
                        "checkbox": {
                            "keep_selected_style": false,
                        },
                        "types": {
                            "folder": {
                                "icon": "jstree-folder",
                            },
                            "file": {
                                "icon": "jstree-file",
                            }
                        },
                        "plugins": ["types"],
                        "core": {
                            'check_callback': false,
                            "data": content
                        }
                    });
            }
        }
    };
    return Controller;
});
