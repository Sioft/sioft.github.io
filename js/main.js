// 样式
import '../css/main.scss'
// 上报
import './report'
// 图片查看器
import Viewer from './viewer'
// 分享
import Share from './share'
// 边缘
import Aside from './aside'

import {addLoadEvent} from './util'

addLoadEvent(function() {
	Share.init()
	Viewer.init()
	Aside.init()
})

if($(".instagram").length) {
    require(['/js/photo.js', '/fancybox/jquery.fancybox.js', '/js/jquery.lazyload.js'], function(obj) {
        obj.init();
    });
}

define([], function () {
        return {
            page: 1,
            offset: 20,
            init: function () {
                var that = this;
                $.getJSON("/photo/data.json", function (data) {
                    that.render(that.page, data);

                    that.scroll(data);
                });
            },

            render: function (page, data) {
                var begin = (page - 1) * this.offset;
                var end = page * this.offset;
                if (begin >= data.length) return;
                var html, li = "";
                for (var i = begin; i < end && i < data.length; i++) {
                    li += '<li><div class="img-box">' +
                        '<a class="img-bg" rel="example_group" href="https://github.com/Sioft/Blog_backups/master/photos/' + data[i] + '?raw=true"></a>' +
                        '<img lazy-src="https://github.com/Sioft/Blog_backups/master/photos/' + data[i] + '?raw=true" />' +
                        '</li>';
                }

                $(".img-box-ul").append(li);
                $(".img-box-ul").lazyload();
                $("a[rel=example_group]").fancybox();
            },

            scroll: function (data) {
                var that = this;
                $(window).scroll(function() {
                    var windowPageYOffset = window.pageYOffset;
                    var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
                    var sensitivity = 0;

                    var offsetTop = $(".instagram").offset().top + $(".instagram").height();

                    if (offsetTop >= windowPageYOffset && offsetTop < windowPageYOffsetAddHeight + sensitivity) {
                        that.render(++that.page, data);
                    }
                })
            }
        }
    })