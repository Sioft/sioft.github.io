function init() {
    console.log("加载照片");
    var that = this;
    $.getJSON("/photo/data.json", function (data) {
        render(that.page, data);
    });
}
    init();

function render(page, data) {
    console.log(data);
    var begin = (page - 1) * this.offset;
    console.log(begin);
    var end = page * this.offset;
    console.log(end);
    if (begin >= data.length) return;
    var html, li = "";
    /*for (var i = begin; i < end && i < data.length; i++) {*/
    for (var i = 0; i < data.length; i++) {
        li += '<li><div class="img-box">' + '<a class="img-bg" rel="example_group" href="https://raw.githubusercontent.com/Sioft/Blog_backups/master/photos/' + data[i] + '"></a>' + '<img lazy-src="https://raw.githubusercontent.com/Sioft/Blog_backups/master/photos/' + data[i] + '" />' + '</li>';
    }
    console.log("li="+li);
    $(".img-box-ul").append(li);
    jQuery(function($) {
        $(".img-box-ul").lazyload();
    });
    
    $("a[rel=example_group]").fancybox();
}


