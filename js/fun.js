// �ַ������Ƚ�ȡ
function cutStr(str, len) {
    var temp,
        icount = 0,
        patrn = /[^\x00-\xff]/,
        strre = "";
    for (var i = 0; i < str.length; i++) {
        if (icount < len - 1) {
            temp = str.substr(i, 1);
            if (patrn.exec(temp) == null) {
                icount = icount + 1;
            } else {
                icount = icount + 2;
            }
            strre += temp;
        } else {
            break;
        }
    }
    return strre + "...";
}

// �滻ȫ��
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};

// ����ո�
String.prototype.trim = function () {
    var reExtraSpace = /^\s*(.*?)\s+$/;
    return this.replace(reExtraSpace, "$1");
};

// �����ո�/�ҿո�
function ltrim(s) {
    return s.replace(/^(\s*|��*)/, "");
}
function rtrim(s) {
    return s.replace(/(\s*|��*)$/, "");
}

// �ж��Ƿ���ĳ���ַ�����ͷ
String.prototype.startWith = function (s) {
    return this.indexOf(s) == 0;
};

// �ж��Ƿ���ĳ���ַ�������
String.prototype.endWith = function (s) {
    var d = this.length - s.length;
    return (d >= 0 && this.lastIndexOf(s) == d);
};

// ת��html��ǩ
function HtmlEncode(text) {
    return text.replace(/&/g, '&').replace(/\"/g, '"').replace(/</g, '<').replace(/>/g, '>');
}

// ʱ�����ڸ�ʽת��
Date.prototype.Format = function (formatStr) {
    var str = formatStr;
    var Week = ['��', 'һ', '��', '��', '��', '��', '��'];
    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, (this.getMonth() + 1));
    str = str.replace(/w|W/g, Week[this.getDay()]);
    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());
    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());
    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str
};

// �ж��Ƿ�Ϊ��������
function isDigit(value) {
    var patrn = /^[0-9]*$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}

// ����cookieֵ
function setCookie(name, value, Hours) {
    var d = new Date();
    var offset = 8;
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = utc + (3600000 * offset);
    var exp = new Date(nd);
    exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=360doc.com;"
}

// ��ȡcookieֵ
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null
}

// �����ղؼ�
function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle)
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "")
        } catch (e) {
            alert("�����ղ�ʧ�ܣ���ʹ��Ctrl+D��������")
        }
    }
}

// ��Ϊ��ҳ
function setHomepage() {
    if (document.all) {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage('http://w3cboy.com')
    } else if (window.sidebar) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
            } catch (e) {
                alert("�ò�����������ܾ�����������øù��ܣ����ڵ�ַ�������� about:config,Ȼ���� signed.applets.codebase_principal_support ֵ��Ϊtrue")
            }
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage', 'http://w3cboy.com')
    }
}

// ������ʽ�ļ�
function LoadStyle(url) {
    try {
        document.createStyleSheet(url)
    } catch (e) {
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = url;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(cssLink)
    }
}

// ���ؽű�����
function evalscript(s) {
    if (s.indexOf('<script') == -1) return s;
    var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
    var arr = [];
    while (arr = p.exec(s)) {
        var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
        var arr1 = [];
        arr1 = p1.exec(arr[0]);
        if (arr1) {
            appendscript(arr1[1], '', arr1[2], arr1[3]);
        } else {
            p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
            arr1 = p1.exec(arr[0]);
            appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);
        }
    }
    return s;
}

// ����ű�����
function stripscript(s) {
    return s.replace(/<script.*?>.*?<\/script>/ig, '');
}

