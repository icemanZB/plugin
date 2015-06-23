/**
 * json返回的日期通常都是/Date(1354648740000)/这样的格式
 * 转换Json类型的日期数据格式 yyyy-MM-dd HH:mm:ss
 * */

var formatTime = (function () {
    var f = {};

    function initJsonDate(jsonDate) {
        var date = new Date(parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10));
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hh: date.getHours(),
            mm: date.getMinutes(),
            ss: date.getSeconds()
        };
    }

    function initDate(myDate) {
        var date = myDate;
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hh: date.getHours(),
            mm: date.getMinutes(),
            ss: date.getSeconds()
        };
    }

    f.convertJSONFullDate = function (jsonDate) {
        var date = initJsonDate(jsonDate);

        var currentDate = "";

        currentDate += date.year + "-";
        currentDate += zeroize(date.month) + "-";
        currentDate += zeroize(date.day);
        currentDate += " " + zeroize(date.hh) + ":";
        currentDate += zeroize(date.mm) + ":";
        currentDate += zeroize(date.ss);

        return currentDate;

    };

    f.convertJSONDate = function (jsonDate) {
        var date = initJsonDate(jsonDate);

        var currentDate = "";

        currentDate += date.year + "-";
        currentDate += zeroize(date.month) + "-";
        currentDate += zeroize(date.day);

        return currentDate;
    };

    f.convertJSONDateToTime = function (jsonDate) {
        var date = initJsonDate(jsonDate);

        var currentDate = "";

        currentDate += zeroize(date.hh) + "：" + zeroize(date.mm);

        return currentDate;
    };

    f.formatDate = function (myDate) {

        var date = initDate(myDate);

        var currentDate = "";

        currentDate += date.year + "-";
        currentDate += zeroize(date.month) + "-";
        currentDate += zeroize(date.day);
        currentDate += " " + zeroize(date.hh) + ":";
        currentDate += zeroize(date.mm) + ":";
        currentDate += zeroize(date.ss);

        return currentDate;
    };

    f.getChineseWeek = function (jsonDate) {
        var date = new Date(parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10));
        return convertToChineseWeek(date.getDay());
    };

    function zeroize(num) {

        if (num < 10) {
            num = '0' + num;
        }

        return num;
    }

    function convertToChineseWeek(num) {
        var result = "";

        switch (num) {
            case 0:
                result = "日";
                break;
            case 1:
                result = "一";
                break;
            case 2:
                result = "二";
                break;
            case 3:
                result = "三";
                break;
            case 4:
                result = "四";
                break;
            case 5:
                result = "五";
                break;
            case 6:
                result = "六";
                break;
            default:
                result = "一";
                break;
        }

        return result;
    }


    return f;
})();




