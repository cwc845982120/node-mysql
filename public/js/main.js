;
(function() {
    $(function() {
        //初始化变量
        var baseUrl = "http://192.168.3.200"
        var tableData = {
            columns: [{
                field: 'input',
                title: '<input type="checkbox" class = "checkbox-all"/>'
            }, {
                field: 'id',
                title: 'ID'
            }, {
                field: 'name',
                title: '姓名'
            }, {
                field: 'age',
                title: '年龄'
            }, {
                field: 'sex',
                title: '性别'
            }],
            pagination: true,
            cache: false,
            data: []
        };
        var idList = [];

        function fetchData(params) {
            tableData.data = [];
            $.ajax({
                url: baseUrl + ':8081/api/queryPeople',
                method: 'POST',
                data: params
            }).success(function(data) {
                if (data.success) {
                    for (var i = 0; i < data.result.length; i++) {
                        var obj = {};
                        obj.id = data.result[i].id;
                        obj.name = data.result[i].name;
                        obj.age = data.result[i].age;
                        obj.sex = data.result[i].sex;
                        obj.input = '<input type="checkbox" index = ' + data.result[i].id + ' class = "checkbox checkbox' + i + '"/>';
                        tableData.data.push(obj);
                    }

                    $('#table').bootstrapTable('load', tableData.data);
                } else {
                    sweetAlert("对不起", "数据查询失败", "error");
                }
            })
        };

        //添加数据
        function addData(params) {
            tableData.data = [];
            $.ajax({
                url: baseUrl + ':8081/api/addPeople',
                method: 'POST',
                data: params
            }).success(function(data) {
                if (data.success) {
                    for (var i = 0; i < data.result.length; i++) {
                        var obj = {};
                        obj.id = data.result[i].id;
                        obj.name = data.result[i].name;
                        obj.age = data.result[i].age;
                        obj.sex = data.result[i].sex;
                        obj.input = '<input type="checkbox" index = ' + i + ' class = "checkbox checkbox' + i + '"/>';
                        tableData.data.push(obj);
                    }
                    $('#table').bootstrapTable('load', tableData.data);
                } else {
                    sweetAlert("对不起", "数据查询失败", "error");
                }
            })
        }

        //删除数据
        function deleteData(params) {
            tableData.data = [];
            $.ajax({
                url: baseUrl + ':8081/api/deletePeople',
                method: 'POST',
                data: params
            }).success(function(data) {
                if (data.success) {
                    for (var i = 0; i < data.result.length; i++) {
                        var obj = {};
                        obj.id = data.result[i].id;
                        obj.name = data.result[i].name;
                        obj.age = data.result[i].age;
                        obj.sex = data.result[i].sex;
                        obj.input = '<input type="checkbox" index = ' + i + ' class = "checkbox checkbox' + i + '"/>';
                        tableData.data.push(obj);
                    }
                    $('#table').bootstrapTable('load', tableData.data);
                    sweetAlert("成功", "数据删除成功", "success");
                } else {
                    sweetAlert("对不起", "数据删除失败", "error");
                }
            })
        }

        function init() {
            $('#table').bootstrapTable(tableData);
            fetchData({ id: '' });
        }

        //页面初始化
        init();

        //页面点击事件
        //添加
        $('#addData').click(function(e) {
            if (!($('#name').val()) && !($('#age').val()) && !($('#sex').val())) {
                sweetAlert("警告", "必须填写至少一条记录!", "error");
                e.preventDefault();
                return false;
            } else {
                var params = {
                    name: $('#name').val(),
                    age: $('#age').val(),
                    sex: $('#sex').val()
                }
                addData(params)
            }
            fetchData({ id: '' });
        });

        //删除
        $('.delete > .text').click(function() {
            if (idList.length > 1) {
                sweetAlert("提示", "只支持单条删除", "error");
                return;
            }
            if (idList.length == 0) {
                sweetAlert("提示", "请选择一条记录", "error");
                return;
            }
            var paramsObj = {
                id: idList[0].id
            }
            deleteData(paramsObj);
            fetchData({ id: '' });
        });

        //修改
        $('#updateData').click(function(e) {
            if (idList.length == 0) {
                sweetAlert("提示", "请选择一条记录", "error");
                return;
            }
            if (idList.length > 1) {
                sweetAlert("提示", "只支持单条修改", "error");
                return;
            }
        });

        //查询
        $('.query > .text').click(function() {
            swal({
                    title: "请输入列表ID",
                    text: "",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: true,
                    animation: "slide-from-top",
                    inputPlaceholder: "请输入列表ID"
                },
                function(inputValue) {
                    var num = /^[0-9]+$/
                    if (!num.test(inputValue)) {
                        swal.showInputError("请输入正确的列表ID!");
                        return false
                    }

                    if (inputValue === "") {
                        swal.showInputError("请输入列表ID!");
                        return false
                    }

                    fetchData({ id: inputValue });
                });
        });

        //查询全部
        $('.query_all > .text').click(function() {
            fetchData({ id: '' });
        });

        //全选处理
        setTimeout(function() {
            $('.checkbox-all').click(function() {
                idList = [];
                if ($(this).is(":checked")) {
                    for (var i = 0; i < $('.checkbox').length; i++) {
                        var idObj = {};
                        $('.checkbox')[i].checked = true;
                        idObj.id = $('.checkbox')[i].attributes['index'].nodeValue;
                        idList.push(idObj);
                    }
                } else {
                    for (var i = 0; i < $('.checkbox').length; i++) {
                        $('.checkbox')[i].checked = false;
                    }
                    idList = [];
                }
            })
        }, 0)

        //单个点击处理
        setTimeout(function() {
            $('.checkbox').click(function() {
                if ($(this).is(":checked")) {
                    var idObj = {};
                    idObj.id = $(this)[0].attributes['index'].nodeValue;
                    idList.push(idObj);
                    for (var i = 0; i < $('.checkbox').length; i++) {
                        if (!('.checkbox')[i].checked) {
                            $('.checkbox-all')[0].checked = false;
                        }
                    }
                } else {
                    $('.checkbox-all')[0].checked = false;
                    for (var i = 0; i < idList.length; i++) {
                        if (idList[i].id == $(this)[0].attributes['index'].nodeValue) {
                            idList.splice(i, 1);
                        }
                    }
                }
            })
        }, 0)

    })
})()