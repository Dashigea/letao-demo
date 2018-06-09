$(function () {
    var letao = new Letao();
    // 通过letao对象的初始化轮播图
    letao.initSlide();
    // 通过乐淘对象初始化区域滚动
    letao.initScroll();
    letao.getCategoryLeft();
})
//Letao的构造函数
var Letao = function () {

}
Letao.prototype = {
    initSlide: function () {
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
    },
    // 初始化区域滚动
    initScroll: function () {
        var options = {
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: true, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: true //是否启用回弹
        };
        mui('.mui-scroll-wrapper').scroll(options);
    },
    // 获取左侧分类的数据
    getCategoryLeft: function () {
        // 1. 发送请求获取左侧分类的数据
        // $.ajax({
        //     url:'category/queryTopCategory',
        //     success: function (data) {
        //         console.log(data);
        //     }
        // })
    }
}