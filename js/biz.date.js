﻿ (function ($) {
     function isRN(y) {// 计算润年
         return y % 4 == 0 || (y % 100 == 0 && y % 400 == 0);
     }
     function getDays(y, m) {// 计算每月天数
         if (m == 2) {
             return isRN(y) ? 29 : 28;
         } else if (m < 8) {
             return m % 2 == 0 ? 30 : 31
         } else {
             return m % 2 == 0 ? 31 : 30
         }
     }
     function updateDays(sel, b) {
         sel.length = 0;
         for (var a = 1; a < b + 1; a++) {
             sel.options.add(new Option(a + '日', a));
         }
     }
     function createSelect(a, b, c) {
         var sel = document.createElement('select');
         var c = c || '';
         sel.options.add(new Option('请选择', -1));
         if (a > b) {
             for (; a > b; a--) {
                 sel.options.add(new Option(a + c, a));
             }
         } else {
             for (; a < b; a++) {
                 sel.options.add(new Option(a + c, a));
             }
         }
         return sel;
     }
     $.fn.birthdaySelect = function (fn) {

         var box = this.eq(0);
         var year, mon, day, hidden;
         fn = fn || function () { };
         var mydate = new Date();
         if (box.size()) {
             year = createSelect(mydate.getFullYear(), 1900, '年', -1);
             box.append(year);
             //box.append("&nbsp;&nbsp;&nbsp;");
             mon = createSelect(1, 13, '月');
             box.append(mon);
             //box.append("&nbsp;&nbsp;&nbsp;");
             day = createSelect(1, 32, '日');
             box.append(day);
             //box.append("&nbsp;&nbsp;&nbsp;");
             hidden = box.append('<input type="hidden" id="birthday" name="birthday" />');
             $(year).change(upRN);
             $(mon).change(upRN);
             $(day).change(function () {
                 update();
             });
         }
         function upRN() {
             var y = year.value;
             var m = mon.value;
             if (this.options[0].value == -1) {
                 this.removeChild(this.options[0]);
             }
             if (y != -1 && m != -1) {
                 var d = getDays(y, m);
                 var idx = day.options.selectedIndex;
                 updateDays(day, d);
                 day.options.selectedIndex = Math.min(idx, d);
             }
             update();
         }
         function update() {
             var data = [year.value, mon.value, day.value].join('/');
             hidden.value = data.indexOf('-1') > -1 ? -1 : data; // 如果值不正确返回-1
             fn(hidden.value);
         }
     }

 })(jQuery);