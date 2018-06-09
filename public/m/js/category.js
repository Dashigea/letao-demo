$(function () {
    var letao = new Letao();
    // 通过letao对象的初始化轮播图
    letao.initSlide();
    // 通过乐淘对象初始化区域滚动
    letao.initScroll();
    letao.getCategoryLeft();
    letao.getCategoryRight();
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
        $.ajax({

            url: '/category/queryTopCategory',
            success: function (data) {
                var html = template('cateogoryLeftTmp', data);
                $(".category-left ul").html(html);
            }
        })
    },
    // 点击左侧获取右侧品牌数据
    getCategoryRight: function () {
        getRightData(1);
        $('.category-left ul').on("click", 'a', function (e) {
            // 去类名
            $(e.target.parentNode).addClass('active').siblings().removeClass('active');
            // var current = $(e.target);
            // console.log(current);
            var id = e.target.dataset['id'];
            
            getRightData(id);
        });

        function getRightData(id) {
            $.ajax({
                url: '/category/querySecondCategory',
                data: {
                    id: id
                }, //右侧API需要传递参数
                success: function (data) {
                    // 6. 调用右侧分类的模板生成html
                    var html = template('categoryRightTmp', data);
                    if (html) {
                        // 7. 把html渲染到右侧的mui-row里面
                        $('.category-right .mui-row').html(html);
                    } else {
                        // 8. 提示没有数据
                        $('.category-right .mui-row').html('<h6>真没了</h6>');
                    }
                }
            });
        }
    }

}