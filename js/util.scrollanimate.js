var ScrollAnimate = (function () {
    var o = {};
    var auto = true; //自动滚动
    var total = 0;
    var count = 7;
    var item_w = 128;
    var index = 0;
    var cur_index = 0;
    var container = "";
    o.Init = function (objId) {
        if (!objId || objId == "") {
            return;
        }
        //初始化
        container = objId;
        //属性
        if ($(container).attr("auto")) {
            auto = $(container).attr("auto");
        }
        if ($(container).attr("count")) {
            count = $(container).attr("count");
        }
        //item_w = $(container).find("li").eq(0).width();

        total = $(container).find("li").length;
        index = parseInt((total - 1) / count);
        //事件
        $(container).find('.og_prev,.og_next').hover(function () {
            $(this).fadeTo('fast', 1);
        }, function () {
            $(this).fadeTo('fast', 0.7);
        });
        if (index > 0) {
            $(container).find(".og_next").click(function () {
                o.Next()
            });
            $(container).find(".og_prev").click(function () {
                o.Prev()
            });
        }
    };
    o.Next = function () {
        if ($(container).find('.mainlist').is(':animated')) {
            $(this).stop(true, true);
        }
        if (cur_index >= index) {
            cur_index = 0;
        }
        else {
            cur_index++;
        }
        $(container).find(".mainlist").animate({left: -1 * cur_index * (item_w * count) + "px"}, "slow");
    };
    o.Prev = function () {
        if ($(container).find('.mainlist').is(':animated')) {
            $(this).stop(true, true);
        }
        if (cur_index == 0) {
            cur_index = index;
        }
        else {
            cur_index--;
        }
        $(container).find(".mainlist").animate({left: -1 * cur_index * (item_w * count) + "px"}, "slow");
    };

    return o;
})();