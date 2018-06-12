var letao;

$(function () {
    letao = new Letao();
    letao.addHistory();
    letao.queryHistory();
    letao.deleteHistory();
    letao.clearHistory();
})

var Letao = function () {};

Letao.prototype = {
    // 添加记录
    addHistory: function () {
        $('.btn-search').on('tap', function () {
            var search = $('.input-search').val();
            if (!search.trim()) {
                mui.toast('请输入关键字', {
                    duration: 'short',
                    type: 'div'
                });
                $('.input-search').val('');
                return;
            }
            // 
            var arr = window.localStorage.getItem('searchData');
            // 将arr 转换成数组
            var id = 0;
            if (arr && JSON.parse(arr).length > 0) {
                arr = JSON.parse(arr);
                // id为arr数组的最后一个值（arr[arr.length-1]）的id+1
                id = arr[arr.length - 1].id + 1;
            } else {
                arr = [];
                id = 0;
            }
            // 再看搜索的内容在本地是否存在
            var flag = false;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].search == search) {
                    flag = true;
                }
            }
            if (!flag) {
                // 意味着搜索的内容本地没有,添加呗
                arr.push({
                    "search": search,
                    'id': id
                })
            }
            // 然后将arr转换成字符串存入本地存储
            window.localStorage.setItem('searchData', JSON.stringify(arr));
            // 调用查
            letao.queryHistory();
            // 跳转页面
            // window.location.href = "";
        });
    },
    // 查询记录 渲染列表
    queryHistory: function () {
        // 获取本地存储的值
        var arr = window.localStorage.getItem('searchData');
        // 判断当前的arr 是否为空
        if (arr && JSON.parse(arr).length > 0) {
            arr = JSON.parse(arr);
        } else {
            arr = [];
        }
        // 反转数组
        arr = arr.reverse();
        //调用模板生成html,{'rows':arr}因为传入的是对象的属性
        var html = template('searchListTmp', {
            'rows': arr
        });
        // 渲染到页面上
        $('.content').html(html);
    },
    // 删除记录
    deleteHistory: function () {
        $('.content').on('tap', '.btn-delete', function () {
            var id = $(this).data('id');
            var arr = window.localStorage.getItem('searchData');
            if (arr && JSON.parse(arr).length > 0) {
                arr = JSON.parse(arr);
            } else {
                arr = [];
            }
            // 遍历数组,看是否有id 和 点击的id 相等
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == id) {
                    arr.splice(i, 1);
                }
            }
            window.localStorage.setItem("searchData", JSON.stringify(arr));
            letao.queryHistory();
        });
    },
    // 全部清空
    clearHistory: function () {
        $('.btn-clear').on('tap', function () {
            // 那就把本地存储的数据清空
            window.localStorage.setItem('searchData','');
            letao.queryHistory();
        })
    }
}