var letao;
$(function() {
    letao = new Letao();
    letao.initPullRefresh();
    letao.searchProductList();
    letao.getProductList();
});

//Letao的构造函数
var Letao = function() {

}
var search;
var page = 1;
Letao.prototype = {
    //初始化下拉刷新和上拉加载
    initPullRefresh: function() {
        mui.init({
            pullRefresh: {
                container: ".mui-scroll-wrapper", // 传入区域滚动父容器的选择器
                down: {
                    // height: 50, //可选,默认50.触发下拉刷新拖动距离,
                    // auto: false, //可选,默认false.首次加载自动下拉刷新一次
                    // contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    // contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    // contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    callback: function() {
                        setTimeout(function() {
                            //在下拉刷新里面根据当前搜索的内容再次刷新一下再次根据搜索内容重新请求数据渲染一遍
                            letao.getProductList({
                                proName:search
                            },function (data) {//我把这个渲染完毕后要执行的代码通过回调函数传递
                                console.log('下拉刷新完毕');
                                 // 4. 把数据调用模板引擎生成html
                                var html = template('productListTmp',data);
                                // 5. 把生成的模板绑定到商品列表的内容
                                $('.content .mui-row').html(html); 
                                  // 当前数据请求渲染完毕后结束下拉刷新
                                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                                //每次下拉刷新的时候要重置上拉加载更多
                                mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                                // page当前页码也要重置为1
                                page = 1;
                            });                          
                        }, 1500)
                    }
                    //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                },
                up: {
                	  contentnomore:'再下实在给不了更多...',
                    callback: function() {
                    		 setTimeout(function() {
                            // 在上拉加载更多的时候调用获取商品列表的方法
                             letao.getProdcutList({
                                proName:search,
                                page:++page//page是我当前上拉要请求的页码数 每次++注意先++
                            },function (data) {//我把这个渲染完毕后要执行的代码通过回调函数传递
                                console.log('上拉加载完毕');
                                 // 4. 把数据调用模板引擎生成html
                                var html = template('productListTmp',data);
                                // 5. 把生成的模板绑定到商品列表的内容
                                $('.content .mui-row').append(html); 
                                if(data.data.length > 0){                                    
                                  // 当前数据请求渲染完毕后结束下拉刷新
                                mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                                }else{
                                    //length小于等于表示数据已经加载完毕
                                    //结束上拉加载并且提示没有更多数据了
                                     mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                                }
                            });       
                            // 延迟1.5秒结束上拉加载更多
                            // mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                            // 调用结束上拉加载更多并且传入了true既结束上拉加载更多并且提示没有更多数据
                            // mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                        }, 1500)
                    } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                }
            }
        });
    },
    // 搜索商品列表
    searchProductList:function () {
        // 1. 给搜索按钮添加点击事件  tap是移动端的点击事件 
        // 使用touchstart事件模拟的 解决click延迟问题 移动端推荐使用tap事件
        // 在PC端有一些版本浏览器tap在模拟器会触发2次 真机不会
        //mui在下拉刷新和上拉加载里面阻止了click事件 推荐使用tap
        $('.btn-search').on('tap',function () {
            // 2. 获取当前输入的搜索的内容
            search = $('.input-search').val()
            console.log(search);
            // 3. 调用获取商品列表的API搜索商品
            letao.getProductList({
                proName:search
            },function (data) {
                   // 4. 把数据调用模板引擎生成html
                var html = template('productListTmp',data);
                // 5. 把生成的模板绑定到商品列表的内容
                $('.content .mui-row').html(html); 
            });
        })
    },
    getProductList:function (obj,callback) {
         $.ajax({
            url:'/product/queryProduct',
            //使用当前对象上的参数属性 例如obj.page是当前要请求的页码数
            // obj.pageSize当前请求每页数据量大小
            // obj.proName 当前搜索的商品的关键字
            data:{page:obj.page || 1,pageSize:obj.pageSize || 2,proName:obj.proName},
            success:function (data) {
                console.log(data);
                // 判断回调函数传递了就调用
                if(callback){            
                    //  数据确定渲染完毕后我就可以结束下拉刷新    
                    callback(data);
                }
            }
        });
    }
}
