'use strict'

import Events from './events'

export function dom(options) {

    let o = options || {};

    let calendarBox = document.createElement('div');
    calendarBox.className = o.className;

    //initialize calendar
    var html = "";

    html += "<div class='canlendarHeader'><div class='canlendarHeaderBox'><select class='selectYear'>";
    
    for(let i = o.beginYear; i <= o.endYear; i++){
        if(i == o.initYear){
            html += "<option selected>" + i + "年</option>"            
        }else{
            html += "<option>" + i + "年</option>"
        }
    }

    html += "</select></div><div class='canlendarHeaderBox'><select class='selectMonth'>";

    for(let i = 1; i <= 12; i++){
        if(i == (parseInt(o.initMonth, 10) + 1)){
            html += "<option selected>" + i + "月</option>"            
        }else{
            html += "<option>" + i + "月</option>"
        }
    }

    html += "</select></div><div class='canlendarHeaderBox'><select class='selectDay'>";
    
    for(let i = 1; i < (parseInt(o.initMonthDays, 10) + 1); i++){
        if(i == o.initDay){
            html += "<option selected>" + i + "日</option>"            
        }else{
            html += "<option>" + i + "日</option>"
        }
    }

    html += "</select></div><div class='canlendarHeaderBox'><button class='gotoToday'>返回今天</button></div></div>"

    html += "<div id='canlendarClose' class='close'>X</div>";

    html += "<table class='calendarTable'>";
    //week
    html += "<tr>";
    for(let i = 0; i < 7; i++){
        html += "<td class='weeks'>"+ o.allDays[i] +"</td>"
    }
    html += "</tr>";
    //days
    for(let i = 0; i < o.lines; i++){
        html += "<tr>"
        for(let j = 0; j < 7; j++){
            let idx = i * 7 + j;
            let data = idx - o.firstDay + 1;
            if(data <= 0){
                html += "<td class='gray prev days'>"+ (parseInt(o.prevMonthDays) + data) +"</td>"
            }else if(data > o.initMonthDays){
                html += "<td class='gray next days'>" + (data - o.initMonthDays) + "</td>"
            }else if(data == o.initDay){
                html += "<td class='initDay days'>"+ data +"</td>"
            }else{
                html += "<td class='days'>"+ data +"</td>"
            }
        }
        html += "</tr>"
    }
    html += "</table>"

    //append to html
    calendarBox.innerHTML = html
    document.getElementsByTagName('body')[0].appendChild(calendarBox);

    //append events
    Events(o).afterInit()
}

export function hideDom(o){
    if(o.className && document.getElementsByClassName(o.className).length > 0) { 
        document.getElementsByClassName(o.className)[0].remove();
    }
}

export function intoInput(o){
    let input = document.getElementById(o.inputId);

    input.readOnly = true;
    input.value = o.initYear +'年'+ (parseInt(o.initMonth, 10) + 1) +'月'+ o.initDay + '日';
}