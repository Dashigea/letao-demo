// 如果后面的函数里面需要使用letao对象可以在全局声明一下
var letao;
$(function() {
    letao = new Letao();
    letao.addHistroy();
    letao.queryHistory();
    letao.deleteHistory();
    letao.clearHistory();
});

//Letao的构造函数
var Letao = function() {

}

Letao.prototype = {
    addHistroy: function() {
        // 1. 获取搜索按钮添加点击事件
        $('.btn-search').on('click', function() {
            // 2. 获取输入框输入的内容
            var search = $('.input-search').val();
            // console.log(search);
            // 3. 判断当前输入的内容为空就提示请输入
            // if(search.trim() == ""){
            if (!search.trim()) {
                alert('内容为空');
                return;
            }
            // 4. 获取本地存储的里面的值 获取出来的值是string字符串类型
            var arr = window.localStorage.getItem('searchData');
            // console.log(arr);
            // 10. 添加的时候除了要添加当前搜索的内容 还要给当前搜索内容指定一个id 
            //这个id如果是第一次添加id=0 如果是第二次后续添加 id为最后一个id+1
            var id = 0;
            // 5. 由于需要把当前输入内容添加到arr数组里 但是arr数组目前是字符串把arr字符串转换成数组
            // 6. 转换之前判断一下arr是否有值 并且转成数组后长度是否大于0
            if (arr && JSON.parse(arr).length > 0) {
                // 7. 如果arr有内容 把转成数组后重新赋值给arr
                arr = JSON.parse(arr);
                // 11. 当数组有内容 就获取最后一个值的id+1赋值个id
                id = arr[arr.length - 1].id + 1;
                console.log(id);
                // console.log(arr[arr.length-1].id+1);
                // console.log(arr[arr.length-1]);
            } else {
                //8 . 如果arr没有内容 赋值为空数组
                arr = [];
                id = 0;
            }
            // console.log(id);
            // 9. 把当前输入的内容添加到arr数组中 
            arr.push({
                id: id,
                search: search
            });
            // 12. 把添加后的数组重新存储到本地存储里面 存的时候也只能是字符串 转成字符串再存
            window.localStorage.setItem('searchData', JSON.stringify(arr));
            // 13. 添加完成后调用查询方法刷新页面
             letao.queryHistory();
        });
    },
    deleteHistory: function() {
        // 1. 给所有删除按钮添加点击事件
        $('.content').on('click', '.btn-delete', function() {
            // 2. 获取当前点击的删除按钮身上的data-id属性的值
            var id = $(this).data('id');
            // 3. 获取本地存储的里面的值 获取出来的值是string字符串类型
            var arr = window.localStorage.getItem('searchData');
            // 4. 转换之前判断一下arr是否有值 并且转成数组后长度是否大于0
            if (arr && JSON.parse(arr).length > 0) {
                //5. 如果arr有内容 把转成数组后重新赋值给arr
                arr = JSON.parse(arr);
            } else {
                //6 . 如果arr没有内容 赋值为空数组
                arr = [];
            }
            // 7. 在arr数组里面查询有没有id跟当前要删除的id一致的值
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == id) {
                    //8. 如果id一致就要删除当前的id
                    arr.splice(i, 1);
                }
            }
            // 9. 把删除后的数据重新保存
            window.localStorage.setItem('searchData', JSON.stringify(arr));
            // 10. 删除完成后要刷新页面 调用查询方法重新查询当前数据和渲染列表
            letao.queryHistory();
        })
    },
    queryHistory: function() {
        // 1. 获取本地存储的里面的值 获取出来的值是string字符串类型
        var arr = window.localStorage.getItem('searchData');
        // 2. 转换之前判断一下arr是否有值 并且转成数组后长度是否大于0
        if (arr && JSON.parse(arr).length > 0) {
            // 3. 如果arr有内容 把转成数组后重新赋值给arr
            arr = JSON.parse(arr);
        } else {
            //4 . 如果arr没有内容 赋值为空数组
            arr = [];
        }
        // 5. 调用模生成搜索历史列表  要把arr数组包装成一个对象
        var html = template('searchListTmp', { rows: arr });
        $('.content').html(html);
    },
    clearHistory: function() {
        // 1. 给清空添加点击事件
        $('.btn-clear').on('click', function() {
            // 2. 清空搜索历史的本地存储
            window.localStorage.setItem('searchData', '');
            // 3. 清空完毕后刷新页面
            letao.queryHistory();
        })
    }
}