// ��̬���ؽű��ļ�
function appendscript(src, text, reload, charset) {
    var id = hash(src + text);
    if (!reload && in_array(id, evalscripts)) return;
    if (reload && $(id)) {
        $(id).parentNode.removeChild($(id));
    }

    evalscripts.push(id);
    var scriptNode = document.createElement("script");
    scriptNode.type = "text/javascript";
    scriptNode.id = id;
    scriptNode.charset = charset ? charset : (BROWSER.firefox ? document.characterSet : document.charset);
    try {
        if (src) {
            scriptNode.src = src;
            scriptNode.onloadDone = false;
            scriptNode.onload = function () {
                scriptNode.onloadDone = true;
                JSLOADED[src] = 1;
            };
            scriptNode.onreadystatechange = function () {
                if ((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.onloadDone) {
                    scriptNode.onloadDone = true;
                    JSLOADED[src] = 1;
                }
            };
        } else if (text) {
            scriptNode.text = text;
        }
        document.getElementsByTagName('head')[0].appendChild(scriptNode);
    } catch (e) {
    }
}

// ���ذ�ID������Ԫ�ض���
function $(id) {
    return !id ? null : document.getElementById(id);
}

// ����������¼�
function addEventSamp(obj, evt, fn) {
    if (!oTarget) {
        return;
    }
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    } else if (obj.attachEvent) {
        obj.attachEvent('on' + evt, fn);
    } else {
        oTarget["on" + sEvtType] = fn;
    }
}

// �������ɾ���¼�
function delEvt(obj, evt, fn) {
    if (!obj) {
        return;
    }
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    } else if (oTarget.attachEvent) {
        obj.attachEvent("on" + evt, fn);
    } else {
        obj["on" + evt] = fn;
    }
}

// ΪԪ������on����
Element.prototype.on = Element.prototype.addEventListener;

NodeList.prototype.on = function (event, fn) {
    []['forEach'].call(this, function (el) {
        el.on(event, fn);
    });
    return this;
};

// ΪԪ������trigger����
Element.prototype.trigger = function (type, data) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    event.data = data || {};
    event.eventName = type;
    event.target = this;
    this.dispatchEvent(event);
    return this;
};

NodeList.prototype.trigger = function (event) {
    []['forEach'].call(this, function (el) {
        el['trigger'](event);
    });
    return this;
};

// ����URL�����Ƿ���Ч
function getUrlState(URL) {
    var xmlhttp = new ActiveXObject("microsoft.xmlhttp");
    xmlhttp.Open("GET", URL, false);
    try {
        xmlhttp.Send();
    } catch (e) {
    } finally {
        var result = xmlhttp.responseText;
        if (result) {
            if (xmlhttp.Status == 200) {
                return (true);
            } else {
                return (false);
            }
        } else {
            return (false);
        }
    }
}

