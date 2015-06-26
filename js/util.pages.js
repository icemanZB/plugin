var pages = (function () {
    var p = {};
    p.handler = '';
    p.tag_name = '';
    p.count = 0; //记录总数
    p.total = 0; //总页数
    p.left = 4;
    p.right = 3;
    p.size = 7; //每页大小
    p.current = 1; //当前页
    p.operate = 0;
    p.val = ''; //附加的查询条件
    p.omission = '...';
    p.callback = {};
    p.request = function (index) {
        var q;
        p.current = index;
        if (p.val == '') {
            q = 'ix=' + p.current + '&sz=' + p.size + p.search();
        } else {
            q = 'ix=' + p.current + '&sz=' + p.size + p.val;
        }
        $.ajax({
            type: 'post',
            url: p.handler,
            dataType: 'json',
            data: q,
            success: p.callback
        });
        //p.CreatePage();
    };
    p.search = function () {
        var s = window.location.search;
        var arr = s.split('?');
        if (arr.length <= 1) {
            return '';
        }
        return '&' + arr[1];
    };
    p.buffer = (function () {
        var arr = [];
        return {
            Append: function (val) {
                arr.push(val);
            },
            ToString: function (part) {
                if (typeof (part) == 'undefined') {
                    part = '';
                }
                return arr.join(part);
            },
            Clear: function () {
                arr = [];
            }
        };
    })();
    p.Total = function () {
        p.total = Math.ceil(p.count / p.size);
        return p.total;
    };
    p.Previous = function () {
        p.current = p.current - 1;
        if (p.current <= 0) {
            p.current = 1;
        }
        return p.current;
    };
    p.Next = function () {
        var total = p.Total();
        p.current = p.current + 1;
        if (p.current > total) {
            p.current = total;
        }
        return p.current;
    };
    p.First = function () {
        p.current = 1;
        return p.current;
    };
    p.Last = function () {
        p.current = p.Total();
        return p.current;
    };
    p.RequestHtml = function (ix, nm) {
        return '<a href="javascript:;" onclick="pages.request(' + ix + ')">&nbsp;' + nm + '&nbsp;</a>';
    };
    /*创建页码*/
    p.CreateColumn = function (begin, end) {
        p.buffer.Clear();
        var total = p.Total();
        //生成首页
        if (p.current > p.left + p.right) {
            p.buffer.Append(p.RequestHtml(1, 1 + p.omission));
        }
        for (var i = begin; i <= end; i++) {
            if (p.current == i) {
                p.buffer.Append('<span class="current">&nbsp;' + i + '&nbsp;</span>');
            } else {
                p.buffer.Append(p.RequestHtml(i, i));
            }
        }
        //生成尾页
        if ((total - end) == 1) {
            p.buffer.Append(p.RequestHtml(total, total));
        }
        if ((total - end) > 1) {
            p.buffer.Append(p.RequestHtml(total, total + p.omission));
        }
        return p.buffer.ToString();
    };
    /*生成分页，页码*/
    p.CreatePage = function () {
        if (p.count <= 0 || p.count <= p.size) {
            $('#' + p.tag_name).empty();
            return;
        }
        var begin;
        var end;
        var total = p.Total();
        var count = p.left + p.right;
        if (total <= count) {
            begin = 1;
            end = total;
        } else {
            if (p.current <= p.left) {
                begin = 1;
                end = count;
            } else {
                if (p.current >= total - p.right) {
                    begin = total - count + 1;
                    end = total;
                } else {
                    begin = p.current - p.left + 1;
                    end = p.current + p.right;
                }
            }
        }
        var column = p.CreateColumn(begin, end);
        p.buffer.Clear();
        //生成页头
        if (p.current == 1) {
            p.buffer.Append('<span class="disabled"></span>');
        } else {
            p.buffer.Append('<a href="javascript:;" onclick="pages.request(pages.Previous())">&lt;上一页</a>');
        }
        //生成页码
        p.buffer.Append(column);
        //生成页尾
        if (p.current == p.Total()) {
            p.buffer.Append('<span class="disabled"></span>');
        } else {
            p.buffer.Append('<a href="javascript:;" onclick="pages.request(pages.Next())">下一页&gt;</a>');
        }
        $('#' + p.tag_name).html(p.buffer.ToString());

    };
    p.Init = function () {
        p.request(p.current);
    };
    return p;
})();