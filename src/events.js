
(function(){
    'use strict'

    function Events(o){

        if(!(this instanceof Events)){
            return new Events(o)
        }

        let _this = this;

        this.addEvent = (elem, type, fn, userCaptrue) => {
            if(elem.addEventListener){
                elem.addEventListener(type, fn, userCaptrue)
                return true
            }else if(elem.attacheEvent){
                return elem.attacheEvent('on' + type, fn)
            }else{
                elem['on' + type] =fn
            }
        }

        this.hasClass = (el, className) => {
            //let reg = new RegExp("(\\s|^)" + className + "\\s|$");
            //return reg.test(el.className)
            return el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"))
        }

        this.changeSelect = (dom, isMonth) => {
            let domValue = document.getElementsByClassName('select' + dom)[0].value;
            let domNo = domValue.substr(0, domValue.length - 1);

            o['init' + dom] = parseInt(domNo, 10);

            typeof isMonth !== 'undefined' && isMonth ? 
                new Calendar({initDate: new Date(o.initYear +'/'+ parseInt(o.initMonth, 10) +'/'+ o.initDay)}, 'notInit'):
                new Calendar({initDate: new Date(o.initYear +'/'+ (parseInt(o.initMonth, 10) + 1) +'/'+ o.initDay)}, 'notInit')                
        }

        this.changeYear = () => {
            this.changeSelect('Year')
        }

        this.changeMonth = () => {
            this.changeSelect('Month', true)            
        }

        this.changeDay = () => {
            this.changeSelect('Day')            
        }

        this.clickDay = function(e){
            var e = window.event || e;
            var tag = e.target || e.srcElement;

            if(_this.hasClass(tag, 'weeks') != null){
                return false;
            }

            if(_this.hasClass(tag, 'prev') != null){
                if(o.initMonth > 0){
                    o.initMonth = (parseInt(o.initMonth, 10) - 1) 
                }else{
                    o.initMonth = 11;
                    o.initYear = (parseInt(o.initYear, 10) - 1)
                }
            }

            if(_this.hasClass(tag, 'next') != null){
                if(o.initMonth < 11){
                    o.initMonth = (parseInt(o.initMonth, 10) + 1)
                }else{
                    o.initMonth = 0;
                    o.initYear = (parseInt(o.initYear, 10) + 1)
                }
            }

            o.initDay = parseInt(tag.innerHTML, 10);

            new Calendar({initDate: new Date(o.initYear +'/'+ (parseInt(o.initMonth, 10) + 1) +'/'+ o.initDay)}, 'notInit')
        }

        this.close = ()=> {
            document.getElementsByClassName(o.className + '')[0].remove();
        }

        this.clickGotoToday = ()=> {
            new Calendar({}, 'notInit')
        }

        this.afterInit = () => {
            // close
            let closeElement = document.getElementById('canlendarClose');
            this.addEvent(closeElement, 'click', this.close, false)
            
            // change select years
            let yearsElement = document.getElementsByClassName('selectYear')[0];
            this.addEvent(yearsElement, 'change', this.changeYear, false)

            // change select months
            let monthsElement = document.getElementsByClassName('selectMonth')[0];
            this.addEvent(monthsElement, 'change', this.changeMonth, false)

            // change select days
            let daysElement = document.getElementsByClassName('selectDay')[0];
            this.addEvent(daysElement, 'change', this.changeDay, false)

            // click day
            let dayElement = document.getElementsByClassName('calendarTable')[0];
            this.addEvent(dayElement, 'click', this.clickDay, false)

            // click gotoToday
            let gotoTodayElement = document.getElementsByClassName('gotoToday')[0];
            this.addEvent(gotoTodayElement, 'click', this.clickGotoToday, false)
        }
    }

    module.exports = Events
}())
