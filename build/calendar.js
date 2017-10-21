/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _dom = __webpack_require__(1);

	var Dom = _interopRequireWildcard(_dom);

	var _options = __webpack_require__(3);

	var _options2 = _interopRequireDefault(_options);

	var _events = __webpack_require__(2);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	(function () {

	    function Calendar(options, type) {
	        if (!(this instanceof Calendar)) {
	            return new Calendar(options);
	        }

	        var o = (0, _options2.default)(options);
	        var dt = o.inputId;

	        var fn = function fn() {
	            Dom.hideDom(o);
	            Dom.dom(o);
	            Dom.intoInput(o);
	        };

	        if (typeof type != 'undefined') {
	            fn();
	        }

	        var loaded = function loaded() {
	            var dtElement = document.getElementById(dt + '');
	            (0, _events2.default)(o).addEvent(dtElement, 'click', fn, false);
	        };

	        (0, _events2.default)(o).addEvent(document, 'DOMContentLoaded', loaded, false);
	    }

	    window.Calendar = Calendar;
	})();

	if (true) {
	    module.exports = window.Calendar;
	} else if (typeof define === 'function' && define.amd) {
	    define([], function () {
	        return window.Calendar;
	    });
	}

	/*
	模拟用户调用
	*/
	new Calendar({ initDate: new Date('2017/8/1') });

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.dom = dom;
	exports.hideDom = hideDom;
	exports.intoInput = intoInput;

	var _events = __webpack_require__(2);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function dom(options) {

	    var o = options || {};

	    var calendarBox = document.createElement('div');
	    calendarBox.className = o.className;

	    //initialize calendar
	    var html = "";

	    html += "<div class='canlendarHeader'><select class='selectYear'>";

	    for (var i = o.beginYear; i <= o.endYear; i++) {
	        if (i == o.initYear) {
	            html += "<option selected>" + i + "年</option>";
	        } else {
	            html += "<option>" + i + "年</option>";
	        }
	    }

	    html += "</select><select class='selectMonth'>";

	    for (var _i = 1; _i <= 12; _i++) {
	        if (_i == o.initMonth + 1) {
	            html += "<option selected>" + _i + "月</option>";
	        } else {
	            html += "<option>" + _i + "月</option>";
	        }
	    }

	    html += "</select><select class='selectDay'>";

	    for (var _i2 = 1; _i2 < parseInt(o.initMonthDays, 10) + 1; _i2++) {
	        if (_i2 == o.initDay) {
	            html += "<option selected>" + _i2 + "日</option>";
	        } else {
	            html += "<option>" + _i2 + "日</option>";
	        }
	    }

	    html += "</select></div>";

	    html += "<div id='canlendarClose' class='close'>X</div>";

	    html += "<table class='calendarTable'>";
	    //week
	    html += "<tr>";
	    for (var _i3 = 0; _i3 < 7; _i3++) {
	        html += "<td class='weeks'>" + o.allDays[_i3] + "</td>";
	    }
	    html += "</tr>";
	    //days
	    for (var _i4 = 0; _i4 < o.lines; _i4++) {
	        html += "<tr>";
	        for (var j = 0; j < 7; j++) {
	            var idx = _i4 * 7 + j;
	            var data = idx - o.firstDay + 1;
	            if (data <= 0) {
	                html += "<td class='gray prev days'>" + (parseInt(o.prevMonthDays) + data) + "</td>";
	            } else if (data > o.initMonthDays) {
	                html += "<td class='gray next days'>" + (data - o.initMonthDays) + "</td>";
	            } else if (data == o.initDay) {
	                html += "<td class='initDay days'>" + data + "</td>";
	            } else {
	                html += "<td class='days'>" + data + "</td>";
	            }
	        }
	        html += "</tr>";
	    }
	    html += "</table>";

	    //append to html
	    calendarBox.innerHTML = html;
	    document.getElementsByTagName('body')[0].appendChild(calendarBox);

	    //append events
	    (0, _events2.default)(o).afterInit();
	}

	function hideDom(o) {
	    if (o.className && document.getElementsByClassName(o.className).length > 0) {
	        document.getElementsByClassName(o.className)[0].remove();
	    }
	}

	function intoInput(o) {
	    var input = document.getElementById(o.inputId);

	    input.readOnly = true;
	    input.value = o.initYear + '年' + (parseInt(o.initMonth, 10) + 1) + '月' + o.initDay + '日';
	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	(function () {
	    'use strict';

	    function Events(o) {
	        var _this2 = this;

	        if (!(this instanceof Events)) {
	            return new Events(o);
	        }

	        var _this = this;

	        this.addEvent = function (elem, type, fn, userCaptrue) {
	            if (elem.addEventListener) {
	                elem.addEventListener(type, fn, userCaptrue);
	                return true;
	            } else if (elem.attacheEvent) {
	                return elem.attacheEvent('on' + type, fn);
	            } else {
	                elem['on' + type] = fn;
	            }
	        };

	        this.hasClass = function (el, className) {
	            //let reg = new RegExp("(\\s|^)" + className + "\\s|$");
	            //return reg.test(el.className)
	            return el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
	        };

	        this.changeYear = function () {
	            var yearValue = document.getElementsByClassName('selectYear')[0].value;
	            var year = yearValue.substr(0, yearValue.length - 1);

	            o.initYear = year;

	            new Calendar({ initDate: new Date(o.initYear + '/' + (parseInt(o.initMonth, 10) + 1) + '/' + o.initDay) }, 'notInit');
	        };

	        this.changeMonth = function () {
	            var monthValue = document.getElementsByClassName('selectMonth')[0].value;
	            var month = monthValue.substr(0, monthValue.length - 1);

	            o.initMonth = month;

	            new Calendar({ initDate: new Date(o.initYear + '/' + o.initMonth + '/' + o.initDay) }, 'notInit');
	        };

	        this.changeDay = function () {
	            var dayValue = document.getElementsByClassName('selectDay')[0].value;
	            var day = dayValue.substr(0, dayValue.length - 1);

	            o.initDay = day;

	            new Calendar({ initDate: new Date(o.initYear + '/' + (parseInt(o.initMonth, 10) + 1) + '/' + o.initDay) }, 'notInit');
	        };

	        this.clickDay = function (e) {
	            var e = window.event || e;
	            var tag = e.target || e.srcElement;

	            if (_this.hasClass(tag, 'weeks') != null) {
	                return false;
	            }

	            if (_this.hasClass(tag, 'prev') != null) {
	                if (o.initMonth > 0) {
	                    o.initMonth = parseInt(o.initMonth, 10) - 1;
	                } else {
	                    o.initMonth = 11;
	                    o.initYear = parseInt(o.initYear, 10) - 1;
	                }
	            }

	            if (_this.hasClass(tag, 'next') != null) {
	                if (o.initMonth < 11) {
	                    o.initMonth = parseInt(o.initMonth, 10) + 1;
	                } else {
	                    o.initMonth = 1;
	                    o.initYear = parseInt(o.initYear, 10) + 1;
	                }
	            }

	            o.initDay = parseInt(tag.innerHTML, 10);

	            new Calendar({ initDate: new Date(o.initYear + '/' + (parseInt(o.initMonth, 10) + 1) + '/' + o.initDay) }, 'notInit');
	        };

	        this.close = function () {
	            document.getElementsByClassName(o.className + '')[0].remove();
	        };

	        this.afterInit = function () {
	            // close
	            var closeElement = document.getElementById('canlendarClose');
	            _this2.addEvent(closeElement, 'click', _this2.close, false);

	            // change select years
	            var yearsElement = document.getElementsByClassName('selectYear')[0];
	            _this2.addEvent(yearsElement, 'change', _this2.changeYear, false);

	            // change select months
	            var monthsElement = document.getElementsByClassName('selectMonth')[0];
	            _this2.addEvent(monthsElement, 'change', _this2.changeMonth, false);

	            // change select days
	            var daysElement = document.getElementsByClassName('selectDay')[0];
	            _this2.addEvent(daysElement, 'change', _this2.changeDay, false);

	            // click day
	            var dayElement = document.getElementsByClassName('calendarTable')[0];
	            _this2.addEvent(dayElement, 'click', _this2.clickDay, false);
	        };
	    }

	    module.exports = Events;
	})();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/*
	暴露给用户的参数配置：
	className: 日历外层class，默认为calendar
	initDate: 初始化日期，默认为系统当前日期
	inputId: input的id，默认为mydate
	beginYear: 开始年份
	endYear: 结束年份
	*/

	'use strict';

	function isLeap(year) {
	    return year % 100 == 0 ? year % 400 == 0 ? 1 : 0 : year % 4 == 0 ? 1 : 0;
	};

	function options(options) {
	    var o = options || {};
	    var no;

	    // input element id
	    if (o.inputId === no) {
	        o.inputId = 'mydate';
	    }

	    // table class
	    if (o.className === no) {
	        o.className = 'calendar';
	    }

	    if (o.beginYear === no) {
	        o.beginYear = '1900';
	    }
	    if (o.endYear === no) {
	        o.endYear = '2050';
	    }

	    // initialize date , if hasn't, current date
	    if (o.initDate === no) {
	        o.initDate = new Date();
	    }

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
	    o.initMonthDays = o.allMouthDays[o.initMonth];

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

/***/ })
/******/ ]);