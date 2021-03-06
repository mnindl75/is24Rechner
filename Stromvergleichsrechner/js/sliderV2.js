/** Created: 30.11.2012 by Florian GÃ¶ÃŸler @ ImmobilienScout24 GmbH
 * Please report bugs and issues to florian.goessler@immobilienscout24.de or alexander.krebs@immobilienscout24.de !
 * */

/** With this function you can create a slider(incl. labels and an input field) from an existing input element.
 * The following attributes of the input element will be parsed:
 * - class: all class styles will be assigned to the new surrounding div.
 * - min: the minimum value of the slider
 * - max: the maximum value of the slider
 * - step: The step size to which the sliders values will be rounded - defaults to 1000.
 * - placeholder: this string will be used as lefthand label
 * - value: the current value will be assigned to the slider too
 * - data-digits: the number of shown digits after the decimal point - defaults to 0.
 * - data-unit: the unit string on the right side of the input field
 * All attributes(except the class attribute) will be kept on the input element.
 * @param inputSelector A valid selector for the input element, which shall be transformed.
 * @return HTMLElement The slider element as an "advanced" HTMLElement (like from initSlider).
 */
var de = de || {};
de.is24 = de.is24 || {};
de.is24.slider = de.is24.slider ||
(function () {
    "use strict";
    var pageX;
    var generateSliderFromInputElement = function(inputSelector) {
	    var obj = new Object(),
	        input = document.querySelector(inputSelector);
	
	    //create new elements
	    obj.frame = document.createElement("div");
	    obj.lbl = document.createElement("label");
	    obj.lbl_r = document.createElement("span");
	    obj.sliderHolder = document.createElement("div");
	
	    //remove input field
	    input.parentNode.replaceChild(obj.frame, input);
	
	    //init frame
	    obj.frame.setAttribute("class", "pos-rel "+input.getAttribute("class"));
	    //init labels
	    obj.lbl.setAttribute("class","flt-l m-t-s");
	    obj.lbl.innerHTML = input.getAttribute("placeholder");
	    obj.frame.appendChild(obj.lbl);
	    obj.lbl_r.setAttribute("class","lbl-right");
	    obj.lbl_r.innerHTML = input.getAttribute("data-unit");
	    obj.frame.appendChild(obj.lbl_r);
	    //add input
	    obj.input = input;
	    obj.input.setAttribute("class","p-r-xl txt-aln-r wdth-50 flt-r");
	    obj.frame.appendChild(obj.input);
	    //init slider
	    obj.sliderHolder.setAttribute("data-id",input.name+"_slider");
	    obj.sliderHolder.setAttribute("class", "clear-bth");
	    obj.frame.appendChild(obj.sliderHolder);
	    obj.sliderHolder = initSlider("[data-id="+input.name+"_slider]",
	        parseFloat(input.getAttribute("min")),
	        parseFloat(input.getAttribute("max")),
	        parseFloat(input.value),
	        inputSelector,
	        parseFloat(input.getAttribute("step")),
	        parseFloat(input.getAttribute("data-digits"))
	    );
	
	    return obj.sliderHolder;
	}

	/** With this function you can create a simple slider. All you need in HTML is a block element which will be the slider holder.
	 * All further HTML is auto generated on runtime when you call initSlider.
	 * To style the slider you can use the css classes slider, slider-holder, slider-fill and slider-thumb. For an example/default styling see input.less.
	 * If you provide a connectedInputFieldSelector, the slider will update its current value directly to the input field and vice versa.
	 *
	 * Public Properties:
	 * - value (readonly): The current value of the slider.
	 * - valueDisplay (readonly): The HTMLElement in which the value will be displayed as a number. Prints via innerHTML or the value
	 * 		attribute (if its an input element). If its an input element changing the elements value will also change the slider value.
	 * - changeHandler: A reference to function which will be executed when the the value of the slider changed.
	 *
	 * Public Functions:
	 * - setValue(value): Sets the slider to the given value.
	 *
	 * @param sliderSelector A normal css selector for a block element which will contain the slider.
	 * @param min The minimum value of the slider - defaults to 0.
	 * @param max The maximum value of the slider - default to 10000.
	 * @param cur The current value of the slider - defaults to max/2.
	 * @param valueDisplay A normal css selector for a HTMLElement in which the value will be displayed as a number.
	 * 		Prints via innerHTML or the value attribute (if its an input element). If its an input element changing the
	 * 		elements value will also change the slider value. May be left undefined.
	 * @param stepSize The step size to which the sliders values will be rounded - defaults to 1000.
	 * @param digits The number of shown digits after the decimal point.
	 * @return HTMLElement The sliderSelector element as an "advanced" HTMLElement.
	 */
	var initSlider = function(sliderSelector, min, max, cur, valueDisplay, stepSize, digits) {
	    var s = document.querySelector(sliderSelector);
	    //##########################################################
	    //PUBLIC METHODS/PROPERTIES
	    //##########################################################
	    s.value = 0;  //read-only from extern!
	    s.valueDisplay = document.querySelector(valueDisplay);   //read-only from extern!
	    s.changeHandler = undefined;
	
	    s.setValue = function(val){
	        if(isNaN(val) || val === undefined) val = s.min;
	        s.value = val;
	        s.cursorPosition = (s.value- s.min) / s.valPerPixel;
	        s.recalculateViews();
	    }
	
	    //##########################################################
	    //PRIVATE METHODS/PROPERTIES - can be accessed from outside but not write save!
	    //##########################################################
	    //generate HTML
	    s.innerHTML = '<div class="slider"><span class="slider-fill"></span><span class="slider-thumb"></span></div><div class="slider-dots-holder"></div>';
	    s.setAttribute("class", s.getAttribute("class")?(s.getAttribute("class")+" "+"slider-holder"):"slider-holder");
	
	    //set variables
	    s.min = min?min:0;
	    s.max = max?max:10000;
	    if(cur === undefined || isNaN(cur)) s.value= s.max/2;
	    else s.value= cur;
	    s.stepSize = stepSize?stepSize:1000;
	    s.digits = digits?digits:0;
	
	    s.valPerPixel = (s.max - s.min) / (s.offsetWidth - document.querySelector(sliderSelector + " .slider-thumb").offsetWidth);
	
	    s.eventOffset = 0;
	    s.cursorPosition = (s.value- s.min) / s.valPerPixel;
	
	    s.active = false;
	    s.keyActive = false;
	
	    s.maxCursorPosition = function() {
	        if(!s._maxCursorPosition || (s.offsetWidth - document.querySelector(sliderSelector + " .slider-thumb").offsetWidth) > 0) s._maxCursorPosition = (s.offsetWidth - document.querySelector(sliderSelector + " .slider-thumb").offsetWidth);
	        return s._maxCursorPosition;
	    }
	
	    //helper functions - for number formation; IE support
	    Number.prototype.formatNumber = function(c, d, t){
	        var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
	        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	    };
	    var removeNumberFormatter = function(str) {
	        return str.replace(/\./g, "").replace(/,/g, ".");;
	    }
	    var addEvent = function(ele, eventname, func) {
	        if(ele.addEventListener) {
	            ele.addEventListener(eventname, func, false);
	        } else if(s.attachEvent) {
	            ele.attachEvent("on"+eventname, func);
	        }
	    }
	
	    //event handlers for slider dragging
	    s.moveEvent = function(event) {
	        if(!s.active) return false;
	        if(event.preventDefault) event.preventDefault();
	        var X = 0;
	        if(event.touches) {
	            X = event.touches[0].pageX?event.touches[0].pageX:event.touches[0].clientX;
	        } else {
	            X = event.pageX?event.pageX:event.clientX;
	        }
	        if(s.cursorPosition + X - s.eventOffset >= s.maxCursorPosition()){	//no scrolling beyond max
	            s.cursorPosition = s.maxCursorPosition();
	            s.eventOffset = X;
	            s.value= s.max;
	        } else if(s.cursorPosition + X - s.eventOffset < 0) {	//no scrolling below min
	            s.cursorPosition = 0;
	            s.eventOffset = X;
	            s.value= s.min;
	        } else {
	            s.cursorPosition = s.cursorPosition + X - s.eventOffset;
	            s.eventOffset = X;
	            if(s.stepSize >= 1) s.value= Math.round((s.cursorPosition * s.valPerPixel) / s.stepSize)*s.stepSize + s.min;
	            else s.value= Math.round((s.cursorPosition * s.valPerPixel) * 1/s.stepSize)*s.stepSize + s.min;
	        }
	        s.recalculateViews();
	    }
	    s.touchStart = function(event) {
	        if(event.touches) pageX = event.touches[0].pageX;
	        else if(event.pageX) pageX = event.pageX;
	        else if(event.clientX) pageX = event.clientX;
	        s.eventOffset = pageX;
	        s.active = true;
	    }
	    s.touchEnd = function(event) {
	        s.active = false;
	    }
	    s.keypress = function(event) {
	        if(!s.keyActive) return;
	        event = event || window.event;
	        if(event.keyCode == 37 || event.keyCode == 39) {
	            s.value = s.value + s.stepSize;
	            if(event.keyCode == 37) s.value = s.value - 2* s.stepSize;
	            if(s.value < s.min) s.value = s.min;
	            if(s.value > s.max) s.value = s.max;
	            s.cursorPosition = (s.value- s.min) / s.valPerPixel;
	            s.recalculateViews();
	        }
	    }
	
	    //event handler for slider click positioning
	    s.click = function(event) {
	        if(event.target == document.querySelector(sliderSelector + " .slider-thumb")) return false;
	        if(event.touches) pageX = event.touches[0].pageX;
	        else if(event.pageX) pageX = event.pageX;
	        else if(event.clientX) pageX = event.clientX;
	        s.eventOffset = pageX;
	        s.cursorPosition = pageX - s.getBoundingClientRect().left;
	        if(s.cursorPosition >= s.maxCursorPosition()) s.cursorPosition = s.maxCursorPosition();
	        if(s.stepSize >= 1) s.value= Math.round((s.cursorPosition * s.valPerPixel) / s.stepSize)*s.stepSize + s.min;
	        else s.value= Math.round((s.cursorPosition * s.valPerPixel) * 1/s.stepSize)*s.stepSize + s.min;
	        s.recalculateViews();
	    }
	
	    //updates all views
	    s.recalculateViews = function() {
	        if(s.cursorPosition > s.maxCursorPosition()) s.cursorPosition = s.maxCursorPosition();
	        if(s.cursorPosition  < 0) s.cursorPosition = 0;
	        document.querySelector(sliderSelector + " .slider-thumb").style.left = s.cursorPosition + "px";
	        document.querySelector(sliderSelector + " .slider-fill").style.width = s.cursorPosition + "px";
	        if(s.valueDisplay && s.valueDisplay.tagName == "INPUT") s.valueDisplay.value = s.value.formatNumber(s.digits, ",", ".");
	        if(s.valueDisplay && s.valueDisplay.tagName != "INPUT") s.valueDisplay.innerHTML = s.value.formatNumber(s.digits, ",", ".");
	        //fire change event
	        //s.numberOfPoints = 10;
	        //s.generateDots();
	        if(s.changeHandler) s.changeHandler();	//"fire event"
	    }
	
	    s.generateDots = function() {
	        if(s.numberOfPoints > 0) {
	            var str = "";
	            var margin = (s.offsetWidth / s.numberOfPoints) - (10 + 10/ s.numberOfPoints);
	            for(var i=0;i <= s.numberOfPoints;i++){
	                if(i == s.numberOfPoints) margin = 0;
	                str = str + "<span class='slider-dot' style='margin-right:"+margin+"px'></span>";
	            }
	            s.querySelector(".slider-dots-holder").innerHTML = str;
	        }
	    }
	
	    //register event handlers
	    addEvent(s, 'touchmove',s.moveEvent);
	    addEvent(document.querySelector(sliderSelector + " .slider-thumb"), 'touchstart', s.touchStart);
	    addEvent(document.querySelector(sliderSelector + " .slider-thumb"), 'touchend', s.touchEnd);
	    addEvent(document.querySelector(sliderSelector + " .slider-thumb"), 'mousedown', s.touchStart);
	    addEvent(document.querySelector(sliderSelector + " .slider-thumb"), 'mouseup', s.touchEnd);
	    addEvent(document, 'mousemove',s.moveEvent);
	    addEvent(document, 'mouseup', s.touchEnd);
	    addEvent(s, 'click', s.click);
	    addEvent(s, "mouseover",function(){s.keyActive = true});
	    addEvent(s, "mouseout",function(){s.keyActive = false});
	    addEvent(document, 'keydown', s.keypress);
	    //register winMobile event handler
	    if (window.navigator.msPointerEnabled) {
	        addEvent(s, 'MSPointerMove',s.moveEvent);
	        addEvent(document.querySelector(sliderSelector + " .slider-thumb"), "MSPointerDown", s.touchStart);
	        addEvent(document.querySelector(sliderSelector + " .slider-thumb"), "MSPointerUp", s.touchEnd);
	    }
	
	    //register event handler to recieve changes from the connected input field
	    if(s.valueDisplay && s.valueDisplay.tagName == "INPUT") addEvent(s.valueDisplay, "change",function(){
	        var val = parseFloat(removeNumberFormatter(s.valueDisplay.value));
	        if(isNaN(val) || val === undefined) val = s.min;
	        s.value = val;
	        s.valueDisplay.value = s.value.formatNumber(s.digits, ",", ".");
	        s.cursorPosition = (s.value- s.min) / s.valPerPixel;
	        if(s.cursorPosition > s.maxCursorPosition()) s.cursorPosition = s.maxCursorPosition();
	        if(s.cursorPosition  < 0) s.cursorPosition = 0;
	
	        document.querySelector(sliderSelector + " .slider-thumb").style.left = s.cursorPosition + "px";
	        document.querySelector(sliderSelector + " .slider-fill").style.width = s.cursorPosition + "px";
	    });
	
	    //register event handler to catch resizing events
	    addEvent(window, "resize",function(event){
	        if((s.offsetWidth - document.querySelector(sliderSelector + " .slider-thumb").offsetWidth) > 0) s.valPerPixel = (s.max - s.min) / (s.offsetWidth - document.querySelector(sliderSelector + " .slider-thumb").offsetWidth);
	        s.cursorPosition = (s.value- s.min) / s.valPerPixel;
	        s.recalculateViews();
	    });
	
	    s.recalculateViews();
	
	    return s;
	}
	
	return {
		initSlider: initSlider,
		generateSliderFromInputElement: generateSliderFromInputElement
	};
}());