var letao;
$(function () {
    letao = new Letao();
    // 调用方法
    letao.addHistory();
    letao.queryHistory();
    letao.deleteHistory();
    letao.clearHistory();
})
// 创建函数
var Letao = function () {

}
Letao.prototype = {
    // 添加历史记录
    addHistory: function () {
        $(".btn-search").on("click", function (event) {
            var search = $('.input-search').val();
            if (!search.trim()) {
                alert("请输入");
                //阻止form表单默认事件
                event.preventDefault();
                return;
            }
            // 获取本地localStorage
            var arr = window.localStorage.getItem("searchData");
            var id = 0;
            if (arr && JSON.parse(arr).length > 0) {
                // 转换成对象
                arr = JSON.parse(arr);
                // id为arr数组的最后一个值（arr[arr.length-1]）的id+1
                id = arr[arr.length - 1].id + 1;
            } else {
                // 转换成数组
                arr = [];
                id = 0;
            }
            var flag = false;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].search == search) {
                    flag = true;
                }
            }
            if (flag == false) {
                // 输入的内容不在已存的数组内
                arr.push({
                    "search": search,
                    "id": id
                })
            }
            // 将对象转换成字符串
            window.localStorage.setItem("searchData", JSON.stringify(arr));
            // 
            $(".input-search").val('');

            // 刷新页面
            letao.queryHistory();
            window.location.href = "productlist.html";
        })
    },
    // 查询历史记录,渲染
    queryHistory: function () {
        var arr = window.localStorage.getItem("searchData")
        // 从本地存储的值里面查找判断当前的arr是否有值
        if (arr && JSON.parse(arr).length > 0) {
            arr = JSON.parse(arr);
        } else {
            arr = [];
        }
        // 将结果数组反转;
        arr = arr.reverse();
        // 这是什么意思!
        var html = template("searchListTmp", {
            'rows': arr
        });
        // 渲染页面
        $('.content').html(html);
    },
    // 删除历史记录
    deleteHistory: function () {
        var that = this;
        // 添加点击事件
        $('.content').on("click", '.btn-delete', function () {
            // 先获取自定义属性 data-id
            var id = $(this).data('id');
            // 在获取本地存储的值
            var arr = window.localStorage.getItem('searchData');
            // 判断当前的arr  是否为空
            if (arr && JSON.parse(arr).length > 0) {
                arr = JSON.parse(arr);
            } else {
                arr = [];
            }
            // 获取id和本地存储的值之后,进行比较
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == id) {
                    // id相等  删除记录
                    console.log(arr[i]);
                    arr.splice(i, 1); //第一个参数i代表要删除的数据的下标 1表示删除几个
                }
            }
            // 再将数组存进本地存储查询一次渲染页面
            window.localStorage.setItem("searchData", JSON.stringify(arr))
            letao.queryHistory();
        })
    },
    // 清空搜索记录
    clearHistory: function () {
        // 给清空按钮添加事件
        $(".btn-clear").on("click", function () {
            // 直接清空本地存储
            window.localStorage.setItem("searchData", '');
            letao.queryHistory();
        })

    }

}