// ��ʽ��CSS��ʽ����
function formatCss(s) {//��ʽ������
    s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    s = s.replace(/;\s*;/g, ";"); //��������ֺ�
    s = s.replace(/\,[\s\.\#\d]*{/g, "{");
    s = s.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");
    s = s.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
    s = s.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");
    return s;
}

// ѹ��CSS��ʽ����
function compressCss(s) {//ѹ������
    s = s.replace(/\/\*(.|\n)*?\*\//g, ""); //ɾ��ע��
    s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    s = s.replace(/\,[\s\.\#\d]*\{/g, "{"); //�ݴ�����
    s = s.replace(/;\s*;/g, ";"); //��������ֺ�
    s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); //ȥ����β�հ�
    return (s == null) ? "" : s[1];
}

// ��ȡ��ǰ·��
var currentPageUrl = "";
if (typeof this.href === "undefined") {
    currentPageUrl = document.location.toString().toLowerCase();
} else {
    currentPageUrl = this.href.toString().toLowerCase();
}

// �ж��Ƿ��ƶ��豸
function isMobile() {
    if (typeof this._isMobile === 'boolean') {
        return this._isMobile;
    }
    var screenWidth = this.getScreenWidth();
    var fixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;
    var fixViewPortsExperimentRunning = fixViewPortsExperiment && (fixViewPortsExperiment.toLowerCase() === "new");
    if (!fixViewPortsExperiment) {
        if (!this.isAppleMobileDevice()) {
            screenWidth = screenWidth / window.devicePixelRatio;
        }
    }
    var isMobileScreenSize = screenWidth < 600;
    var isMobileUserAgent = false;
    this._isMobile = isMobileScreenSize && this.isTouchScreen();
    return this._isMobile;
}

// �ж��Ƿ��ƶ��豸����
function isMobileUserAgent() {
    return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
}

// �ж��Ƿ�ƻ���ƶ��豸����
function isAppleMobileDevice() {
    return (/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase()));
}

// �ж��Ƿ�׿�ƶ��豸����
function isAndroidMobileDevice() {
    return (/android/i.test(navigator.userAgent.toLowerCase()));
}

// �ж��Ƿ�Touch��Ļ
function isTouchScreen() {
    return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
}

// �ж��Ƿ���Ӵ�
function isViewportOpen() {
    return !!document.getElementById('wixMobileViewport');
}

// ��ȡ�ƶ��豸��ʼ����С
function getInitZoom() {
    if (!this._initZoom) {
        var screenWidth = Math.min(screen.height, screen.width);
        if (this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()) {
            screenWidth = screenWidth / window.devicePixelRatio;
        }
        this._initZoom = screenWidth / document.body.offsetWidth;
    }
    return this._initZoom;
}

// ��ȡ�ƶ��豸��󻯴�С
function getZoom() {
    var screenWidth = (Math.abs(window.orientation) === 90) ? Math.max(screen.height, screen.width) : Math.min(screen.height, screen.width);
    if (this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()) {
        screenWidth = screenWidth / window.devicePixelRatio;
    }
    var FixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;
    var FixViewPortsExperimentRunning = FixViewPortsExperiment && (FixViewPortsExperiment === "New" || FixViewPortsExperiment === "new");
    if (FixViewPortsExperimentRunning) {
        return screenWidth / window.innerWidth;
    } else {
        return screenWidth / document.body.offsetWidth;
    }
}

// ��ȡ�ƶ��豸��Ļ����
function getScreenWidth() {
    var smallerSide = Math.min(screen.width, screen.height);
    var fixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;
    var fixViewPortsExperimentRunning = fixViewPortsExperiment && (fixViewPortsExperiment.toLowerCase() === "new");
    if (fixViewPortsExperiment) {
        if (this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()) {
            smallerSide = smallerSide / window.devicePixelRatio;
        }
    }
    return smallerSide;
}

// �����ж��Ƿ�Ϊ��ַ
function IsURL(strUrl) {
    var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
    if (regular.test(strUrl)) {
        return true;
    } else {
        return false;
    }
}

// getElementsByClassName
function getElementsByClassName(name) {
    var tags = document.getElementsByTagName('*') || document.all;
    var els = [];
    for (var i = 0; i < tags.length; i++) {
        if (tags.className) {
            var cs = tags.className.split(' ');
            for (var j = 0; j < cs.length; j++) {
                if (name == cs[j]) {
                    els.push(tags);
                    break
                }
            }
        }
    }
    return els
}

// ��ȡҳ��߶�
function getPageHeight() {
    var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"
        ? a
        : g.documentElement;
    return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
}

// ��ȡҳ��scrollLeft
function getPageScrollLeft() {
    var a = document;
    return a.documentElement.scrollLeft || a.body.scrollLeft;
}

// ��ȡҳ����ӿ���
function getPageViewWidth() {
    var d = document, a = d.compatMode == "BackCompat"
        ? d.body
        : d.documentElement;
    return a.clientWidth;
}

// ��ȡҳ�����
function getPageWidth() {
    var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"
        ? a
        : g.documentElement;
    return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}

// ��ȡҳ��scrollTop
function getPageScrollTop() {
    var a = document;
    return a.documentElement.scrollTop || a.body.scrollTop;
}

// ��ȡҳ����Ӹ߶�
function getPageViewHeight() {
    var d = document, a = d.compatMode == "BackCompat"
        ? d.body
        : d.documentElement;
    return a.clientHeight;
}

// ȥ��urlǰ׺
function removeUrlPrefix(a) {
    a = a.replace(/��/g, ":").replace(/��/g, ".").replace(/��/g, "/");
    while (trim(a).toLowerCase().indexOf("http://") == 0) {
        a = trim(a.replace(/http:\/\//i, ""));
    }
    return a;
}

// �����ʱ���
function uniqueId() {
    var a = Math.random, b = parseInt;
    return Number(new Date()).toString() + b(10 * a()) + b(10 * a()) + b(10 * a());
}

// ȫ�ǰ��ת��
//iCase: 0ȫ���룬1�뵽ȫ��������ת��
function chgCase(sStr, iCase) {
    if (typeof sStr != "string" || sStr.length <= 0 || !(iCase === 0 || iCase == 1)) {
        return sStr;
    }
    var i, oRs = [], iCode;
    if (iCase) {/*��->ȫ*/
        for (i = 0; i < sStr.length; i += 1) {
            iCode = sStr.charCodeAt(i);
            if (iCode == 32) {
                iCode = 12288;
            } else if (iCode < 127) {
                iCode += 65248;
            }
            oRs.push(String.fromCharCode(iCode));
        }
    } else {/*ȫ->��*/
        for (i = 0; i < sStr.length; i += 1) {
            iCode = sStr.charCodeAt(i);
            if (iCode == 12288) {
                iCode = 32;
            } else if (iCode > 65280 && iCode < 65375) {
                iCode -= 65248;
            }
            oRs.push(String.fromCharCode(iCode));
        }
    }
    return oRs.join("");
}

// ȷ���Ƿ������Ч����ֵ
function checkKey(iKey) {
    if (iKey == 32 || iKey == 229) {
        return true;
    }
    /*�ո���쳣*/
    if (iKey > 47 && iKey < 58) {
        return true;
    }
    /*����*/
    if (iKey > 64 && iKey < 91) {
        return true;
    }
    /*��ĸ*/
    if (iKey > 95 && iKey < 108) {
        return true;
    }
    /*���ּ���1*/
    if (iKey > 108 && iKey < 112) {
        return true;
    }
    /*���ּ���2*/
    if (iKey > 185 && iKey < 193) {
        return true;
    }
    /*����1*/
    if (iKey > 218 && iKey < 223) {
        return true;
    }
    /*����2*/
    return false;
}

// ��ȡ��ҳ����ȥ��λ��
function getScrollXY() {
    return document.body.scrollTop ? {
        x: document.body.scrollLeft,
        y: document.body.scrollTop
    } : {
        x: document.documentElement.scrollLeft,
        y: document.documentElement.scrollTop
    }
}

// ���ڸ�ʽ������+���÷���
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
    return format;
};
alert(new Date().format("yyyy-MM-dd hh:mm:ss"));

// ʱ����Ի��������

/*
 1��< 60s, ��ʾΪ���ոա�
 2��>= 1min && < 60 min, ��ʾ�뵱ǰʱ��XX����ǰ��
 3��>= 60min && < 1day, ��ʾ�뵱ǰʱ������ XX:XX��
 4��>= 1day && < 1year, ��ʾ���ڡ�XX��XX�� XX:XX��
 5��>= 1year, ��ʾ�������ڡ�XXXX��XX��XX�� XX:XX��
 */
function timeFormat(time) {
    var date = new Date(time),
        curDate = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 10,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        curYear = curDate.getFullYear(),
        curHour = curDate.getHours(),
        timeStr;

    if (year < curYear) {
        timeStr = year + '��' + month + '��' + day + '�� ' + hour + ':' + minute;
    } else {
        var pastTime = curDate - date,
            pastH = pastTime / 3600000;

        if (pastH > curHour) {
            timeStr = month + '��' + day + '�� ' + hour + ':' + minute;
        } else if (pastH >= 1) {
            timeStr = '���� ' + hour + ':' + minute + '��';
        } else {
            var pastM = curDate.getMinutes() - minute;
            if (pastM > 1) {
                timeStr = pastM + '����ǰ';
            } else {
                timeStr = '�ո�';
            }
        }
    }
    return timeStr;
}

// ���offsetX����������
// ��Ի����֧��offsetX/Y
function getOffset(e) {
    var target = e.target, // ��ǰ������Ŀ�����
        eventCoord,
        pageCoord,
        offsetCoord;

    // ���㵱ǰ����Ԫ�ص��ĵ��ľ���
    pageCoord = getPageCoord(target);

    // �����굽�ĵ��ľ���
    eventCoord = {
        X: window.pageXOffset + e.clientX,
        Y: window.pageYOffset + e.clientY
    };

    // �����ȡ��굽��һ����λ�ĸ�Ԫ�ص�����
    offsetCoord = {
        X: eventCoord.X - pageCoord.X,
        Y: eventCoord.Y - pageCoord.Y
    };
    return offsetCoord;
}

function getPageCoord(element) {
    var coord = {X: 0, Y: 0};
    // ����ӵ�ǰ����Ԫ�ص����ڵ�Ϊֹ��
    // ���� offsetParent Ԫ�ص� offsetLeft �� offsetTop ֵ֮��
    while (element) {
        coord.X += element.offsetLeft;
        coord.Y += element.offsetTop;
        element = element.offsetParent;
    }
    return coord;
}

// ���ض�����ͨ�÷���
function backTop(btnId) {
    var btn = document.getElementById(btnId);
    var d = document.documentElement;
    var b = document.body;
    window.onscroll = set;
    btn.style.display = "none";
    btn.onclick = function () {
        btn.style.display = "none";
        window.onscroll = null;
        this.timer = setInterval(function () {
            d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
            b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
            if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, window.onscroll = set);
        }, 10);
    };
    function set() {
        btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block' : "none"
    }
};
backTop('goTop');

// ���URL��GET����ֵ
// �÷��������ַ�� test.htm?t1=1&t2=2&t3=3, ��ô��ȡ�ã�GET["t1"], GET["t2"], GET["t3"]
function get_get() {
    querystr = window.location.href.split("?")
    if (querystr[1]) {
        GETs = querystr[1].split("&");
        GET = [];
        for (i = 0; i < GETs.length; i++) {
            tmp_arr = GETs.split("=")
            key = tmp_arr[0]
            GET[key] = tmp_arr[1]
        }
    }
    return querystr[1];
}

// ��һ������ͨ�÷���
function openWindow(url, windowName, width, height) {
    var x = parseInt(screen.width / 2.0) - (width / 2.0);
    var y = parseInt(screen.height / 2.0) - (height / 2.0);
    var isMSIE = (navigator.appName == "Microsoft Internet Explorer");
    if (isMSIE) {
        var p = "resizable=1,location=no,scrollbars=no,width=";
        p = p + width;
        p = p + ",height=";
        p = p + height;
        p = p + ",left=";
        p = p + x;
        p = p + ",top=";
        p = p + y;
        retval = window.open(url, windowName, p);
    } else {
        var win = window.open(url, "ZyiisPopup", "top=" + y + ",left=" + x + ",scrollbars=" + scrollbars + ",dialog=yes,modal=yes,width=" + width + ",height=" + height + ",resizable=no");
        eval("try { win.resizeTo(width, height); } catch(e) { }");
        win.focus();
    }
}

// ��ȡҳ�������������ַ
var aa = document.documentElement.outerHTML.match(/(url\(|src=|href=)[\"\']*([^\"\'\(\)\<\>\[\] ]+)[\"\'\)]*|(http:\/\/[\w\-\.]+[^\"\'\(\)\<\>\[\] ]+)/ig).join("\r\n").replace(/^(src=|href=|url\()[\"\']*|[\"\'\>\) ]*$/igm, "");
alert(aa);

// �����ͬ������
String.prototype.unique = function () {
    var x = this.split(/[\r\n]+/);
    var y = '';
    for (var i = 0; i < x.length; i++) {
        if (!new RegExp("^" + x.replace(/([^\w])/ig, "\\$1") + "$", "igm").test(y)) {
            y += x + "\r\n"
        }
    }
    return y
};

// ����ĸ���򣬶�ÿ�н�����������
function SetSort() {
    var text = K1.value.split(/[\r\n]/).sort().join("\r\n");//˳��
    var test = K1.value.split(/[\r\n]/).sort().reverse().join("\r\n");//����
    K1.value = K1.value != text ? text : test;
}

// �ַ�������
function IsReverse(text) {
    return text.split('').reverse().join('');
}

// ���html�����еĽű�
function clear_script() {
    K1.value = K1.value.replace(/<script.*?>[\s\S]*?<\/script>|\s+on[a-zA-Z]{3,16}\s?=\s?"[\s\S]*?"|\s+on[a-zA-Z]{3,16}\s?=\s?'[\s\S]*?'|\s+on[a-zA-Z]{3,16}\s?=[^ >]+/ig, "");
}

// ��ִ̬��JavaScript�ű�

function javascript() {
    try {
        eval(K1.value);
    } catch (e) {
        alert(e.message);
    }
}


/* ���õ��������ʽ
 //������
 /^[0-9]*[1-9][0-9]*$/;
 //������
 /^-[0-9]*[1-9][0-9]*$/;
 //��������
 /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
 //��������
 /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
 //������
 /^(-?\d+)(\.\d+)?$/;
 //email��ַ
 /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
 //url��ַ
 /^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;
 ��^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$
 //��/��/�գ���-��-�ա���.��.�գ�
 /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
 //ƥ�������ַ�
 /[\u4e00-\u9fa5]/;
 //ƥ���ʺ��Ƿ�Ϸ�(��ĸ��ͷ������5-10�ֽڣ�������ĸ�����»���)
 /^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;
 //ƥ��հ��е��������ʽ
 /\n\s*\r/;
 //ƥ���й���������
 /[1-9]\d{5}(?!\d)/;
 //ƥ������֤
 /\d{15}|\d{18}/;
 //ƥ����ڵ绰����
 /(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;
 //ƥ��IP��ַ
 /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
 //ƥ����β�հ��ַ����������ʽ
 /^\s*|\s*$/;
 //ƥ��HTML��ǵ��������ʽ
 < (\S*?)[^>]*>.*?|< .*? />;
 //sql ���
 ^(select|drop|delete|create|update|insert).*$
 //��ȡ��Ϣ�е���������
 (h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?
 //��ȡ��Ϣ�е��ʼ���ַ
 \w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*
 //��ȡ��Ϣ�е�ͼƬ����
 (s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?
 //��ȡ��Ϣ�е� IP ��ַ
 (\d+)\.(\d+)\.(\d+)\.(\d+)
 //ȡ��Ϣ�е��й��ֻ�����
 (86)*0*13\d{9}
 //��ȡ��Ϣ�е��й���������
 [1-9]{1}(\d+){5}
 //��ȡ��Ϣ�еĸ���������С����
 (-?\d*)\.?\d+
 //��ȡ��Ϣ�е��κ�����
 (-?\d*)(\.\d+)?
 //�绰����
 ^0\d{2,3}$
 //��Ѷ QQ ��
 ^[1-9]*[1-9][0-9]*$
 //�ʺţ���ĸ��ͷ������ 5-16 �ֽڣ�������ĸ�����»��ߣ�
 ^[a-zA-Z][a-zA-Z0-9_]{4,15}$
 //���ġ�Ӣ�ġ����ּ��»���
 ^[\u4e00-\u9fa5_a-zA-Z0-9]+$

 */























































