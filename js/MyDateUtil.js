/**
 * 获取指定日期的周的第一天、月的第一天、季的第一天、年的第一天
 * @param date new Date()形式，或是自定义参数的new Date()
 * @returns 返回值为格式化的日期，yy-mm-dd
 */
//日期格式化，返回值形式为yy-mm-dd
function timeFormat(date) {
    if (!date || typeof(date) === "string") {
        this.error("参数异常，请检查...");
    }
    var y = date.getFullYear(); //年
    var m = date.getMonth() + 1; //月
    var d = date.getDate(); //日

    return y + "-" + m + "-" + d;
}

//获取这周的周一
function getFirstDayOfWeek (date) {

    var weekday = date.getDay()||7; //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7

    date.setDate(date.getDate()-weekday+1);//往前算（weekday-1）天，年份、月份会自动变化
    return timeFormat(date);
}

//获取当月第一天
function getFirstDayOfMonth (date) {
    date.setDate(1);
    return timeFormat(date);
}

//获取当季第一天
function getFirstDayOfSeason (date) {
    var month = date.getMonth();
    if(month <3 ){
        date.setMonth(0);
    }else if(2 < month && month < 6){
        date.setMonth(3);
    }else if(5 < month && month < 9){
        date.setMonth(6);
    }else if(8 < month && month < 11){
        date.setMonth(9);
    }
    date.setDate(1);
    return timeFormat(date);
}

//获取当年第一天
function getFirstDayOfYear (date) {
    date.setDate(1);
    date.setMonth(0);
    return timeFormat(date);
}

/** 字符串转时间戳 */
function dateToTimestamp(date){
    date = date.replace(/-/g,'/'); 
    var timestamp = new Date(date).getTime();
    return timestamp;
}

/** 时间戳转字符串 */
function timestampToDate(stamp){
    var d = new Date(stamp * 1000);    //根据时间戳生成的时间对象
    var date = (d.getFullYear()) + "-" + 
            (d.getMonth() + 1) + "-" +
            (d.getDate()) + " " + 
            (d.getHours()) + ":" + 
            (d.getMinutes()) + ":" + 
            (d.getSeconds());
    return date;
}

/** 时间戳转星期几 */
function timestampToWeek(stamp){
    var week;
    var date = new Date(stamp);    //根据时间戳生成的时间对象
    switch (date.getDay()) {
        case 0:week="周日";break
        case 1:week="周一";break
        case 2:week="周二";break
        case 3:week="周三";break
        case 4:week="周四";break
        case 5:week="周五";break
        case 6:week="周六";break
       }
    return week;
}