;
(function() {
    $(function() {
        //初始化变量
        var tableData = {
            columns: [{
                field: 'input',
                title: ''
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
            data: []
        };

        $.ajax({
            url: 'http://localhost:8080/api/getData',
            method: 'GET'
        }).success(function(data) {
            if (data.success) {
                for (var i = 0; i < data.result.length; i++) {
                    var obj = {};
                    obj.id = data.result[i].id;
                    obj.name = data.result[i].name;
                    obj.age = data.result[i].age;
                    obj.sex = data.result[i].sex;
                    obj.input = '<input type="checkbox" class = "checkbox"/>';
                    tableData.data.push(obj);
                }
                $('#table').bootstrapTable(tableData);
            } else {
                sweetAlert("对不起", "数据查询失败", "error");
            }
        })

        setTimeout(function() {
            $('.checkbox').click(function(e) {
                console.log(e);
            })
        }, 0)

    })

})()
