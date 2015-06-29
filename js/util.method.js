var Sender = (function () {
    var s = {};
    s.val = '';
    s.datatype = 'json';
    s.handler = '';
    s.async = true;
    s.callback = {};
    s.timeout = 30000;
    s.errorMsg = '时间请求超时';
    s.errorback = function (XMLHttpRequest, textStatus, errorThrown) {
        if (textStatus == "timeout") {
            alert(s.errorMsg);
        }
    };
    s.onSubmit = function () {
        $.ajax({
            type: 'post',
            async: s.async,
            url: s.handler,
            dataType: s.datatype,
            data: s.val,
            timeout: s.timeout,
            success: s.callback,
            error: s.errorback,
            beforeSend: s.beforeSend
        });
    };
    s.getData = function () {
        $.ajax({
            type: 'get',
            url: s.handler,
            dataType: s.datatype,
            data: s.val,
            timeout: s.timeout,
            success: s.callback,
            error: s.errorback,
            beforeSend: s.beforeSend
        });
    };

    return s;
})();

var Validator;
Validator = (function () {
    var v = {};
    v.Safe = /^[\-a-zA-Z0-9\u4e00-\u9fa5]+$/;
    v.Account = /^[a-z][a-z0-9]{3,15}$/;
    v.UnSafe = /[@#\$%\^\*<>'=;\(\)\-;"/\\]+/;
    v.UserName = /^[A-Za-z0-9\u4e00-\u9fa5]{2,10}$/;
    v.UserRealName = /^[\u4e00-\u9fa5]{1,20}$/;
    v.Email = /^[A-Za-z0-9_]+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    v.Mobile = /^(13|14|15|18)\d{9}$/;
    v.Phone = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
    v.Msn = /^\w+@hotmail\.com$/;
    v.Number = /^\d+$/;
    v.Zip = /^[1-9]\d{5}$/;
    v.QQ = /^[1-9]\d{4,14}$/;
    v.English = /^[A-Za-z]+$/;
    v.Chinese = /^[\u0391-\uFFE5]+$/;
    v.Int = /^[0-9]+$/;
    v.Card = /^\d{17}[\dxX]$/;
    v.Float = /^[\+\-]?\d+(\.\d{2})?$/;
    v.Decimal = /^[\+\-]?\d{1,18}(\.\d{2,10})?$/;
    v.Double = /^[\+\-]?\d+(\.\d+)?$/;
    v.Currency = /^\d+(\.\d+)?$/;
    v.Favorite = /^([\-a-zA-Z0-9\u4e00-\u9fa5]+[\s]?[\-a-zA-Z0-9\u4e00-\u9fa5]*)*$/;
    v.Url = /^(http|https)\:\/\/\w*(\.\w+)*(\/\w+)*(\?\w+=\w*(&\w+=\w*)*)?\/?\w*.?\w*$/g;
    v.Ip = /^([0-9]{1,3}\.{1}){3}[0-9]{1,3}$/;

    v.Result = {Status: true, Msg: ''};
    v.Target = {};
    v.stringBuffer = [];
    v.val = '';

    v.startVerify = function (control, str) {
        switch (control) {
            case 0:
                v.Target = v.byid(str);
                v.val = v.Target.value;
                break;
            case 1:
                v.Target = v.byid(str);
                v.val = v.Target.options[v.Target.selectedIndex].value;
                break;
            case 2:
                v.Target = document.getElementsByName(str);
                for (var i = 0; i < v.Target.length; i++) {
                    if (v.Target[i].checked) {
                        v.append(v.Target[i].value);
                    }
                }
                v.val = v.stringBuffer.join(',');
                v.clear();
                break;
            default:
                v.val = str;
                break;
        }
        return this;
    };
    v.append = function (val) {
        v.stringBuffer.push(val);
        return this;
    };

    v.count = function () {
        return v.stringBuffer.length;
    };
    v.clear = function () {
        var length = v.count();
        for (var i = 0; i < length; i++) {
            v.stringBuffer.pop();
        }
    };
    v.byid = function (id) {
        return document.getElementById(id);
    };
    v.verify = function (mode, msg) {
        switch (mode) {
            case 0:
                return v.checkByRegex(v.Safe, msg);
            case 1:
                return v.checkByUnSafe(v.UnSafe, msg);
            case 2:
                return v.checkByRegex(v.Email, msg);
            case 3:
                return v.checkByRegex(v.Mobile, msg);
            case 4:
                return v.checkByRegex(v.Zip, msg);
            case 5:
                return v.checkByRegex(v.QQ, msg);
            case 6:
                return v.checkByRegex(v.English, msg);
            case 7:
                return v.checkByRegex(v.Chinese, msg);
            case 8:
                return v.checkByRegex(v.Float, msg);
            case 9:
                return v.checkByRegex(v.Decimal, msg);
            case 10:
                return v.checkByRegex(v.Double, msg);
            case 11:
                return v.checkByRegex(v.Currency, msg);
            case 12:
                return v.checkByRegex(v.UserName, msg);
            case 13:
                return v.checkByRegex(v.Msn, msg);
            case 14:
                return v.checkByRegex(v.Phone, msg);
            case 15:
                return v.checkByRegex(v.Int, msg);
            case 16:
                return v.checkByRegex(v.UserRealName, msg);
            case 17:
                return v.checkByRegex(v.Favorite, msg);
            case 18:
                return v.checkByRegex(v.Account, msg);
            case 19:
                return v.checkByRegex(v.Url, msg);
            case 20:
                return v.checkByRegex(v.Ip, msg);
            default:
                return v.checkByRegex(mode, msg);
        }
    };
    v.checkByCard = function (msg) {
        if (!v.Result.Status) {
            return this;
        }
        var result = v.Card.test(v.val);
        var a = "7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2".split(' ');
        var b = "1 0 X 9 8 7 6 5 4 3 2".split(' ');
        var n = 0;
        for (var i = 0; i < 17; i++) {
            n += v.val.charAt(i) * a[i];
        }
        if (b[n % 11] != v.val.charAt(17).toUpperCase()) {
            result = false;
        }

        if (!result) {
            v.Result.Status = false;
            v.Result.Msg = msg;
        }
        return this;
    };
    v.checkByRegex = function (reg, msg) {
        if (!v.Result.Status) {
            return this;
        }
        var result = reg.test(v.val);
        if (!result) {
            v.Result.Status = false;
            v.Result.Msg = msg;
        }
        return this;
    };
    v.checkByUnSafe = function (reg, msg) {
        if (!v.Result.Status) {
            return this;
        }
        var result = reg.test(v.val);
        if (result) {
            v.Result.Status = false;
            v.Result.Msg = msg;
        }
        return this;
    };
    v.checkIntMinValue = function (min, msg) {
        if (!v.Result.Status) {
            return this;
        }
        if (v.val < min) {
            v.Result.Status = false;
            v.Result.Msg = msg;
        }
        return this;
    };
    v.checkIntMaxValue = function (max, msg) {
        if (!v.Result.Status) {
            return this;
        }
        if (v.val > max) {
            v.Result.Status = false;
            v.Result.Msg = msg;
        }
        return this;
    };
    v.checkStringMaxLength = function (max, msg) {
        if (!v.Result.Status) {
            return this;
        }
        var length = v.val.length;
        if (length > max) {
            v.Result.Status = false;
            v.Result.Msg = msg;
        }
        return this;
    };
    v.checkStringMinLength = function (min, msg) {
        if (!v.Result.Status) {
            return this;
        }
        var length = v.val.length;
        if (length < min) {
            v.Result.Status = false;
            v.Result.Msg = msg;
        }
        return this;
    };
    v.checkByteMinLength = function (min, msg) {
        if (!v.Result.Status) {
            return this;
        }
        var length = v.val.replace(/[^\x00-\xff]/g, "**").length;
        if (length < min) {
            v.Result.Status = false;
            v.Result.Msg = msg;
        }
        return this;
    };
    v.checkByteMaxLength = function (max, msg) {
        if (!v.Result.Status) {
            return this;
        }
        var length = v.val.replace(/[^\x00-\xff]/g, "**").length;
        if (length > max) {
            v.Result.Status = false;
            v.Result.Msg = msg;
        }
        return this;
    };
    v.checkDateTimeMax = function (max, msg) {
        if (!v.Result.Status) {
            return this;
        }
        if (v.val > max) {
            v.Result.Status = false;
            v.Result.Msg = msg;
        }
        return this;
    };
    v.checkDateTimeMin = function (min, msg) {
        if (!v.Result.Status) {
            return this;
        }
        if (v.val < min) {
            v.Result.Status = false;
            v.Result.Msg = msg;
        }
        return this;
    };
    v.checkDateTime = function (max, min, msg) {
        if (!v.Result.Status) {
            return this;
        }
        if (max < min) {
            v.Result.Status = false;
            v.Result.Msg = msg;
        }
        return this;
    };
    v.checkGroupMaxLimit = function (max, msg) {
        if (!v.Result.Status) {
            return this;
        }
        var arr = v.val.split(',');
        var length = arr.length;
        if (length > max) {
            v.Result.Status = false;
            v.Result.Msg = msg;
        }
        return this;
    };
    v.checkGroupMinLimit = function (min, msg) {
        if (!v.Result.Status) {
            return this;
        }
        var arr = v.val.split(',');
        var length = arr.length;
        if (length < min) {
            v.Result.Status = false;
            v.Result.Msg = msg;
        }
        return this;
    };
    v.checkIsEmpty = function (msg) {
        if (!v.Result.Status) {
            return this;
        }
        if (v.val.replace(/\s*/g, "") == '') {
            v.Result.Status = false;
            v.Result.Msg = msg;
        }
        return this;
    };
    v.endVerify = function () {
        return v.Result;
    };
    v.prompt = function () {
        v.clearMessage();
        return v.Result.Status;
    };
    v.clearMessage = function () {
        v.Result.Status = true;
        v.Result.Msg = '';
    };
    return v;
})();

var string = (function () {
    var s = {};
    s.trim = function (value) {
        // 去除前后空格
        return value.replace(/(^\s*)|(\s*$)/g, "");
    };
    s.indexOf = function indexOf(selected, it) {
        for (var i = 0, j; j = selected[i]; i++) {
            if (j != null) {
                if (j == it) {
                    return i;
                }
            }
        }
        return -1;
    };
    s.replace = function (str) {
        if (typeof (str) == 'undefined') {
            return;
        }
        return str.replace(/\+/g, '%2B');
    };
    s.eval = function (str) {
        if (typeof (str) == 'undefined') {
            return;
        }
        return eval('(' + str + ')');
    };
    s.indexString = function (str, length) {
        var len = str.replace(/[^\x00-\xff]/g, "**").length; // 中英文统计(一个中文算两个字符)  \x00-\xff 16进制
        if (len <= length) {
            return str;
        }
        return str.substring(0, length - 1) + "...";
    };

    return s;

})();

var browser = (function () {
    var b = {};
    b.loaded = function (func) {
        var oldload = window.onload;
        if (typeof oldload != 'function') {
            window.onload = func;
        } else {
            window.onload = function () {
                oldload();
                func();
            }
        }
    };
    return b;
})();

/**
 *
 * openUrl.openNewWindow(url);
 * */
var openUrl = (function () {
    var o = {};
    o.openNewWindow = function (toUrl) {
        window.open('about:blank');  // 继承空白页面
        location.href = toUrl;
    };
    return o;
})();

function abc(){
    alert(1);
}
