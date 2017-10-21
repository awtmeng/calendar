'use strict'

import * as Dom from './dom'
import O from './options'
import Events from './events'

(function(){

    let isFirstLoad = true;

    function Calendar(options, type){
        if(!(this instanceof Calendar)){
            return new Calendar(options)
        }

        let o = O(options);
        let dt = o.inputId;

        let fn = function(){
            Dom.hideDom(o);
            Dom.dom(o);
            Dom.intoInput(o);
        }

        if(typeof type != 'undefined'){
            fn();
        }

        let inputClick = function(){
            let inputValue = document.getElementById(o.inputId + '').value;

            if(inputValue !== ''){
                o.initYear = inputValue.substr(0, 4);
                o.initMonth = parseInt(inputValue.substring(5, inputValue.indexOf('月')) - 1)
                o.initDay = inputValue.substring(inputValue.indexOf('月') + 1, inputValue.indexOf('日'))
            }
            fn();
        }

        let loaded = function(){
            let dtElement = document.getElementById(dt + '');
            Events(o).addEvent(dtElement, 'click', inputClick, false)
        }
        
        if(isFirstLoad){
            Events(o).addEvent(document, 'DOMContentLoaded', loaded, false);
            isFirstLoad = false;
        }
    }
    window.Calendar = Calendar;
}())

if (typeof(module) !== 'undefined'){
    module.exports = window.Calendar;
}
else if (typeof define === 'function' && define.amd) {
    define([], function () {
        return window.Calendar;
    });
}
