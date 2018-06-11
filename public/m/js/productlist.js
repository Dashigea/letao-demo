$(function () {
    var letao = new Letao();
    letao.initPullRefresh();
})
var Letao = function () {

}
// 对象的原型
Letao.prototype = {
    
    initPullRefresh: function () {
        mui.init({
            pullRefresh: {
                container: ".mui-scroll-wrapper",
                // 初始化下拉刷新
                down: {
                    // height: 50, //可选,默认50.触发下拉刷新拖动距离,
                    // auto: false, //可选,默认false.首次加载自动下拉刷新一次
                    // contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    // contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    // contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    callback: function () {
                        setTimeout(function () {
                            mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                        }, 1500)
                    }
                    //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                },
                // 初始化上拉刷新
                up: {
                    
                    contentrefresh: "我也是有底线的", 
                    callback: function () {
                        setTimeout(function () {
                            mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh();
                        }, 1500)
                    }
                    //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                },
            }
        })
    }
}