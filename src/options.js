/*
暴露给用户的参数配置：
className: 日历外层class，默认为calendar
initDate: 初始化日期，默认为系统当前日期
inputId: input的id，默认为mydate
beginYear: 开始年份
endYear: 结束年份
*/

'use strict'

function isLeap(year) {
    return (year % 100 == 0) ? ((year % 400 == 0) ? 1 : 0) : ((year % 4 == 0) ? 1 : 0);
};

function options(options){
    var o = options || {};
    var no;

    // input element id
    if(o.inputId === no) {o.inputId = 'mydate'}

    // table class
    if(o.className === no) { o.className = 'calendar'}

    if(o.beginYear === no) { o.beginYear = '1900' }
    if(o.endYear === no) { o.endYear = '2050'}

    // initialize date , if hasn't, current date
    if(o.initDate === no) {o.initDate = new Date()}

    /* initialize information begin */

        // initialize year
        o.initYear = o.initDate.getFullYear();

        // initialize all mouth days
        o.allMouthDays = [31, 28 + isLeap(o.initYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // initialize all days
        o.allDays = ['日', '一', '二', '三', '四', '五', '六'];

        // initialize month
        o.initMonth = o.initDate.getMonth();

        // initialize day
        o.initDay = o.initDate.getDate();

        // initialize month days
        o.initMonthDays = o.allMouthDays[o.initMonth]

        // initialize prev month days
        o.prevMonthDays = o.allMouthDays[o.initMonth - 1] >= 0 ? o.allMouthDays[o.initMonth - 1] : 31;

        // initialize next month days
        o.nextMonthDays = o.allMouthDays[o.initMonth + 1];

        // initialize first date
        o.firstDate = new Date(o.initYear, o.initMonth, 1);
        
        // initialize first day
        o.firstDay = o.firstDate.getDay();

        // initalize lines
        o.lines = Math.ceil((o.initMonthDays + o.firstDay) / 7);

    /* initialize information end */

    return o;
}

module.exports = options;