/*!
 * jQuery UI 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(c,j){function k(a,b){var d=a.nodeName.toLowerCase();if("area"===d){b=a.parentNode;d=b.name;if(!a.href||!d||b.nodeName.toLowerCase()!=="map")return false;a=c("img[usemap=#"+d+"]")[0];return!!a&&l(a)}return(/input|select|textarea|button|object/.test(d)?!a.disabled:"a"==d?a.href||b:b)&&l(a)}function l(a){return!c(a).parents().andSelf().filter(function(){return c.curCSS(this,"visibility")==="hidden"||c.expr.filters.hidden(this)}).length}c.ui=c.ui||{};if(!c.ui.version){c.extend(c.ui,{version:"1.8.16",
keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});c.fn.extend({propAttr:c.fn.prop||c.fn.attr,_focus:c.fn.focus,focus:function(a,b){return typeof a==="number"?this.each(function(){var d=
this;setTimeout(function(){c(d).focus();b&&b.call(d)},a)}):this._focus.apply(this,arguments)},scrollParent:function(){var a;a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,
"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==j)return this.css("zIndex",a);if(this.length){a=c(this[0]);for(var b;a.length&&a[0]!==document;){b=a.css("position");if(b==="absolute"||b==="relative"||b==="fixed"){b=parseInt(a.css("zIndex"),10);if(!isNaN(b)&&b!==0)return b}a=a.parent()}}return 0},disableSelection:function(){return this.bind((c.support.selectstart?"selectstart":
"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});c.each(["Width","Height"],function(a,b){function d(f,g,m,n){c.each(e,function(){g-=parseFloat(c.curCSS(f,"padding"+this,true))||0;if(m)g-=parseFloat(c.curCSS(f,"border"+this+"Width",true))||0;if(n)g-=parseFloat(c.curCSS(f,"margin"+this,true))||0});return g}var e=b==="Width"?["Left","Right"]:["Top","Bottom"],h=b.toLowerCase(),i={innerWidth:c.fn.innerWidth,innerHeight:c.fn.innerHeight,
outerWidth:c.fn.outerWidth,outerHeight:c.fn.outerHeight};c.fn["inner"+b]=function(f){if(f===j)return i["inner"+b].call(this);return this.each(function(){c(this).css(h,d(this,f)+"px")})};c.fn["outer"+b]=function(f,g){if(typeof f!=="number")return i["outer"+b].call(this,f);return this.each(function(){c(this).css(h,d(this,f,true,g)+"px")})}});c.extend(c.expr[":"],{data:function(a,b,d){return!!c.data(a,d[3])},focusable:function(a){return k(a,!isNaN(c.attr(a,"tabindex")))},tabbable:function(a){var b=c.attr(a,
"tabindex"),d=isNaN(b);return(d||b>=0)&&k(a,!d)}});c(function(){var a=document.body,b=a.appendChild(b=document.createElement("div"));c.extend(b.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});c.support.minHeight=b.offsetHeight===100;c.support.selectstart="onselectstart"in b;a.removeChild(b).style.display="none"});c.extend(c.ui,{plugin:{add:function(a,b,d){a=c.ui[a].prototype;for(var e in d){a.plugins[e]=a.plugins[e]||[];a.plugins[e].push([b,d[e]])}},call:function(a,b,d){if((b=a.plugins[b])&&
a.element[0].parentNode)for(var e=0;e<b.length;e++)a.options[b[e][0]]&&b[e][1].apply(a.element,d)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==="hidden")return false;b=b&&b==="left"?"scrollLeft":"scrollTop";var d=false;if(a[b]>0)return true;a[b]=1;d=a[b]>0;a[b]=0;return d},isOverAxis:function(a,b,d){return a>b&&a<b+d},isOver:function(a,b,d,e,h,i){return c.ui.isOverAxis(a,d,h)&&
c.ui.isOverAxis(b,e,i)}})}})(jQuery);
;/*!
 * jQuery UI Widget 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b,j){if(b.cleanData){var k=b.cleanData;b.cleanData=function(a){for(var c=0,d;(d=a[c])!=null;c++)try{b(d).triggerHandler("remove")}catch(e){}k(a)}}else{var l=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add([this]).each(function(){try{b(this).triggerHandler("remove")}catch(d){}});return l.call(b(this),a,c)})}}b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=
function(h){return!!b.data(h,a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend(true,{},c.options);b[e][a].prototype=b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):
d;if(e&&d.charAt(0)==="_")return h;e?this.each(function(){var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;if(i!==g&&i!==j){h=i;return false}}):this.each(function(){var g=b.data(this,a);g?g.option(d||{})._init():b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){b.data(c,this.widgetName,this);this.element=b(c);this.options=
b.extend(true,{},this.options,this._getCreateOptions(),a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){return b.metadata&&b.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+
"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(a,c){var d=a;if(arguments.length===0)return b.extend({},this.options);if(typeof a==="string"){if(c===j)return this.options[a];d={};d[a]=c}this._setOptions(d);return this},_setOptions:function(a){var c=this;b.each(a,function(d,e){c._setOption(d,e)});return this},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",
c);return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);
;/*!
 * jQuery UI Mouse 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(b){var d=false;b(document).mouseup(function(){d=false});b.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var a=this;this.element.bind("mousedown."+this.widgetName,function(c){return a._mouseDown(c)}).bind("click."+this.widgetName,function(c){if(true===b.data(c.target,a.widgetName+".preventClickEvent")){b.removeData(c.target,a.widgetName+".preventClickEvent");c.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+
this.widgetName)},_mouseDown:function(a){if(!d){this._mouseStarted&&this._mouseUp(a);this._mouseDownEvent=a;var c=this,f=a.which==1,g=typeof this.options.cancel=="string"&&a.target.nodeName?b(a.target).closest(this.options.cancel).length:false;if(!f||g||!this._mouseCapture(a))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){c.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){this._mouseStarted=
this._mouseStart(a)!==false;if(!this._mouseStarted){a.preventDefault();return true}}true===b.data(a.target,this.widgetName+".preventClickEvent")&&b.removeData(a.target,this.widgetName+".preventClickEvent");this._mouseMoveDelegate=function(e){return c._mouseMove(e)};this._mouseUpDelegate=function(e){return c._mouseUp(e)};b(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);a.preventDefault();return d=true}},_mouseMove:function(a){if(b.browser.msie&&
!(document.documentMode>=9)&&!a.button)return this._mouseUp(a);if(this._mouseStarted){this._mouseDrag(a);return a.preventDefault()}if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,a)!==false)?this._mouseDrag(a):this._mouseUp(a);return!this._mouseStarted},_mouseUp:function(a){b(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=
false;a.target==this._mouseDownEvent.target&&b.data(a.target,this.widgetName+".preventClickEvent",true);this._mouseStop(a)}return false},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);
;/*
 * jQuery UI Position 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */
(function(c){c.ui=c.ui||{};var n=/left|center|right/,o=/top|center|bottom/,t=c.fn.position,u=c.fn.offset;c.fn.position=function(b){if(!b||!b.of)return t.apply(this,arguments);b=c.extend({},b);var a=c(b.of),d=a[0],g=(b.collision||"flip").split(" "),e=b.offset?b.offset.split(" "):[0,0],h,k,j;if(d.nodeType===9){h=a.width();k=a.height();j={top:0,left:0}}else if(d.setTimeout){h=a.width();k=a.height();j={top:a.scrollTop(),left:a.scrollLeft()}}else if(d.preventDefault){b.at="left top";h=k=0;j={top:b.of.pageY,
left:b.of.pageX}}else{h=a.outerWidth();k=a.outerHeight();j=a.offset()}c.each(["my","at"],function(){var f=(b[this]||"").split(" ");if(f.length===1)f=n.test(f[0])?f.concat(["center"]):o.test(f[0])?["center"].concat(f):["center","center"];f[0]=n.test(f[0])?f[0]:"center";f[1]=o.test(f[1])?f[1]:"center";b[this]=f});if(g.length===1)g[1]=g[0];e[0]=parseInt(e[0],10)||0;if(e.length===1)e[1]=e[0];e[1]=parseInt(e[1],10)||0;if(b.at[0]==="right")j.left+=h;else if(b.at[0]==="center")j.left+=h/2;if(b.at[1]==="bottom")j.top+=
k;else if(b.at[1]==="center")j.top+=k/2;j.left+=e[0];j.top+=e[1];return this.each(function(){var f=c(this),l=f.outerWidth(),m=f.outerHeight(),p=parseInt(c.curCSS(this,"marginLeft",true))||0,q=parseInt(c.curCSS(this,"marginTop",true))||0,v=l+p+(parseInt(c.curCSS(this,"marginRight",true))||0),w=m+q+(parseInt(c.curCSS(this,"marginBottom",true))||0),i=c.extend({},j),r;if(b.my[0]==="right")i.left-=l;else if(b.my[0]==="center")i.left-=l/2;if(b.my[1]==="bottom")i.top-=m;else if(b.my[1]==="center")i.top-=
m/2;i.left=Math.round(i.left);i.top=Math.round(i.top);r={left:i.left-p,top:i.top-q};c.each(["left","top"],function(s,x){c.ui.position[g[s]]&&c.ui.position[g[s]][x](i,{targetWidth:h,targetHeight:k,elemWidth:l,elemHeight:m,collisionPosition:r,collisionWidth:v,collisionHeight:w,offset:e,my:b.my,at:b.at})});c.fn.bgiframe&&f.bgiframe();f.offset(c.extend(i,{using:b.using}))})};c.ui.position={fit:{left:function(b,a){var d=c(window);d=a.collisionPosition.left+a.collisionWidth-d.width()-d.scrollLeft();b.left=
d>0?b.left-d:Math.max(b.left-a.collisionPosition.left,b.left)},top:function(b,a){var d=c(window);d=a.collisionPosition.top+a.collisionHeight-d.height()-d.scrollTop();b.top=d>0?b.top-d:Math.max(b.top-a.collisionPosition.top,b.top)}},flip:{left:function(b,a){if(a.at[0]!=="center"){var d=c(window);d=a.collisionPosition.left+a.collisionWidth-d.width()-d.scrollLeft();var g=a.my[0]==="left"?-a.elemWidth:a.my[0]==="right"?a.elemWidth:0,e=a.at[0]==="left"?a.targetWidth:-a.targetWidth,h=-2*a.offset[0];b.left+=
a.collisionPosition.left<0?g+e+h:d>0?g+e+h:0}},top:function(b,a){if(a.at[1]!=="center"){var d=c(window);d=a.collisionPosition.top+a.collisionHeight-d.height()-d.scrollTop();var g=a.my[1]==="top"?-a.elemHeight:a.my[1]==="bottom"?a.elemHeight:0,e=a.at[1]==="top"?a.targetHeight:-a.targetHeight,h=-2*a.offset[1];b.top+=a.collisionPosition.top<0?g+e+h:d>0?g+e+h:0}}}};if(!c.offset.setOffset){c.offset.setOffset=function(b,a){if(/static/.test(c.curCSS(b,"position")))b.style.position="relative";var d=c(b),
g=d.offset(),e=parseInt(c.curCSS(b,"top",true),10)||0,h=parseInt(c.curCSS(b,"left",true),10)||0;g={top:a.top-g.top+e,left:a.left-g.left+h};"using"in a?a.using.call(b,g):d.css(g)};c.fn.offset=function(b){var a=this[0];if(!a||!a.ownerDocument)return null;if(b)return this.each(function(){c.offset.setOffset(this,b)});return u.call(this)}}})(jQuery);
;/*
 * jQuery UI Slider 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Slider
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d){d.widget("ui.slider",d.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var a=this,b=this.options,c=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),f=b.values&&b.values.length||1,e=[];this._mouseSliding=this._keySliding=false;this._animateOff=true;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+
this.orientation+" ui-widget ui-widget-content ui-corner-all"+(b.disabled?" ui-slider-disabled ui-disabled":""));this.range=d([]);if(b.range){if(b.range===true){if(!b.values)b.values=[this._valueMin(),this._valueMin()];if(b.values.length&&b.values.length!==2)b.values=[b.values[0],b.values[0]]}this.range=d("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(b.range==="min"||b.range==="max"?" ui-slider-range-"+b.range:""))}for(var j=c.length;j<f;j+=1)e.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");
this.handles=c.add(d(e.join("")).appendTo(a.element));this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(g){g.preventDefault()}).hover(function(){b.disabled||d(this).addClass("ui-state-hover")},function(){d(this).removeClass("ui-state-hover")}).focus(function(){if(b.disabled)d(this).blur();else{d(".ui-slider .ui-state-focus").removeClass("ui-state-focus");d(this).addClass("ui-state-focus")}}).blur(function(){d(this).removeClass("ui-state-focus")});this.handles.each(function(g){d(this).data("index.ui-slider-handle",
g)});this.handles.keydown(function(g){var k=true,l=d(this).data("index.ui-slider-handle"),i,h,m;if(!a.options.disabled){switch(g.keyCode){case d.ui.keyCode.HOME:case d.ui.keyCode.END:case d.ui.keyCode.PAGE_UP:case d.ui.keyCode.PAGE_DOWN:case d.ui.keyCode.UP:case d.ui.keyCode.RIGHT:case d.ui.keyCode.DOWN:case d.ui.keyCode.LEFT:k=false;if(!a._keySliding){a._keySliding=true;d(this).addClass("ui-state-active");i=a._start(g,l);if(i===false)return}break}m=a.options.step;i=a.options.values&&a.options.values.length?
(h=a.values(l)):(h=a.value());switch(g.keyCode){case d.ui.keyCode.HOME:h=a._valueMin();break;case d.ui.keyCode.END:h=a._valueMax();break;case d.ui.keyCode.PAGE_UP:h=a._trimAlignValue(i+(a._valueMax()-a._valueMin())/5);break;case d.ui.keyCode.PAGE_DOWN:h=a._trimAlignValue(i-(a._valueMax()-a._valueMin())/5);break;case d.ui.keyCode.UP:case d.ui.keyCode.RIGHT:if(i===a._valueMax())return;h=a._trimAlignValue(i+m);break;case d.ui.keyCode.DOWN:case d.ui.keyCode.LEFT:if(i===a._valueMin())return;h=a._trimAlignValue(i-
m);break}a._slide(g,l,h);return k}}).keyup(function(g){var k=d(this).data("index.ui-slider-handle");if(a._keySliding){a._keySliding=false;a._stop(g,k);a._change(g,k);d(this).removeClass("ui-state-active")}});this._refreshValue();this._animateOff=false},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");this._mouseDestroy();
return this},_mouseCapture:function(a){var b=this.options,c,f,e,j,g;if(b.disabled)return false;this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();c=this._normValueFromMouse({x:a.pageX,y:a.pageY});f=this._valueMax()-this._valueMin()+1;j=this;this.handles.each(function(k){var l=Math.abs(c-j.values(k));if(f>l){f=l;e=d(this);g=k}});if(b.range===true&&this.values(1)===b.min){g+=1;e=d(this.handles[g])}if(this._start(a,g)===false)return false;
this._mouseSliding=true;j._handleIndex=g;e.addClass("ui-state-active").focus();b=e.offset();this._clickOffset=!d(a.target).parents().andSelf().is(".ui-slider-handle")?{left:0,top:0}:{left:a.pageX-b.left-e.width()/2,top:a.pageY-b.top-e.height()/2-(parseInt(e.css("borderTopWidth"),10)||0)-(parseInt(e.css("borderBottomWidth"),10)||0)+(parseInt(e.css("marginTop"),10)||0)};this.handles.hasClass("ui-state-hover")||this._slide(a,g,c);return this._animateOff=true},_mouseStart:function(){return true},_mouseDrag:function(a){var b=
this._normValueFromMouse({x:a.pageX,y:a.pageY});this._slide(a,this._handleIndex,b);return false},_mouseStop:function(a){this.handles.removeClass("ui-state-active");this._mouseSliding=false;this._stop(a,this._handleIndex);this._change(a,this._handleIndex);this._clickOffset=this._handleIndex=null;return this._animateOff=false},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(a){var b;if(this.orientation==="horizontal"){b=
this.elementSize.width;a=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{b=this.elementSize.height;a=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}b=a/b;if(b>1)b=1;if(b<0)b=0;if(this.orientation==="vertical")b=1-b;a=this._valueMax()-this._valueMin();return this._trimAlignValue(this._valueMin()+b*a)},_start:function(a,b){var c={handle:this.handles[b],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(b);
c.values=this.values()}return this._trigger("start",a,c)},_slide:function(a,b,c){var f;if(this.options.values&&this.options.values.length){f=this.values(b?0:1);if(this.options.values.length===2&&this.options.range===true&&(b===0&&c>f||b===1&&c<f))c=f;if(c!==this.values(b)){f=this.values();f[b]=c;a=this._trigger("slide",a,{handle:this.handles[b],value:c,values:f});this.values(b?0:1);a!==false&&this.values(b,c,true)}}else if(c!==this.value()){a=this._trigger("slide",a,{handle:this.handles[b],value:c});
a!==false&&this.value(c)}},_stop:function(a,b){var c={handle:this.handles[b],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(b);c.values=this.values()}this._trigger("stop",a,c)},_change:function(a,b){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[b],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(b);c.values=this.values()}this._trigger("change",a,c)}},value:function(a){if(arguments.length){this.options.value=
this._trimAlignValue(a);this._refreshValue();this._change(null,0)}else return this._value()},values:function(a,b){var c,f,e;if(arguments.length>1){this.options.values[a]=this._trimAlignValue(b);this._refreshValue();this._change(null,a)}else if(arguments.length)if(d.isArray(arguments[0])){c=this.options.values;f=arguments[0];for(e=0;e<c.length;e+=1){c[e]=this._trimAlignValue(f[e]);this._change(null,e)}this._refreshValue()}else return this.options.values&&this.options.values.length?this._values(a):
this.value();else return this._values()},_setOption:function(a,b){var c,f=0;if(d.isArray(this.options.values))f=this.options.values.length;d.Widget.prototype._setOption.apply(this,arguments);switch(a){case "disabled":if(b){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.propAttr("disabled",true);this.element.addClass("ui-disabled")}else{this.handles.propAttr("disabled",false);this.element.removeClass("ui-disabled")}break;case "orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue();break;case "value":this._animateOff=true;this._refreshValue();this._change(null,0);this._animateOff=false;break;case "values":this._animateOff=true;this._refreshValue();for(c=0;c<f;c+=1)this._change(null,c);this._animateOff=false;break}},_value:function(){var a=this.options.value;return a=this._trimAlignValue(a)},_values:function(a){var b,c;if(arguments.length){b=this.options.values[a];
return b=this._trimAlignValue(b)}else{b=this.options.values.slice();for(c=0;c<b.length;c+=1)b[c]=this._trimAlignValue(b[c]);return b}},_trimAlignValue:function(a){if(a<=this._valueMin())return this._valueMin();if(a>=this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,c=(a-this._valueMin())%b;a=a-c;if(Math.abs(c)*2>=b)a+=c>0?b:-b;return parseFloat(a.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var a=
this.options.range,b=this.options,c=this,f=!this._animateOff?b.animate:false,e,j={},g,k,l,i;if(this.options.values&&this.options.values.length)this.handles.each(function(h){e=(c.values(h)-c._valueMin())/(c._valueMax()-c._valueMin())*100;j[c.orientation==="horizontal"?"left":"bottom"]=e+"%";d(this).stop(1,1)[f?"animate":"css"](j,b.animate);if(c.options.range===true)if(c.orientation==="horizontal"){if(h===0)c.range.stop(1,1)[f?"animate":"css"]({left:e+"%"},b.animate);if(h===1)c.range[f?"animate":"css"]({width:e-
g+"%"},{queue:false,duration:b.animate})}else{if(h===0)c.range.stop(1,1)[f?"animate":"css"]({bottom:e+"%"},b.animate);if(h===1)c.range[f?"animate":"css"]({height:e-g+"%"},{queue:false,duration:b.animate})}g=e});else{k=this.value();l=this._valueMin();i=this._valueMax();e=i!==l?(k-l)/(i-l)*100:0;j[c.orientation==="horizontal"?"left":"bottom"]=e+"%";this.handle.stop(1,1)[f?"animate":"css"](j,b.animate);if(a==="min"&&this.orientation==="horizontal")this.range.stop(1,1)[f?"animate":"css"]({width:e+"%"},
b.animate);if(a==="max"&&this.orientation==="horizontal")this.range[f?"animate":"css"]({width:100-e+"%"},{queue:false,duration:b.animate});if(a==="min"&&this.orientation==="vertical")this.range.stop(1,1)[f?"animate":"css"]({height:e+"%"},b.animate);if(a==="max"&&this.orientation==="vertical")this.range[f?"animate":"css"]({height:100-e+"%"},{queue:false,duration:b.animate})}}});d.extend(d.ui.slider,{version:"1.8.16"})})(jQuery);
;
(function($){

    $.fn.kenburns = function(options) {

        var $canvas = $(this);
        var ctx = this[0].getContext('2d');
        var start_time = null;
        var width = $canvas.width();
        var height = $canvas.height();

        var image_paths = options.images;
        var display_time = options.display_time || 7000;
        var fade_time = Math.min(display_time / 2, options.fade_time || 1000);
        var solid_time = display_time - (fade_time * 2);
        var fade_ratio = fade_time - display_time
        var frames_per_second = options.frames_per_second || 30;
        var frame_time = (1 / frames_per_second) * 1000;
        var zoom_level = 1 / (options.zoom || 2);
        var clear_color = options.background_color || '#000000';

        var images = [];
        $(image_paths).each(function(i, image_path){
            images.push({path:image_path,
                         initialized:false,
                         loaded:false});
        });
        function get_time() {
            var d = new Date();
            return d.getTime() - start_time;
        }

        function interpolate_point(x1, y1, x2, y2, i) {
            // Finds a point between two other points
            return  {x: x1 + (x2 - x1) * i,
                     y: y1 + (y2 - y1) * i}
        }

        function interpolate_rect(r1, r2, i) {
            // Blend one rect in to another
            var p1 = interpolate_point(r1[0], r1[1], r2[0], r2[1], i);
            var p2 = interpolate_point(r1[2], r1[3], r2[2], r2[3], i);
            return [p1.x, p1.y, p2.x, p2.y];
        }

        function scale_rect(r, scale) {
            // Scale a rect around its center
            var w = r[2] - r[0];
            var h = r[3] - r[1];
            var cx = (r[2] + r[0]) / 2;
            var cy = (r[3] + r[1]) / 2;
            var scalew = w * scale;
            var scaleh = h * scale;
            return [cx - scalew/2,
                    cy - scaleh/2,
                    cx + scalew/2,
                    cy + scaleh/2];
        }

        function fit(src_w, src_h, dst_w, dst_h) {
            // Finds the best-fit rect so that the destination can be covered
            var src_a = src_w / src_h;
            var dst_a = dst_w / dst_h;
            var w = src_h * dst_a;
            var h = src_h;
            if (w > src_w)
            {
                var w = src_w;
                var h = src_w / dst_a;
            }
            var x = (src_w - w) / 2;
            var y = (src_h - h) / 2;
            return [x, y, x+w, y+h];
        }

        function get_image_info(image_index, load_callback) {
            // Gets information structure for a given index
            // Also loads the image asynchronously, if required
            var image_info = images[image_index];
            if (!image_info.initialized) {
                var image = new Image();
                image_info.image = image;
                image_info.loaded = false;
                image.onload = function(){
                    image_info.loaded = true;
                    var iw = image.width;
                    var ih = image.height;

                    var r1 = fit(iw, ih, width, height);;
                    var r2 = scale_rect(r1, zoom_level);

                    var align_x = Math.floor(Math.random() * 3) - 1;
                    var align_y = Math.floor(Math.random() * 3) - 1;
                    align_x /= 2;
                    align_y /= 2;

                    var x = r2[0];
                    r2[0] += x * align_x;
                    r2[2] += x * align_x;

                    var y = r2[1];
                    r2[1] += y * align_y;
                    r2[3] += y * align_y;

                    if (image_index % 2) {
                        image_info.r1 = r1;
                        image_info.r2 = r2;
                    }
                    else {
                        image_info.r1 = r2;
                        image_info.r2 = r1;
                    }

                    if(load_callback) {
                        load_callback();
                    }

                }
                image_info.initialized = true;
                image.src = image_info.path;
            }
            return image_info;
        }

        function render_image(image_index, anim, fade) {
            // Renders a frame of the effect
            if (anim > 1) {
                return;
            }
            var image_info = get_image_info(image_index);
            if (image_info.loaded) {
                var r = interpolate_rect(image_info.r1, image_info.r2, anim);
                var transparency = Math.min(1, fade);

                if (transparency > 0) {
                    ctx.save();
                    ctx.globalAlpha = Math.min(1, transparency);
                    ctx.drawImage(image_info.image, r[0], r[1], r[2] - r[0], r[3] - r[1], 0, 0, width, height);
                    ctx.restore();
                }
            }
        }

        function clear() {
            // Clear the canvas
            ctx.save();
            ctx.globalAlpha = 1;
            ctx.fillStyle = clear_color;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.restore();
        }

        function update() {
            // Render the next frame
            var update_time = get_time();

            var top_frame = Math.floor(update_time / (display_time - fade_time));
            var frame_start_time = top_frame * (display_time - fade_time);
            var time_passed = update_time - frame_start_time;

            function wrap_index(i) {
                return (i + images.length) % images.length;
            }

            if (time_passed < fade_time)
            {
                var bottom_frame = top_frame - 1;
                var bottom_frame_start_time = frame_start_time - display_time + fade_time;
                var bottom_time_passed = update_time - bottom_frame_start_time;
                if (update_time < fade_time) {
                    clear();
                } else {
                    render_image(wrap_index(bottom_frame), bottom_time_passed / display_time, 1);
                }
            }

            render_image(wrap_index(top_frame), time_passed / display_time, time_passed / fade_time);

            if (options.post_render_callback) {
                options.post_render_callback($canvas, ctx);
            }

            // Pre-load the next image in the sequence, so it has loaded
            // by the time we get to it
            var preload_image = wrap_index(top_frame + 1);
            get_image_info(preload_image);
        }

        // Pre-load the first two images then start a timer
        get_image_info(0, function(){
            get_image_info(1, function(){
                start_time = get_time();
                setInterval(update, frame_time);
            })
        });

    };

})( jQuery );
/* Modernizr 2.6.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-boxshadow-localstorage-touch-shiv-mq-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes
 */
;window.Modernizr=function(a,b,c){function A(a){j.cssText=a}function B(a,b){return A(m.join(a+";")+(b||""))}function C(a,b){return typeof a===b}function D(a,b){return!!~(""+a).indexOf(b)}function E(a,b){for(var d in a){var e=a[d];if(!D(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function F(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:C(f,"function")?f.bind(d||b):f}return!1}function G(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return C(b,"string")||C(b,"undefined")?E(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),F(e,b,c))}var d="2.6.1",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k=b.createElement("div"),l=b.body,m=l?l:b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),k.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),k.id=h,(l?k:m).innerHTML+=f,m.appendChild(k),l||(m.style.background="",g.appendChild(m)),i=c(k,a),l?k.parentNode.removeChild(k):m.parentNode.removeChild(m),!!i},x=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return w("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},y={}.hasOwnProperty,z;!C(y,"undefined")&&!C(y.call,"undefined")?z=function(a,b){return y.call(a,b)}:z=function(a,b){return b in a&&C(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:w(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},q.boxshadow=function(){return G("boxShadow")},q.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}};for(var H in q)z(q,H)&&(v=H.toLowerCase(),e[v]=q[H](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)z(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},A(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.mq=x,e.testProp=function(a){return E([a])},e.testAllProps=G,e.testStyles=w,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document);
/*global console, window, jQuery */
/*jslint browser: true, sloppy: true, plusplus: true, regexp: true */

/**
 * -------------------------------------------------------------
 * Init global vars
 * -------------------------------------------------------------
 *
 *
 *
*/
var IS24 = IS24 || {};
IS24.STATIC = IS24.STATIC || {};

jQuery.noConflict();

/**
 *
 * Depends on is24_elastislide
 *
*/
IS24.STATIC.articleNavigation = (function($){

	var flyoutTrigger, flyout, flyoutEntered, intervalID, articleCarousel, articles, activeArticle, activeArticleIndex,
		flyoutTriggerId = '#article-flyout-trigger',
		flyoutId = '#article-flyout',
		flyoutDelay = 300, // ms
		articleCarouselId = '#article-carousel',
		activeArticleClass = 'active';	

	function registerEvents() {

		flyoutTrigger.on('mouseenter', function() {
			showLayer();
		});

		flyoutTrigger.on('mouseleave', function() {
			hideLayer();
			flyout.on('mouseenter', function() {
				showLayer();
			});
		});

		flyout.on('mouseleave', function() {
			hideLayer();
		});

		activeArticle.on('click', function(e) {
			e.preventDefault();
		});

	};

	function showLayer() {
		window.clearInterval(intervalID);
		intervalID = '';
		intervalID = window.setInterval(function() {
			//flyout.show();
			flyout.css('visibility', 'visible'); // needs layout for initialization of article carousel
			flyoutTrigger.addClass('layerOpen');
		},flyoutDelay);
	};

	function hideLayer() {
		window.clearInterval(intervalID);
		intervalID = '';
		intervalID = window.setInterval(function() {
			//flyout.hide();
			flyout.css('visibility', 'hidden'); // needs layout for initialization of article carousel
			flyoutTrigger.removeClass('layerOpen');
		},flyoutDelay);
	};

	function getActiveArticleIndex(activeArticleClass) {
		articles = articleCarousel.find('a');
		activeArticleIndex = 0;
		articles.each(function(index) {
			if($(this).hasClass(activeArticleClass)) {
				activeArticleIndex =  index;
				return false;
			}
		});
	};

	function init() {
		flyoutTrigger = $(flyoutTriggerId);
		flyout = $(flyoutId);
		articleCarousel = $(articleCarouselId);
		activeArticle = articleCarousel.find('.'+activeArticleClass);
		registerEvents();
		getActiveArticleIndex(activeArticleClass);		
		jQuery(articleCarouselId).is24_elastislide({
			imageW 	: 140,
			minItems	: 2,
			step: 1,
			margin: 20,
			border: 0,
			current: activeArticleIndex
		});		
	};

	return {
		init : init
	}


})(jQuery);



IS24.STATIC.Watchlist = (function($) {

	var articleHeadline, articleImage, articlePath, articleWatched, watchListContainer, watchListButtons, watchListCounter, watchListCount, watchList;

	function showWatchlist() {
		watchListButtons.css('display', 'block');
		watchListContainer.show();
	};

	function registerEvents() {
		watchListButtons.click(handleButtonClick);
		watchListRemoveButtons.live("click", handleRemoveButtonClick); // links inserted via JS
	};

	function handleButtonClick(e) {
		e.preventDefault();

		if(articleWatched === true) {
			return false;
		};

		updateStatus();
		updateCounter(watchListCount += 1);
		addArticle();

	};

	function handleRemoveButtonClick(e) {
		e.preventDefault();
		var button = $(this);
		var articlePath = button.attr('href');
		button.parent().remove(); // remove from dom
		removeArticle(articlePath); // remove from watchlist
		if(articlePath === window.location.href) {
			updateStatus(); //buttons
		}
		updateCounter(watchListCount -= 1); // counter
	};

	function updateStatus() {
		watchListButtons.each(function() {
			var button = $(this);
			if (button.hasClass('watched')) {
				button.removeClass('watched');
				button.text("Später lesen");
				articleWatched = false;
			} else {
				button.addClass('watched');
				button.text("Gemerkt");
				articleWatched = true;
			}
		});
	};

	function updateCounter(watchListCount) {
		var text = watchListCounter.text();
		text = text.split(' ');
		text = text[0]+' '+watchListCount+'';
		watchListCounter.text(text);
	};

	function loadWatchList() {
		var watchlist = localStorage.getItem('watchlist');
		if(watchlist != null)
			watchlist = JSON.parse(watchlist);
		return watchlist;
	};

	function saveWatchList(watchlist) {
		localStorage.setItem('watchlist', JSON.stringify(watchlist));
	};

	function clearWatchList() {
		localStorage.clear();
	};

	function getWatchListSize(wl) {
		var size = 0, key;
		for (key in wl) {
			if (wl.hasOwnProperty(key)) size++;
		}
		return size;
	}

	function addArticle() {

		var articleTitle = articleHeadline.text();
		var articleImgPath = articleImage.attr('src');
		var storageValue = {"title" : articleTitle,"image" : articleImgPath};
		var storageKey = articlePath;

		if(watchList === null) {
			watchList = new Object;
		}
		if(watchList[storageKey] === undefined) {
			watchList[storageKey] = storageValue;
			saveWatchList(watchList);
		}

		buildOutput();

	};

	function removeArticle(storageKey) {
		if(storageKey !== undefined) {
			delete(watchList[storageKey]);
			saveWatchList(watchList);
		}
	};

	function buildOutput() {

		var output = "";

		$.each(watchList, function(key, value) {
			output += '<div style="float: left; margin-top: 15px;">';
			output += '<a class="article-remove" href="'+key+'">X</a><br /><br>';
			output += '<a href="'+key+'">'+this.title+'</a>';
			output += '<a style="display: block; margin-right: 15px;" href="'+key+'"><img width="125" height="94" src="'+this.image+'" alt="" /></a>';
			output += '<a style="display: block;" href="'+key+'">Artikel jetzt lesen</a>';
			output += '</div>';
		});

		watchListContent.html(output);

	};



	function init() {

//clearWatchList();

		/* to do: standard settings object */
		var watchListContainerId = 'watchlist';
		var watchListContentId = 'watchlist-content';
		var watchListButtonClass = 'watchlist-button';
		var watchListCounterId = 'watchlist-counter';
		var watchListRemoveButtonClass = 'article-remove';
		var articleHeadlineId = 'article-headline';
		var articleImageId = 'article-teaserimg';
		articlePath = window.location.href;
		articleWatched = false;
		articleHeadline = $('#'+articleHeadlineId);
		articleImage = $('#'+articleImageId);
		watchListContainer = $('#'+watchListContainerId);
		watchListContent = $('#'+watchListContentId);
		watchListButtons = $('.'+watchListButtonClass);
		watchListCounter = $('#'+watchListCounterId);
		watchListRemoveButtons = $('.'+watchListRemoveButtonClass);

		showWatchlist();
		registerEvents();

		watchListCount = 0;
		watchList = loadWatchList();

		if(watchList !== null) {

			watchListCount = getWatchListSize(watchList);
			updateCounter(watchListCount);

			if(articlePath in watchList) {
				articleWatched = true;
				updateStatus();
			}

			buildOutput();

		}

	};

	return {
		init : init
	}

})(jQuery);


IS24.STATIC.SideBar = (function($){

	var sideBar, sideBarTrigger, leftOffset;

	function init() {
		sideBar = $('aside#sidebar');
		sideBarTrigger = sideBar.find('.sidebar-trigger');
		leftOffset = parseInt(sideBar.css('left'),10);


		//if( leftOffset < 0) {
			registerEvents();
		//}
	};


	function registerEvents() {
		var openEvent = IS24.STATIC.Helpers.is_touch_device() ? 'touchend' : 'click';
		sideBarTrigger.on(openEvent,function() {
			if(sideBar.hasClass('opened')) {
				sideBar.removeClass('opened').addClass('closed').clearQueue().animate({left: leftOffset},500);
				sideBarTrigger.css('background-position', '0 0');
			} else {
				leftOffset = parseInt(sideBar.css('left'),10); /* save left offset of closed panel */
				sideBar.removeClass('closed').addClass('opened').clearQueue().animate({left: '0'}, 500);
				sideBarTrigger.css('background-position', '-41px 0');
			}
		});

		$(window).bind('resize', function(){
			if($(this).width() > 990 && sideBar.hasClass('closed')) {
				sideBar.css({left: '0'});
			} else if (650 < $(this).width() < 990 && sideBar.hasClass('closed')) {
				sideBar.css({left: leftOffset});
			}
		});

	};

	return {
		init : init
	}


})(jQuery);


IS24.STATIC.backButton = (function($){

	var //referrer = "immobilienscout24",
		referrer = ["immobilienscout24","frontend.iscout.local",".is24.loc",".arc.int","bercqa01","localhost"],
		backButton;

	function showButton() {
		backButton.css('display','block');
	}

	function init(button) {
		backButton = button;
		for(var i=0; i<referrer.length; i++) {
			if(document.referrer.indexOf(referrer[i]) !== -1) {
				showButton();
				registerEvents();
				break;
			}
		}
	};

	function registerEvents() {
		backButton.on('click', function(e) {
			e.preventDefault();
			history.back(1);
		});
	};

	return {
		init : init
	}


})(jQuery);

/**
 *
 * Depends on jQuery.quickflip
 *
*/
IS24.STATIC.partnerBoxes = (function($){

	var partnerBoxes, partnerBoxTimeout;

	function init(boxes) {
		partnerBoxes = boxes;
		partnerBoxes.quickFlip();
		registerEvents();
	};

	function registerEvents() {
		partnerBoxes.mouseenter(function() {
			var box = $(this);
			partnerBoxTimeout = window.setTimeout(function() {
				box.addClass("turned").quickFlipper();
			},800);
		}).mouseleave(function(ev) {
			clearTimeout(partnerBoxTimeout);
			var box = $(this);
			if(box.hasClass('turned')) {
				partnerBoxTimeout = window.setTimeout(function() {
					box.removeClass('turned').quickFlipper();
				},400);
			}
		});
	};

	return {
		init : init
	}

})(jQuery);


/*
*  Baufi Anbietervergleich Teaser on content pages
*  depends on: jquery.ui slider
*/

IS24.STATIC.anbieterTeaser = (function ($) {
	"use strict";
	var productUrl = 'http://www.immobilienscout24.de/de/baufinanzierung/',
		RETURN_KEY = 13,
		errors = [],
		Calculator = {},
		Helpers = {},
		Sliders = {};

	Calculator = {

		calc_data_json: {
			"0" : {
				"50" : "0,0359",
				"60" : "0,0359",
				"80" : "0,0359",
				"100": "0,039"
			},
			"100000" : {
				"50" : "0,0358",
				"60" : "0,0359",
				"80" : "0,0359",
				"100": "0,039"
			},
			"200000" : {
				"50" : "0,0335",
				"60" : "0,0335",
				"80" : "0,0359",
				"100": "0,039"
			},
			"300000" : {
				"50" : "0,0335",
				"60" : "0,0335",
				"80" : "0,0359",
				"100": "0,039"
			}
		},

		getFormatPrice: function (price, euro_sign) {
			var temp;
			price = parseInt(price * 100, 10);
			price = price / 100;
			temp = price.toFixed();
			temp = temp.replace(/\./, ",");
			while (temp.match(/^(\d+)(\d{3}\b)/)) {
				temp = temp.replace(/^(\d+)(\d{3}\b)/, RegExp.$1 + '.' + RegExp.$2);
			}
			if (euro_sign) {
				return temp + " &#128;";
			}
			return temp;

		},
		createCounter: function (jTarget, start, end, interval, step) {
			var intervalId,
				current = start,
				f = function () {
					jTarget.html(Calculator.getFormatPrice(current, true));
					if (current === end) {
						window.clearInterval(intervalId);
					}
					if (current > end) {
						jTarget.html(Calculator.getFormatPrice(end, true));
						window.clearInterval(intervalId);
					}
					current = current + step;
				};
			intervalId = window.setInterval(f, interval);
			f();
		},
		getDebitInterest: function (loan_sum, loan_ratio) {
			var loan_key,
				ratio_key;
			if (loan_sum < 100000) {
				loan_key = "0";
			} else if (loan_sum >= 100000 && loan_sum < 200000) {
				loan_key = "100000";
			} else if (loan_sum >= 200000 && loan_sum < 300000) {
				loan_key = "200000";
			} else {
				loan_key = "300000";
			}
			if (loan_ratio <= 50) {
				ratio_key = "50";
			} else if (loan_ratio > 50 && loan_ratio <= 60) {
				ratio_key = "60";
			} else if (loan_ratio > 60 && loan_ratio <= 80) {
				ratio_key = "80";
			} else {
				ratio_key = "100";
			}
			return parseFloat(Calculator.calc_data_json[loan_key][ratio_key].replace(/\,/, "."));
		},
		calcLoan: function () {

			var buy_price,
				own_capital,
				loan_sum,
				loan_ratio,
				debit_interest,
				monthly_rate,
				loan_value,
				monthly_value;

			loan_value = $('#loan_value');
			monthly_value = $('#monthly_value');

			if (errors.length !== 0) {
				// set values = 0
				loan_value.html('0');
				monthly_value.html('0');
				return false;
			}
			buy_price = Number($('#purchasePrice').val().replace(/\./g, ""));
			own_capital = Number($('#ownFunds').val().replace(/\./g, ""));
			loan_sum = buy_price - own_capital;
            // ignore invalid values
            if (loan_sum < 0) loan_sum = 0;
			loan_ratio = ((loan_sum / buy_price).toFixed(2)) * 100;
			debit_interest = Calculator.getDebitInterest(loan_sum, loan_ratio);
			monthly_rate = (loan_sum * ((debit_interest + 0.01) / 12)).toFixed(0);
			if (Sliders.start_behav) {
				Calculator.createCounter(loan_value, 0, loan_sum, 50, 10000);
				Calculator.createCounter(monthly_value, 0, Number(monthly_rate), 100, 100);
			} else {			
				loan_value.html(Calculator.getFormatPrice(loan_sum, true)); 
				monthly_value.html(Calculator.getFormatPrice(monthly_rate, true));				
				/* .hide().show(0) to force chrome to redraw after change */
				if(navigator.userAgent.match(/Chrome/)) {
					loan_value.hide().show(0);
					monthly_value.hide().show(0);
				}				
			}
		}

	};

	Helpers = {

		formatMonetaryString: (function () {

			var removeSpaceAndDotAndCommaFromText,
				addDecimalSeparatorsToNumberString,
				textContainsCharacters;

			removeSpaceAndDotAndCommaFromText = function (text) {
				text = text.toString();
				return text.replace(/\s/g, "").replace(/\./g, "").replace(/\,/g, "");
			};
			addDecimalSeparatorsToNumberString = function (text) {
				var result = parseInt(text, 10).toFixed();

				while (result.match(/^(\d+)(\d{3}\b)/)) {
					result = result.replace(/^(\d+)(\d{3}\b)/, RegExp.$1 + '.' + RegExp.$2);
				}
				return result;
			};
			textContainsCharacters = function (text) {
				return text.match(/\D/) !== null;
			};
			return function (text, isTextGivenBySlider) {
				if (text.length === 0) {
					return '';
				}
				var work_text = removeSpaceAndDotAndCommaFromText(text);
				if (isTextGivenBySlider) {
					if (textContainsCharacters(work_text)) {
						return 0;
					}
					return work_text;
				}
				if (textContainsCharacters(work_text)) {
					return text;
				}
				return addDecimalSeparatorsToNumberString(work_text);
			};
		}()),

		validateInput: function (id) {
			var inputField, value;
			inputField = $(id);
			value = inputField.val();
			if (value.match(/^[0-9]{0,3}(.[0-9]{3})$/)) {
				if ($.inArray(id, errors) > -1) { // remove error
					errors = $.grep(errors, function (value) {
						return value !== id;
					});
					inputField.removeClass('error').prev().prev().removeClass('error').prev().hide();
				}
				return true;
			}
			// add error
			errors.push(id);
			inputField.addClass('error').prev().prev().addClass('error').prev().show();
			Calculator.calcLoan(); // set values = 0
		}

	};

	Sliders = {

		is_key_up: false,
		start_behav: true,

		setSliderValues: function (input_id, ui, max, min) {
			if ($(input_id).val() <= max && ($(input_id).val() > min || (!Sliders.is_key_up))) {
				$(input_id).val(Helpers.formatMonetaryString(ui.value, false));
			}
		},
		handleEditedInputs: function (id) {
			var slider = id + "_slider";
			if (Helpers.validateInput(id) === true) {
				$(id).val(Helpers.formatMonetaryString($(id).val(), false));
				$(slider).slider("value", Helpers.formatMonetaryString($(id).val(), true));
			}
		},
		sliderSlideAndChange: function (elem, ui, max, min, update) {
			Sliders.setSliderValues(elem, ui, max, min);
			Sliders.is_key_up = false;
		},
		initSliders: function () {
			var purchase_price_max = 900000,
				own_funds_max = 500000,
				purchase_price_min = 25000,
				own_funds_min = 0,
				current_purchase_price_for_slider = $('#purchasePrice').val().replace(/\./g, ""),
				current_own_funds_for_slider = $('#ownFunds').val().replace(/\./g, ""),
				return_key_pressed = false,
				slider_opt_purchase_price = {
					min: purchase_price_min,
					max: purchase_price_max,
					step: 5000,
					range: "max",
					animate: 1000,
					slide: function (e, ui) {
						Sliders.sliderSlideAndChange("#purchasePrice", ui, purchase_price_max, purchase_price_min, false);
						Calculator.calcLoan();
					},
					change: function (e, ui) {
						Calculator.calcLoan();
					}
				},
				slider_opt_own_funds = {
					min: own_funds_min,
					max: own_funds_max,
					step: 2000,
					range: "max",
					animate: 1000,
					slide: function (e, ui) {
						Sliders.sliderSlideAndChange("#ownFunds", ui, purchase_price_max, purchase_price_min, false);
						Calculator.calcLoan();
					},
					change: function (e, ui) {
						Calculator.calcLoan();
					}
				};
			$('.slider_inputs').keypress(function (event) {
				Sliders.is_key_up = true;
				if (event.which === RETURN_KEY) {
					return_key_pressed = true;
					Sliders.handleEditedInputs("#" + $(this).attr("id"));
				}
			}).change(function () {
				if (!return_key_pressed) {
					Sliders.handleEditedInputs("#" + $(this).attr("id"));
				}
				return_key_pressed = false;
			});
			$('.sliders .ui-slider-handle').live("mousedown", function () {
				Sliders.is_key_up = false;
			});
			$('#purchasePrice_slider').slider(slider_opt_purchase_price);
			$('#ownFunds_slider').slider(slider_opt_own_funds);
			$('#purchasePrice_slider').slider("value", current_purchase_price_for_slider);
			$('#ownFunds_slider').slider("value", current_own_funds_for_slider);
			$('#purchasePrice').val(Helpers.formatMonetaryString($('#purchasePrice').val(), false));
			$('#ownFunds').val(Helpers.formatMonetaryString($('#ownFunds').val(), false));

		}
	};

	function registerEvents() {

		$('form.filter').submit(function (e) {
			var purchasePrice, ownFunds;
			e.preventDefault();
			if (errors.length === 0) {
				purchasePrice = $('#purchasePrice').val().replace(/\./, "");
				ownFunds = $('#ownFunds').val().replace(/\./, "");
				productUrl += '?purchasePrice=' + purchasePrice + '&ownFunds=' + ownFunds;
				window.location = productUrl;
			}
		}).keypress("keypress", function (e) {
			if (e.which === RETURN_KEY && e.target.type !== 'submit') {
				return false; // prevent submit if return button is pressed in text input
			}
		});

		// enable touch functionality
		if (IS24.STATIC.Helpers.is_touch_device())  {

			// necessary for the slider to work correctly with touch
			jQuery('.ui-widget-content').unbind();

			jQuery('.ui-slider-handle').bind('touchmove', function(event) {
				event.stopPropagation();
				var e = event.originalEvent,
					slider = jQuery(this).parent(),
					left = slider.offset().left,
					right = left + slider.width(),
					min = slider.slider('option', 'min'),
					max = slider.slider('option', 'max'),
					step = slider.slider( "option", "step" ),
					newvalue,
					roundFactor;

				// calc new value
				newvalue = min + (e.touches.item(0).clientX-left)/(right-left)*(max-min);
				roundFactor = Math.round(newvalue / step);
				newvalue = step * roundFactor;
				newvalue = newvalue < min ? min : newvalue > max ? max : newvalue;

				// set new position
				slider.slider('value', newvalue);

				// set value for input field
				slider.parent().next().attr('value', parseInt(newvalue));
				Calculator.calcLoan();

			}).width(30).height(20); // make handle bigger for touch

		}

	}

	function init() {
		Sliders.initSliders();	
		registerEvents();
		Sliders.start_behav = false;
	}

	return {
		init : init
	};

}(jQuery));



IS24.STATIC.YouTube = (function($){	

	var videoWrapper = "";	
	
	function init(id) {
	
		var html = jQuery('html');
		videoWrapper = $('#'+id);	
	
		if(!html.hasClass('youTube')) { 
			html.addClass('youTube');
			var tag = document.createElement('script'),
				docHead = document.getElementsByTagName('head')[0];							
			tag.src = "http://www.youtube.com/iframe_api";
			docHead.appendChild(tag);			
		} else {		
			videoWrapper.find('.video-preview').show();
		}		
		registerEvents();
		calcDimensions(videoWrapper);
	};
	
	function loadPlayer(id, height, width) {	
		var player = new YT.Player(id, {
			height: height,
			width: width,
			videoId: id.split("youtube")[1],
			playerVars: {'wmode': 'opaque', 'autoplay': 1, 'showinfo': 0, 'theme': 'light', 'modestbranding': 1, 'autohide': 1, 'rel': 0},
			events: {
				  'onStateChange': onPlayerStateChange						  
			}				
		});			
		return player;				
	};	
	
	function onPlayerStateChange(event) {			
		if (event.data == YT.PlayerState.ENDED ) {		
			$('#'+$(event.target.f).attr('id')).prev().show();					
		}				
	}

	function registerEvents() {
		// resize all videos on page on window resize
		$(window).resize(function() {
			$('.video-wrapper').each(function() {
				var videoWrapper = $(this);
				calcDimensions(videoWrapper);
			});
		});
		videoWrapper.find('.video-preview').click(function() {					
			var previewImage = $(this),					
				youTubeId = previewImage.next().attr('id'),
				iFrameWidth = previewImage.width(),
				iFrameHeight = previewImage.height();				
			previewImage.hide();
			if(previewImage.data('player') === undefined) {
				// store player on preview image
				previewImage.data('player', loadPlayer(youTubeId, iFrameHeight, iFrameWidth));	
			} else {
				previewImage.data('player').playVideo();
			}
		});
	};
		
	function calcDimensions(videoWrapper) {
				var iFrame = videoWrapper.find('iframe'),				
				playerIcon = videoWrapper.find('.player-icon'),
				previewImg = playerIcon.next(),
				ratio = videoWrapper.data('ratio'),					
				width = videoWrapper.parent().width(),
				height = parseInt(width / ratio, 10),
				playerIconLeft,
				playerIconTop;				
				if(width <= 330) {
					playerIcon.width(57).height(57);
				}
				playerIconLeft = width / 2 - playerIcon.width() / 2;
				playerIconTop = height / 2 - playerIcon.height() / 2;		
			videoWrapper.width(width).height(height);
			playerIcon.css({top: playerIconTop, left: playerIconLeft});
			previewImg.width(width).height(height);	
			
			// if iframe already loaded resize it
			if(iFrame.length > 0) {
				iFrame.width(width).height(height);
			}
	
	};

	return {
		init : init
	}

})(jQuery);

/* to change login link if user is logged in */
IS24.STATIC.getLoggedInUser = function () {

	var ts, apiUrl, loggedInHTML, loginId;
	ts = Math.round((new Date()).getTime() / 1000);
	apiUrl = "/rest/ajax/sso/user/"+ts;
	loggedInHTML = '<li><a title="Logout" href="/de/baufinanzierung/app/security/sso_logout">Abmelden</a></li><li><a href="/geschlossenerbereich/start.html?style=is24&amp;is24EC=IS24" id="link_loginStartLink">Mein Konto</a></li><li class="is24-l">Willkommen, ';
	loginId = jQuery('#is24-login');
	jQuery.getJSON(apiUrl, function (data) {
		var user = data["ns1.user"]["ns1.userName"];
		if (user !== undefined) {
			loggedInHTML += user + '</li>';
			loginId.html(loggedInHTML);
		}
	});

};
IS24.STATIC.Helpers = (function($){

	/* check if touch device */
	function is_touch_device() {
		// let modernizr do the work...
		if(jQuery('html').hasClass('no-touch')) {
			return false;
		} else {
			return true;
		}
		/*if ("ontouchstart" in document.documentElement) {
			return true;
		} else {
			return false;
		}*/
	};

	/* fix iOS bug on rotation */
	function iScaleFix() {
		var viewportmeta = $('meta[name="viewport"]');
		if(viewportmeta) {
			viewportmeta.attr('content', 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0');
			$('body').bind('gesturestart', function () {
				viewportmeta.attr('content', 'width=device-width, minimum-scale=0.25, maximum-scale=1.6');
			});
		}
	};

	/* Fix bug in FF < 4 with HTML5 block-level links in article navigation */
	function blockLevelLinksFix() {
		var articleCarousel = jQuery('#article-carousel');
		var liTags = articleCarousel.find('li');
		liTags.each(function() {
			var liTag = jQuery(this);
			var headLine = liTag.find('h1');
			var headlineText = headLine.text();
			headLine = headLine.text('headlineText').remove();
			var imgTag = liTag.find('img').unwrap().remove();
			var pTag = liTag.find('p').remove();
			var article = liTag.find('a > article');
			article.append(headLine).append(imgTag).append(pTag);
		});
	};

	/* get DOM */
	function getDOM() {
		var dom = $('body');
		return dom;
	};
	
	/* for content loaded via ajax wait with initialization until all requests are finished */
	function executeWhenAjaxFinished(func,args){		
		if(jQuery.active > 0) { // still ajax requests running
			setTimeout(executeWhenAjaxFinished, 50, func, args);
			return
		}				
		executeFunctionByName(func, window, args);
	}		
	
	/* substitute for eval() */
	function executeFunctionByName(functionName, context /*, args */) {	
		//var args = Array.prototype.slice.call(arguments).splice(2); // this does not work in ie < 9
		var args = Array.prototype.slice.call(arguments, 2);
		var namespaces = functionName.split(".");
		var func = namespaces.pop();		  
		for(var i = 0; i < namespaces.length; i++) {
		context = context[namespaces[i]];
		}
		return context[func].apply(this, args);
	}	

	return {
		is_touch_device : is_touch_device,
		iScaleFix : iScaleFix,
		getDOM : getDOM,
		blockLevelLinksFix : blockLevelLinksFix,
		executeWhenAjaxFinished : executeWhenAjaxFinished
	}

})(jQuery);

/* ************************************************************************** */
/* jQuery Plugins  ********************************************************** */
/* ************************************************************************** */

(function( window, $, undefined ) {

	// http://www.netcu.de/jquery-touchwipe-iphone-ipad-library
	$.fn.touchwipe 				= function(settings) {

		var config = {
			min_move_x: 20,
			min_move_y: 20,
			wipeLeft: function() { },
			wipeRight: function() { },
			wipeUp: function() { },
			wipeDown: function() { },
			preventDefaultEvents: true
		};

		if (settings) $.extend(config, settings);

		this.each(function() {
			var startX;
			var startY;
			var isMoving = false;

			function cancelTouch() {
				this.removeEventListener('touchmove', onTouchMove);
				startX = null;
				isMoving = false;
			}

			function onTouchMove(e) {
				if(config.preventDefaultEvents) {
					e.preventDefault();
				}
				if(isMoving) {
					var x = e.touches[0].pageX;
					var y = e.touches[0].pageY;
					var dx = startX - x;
					var dy = startY - y;
					if(Math.abs(dx) >= config.min_move_x) {
						cancelTouch();
						if(dx > 0) {
							config.wipeLeft();
						}
						else {
							config.wipeRight();
						}
					}
					else if(Math.abs(dy) >= config.min_move_y) {
						cancelTouch();
						if(dy > 0) {
							config.wipeDown();
						}
						else {
							config.wipeUp();
						}
					}
				}
			}

			function onTouchStart(e)
			{
				if (e.touches.length == 1) {
					startX = e.touches[0].pageX;
					startY = e.touches[0].pageY;
					isMoving = true;
					this.addEventListener('touchmove', onTouchMove, false);
				}
			}
			if ('ontouchstart' in document.documentElement) {
				this.addEventListener('touchstart', onTouchStart, false);
			}
		});

		return this;
	};

	/* Elastislide Plugin - IS24 modifications:
	/* - step only x items
	/* - on touch devices: step x items on button click but not on wipe
	/* - autoslide
	/* - show/hide navigation buttons
	/* - circular slide to the right; auto only */

	$.is24_elastislide 				= function( options, element ) {
		this.$el	= $( element );
		this._init( options );
	};

	$.is24_elastislide.defaults 		= {
		auto		: 0,	// seconds; interval for auto slide; 0 = no autoslide; needs to be set for circular functionality
		speed		: 450,	// animation speed
		easing		: '',	// animation easing effect
		imageW		: 190,	// the images width
		margin		: 3,	// image margin right
		border		: 2,	// image border
		minItems	: 1,	// the minimum number of items to show.
							// when we resize the window, this will make sure minItems are always shown
							// (unless of course minItems is higher than the total number of elements)
		step		: 0,	// number of moving items; 0 = all visible items - IS24 modification */
		current		: 0,	// index of the current item
							// when we resize the window, the carousel will make sure this item is visible
		navButtons	: true, // show or hide navigation buttons; if circular is true nav buttons will be hidden
		circular	: false, // infinite auto carousel; if true: nav buttons hidden; value for auto needed; touch events not registered
		onClick		: function() { return false; } // click item callback
    };

	$.is24_elastislide.prototype 	= {
		_init 				: function( options ) {

			this.options 		= $.extend( true, {}, $.is24_elastislide.defaults, options );

			// <ul>
			this.$slider		= this.$el.find('ul');

			// <li>
			this.$items			= this.$slider.children('li');

			// total number of elements / images
			this.itemsCount		= this.$items.length;

			// cache the <ul>'s parent, since we will eventually need to recalculate its width on window resize
			this.$esCarousel	= this.$slider.parent();

			// validate options
			this._validateOptions();

			// set sizes and initialize some vars...
			this._configure();

			// don't show navigation buttons if circular; check if auto slide interval is set
			if(this.options.circular) { /* IS24 modification */
				this.options.navButtons = false;
				if(this.options.auto === 0) {
					logError( "Auto slide interval needed for circular functionality!" );
					return;
				}
				if(this.options.step === 0) {
					logError ( "Set 'step: 1' for proper circular functionality!" );
				}
			};

			// add navigation buttons
			if(this.options.navButtons) /* IS24 modification */
				this._addControls();

			// initialize the events
			this._initEvents();

			// show the <ul>
			this.$slider.show();

			// slide to current's position			
			
			this._slideToCurrent( false );

			// true if buttons clicked - to distinguish touch from click event in _slide function - IS24 modification */
			this.buttonClicked = false;

			// start auto slide
			if(this.options.auto !== 0 && (this.sliderW > this.visibleWidth)) {
				this._startAuto();
			}

		},
		_validateOptions	: function() {

			if( this.options.speed < 0 )
				this.options.speed = 450;
			if( this.options.margin < 0 )
				this.options.margin = 4;
			if( this.options.border < 0 )
				this.options.border = 1;
			if( this.options.minItems < 1 || this.options.minItems > this.itemsCount )
				this.options.minItems = 1;
			if( this.options.current > this.itemsCount - 1 )
				this.options.current = 0;

		},
		_configure			: function() {

			// current item's index
			this.current		= this.options.current;

			// the ul's parent's (div.es-carousel) width is the "visible" width
			this.visibleWidth	= this.$esCarousel.width();

			// test to see if we need to initially resize the items
			if( this.visibleWidth < this.options.minItems * ( this.options.imageW + 2 * this.options.border ) + ( this.options.minItems - 1 ) * this.options.margin ) {
				this._setDim( ( this.visibleWidth - ( this.options.minItems - 1 ) * this.options.margin ) / this.options.minItems );
				this._setCurrentValues();
				// how many items fit with the current width
				this.fitCount	= this.options.minItems;
			}
			else {
				this._setDim();
				this._setCurrentValues();
			}

			// set the <ul> width
			this.$slider.css({
				width	: this.sliderW
			});

		},
		_setDim				: function( elW ) {

			// <li> style
			this.$items.css({
				marginRight	: this.options.margin,
				width		: ( elW ) ? elW : this.options.imageW + 2 * this.options.border
			}).children('a').css({ // <a> style
				borderWidth		: this.options.border
			});

		},
		_setCurrentValues	: function() {

			// the total space occupied by one item
			this.itemW			= this.$items.outerWidth(true);

			// total width of the slider / <ul>
			// this will eventually change on window resize
			this.sliderW		= this.itemW * this.itemsCount;

			// the ul parent's (div.es-carousel) width is the "visible" width
//			this.visibleWidth	= this.$esCarousel.width();			
			// the width of the wrapper (div.es-carousel-wrapper) div is the "visible" width
			this. visibleWidth = this.$esCarousel.parent().width();

			// how many items fit with the current width
			this.fitCount		= Math.floor( this.visibleWidth / this.itemW );



		},
		_addControls		: function() {

			this.$navNext	= $('<span class="es-nav-next">Next</span>');
			this.$navPrev	= $('<span class="es-nav-prev">Previous</span>');
			$('<div class="es-nav"/>')
			.append( this.$navPrev )
			.append( this.$navNext )
			.appendTo( this.$el );

			//this._toggleControls();

		},
		_toggleControls		: function( dir, status ) {		

			/* IS24 modification */
			if(!this.options.navButtons)
				return false;

			// show / hide navigation buttons
			if( dir && status ) {
				if( status === 1 )
					( dir === 'right' ) ? this.$navNext.show() : this.$navPrev.show();
				else
					( dir === 'right' ) ? this.$navNext.hide() : this.$navPrev.hide();
			}
			else if( this.current === this.itemsCount - 1 || this.fitCount >= this.itemsCount ) 			
				this.$navNext.hide();
			


		},
		_initEvents			: function() {

			var instance	= this;

			/* IS24 modification */
			if(this.options.auto !== 0 && (this.sliderW > this.visibleWidth)) {
				this.$el.bind('mouseenter', function( event ) {
					instance._stopAuto();
				});

				this.$el.bind('mouseleave', function( event ) {
					if(!instance.buttonClicked) { // next/prev stops auto slide
						instance._startAuto();
					}
				});

			}

			// window resize
			$(window).bind('resize.is24_elastislide', function( event ) {

				// set values again
				instance._setCurrentValues();

				// need to resize items
				if( instance.visibleWidth < instance.options.minItems * ( instance.options.imageW + 2 * instance.options.border ) + ( instance.options.minItems - 1 ) * instance.options.margin ) {
					instance._setDim( ( instance.visibleWidth - ( instance.options.minItems - 1 ) * instance.options.margin ) / instance.options.minItems );
					instance._setCurrentValues();
					instance.fitCount	= instance.options.minItems;
				}
				else{
					instance._setDim();
					instance._setCurrentValues();
				}

				instance.$slider.css({
					width	: instance.sliderW + 10
				});

				// slide to the current element
				clearTimeout( instance.resetTimeout );
				instance.resetTimeout	= setTimeout(function() {
					instance._slideToCurrent();
				}, 200);

			/* IS24 - modification */
				if(instance.options.circular || instance.options.auto !== 0) {
					if(instance.sliderW > instance.visibleWidth){
					  if(instance.intervalID === 0 || instance.intervalID === undefined) {
						instance._startAuto();
						}
					} else {
						if(instance.intervalID !== 0) {
						instance._stopAuto();
						instance.$el.unbind('mouseenter').unbind('mouseleave');
						}
					}
				}

			});

			// navigation buttons events
			if(this.options.navButtons) { /* IS24 modification */
				this.$navNext.bind('click.is24_elastislide', function( event ) {
					instance.buttonClicked = true;  /* IS24 modification */
					instance._slide('right');
				});

				this.$navPrev.bind('click.is24_elastislide', function( event ) {
					instance.buttonClicked = true;  /* IS24 modification */
					instance._slide('left');
				});
			}

			// item click event
			this.$items.bind('click.is24_elastislide', function( event ) {
				/*instance.stopAuto();/* IS24 modification */
				instance.options.onClick( $(this) );
				//return false; /* IS24 modification - items should be clickable */
			});

			// touch events
			if(!this.options.circular) { /* IS24 modification */
				instance.$slider.touchwipe({
					wipeLeft			: function() {
						if(instance.intervalID !== 0) {instance._stopAuto(); }/* IS24 modification */
						instance.buttonClicked = false; /* IS24 modification */
						instance._slide('right');
					},
					wipeRight			: function() {
						if(instance.intervalID !== 0) {instance._stopAuto(); }/* IS24 modification */
						instance.buttonClicked = false;  /* IS24 modification */
						instance._slide('left');
					}
				});
			}

		},

		/* IS24 modification */
		_startAuto			: function() {
			instance = this;
			var ms = this.options.auto *1000;
			this.intervalID = window.setInterval(function(){
				instance._slide('right');
			}, ms);
		},

		/* IS24 modification */
		_stopAuto			: function() {
			window.clearInterval(this.intervalID);
			this.intervalID = 0;
		},

		_slide				: function( dir, val, anim, callback ) {

			// if animating return
			if( this.$slider.is(':animated') )
				return false;

			// current margin left
			var ml		= parseFloat( this.$slider.css('margin-left') );		

			// val is just passed when we want an exact value for the margin left (used in the _slideToCurrent function)
			if( val === undefined ) {

				// how much to slide?

				/* IS24 modification */
				var amount = this.options.step !== 0 && (this.buttonClicked || this.options.auto !==0) ? this.options.step * this.itemW : this.fitCount * this.itemW;
				amount = amount, val;
				//var amount	= this.fitCount * this.itemW, val;				

				if( amount < 0 ) return false;

				// make sure not to leave a space between the last item / first item and the end / beggining of the slider available width
				if( dir === 'right' && this.sliderW - ( Math.abs( ml ) + amount ) < this.visibleWidth ) {				
//					amount	= this.sliderW - ( Math.abs( ml ) + this.visibleWidth ) - this.options.margin; // decrease the margin left
					// to calculate the correct amount for article navigation the width of the carousel is needed due to paddings...
					amount	= this.sliderW - ( Math.abs( ml ) + this.$esCarousel.width() ) - this.options.margin; 
					
					// show / hide navigation buttons
					this._toggleControls( 'right', -1 );
					this._toggleControls( 'left', 1 );
					if(this.intervalID !== undefined && this.intervalID !== 0) { /* IS24 modification */
						this._stopAuto();
						this._autoSlideToFirst();
					} /* IS24 modification */
				}
				else if( dir === 'left' && Math.abs( ml ) - amount < 0 ) {				
					amount	= Math.abs( ml );
					// show / hide navigation buttons
					this._toggleControls( 'left', -1 );
					this._toggleControls( 'right', 1 );
				}
				else {				
					var fml; // future margin left
					( dir === 'right' )
						? fml = Math.abs( ml ) + this.options.margin + Math.abs( amount )
						: fml = Math.abs( ml ) - this.options.margin - Math.abs( amount );

					// show / hide navigation buttons
					if( fml > 0 )
						this._toggleControls( 'left', 1 );
					else
						this._toggleControls( 'left', -1 );

					if( fml < this.sliderW - this.visibleWidth )
						this._toggleControls( 'right', 1 );
					else
						this._toggleControls( 'right', -1 );

				}

				/* IS24 modification */
				if(this.options.circular) {

					var instance = this;
					callback = function() { /* after animation finished: append hidden elements to ul */
						var itemsToAppend = 0;
						var marginLeft = parseInt(instance.$slider.css('margin-left'),10);
						var newMarginLeft = marginLeft+amount;
						var items = instance.$slider.find('li');
						if(instance.options.step === 0) {
							itemsToAppend = instance.fitCount;
						} else {
							itemsToAppend = instance.options.step;
						}
						for (var i = 0; i < itemsToAppend; i++) {
							instance.$slider.append(items[i]);
						}
						instance.$slider.css('marginLeft', newMarginLeft); // reset ul position
					};

				}

				( dir === 'right' ) ? val = '-=' + amount : val = '+=' + amount;


			}
			else {
				var fml		= Math.abs( val ); // future margin left

				if( Math.max( this.sliderW, this.visibleWidth ) - fml < this.visibleWidth ) {
	
					val	= - ( Math.max( this.sliderW, this.visibleWidth ) - this.visibleWidth );
					
					if( val !== 0 )
						val += this.options.margin;	// decrease the margin left if not on the first position

					// show / hide navigation buttons
					this._toggleControls( 'right', -1 );
					fml	= Math.abs( val );
				}

				// show / hide navigation buttons
				if( fml > 0 )
					this._toggleControls( 'left', 1 );
				else
					this._toggleControls( 'left', -1 );

				if( Math.max( this.sliderW, this.visibleWidth ) - this.visibleWidth > fml + this.options.margin )
					this._toggleControls( 'right', 1 );
				else
					this._toggleControls( 'right', -1 );

			}

			$.fn.applyStyle = ( anim === undefined ) ? $.fn.animate : $.fn.css;

			var sliderCSS	= { marginLeft : val };

			var instance	= this;

			this.$slider.applyStyle( sliderCSS, $.extend( true, [], { duration : this.options.speed, easing : this.options.easing, complete : function() {
			if( callback ) callback.call();
			} } ) );

		},
		_slideToCurrent		: function( anim ) {		
			// how much to slide?
			var amount	= this.current * this.itemW;				
			//this._slide('', 0, anim );
			this._slide('', -amount, anim);

		},
		/* IS24 modification */
		_autoSlideToFirst		: function() {
			//clearTimeout( this.resetTimeout );
			var instance = this;
			this.intervalID	= setTimeout(function() {
				instance._slide('left', 0);
				instance._startAuto();
			}, this.options.auto*1000);

		},
		add					: function( $newelems, callback ) {

			// adds new items to the carousel
			this.$items 		= this.$items.add( $newelems );
			this.itemsCount		= this.$items.length;
			this._setDim();
			this._setCurrentValues();
			this.$slider.css({
				width	: this.sliderW
			});
			this._slideToCurrent();

			if ( callback ) callback.call( $newelems );

		},
		destroy				: function( callback ) {
			this._destroy( callback );
		},
		_destroy 			: function( callback ) {
			this.$el.unbind('.is24_elastislide').removeData('is24_elastislide');
			$(window).unbind('.is24_elastislide');
			if ( callback ) callback.call();
		}
	};

	var logError 				= function( message ) {
		if ( this.console ) {
			console.error( message );
		}
	};

	$.fn.is24_elastislide 				= function( options ) {
		if ( typeof options === 'string' ) {
			var args = Array.prototype.slice.call( arguments, 1 );

			this.each(function() {
				var instance = $.data( this, 'is24_elastislide' );
				if ( !instance ) {
					logError( "cannot call methods on is24_elastislide prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for is24_elastislide instance" );
					return;
				}
				instance[ options ].apply( instance, args );
			});
		}
		else {
			this.each(function() {
				var instance = $.data( this, 'is24_elastislide' );
				if ( !instance ) {
					$.data( this, 'is24_elastislide', new $.is24_elastislide( options, this ) );
				}
			});
		}
		return this;
	};


	/*!
	 * Tiny Scrollbar 1.66
	 * http://www.baijs.nl/tinyscrollbar/
	 *
	 * Copyright 2010, Maarten Baijs
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 * http://www.opensource.org/licenses/mit-license.php
	 * http://www.opensource.org/licenses/gpl-2.0.php
	 *
	 * Date: 13 / 11 / 2011
	 * Depends on library: jQuery
	 *
	 */

	$.tiny = $.tiny || { };

	$.tiny.scrollbar = {
		options: {
			axis: 'y', // vertical or horizontal scrollbar? ( x || y ).
			wheel: 40,  //how many pixels must the mouswheel scroll at a time.
			scroll: true, //enable or disable the mousewheel;
			size: 'auto', //set the size of the scrollbar to auto or a fixed number.
			sizescroller: 'auto' //set the size of the thumb to auto or a fixed number.
		}
	};

	$.fn.tinyscrollbar = function(options) {
		var options = $.extend({}, $.tiny.scrollbar.options, options);
		this.each(function(){ $(this).data('tsb', new Scrollbar($(this), options)); });
		return this;
	};
	$.fn.tinyscrollbar_update = function(sScroll) { return $(this).data('tsb').update(sScroll); };

	function Scrollbar(root, options){
		var oSelf = this;
		var oWrapper = root;
		var oContent = { obj: $('.scrollable-content', root) };
		var oScrollbar = { obj: $('.scrollbar', root) };
		var oScroller = { obj: $('.scroller', oScrollbar.obj) };
		var sAxis = options.axis == 'x', sDirection = sAxis ? 'left' : 'top', sSize = sAxis ? 'Width' : 'Height';
		var iScroll, iPosition = { start: 0, now: 0 }, iMouse = {};

		function initialize() {
			oSelf.update();
			setEvents();
			return oSelf;
		}
		this.update = function(sScroll){
			oWrapper[options.axis] = sAxis ? oWrapper.width() : oWrapper.height();
			oContent[options.axis] = oContent.obj[0]['scroll'+ sSize];
			oContent.ratio = oWrapper[options.axis] / oContent[options.axis];
			oScrollbar.obj.toggleClass('disable', oContent.ratio >= 1);
			oScrollbar[options.axis] = options.size == 'auto' ? oWrapper[options.axis] : options.size;
			oScroller[options.axis] = Math.min(oScrollbar[options.axis], Math.max(0, ( options.sizescroller == 'auto' ? (oScrollbar[options.axis] * oContent.ratio) : options.sizescroller )));oScroller[options.axis] = Math.min(oScrollbar[options.axis], Math.max(0, ( options.sizescroller == 'auto' ? (oScrollbar[options.axis] * oContent.ratio) : options.sizescroller )));oScroller[options.axis] = Math.min(oScrollbar[options.axis], Math.max(0, ( options.sizescroller == 'auto' ? (oScrollbar[options.axis] * oContent.ratio) : options.sizescroller )));oScroller[options.axis] = Math.min(oScrollbar[options.axis], Math.max(0, ( options.sizescroller == 'auto' ? (oScrollbar[options.axis] * oContent.ratio) : options.sizescroller )));oScroller[options.axis] = Math.min(oScrollbar[options.axis], Math.max(0, ( options.sizescroller == 'auto' ? (oScrollbar[options.axis] * oContent.ratio) : options.sizescroller )));
			oScrollbar.ratio = options.sizescroller == 'auto' ? (oContent[options.axis] / oScrollbar[options.axis]) : (oContent[options.axis] - oWrapper[options.axis]) / (oScrollbar[options.axis] - oScroller[options.axis]);
			iScroll = (sScroll == 'relative' && oContent.ratio <= 1) ? Math.min((oContent[options.axis] - oWrapper[options.axis]), Math.max(0, iScroll)) : 0;
			iScroll = (sScroll == 'bottom' && oContent.ratio <= 1) ? (oContent[options.axis] - oWrapper[options.axis]) : isNaN(parseInt(sScroll)) ? iScroll : parseInt(sScroll);
			setSize();
		};
		function setSize(){
			oScroller.obj.css(sDirection, iScroll / oScrollbar.ratio);
			oContent.obj.css(sDirection, -iScroll);
			iMouse['start'] = oScroller.obj.offset()[sDirection];
			var sCssSize = sSize.toLowerCase();
			oScrollbar.obj.css(sCssSize, oScrollbar[options.axis]);
			oScroller.obj.css(sCssSize, oScroller[options.axis]);
		};
		function setEvents(){
			oScroller.obj.bind('mousedown', start);
			oScroller.obj[0].ontouchstart = function(oEvent){
				oEvent.preventDefault();
				oScroller.obj.unbind('mousedown');
				start(oEvent.touches[0]);
				return false;
			};
			oScrollbar.obj.bind('mouseup', drag);
			if(options.scroll && this.addEventListener){
				oWrapper[0].addEventListener('DOMMouseScroll', wheel, false);
				oWrapper[0].addEventListener('mousewheel', wheel, false );
			}
			else if(options.scroll){oWrapper[0].onmousewheel = wheel;}
		};
		function start(oEvent){
			iMouse.start = sAxis ? oEvent.pageX : oEvent.pageY;
			var oScrollerDir = parseInt(oScroller.obj.css(sDirection));
			iPosition.start = oScrollerDir == 'auto' ? 0 : oScrollerDir;
			$(document).bind('mousemove', drag);
			document.ontouchmove = function(oEvent){
				$(document).unbind('mousemove');
				drag(oEvent.touches[0]);
			};
			$(document).bind('mouseup', end);
			oScroller.obj.bind('mouseup', end);
			oScroller.obj[0].ontouchend = document.ontouchend = function(oEvent){
				$(document).unbind('mouseup');
				oScroller.obj.unbind('mouseup');
				end(oEvent.touches[0]);
			};
			return false;
		};
		function wheel(oEvent){
			if(!(oContent.ratio >= 1)){
				var oEvent = oEvent || window.event;
				var iDelta = oEvent.wheelDelta ? oEvent.wheelDelta/120 : -oEvent.detail/3;
				iScroll -= iDelta * options.wheel;
				iScroll = Math.min((oContent[options.axis] - oWrapper[options.axis]), Math.max(0, iScroll));
				oScroller.obj.css(sDirection, iScroll / oScrollbar.ratio);
				oContent.obj.css(sDirection, -iScroll);

				oEvent = $.event.fix(oEvent);
				oEvent.preventDefault();
			};
		};
		function end(oEvent){
			$(document).unbind('mousemove', drag);
			$(document).unbind('mouseup', end);
			oScroller.obj.unbind('mouseup', end);
			document.ontouchmove = oScroller.obj[0].ontouchend = document.ontouchend = null;
			return false;
		};
		function drag(oEvent){
			if(!(oContent.ratio >= 1)){
				iPosition.now = Math.min((oScrollbar[options.axis] - oScroller[options.axis]), Math.max(0, (iPosition.start + ((sAxis ? oEvent.pageX : oEvent.pageY) - iMouse.start))));
				iScroll = iPosition.now * oScrollbar.ratio;
				oContent.obj.css(sDirection, -iScroll);
				oScroller.obj.css(sDirection, iPosition.now);
			}
			return false;
		};

		return initialize();
	};



	/*!
	 * jQuery QuickFlip v2.1.1
	 * http://jonraasch.com/blog/quickflip-2-jquery-plugin
	 *
	 * Copyright (c) 2009 Jon Raasch (http://jonraasch.com/)
	 * Licensed under the FreeBSD License:
	 * http://dev.jonraasch.com/quickflip/docs#licensing
	 *
	 */
	/*
	 * @author Jon Raasch
	 *
	 * @projectDescription    jQuery plugin to create a flipping effect
	 *
	 * @version 2.1
	 *
	 * @requires jquery.js (tested with v 1.3.2)
	 *
	 * @documentation http://dev.jonraasch.com/quickflip/docs
	 *
	 * @donations https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=4URDTZYUNPV3J&lc=US&item_name=Jon%20Raasch&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted
	 *
	 *
	 * FOR USAGE INSTRUCTIONS SEE THE DOCUMENATION AT: http://dev.jonraasch.com/quickflip/docs
	 *
	 *
	 */


	// for better compression with YUI compressor
	var FALSE = false,
	NULL = null;

	$.quickFlip = {
		wrappers : [],
		opts  : [],
		objs     : [],

		init : function( options, box ) {
			var options = options || {};

			options.closeSpeed = options.closeSpeed || 180;
			options.openSpeed  = options.openSpeed  || 120;

			options.ctaSelector = options.ctaSelector || '.quickFlipCta';

			options.refresh = options.refresh || FALSE;

			options.easing = options.easing || 'swing';

			options.noResize = options.noResize || FALSE;

			options.vertical = options.vertical || FALSE;

			var $box = typeof( box ) != 'undefined' ? $(box) : $('.quickFlip'),
			$kids = $box.children();

			// define $box css
			if ( $box.css('position') == 'static' ) $box.css('position', 'relative');

			// define this index
			var i = $.quickFlip.wrappers.length;

			// close all but first panel before calculating dimensions
			$kids.each(function(j) {
				var $this = $(this);

				// attach standard click handler
				if ( options.ctaSelector ) {
					$this.find(options.ctaSelector).click(function(ev) {
						ev.preventDefault();
						$.quickFlip.flip(i);
					});
				}

				if ( j ) $this.hide();
			});

			$.quickFlip.opts.push( options );

			$.quickFlip.objs.push({$box : $($box), $kids : $($kids)});

			$.quickFlip.build(i);



			// quickFlip set up again on window resize
			if ( !options.noResize ) {
				$(window).resize( function() {
					for ( var i = 0; i < $.quickFlip.wrappers.length; i++ ) {
						$.quickFlip.removeFlipDivs(i);

						$.quickFlip.build(i);
					}
				});
			}
		},

		build : function(i, currPanel) {
			// get box width and height
			$.quickFlip.opts[i].panelWidth = $.quickFlip.opts[i].panelWidth || $.quickFlip.objs[i].$box.width();
			$.quickFlip.opts[i].panelHeight = $.quickFlip.opts[i].panelHeight || $.quickFlip.objs[i].$box.height();

			 // init quickFlip, gathering info and building necessary objects
			var options = $.quickFlip.opts[i],

			thisFlip = {
				wrapper    : $.quickFlip.objs[i].$box,
				index      : i,
				half       : parseInt( (options.vertical ? options.panelHeight : options.panelWidth) / 2),
				panels     : [],
				flipDivs   : [],
				flipDivCols : [],
				currPanel   : currPanel || 0,
				options     : options
			};

			// define each panel
			$.quickFlip.objs[i].$kids.each(function(j) {
				var $thisPanel = $(this).css({
					position : 'absolute',
					top : 0,
					left : 0,
					margin : 0,
					padding : 0,
					width : options.panelWidth,
					height : options.panelHeight
				});

				thisFlip.panels[j] = $thisPanel;

				// build flipDivs
				var $flipDivs = buildFlip( thisFlip, j ).hide().appendTo(thisFlip.wrapper);

				thisFlip.flipDivs[j] = $flipDivs;
				thisFlip.flipDivCols[j] = $flipDivs.children();
			});

			$.quickFlip.wrappers[i] = thisFlip;

			function buildFlip( x, y ) {
				// builds one column of the flip divs (left or right side)
				function buildFlipCol(x, y) {
					var $col = $('<div></div>'),
					$inner = x.panels[y].clone().show();

					$col.css(flipCss);

					$col.html($inner);

					return $col;
				}

				var $out = $('<div></div>'),

				inner = x.panels[y].html(),

				flipCss = {
					width : options.vertical ? options.panelWidth : x.half,
					height : options.vertical ? x.half : options.panelHeight,
					position : 'absolute',
					overflow : 'hidden',
					margin : 0,
					padding : 0
				};

				if ( options.vertical ) flipCss.left = 0;
				else flipCss.top = 0;

				var $col1 = $(buildFlipCol(x, y)).appendTo( $out ),
				$col2 = $(buildFlipCol(x, y)).appendTo( $out );

				if (options.vertical) {
					$col1.css('bottom', x.half);

					$col2.css('top',  x.half);

					$col2.children().css({
						top : NULL,
						bottom: 0
					});
				}
				else {
					$col1.css('right', x.half);
					$col2.css('left', x.half);

					$col2.children().css({
						right : 0,
						left : 'auto'
					});
				}

				return $out;
			}
		},

		// function flip ( i is quickflip index, j is index of currently open panel)

		flip : function( i, nextPanel, repeater, options) {
			function combineOpts ( opts1, opts2 ) {
				opts1 = opts1 || {};
				opts2 = opts2 || {};

				for ( opt in opts1 ) {
					opts2[opt] = opts1[opt];
				}

				return opts2;
			}

			if ( typeof i != 'number' || typeof $.quickFlip.wrappers[i] == 'undefined' ) return;

			var x = $.quickFlip.wrappers[i],

			j = x.currPanel,
			k = ( typeof(nextPanel) != 'undefined' && nextPanel != NULL ) ? nextPanel : ( x.panels.length > j + 1 ) ? j + 1 : 0;
			x.currPanel = k,

			repeater = ( typeof(repeater) != 'undefined' && repeater != NULL ) ? repeater : 1;

			options = combineOpts( options, $.quickFlip.opts[i] );

			x.panels[j].hide()

			// if refresh set, remove flipDivs and rebuild
			if ( options.refresh ) {
				$.quickFlip.removeFlipDivs(i);
				$.quickFlip.build(i, k);

				x = $.quickFlip.wrappers[i];
			}

			x.flipDivs[j].show();

			// these are due to multiple animations needing a callback
			var panelFlipCount1 = 0,
			panelFlipCount2 = 0,
			closeCss = options.vertical ? { height : 0 } : { width : 0 },
			openCss = options.vertical ? { height : x.half } : { width : x.half };

			x.flipDivCols[j].animate( closeCss, options.closeSpeed, options.easing, function() {
				if ( !panelFlipCount1 ) {
					panelFlipCount1++;
				}
				else {
					x.flipDivs[k].show();

					x.flipDivCols[k].css(closeCss);

					x.flipDivCols[k].animate(openCss, options.openSpeed, options.easing, function() {
						if ( !panelFlipCount2 ) {
							panelFlipCount2++;
						}
						else {

							x.flipDivs[k].hide();

							x.panels[k].show();

							// handle any looping of the animation
							switch( repeater ) {
								case 0:
								case -1:
									$.quickFlip.flip( i, NULL, -1);
									break;

								//stop if is last flip, and attach events for msie
								case 1:
									break;

								default:
									$.quickFlip.flip( i, NULL, repeater - 1);
									break;
							}
						}
					});
				}
			});

		},

		removeFlipDivs : function(i) {
			for ( var j = 0; j < $.quickFlip.wrappers[i].flipDivs.length; j++ ) $.quickFlip.wrappers[i].flipDivs[j].remove();
		}
	};

	$.fn.quickFlip = function( options ) {
		this.each( function() {
			new $.quickFlip.init( options, this );
		});

		return this;
	};

	$.fn.whichQuickFlip = function() {
		function compare(obj1, obj2) {
			if (!obj1 || !obj2 || !obj1.length || !obj2.length || obj1.length != obj2.length) return FALSE;

			for ( var i = 0; i < obj1.length; i++ ) {
				if (obj1[i]!==obj2[i]) return FALSE;
			}
			return true;
		}

		var out = NULL;

		for ( var i=0; i < $.quickFlip.wrappers.length; i++ ) {
			if ( compare(this, $( $.quickFlip.wrappers[i].wrapper)) ) out = i;
		}

		return out;
	};

	$.fn.quickFlipper = function( options, nextPanel, repeater ) {
		this.each( function() {
			var $this = $(this),
			thisIndex = $this.whichQuickFlip();

			// if doesnt exist, set it up
			if ( thisIndex == NULL ) {
				$this.quickFlip( options );

				thisIndex = $this.whichQuickFlip();
			}

			$.quickFlip.flip( thisIndex, nextPanel, repeater, options );
		});
	};
	
	/*!
	 * Slide Panels	
	 *
	 */
	
	/* constructor */
	SlidePanel = function(element, options) {	
		this.panel = element;		
		this._init(options);
	}
	
	/* default settings */
	SlidePanel.defaults = {	
		slideDirection : 'up', /* up, down, left, right; standard: up */
		event : 'hover', /* hover, click; standard: hover */	
		trigger: '', /* trigger to open and close slide panel; standard: panel itself */
		contentContainer : '', // container that holds the content; standard: first div inside panel */
		animSpeed : 500 /* slide speed in ms */
	}
	
	SlidePanel.prototype = {
	
		_init : function(options) {
			this.options = $.extend({}, SlidePanel.defaults, options);
			this.options.trigger = this.options.trigger === '' ? this.panel : this.options.trigger; /* standard trigger = panel itself */
			this.options.contentContainer = this.options.contentContainer === '' ? this.panel.find('div').first() : this.options.contentContainer; /* standard: first div hold the content */
			if (this.options.slideDirection === 'up' || this.options.slideDirection === 'down') {/* sliding vertically */
				this._getHeight();
			} else {
				this._getWidth();
			}
				
			this._initAnimation();
			this._registerEvents();
		},
		
		_getHeight : function() { 
				var borderTopHeight, borderBottomHeight, sliderTopPadding, sliderBottomPadding;
				borderTopHeight = parseInt(this.panel.css('border-top-width'), 10);
				borderTopHeight = isNaN(borderTopHeight) ? 0 : borderTopHeight;
				borderBottomHeight = parseInt(this.panel.css('border-bottom-width'), 10);
				borderBottomHeight = isNaN(borderBottomHeight) ? 0 : borderBottomHeight;
				sliderTopPadding = parseInt(this.panel.css('padding-top'), 10);
				sliderTopPadding = isNaN(sliderTopPadding) ? 0 : sliderTopPadding;
				sliderBottomPadding = parseInt(this.panel.css('padding-bottom'), 10);
				sliderBottomPadding = isNaN(sliderBottomPadding) ? 0 : sliderBottomPadding;
				//this.panelHeight = this.panel.height() - borderTopHeight - borderBottomHeight - sliderTopPadding - sliderBottomPadding;
				this.panelHeight = this.panel.height();
				this.contentHeight = this.options.contentContainer.height();
		},
		
		_getWidth : function() { 
				var borderLeftWidth, borderRightWidth, sliderLeftPadding, sliderRightPadding;
				borderLeftWidth = parseInt(this.panel.css('border-left-width'), 10);
				borderLeftWidth = isNaN(borderLeftWidth) ? 0 : borderLeftWidth;
				borderRightWidth = parseInt(this.panel.css('border-right-width'), 10);
				borderRightWidth = isNaN(borderRightWidth) ? 0 : borderRightWidth;
				sliderLeftPadding = parseInt(this.panel.css('padding-left'), 10);
				sliderLeftPadding = isNaN(sliderLeftPadding) ? 0 : sliderLeftPadding;
				sliderRightPadding = parseInt(this.panel.css('padding-right'), 10);
				sliderRightPadding = isNaN(sliderRightPadding) ? 0 : sliderRightPadding;
				this.panelWidth = this.panel.width() - borderLeftWidth - borderRightWidth - sliderLeftPadding - sliderRightPadding;
				this.contentWidth = this.options.contentContainer.width();
		},
		
		_initAnimation : function() {
			
			switch (this.options.slideDirection) {
				case 'up': // standard: slide content up
					this.panel.showParams = {
							height: this.contentHeight,
							top: -(this.contentHeight - this.panelHeight)						
					};
					this.panel.hideParams = {						
							height: this.panelHeight,
							top: 0						
					};
					break;
				case 'down':
					this.panel.showParams = {
						height: this.contentHeight					
					};
					this.panel.hideParams = {
						height: this.panelHeight						
					};
					break;
				case 'left':
					this.panel.showParams = {
						width: this.contentWidth + this.panelWidth,
						left: this.panelWidth - this.contentWidth						
					};
					this.panel.hideParams = {
						width: this.panelWidth,
						left: 0						
					};
					break;
				case 'right':
					this.panel.showParams = {
						width: this.contentWidth + this.panelWidth						
					};
					this.panel.hideParams = {
						width: this.panelWidth						
					};
					break;
			}

		},
		
		_registerEvents : function () {	

			var instance = this;

			if (this.options.event === 'click') {
			
				this.options.trigger.click(function() {
				
					if(!$(this).hasClass('opened')) {
						$(this).addClass('opened');
						instance.show();
					} else {
						$(this).removeClass('opened');
						instance.hide();				
					}
				
				});
				
			} else if (this.options.event === 'hover') {
				this.options.trigger.mouseenter(function() {					
					$(this).addClass('opened');
					instance.show();				
				}).mouseleave(function() {					
					$(this).removeClass('opened');
					instance.hide();
				});				
			} else return;
		},
		
		show : function () {	
			if(!$(this.options.trigger).hasClass('opened')) {
				$(this.options.trigger).addClass('opened');
			}
			this.panel.stop().animate(this.panel.showParams, this.options.animSpeed);			
		},
		
		hide : function() {
			$(this.options.trigger).removeClass('opened');
			this.panel.stop().animate(this.panel.hideParams, this.options.animSpeed);
		},	

		destroy : function() {			
			this.panel.removeData('slidePanel');
			this.panel.removeAttr('style');
			$(this.options.trigger).unbind();			
		}
		
	};
	
	var logError = function( message ) {
		if ( this.console ) {
			console.error( message );
		}
	};
	
	$.fn.slidePanel = function(options) { 
		if ( typeof options === 'string' ) { /* call to public method */			
			this.each(function() {
				var instance = $.data( this, 'slidePanel' );
				if ( !instance ) {
					logError( "cannot call methods on jQuery.slidePanel prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' in jQuery.slidePanel" );
					return;
				}
				instance[ options ].apply( instance );
			});		
		}
		else { /* standard call */
			this.each(function() {				
				var instance = $.data( this, 'slidePanel' );
				if ( !instance ) {
					$.data( this, 'slidePanel', new SlidePanel( $(this), options ) );					
				}
			});		
		}
		return this;		
	}

	/*
	 / jQuery Tab-Navigation
	 / Call width standard settings: jQuery(<tabNavContainer>).tabnav();
	 /
	 / Call with specific settings (here: tab class name and no 'show all' button): jQuery(<tabNavContainer>).tabnav({tabClassName : 'newTab', showAllButton: false});
	 */
	$.fn.tabnav = function( options ) {

		var settings = $.extend( {
			'tabClassName'        			: 'tab', // class name of content panels (=tabs)
			'tabActiveClassName'       		: 'tab-navigation-active',  // class name of active Tab
			'showAllButton'                 : true,  // show all button to open all tabs at once; if true: initially all tabs are open
			'showAllButtonClassName' 		: 'tab-navigation-showall', // class name of the 'show all' button
			'showTab'                       : 1    // active tab if no 'show all' button
		}, options);

		return this.each(function() {

			var $tabNav, $tabTriggers, $tabs, $showAllButton;

			$tabNav = $(this);
			$showAllButton = settings.showAllButton ? $('.'+settings.showAllButtonClassName) : null;
			$tabTriggers = $showAllButton === null ? $tabNav.find('a') : $tabNav.find('a:not(.'+settings.showAllButtonClassName+')');  // if showAllButton in tabNav container: ignore it (its not a tab trigger)
			$tabs = $('.'+settings.tabClassName);

			if(!settings.showAllButton) {
				$tabs.each(function(i){
					if(settings.showTab !== i+1) {
						$(this).hide();
					} else {
						$($tabTriggers[i]).addClass(settings.tabActiveClassName);
					}
				})
			}

			$tabTriggers.click(function(e) {
				var $clicked, tabToShow;
				e.preventDefault();

				$tabNav.find('.'+settings.tabActiveClassName).removeClass(settings.tabActiveClassName);
				$clicked = $(this);
				$clicked.addClass(settings.tabActiveClassName);

				tabToShow = this.href.split('#')[1];
				$tabs.hide();
				$('#'+tabToShow).show();
			})

			if(settings.showAllButton) {
				$showAllButton.click(function(e) {
					e.preventDefault();
					$tabNav.find('.'+settings.tabActiveClassName).removeClass(settings.tabActiveClassName);
					$tabs.show();
				})
			}

		});

	};










})( window, jQuery );



jQuery(document).ready(function () {

	var ua, dom, myWindow, tabletBreakpoint, fullWidthBreakpoint, isTouchDevice, sideBar, watchlist, scrollableContainers, slidingButtons, articleNavigation, backButton, partnerRotation, disabledButtons, partnerBoxes, anbieterTeaser, videos, calcButton, glossary  ;

	ua = jQuery.browser;
	dom = IS24.STATIC.Helpers.getDOM();
	myWindow = jQuery(window);	
	tabletBreakPoint = 660;
	fullWidthBreakPoint = 1000;
	isTouchDevice = IS24.STATIC.Helpers.is_touch_device() ? true : false;
	isOldIE = navigator.userAgent.match(/MSIE 8/) || navigator.userAgent.match(/MSIE 7/) ? true : false;

	if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
		IS24.STATIC.Helpers.iScaleFix();
	}

	if ( ua.mozilla && ua.version.slice(0,3) === "1.9" ) {
		IS24.STATIC.Helpers.blockLevelLinksFix();
	}

	/*
	/* Global elements
	*/

	/* partner rotation */
	partnerRotation = dom.find('#partner-rotation');
	if(partnerRotation.length > 0) {
		partnerRotation.is24_elastislide({
			imageW 	: 106,
			minItems	: 2,
			circular: true,
			auto : 5,
			step: 1
		});
	}

	/* disabled buttons */
	disabledButtons = dom.find('a.dsbld');
	disabledButtons.each(function() {
		jQuery(this).on("click", function(e) {
			e.preventDefault();
			e.stopImmediatePropagation();
		});
	});

	/*
	/* Index page
	*/
	
	/* sliding buttons */	
	slidingButtons = dom.find('.sliding');
	if(slidingButtons.length > 0) {
	
		// init sliding buttons		
		if(!isTouchDevice && myWindow.width() > fullWidthBreakPoint ) {
			if(isOldIE) {				
				setTimeout(function() { // wait for css3-mediaqueries.js
					slidingButtons.each(function() {
					jQuery(this).slidePanel();
				});
				
				},1000);
			} else {
				slidingButtons.each(function() {
					jQuery(this).slidePanel();
				});
			}
		}
		// on window resize
		myWindow.resize(function(event) {			
			if(myWindow.width() < fullWidthBreakPoint) { 				
				slidingButtons.each(function() {
					var button = jQuery(this);
					if(button.data('slidePanel') !== undefined) {
						button.slidePanel('destroy'); // remove functionality
					}
				});
			} else { // re-initialize sliding buttons
				if(isOldIE) {					
					setTimeout(function() {	// wait for css3-mediaqueries.js			
						slidingButtons.each(function() {
							var button = jQuery(this);
							if(button.data('slidePanel') === undefined) {
								button.slidePanel();
							}
						});
					},1000);
				} else {
					slidingButtons.each(function() {
						var button = jQuery(this);
						if(button.data('slidePanel') === undefined) {
							button.slidePanel();
						}
					});
				}
			}
		});	
	}
	

	/* scrollable containers */
	scrollableContainers = dom.find('.v-scrollable-container');
	if(scrollableContainers.length > 0) {
		scrollableContainers.tinyscrollbar();
		/* re-initialize plugins on resize */
		myWindow.resize(function(){
			scrollableContainers.tinyscrollbar_update();
		});
	}

	/*
	/* Content page
	*/

	/* sidebar */
	sideBar = dom.find('aside#sidebar');
	if(sideBar.length > 0) {
		IS24.STATIC.SideBar.init();
	}

	/* article navigation */
	articleNavigation = dom.find('#article-navigation');
	if(articleNavigation.length > 0) {
		IS24.STATIC.articleNavigation.init();
	}

	/* watchlist */	
	if(!isTouchDevice) { 
		watchlist = dom.find('#watchlist');
		if(watchlist.length > 0  && typeof(localStorage) != 'undefined') {
			IS24.STATIC.Watchlist.init();
		}
	}

	/* back button */
	backButton = dom.find('#js-back-button');
	if(backButton.length > 0) {
		IS24.STATIC.backButton.init(backButton);
	}

	/* partner boxes */
	partnerBoxes = dom.find('.partner-box');
	if(partnerBoxes.length > 0) {
		IS24.STATIC.partnerBoxes.init(partnerBoxes);
	}
	
	/* anbietervergleich teaser */
	anbieterTeaser = dom.find('#av-teaser');
	if(anbieterTeaser.length > 0) {		
		IS24.STATIC.anbieterTeaser.init();		
	}
	
	/* youtube videos */
	/*videos = dom.find('.video-wrapper');
	if(videos.length > 0) {
		IS24.STATIC.YouTube.init();		
	}*/
	
	/* calculators */
	calcButton = dom.find('.calc-button');
	if(calcButton.length > 0) {
		calcButton.click(function(e) {
			var errorBox = dom.find('#errorText');
			var calcResult = jQuery(this).next();
			if(errorBox.is(':visible')) {
				if(calcResult.is(':visible')) {
					calcResult.addClass('dsp-none');
				}
				return false;
			}
			if(calcResult.hasClass('dsp-none')) {
				calcResult.removeClass('dsp-none');
			}
			return false;	
		});
	}

	/* glossary index */
	glossary = dom.find('#glossary-index');
	if(glossary.length > 0){
		glossary.find('.tab-navigation-triggers').tabnav({'tabClassName' : 'glossary-index_tab-nav'});
	}
	/* glossary sidebar */
	glossary = dom.find('#glossary-aside');
	if(glossary.length > 0){
		glossary.find('.tab-navigation-triggers').tabnav({'tabClassName' : 'glossary-aside_tab-nav', 'showAllButton' : false});
	}


	


});


function onYouTubeIframeAPIReady() {	
	jQuery('.video-preview').show(); // show preview image when iframe Player API is ready
}
/*global IS24, console, window */
/*jslint browser: true, sloppy: true */

var IS24 = IS24 || {};
IS24.STATIC = IS24.STATIC || {};

IS24.STATIC.MobileNav = (function ($) {

	var settings, body, page, container, trigger, navFile, containerWidth;

	settings = {
		mobileNavTriggerClass : 'mobileNavTrigger',
		mobileNavContainerId : 'mobileNav'
	};

	function appendContainer() {
		if (container.length === 0) {
			container = $('<div />').attr('id', settings.mobileNavContainerId).css('display', 'none').prependTo(body);
			containerWidth = container.width();
		}
	}

	function showNav() {
	//console.log('show nav');
		page.css('left', containerWidth);
		container.show();
		trigger.addClass('active');
	}

	function hideNav() {
	//console.log('hide nav');
		page.css('left', '0px');
		container.hide();
		trigger.removeClass('active');
	}

	function loadNav() {
	//console.log('loading nav');
		var mobileNav = sessionStorage.getItem('mobileNav');
		if (mobileNav === null) {
	//console.log('from file');
			container.load(navFile, function () {
				sessionStorage.setItem('mobileNav', container.html());
				showNav();
			});
		} else {
	//console.log('from session');
			container.html(sessionStorage.getItem('mobileNav'));
			showNav();
		}
	}

	function registerEvents() {

		trigger.on('click', function (e) {
			e.preventDefault();
		});

		// open mobile nav on trigger click/ touch
		trigger.on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			if (container.is(':hidden')) {
				if (container.html() === '') {
					loadNav();
				} else {
					showNav();
				}
			} else {
				hideNav();
			}
		});

		// prevent closing of mobile nav on click in container
		container.on('click', function (e) {
			e.stopPropagation();
		});

		// Close mobile nav if the document is clicked{
		page.on('click swipeleft', function (e) {
			if (container.is(':visible')) {
				hideNav();
			}
		});
		// Close mobile nav when window is resized in desktop browsers 
		if (!IS24.STATIC.Helpers.is_touch_device()) {
			$(window).resize(function () {
				if (container.is(':visible')) {
					hideNav();
				}
			});
		}

	}

	function init(options) {
		if (typeof options === 'object') {
			settings = $.extend({}, settings, options);
		}
		body = $('body');
		page = body.find('#page');
		container = $('#' + settings.mobileNavContainerId);
		trigger = $('.' + settings.mobileNavTriggerClass);
		trigger.show();
		navFile = trigger.attr('data-url');
		appendContainer();
		registerEvents();
	}

	return {
		init : init
	};

})(jQuery);
jQuery(document).ready(function () {
	//IS24.STATIC.MobileNav.init({mobileNavTriggerClass : 'small-button'});
});
/*global sitestat, pageViewReportingUrl */
/*jslint browser: true, sloppy: true, white: true, plusplus: true, evil: true */

var IS24 = IS24 || {};
IS24.isIE = /*@cc_on!@*/0;

IS24.registerNS = function (ns) {
	var i,
		nsParts = ns.split("."), 
		root = window;
	for (i=0; i<nsParts.length; i++) {
		if (root[nsParts[i]] === undefined) { root[nsParts[i]] = {}; }
		root = root[nsParts[i]];
	}
};

IS24.registerNS("IS24.ANALYTICS.COMSCORE");

IS24.ANALYTICS.COMSCORE.findLinks = function () {
	var i,
		func = function () { IS24.ANALYTICS.COMSCORE.captureExitLink(this); },
		e = document.getElementsByTagName("a");
	for ( i=0; i<e.length; i++) {
		if ( e[i].getAttribute("data-exitlink") ) {
			if (IS24.isIE) {
//				e[i].attachEvent("onclick", func); // onclick because attachEvent loses context
				e[i].onclick = func;
			} else {
				e[i].addEventListener("click", func, false);
			}
		}
	}
};


IS24.ANALYTICS.COMSCORE.captureExitLink = function (that) {
	var zielUrl = encodeURIComponent(that.href),
		partnerName = that.getAttribute("data-exitlink");
	sitestat(pageViewReportingUrl+"&ns_type=hidden&ns_event=11&pname=" + partnerName + "&ns_url=[" + zielUrl + "]" );
};


(function(){
	if (IS24.isIE) { window.attachEvent("onload", IS24.ANALYTICS.COMSCORE.findLinks ); } 
	else { window.addEventListener("load", IS24.ANALYTICS.COMSCORE.findLinks , false); }
}());
/*global IS24, sitestat, pageViewReportingUrl */
/*jslint browser: true, sloppy: true, white: true, plusplus: true, evil: true */

var IS24 = IS24 || {};
IS24.isIE = /*@cc_on!@*/0;

var params = "",i,val,
	icmp,nsCampaign,nsLinkname,nsSource,
	adid,ftc,ovkey,nsuap,nsacp,
	keys = {};

// request object
IS24.Request = {	

	getParameter: function(name) {
		return this.parameters()[name];
	},

	parameters: function() {
		var result = {},
			url = window.location.href,
			parameters = url.slice(url.indexOf('?') + 1).split('&'),
			i,parameter;

		for(i = 0;  i < parameters.length; i++) {
			parameter = parameters[i].split('=');
			result[parameter[0]] = parameter[1];
		}
		return result;
	}
};

IS24.ANALYTICS = IS24.ANALYTICS || {};
IS24.ANALYTICS.COMSCORE = IS24.ANALYTICS.COMSCORE || {};
IS24.ANALYTICS.COMSCORE.campaignParams = "";


// ICMP
icmp = IS24.Request.getParameter("icmp");
if (icmp) {
	nsCampaign = IS24.Request.getParameter("ns_campaign");
	nsLinkname = IS24.Request.getParameter("ns_linkname");
	nsSource = IS24.Request.getParameter("ns_linkname");
    IS24.ANALYTICS.COMSCORE.campaignParams += "&icmp=" + icmp;
    IS24.ANALYTICS.COMSCORE.campaignParams += "&ns_campaign=" + (nsCampaign||"");
    IS24.ANALYTICS.COMSCORE.campaignParams += "&ns_linkname=" + (nsLinkname||"");
    IS24.ANALYTICS.COMSCORE.campaignParams += "&ns_source=" + (nsSource||"");
    IS24.ANALYTICS.COMSCORE.campaignParams += "&ns_mchannel=internal";
}

// ADID
adid = IS24.Request.getParameter("adid");
if (adid) {
	IS24.ANALYTICS.COMSCORE.campaignParams += "&icmp=" + adid;
	IS24.ANALYTICS.COMSCORE.campaignParams += "&ns_campaign=" + adid;
	IS24.ANALYTICS.COMSCORE.campaignParams += "&ns_linkname=adserver&ns_source=adserver&ns_mchannel=internal";
}

// FTC
ftc = IS24.Request.getParameter("ftc");
if (ftc) {
	ovkey = IS24.Request.getParameter("OVKEY");
	IS24.ANALYTICS.COMSCORE.campaignParams += "&ns_campaign=" + ftc;
	IS24.ANALYTICS.COMSCORE.campaignParams += "&ftc=" + ftc;
	IS24.ANALYTICS.COMSCORE.campaignParams += "&kw=" + (ovkey||"");
	IS24.ANALYTICS.COMSCORE.campaignParams += "&ns_linkname=" + (ovkey||"");
	IS24.ANALYTICS.COMSCORE.campaignParams += "&ns_source=ftc&ns_mchannel=external&ns_fee=0";
}

// NSUAP GET
nsuap = IS24.Request.getParameter("nsuap");
if (nsuap) {
	keys = nsuap.split(",");
	for (i=0; i<keys.length; i++ ) {
        val = IS24.Request.getParameter(keys[i]);
		IS24.ANALYTICS.COMSCORE.campaignParams += ( "&" + keys[i] + "=" + (val||"") );
    }
	IS24.ANALYTICS.COMSCORE.campaignParams += "&ns_event=99";
}

// NSACP GET
nsacp = IS24.Request.getParameter("nsacp");
if (nsacp) {
	keys = nsacp.split(",");
	for (i=0; i<keys.length; i++ ) {
		val = IS24.Request.getParameter(keys[i]);
		IS24.ANALYTICS.COMSCORE.campaignParams += ("&" + keys[i] + "=" + (val||"") );
	}
}
(function(E,a){var j=a.document;function A(Q){var Z=j.createElement("div");j.body.insertBefore(Z,null);E.replaceWith(Z,'<script type="text/javascript">'+Q+"<\/script>")}E=E||(function(Q){return{ajax:Q.ajax,$:function(Z){return Q(Z)[0]},replaceWith:function(Z,ad){var ac=Q(Z)[0];var ab=ac.nextSibling,aa=ac.parentNode;Q(ac).remove();if(ab){Q(ab).before(ad)}else{Q(aa).append(ad)}},onLoad:function(Z){Q(Z)},copyAttrs:function(af,ab){var ad=Q(ab),aa=af.attributes;for(var ac=0,Z=aa.length;ac<Z;ac++){if(aa[ac]&&aa[ac].value){try{ad.attr(aa[ac].name,aa[ac].value)}catch(ae){}}}}}})(a.jQuery);E.copyAttrs=E.copyAttrs||function(){};E.onLoad=E.onLoad||function(){throw"error: autoAsync cannot be used without jQuery or defining writeCaptureSupport.onLoad"};function P(ab,aa){for(var Z=0,Q=ab.length;Z<Q;Z++){if(aa(ab[Z])===false){return}}}function v(Q){return Object.prototype.toString.call(Q)==="[object Function]"}function p(Q){return Object.prototype.toString.call(Q)==="[object String]"}function u(aa,Z,Q){return Array.prototype.slice.call(aa,Z||0,Q||aa&&aa.length)}function D(ab,aa){var Q=false;P(ab,Z);function Z(ac){return !(Q=aa(ac))}return Q}function L(Q){this._queue=[];this._children=[];this._parent=Q;if(Q){Q._addChild(this)}}L.prototype={_addChild:function(Q){this._children.push(Q)},push:function(Q){this._queue.push(Q);this._bubble("_doRun")},pause:function(){this._bubble("_doPause")},resume:function(){this._bubble("_doResume")},_bubble:function(Z){var Q=this;while(!Q[Z]){Q=Q._parent}return Q[Z]()},_next:function(){if(D(this._children,Q)){return true}function Q(aa){return aa._next()}var Z=this._queue.shift();if(Z){Z()}return !!Z}};function i(Q){if(Q){return new L(Q)}L.call(this);this.paused=0}i.prototype=(function(){function Q(){}Q.prototype=L.prototype;return new Q()})();i.prototype._doRun=function(){if(!this.running){this.running=true;try{while(this.paused<1&&this._next()){}}finally{this.running=false}}};i.prototype._doPause=function(){this.paused++};i.prototype._doResume=function(){this.paused--;this._doRun()};function M(){}M.prototype={_html:"",open:function(){this._opened=true;if(this._delegate){this._delegate.open()}},write:function(Q){if(this._closed){return}this._written=true;if(this._delegate){this._delegate.write(Q)}else{this._html+=Q}},writeln:function(Q){this.write(Q+"\n")},close:function(){this._closed=true;if(this._delegate){this._delegate.close()}},copyTo:function(Q){this._delegate=Q;Q.foobar=true;if(this._opened){Q.open()}if(this._written){Q.write(this._html)}if(this._closed){Q.close()}}};var e=(function(){var Q={f:j.getElementById};try{Q.f.call(j,"abc");return true}catch(Z){return false}})();function I(Q){P(Q,function(Z){var aa=j.getElementById(Z.id);if(!aa){l("<proxyGetElementById - finish>","no element in writen markup with id "+Z.id);return}P(Z.el.childNodes,function(ab){aa.appendChild(ab)});if(aa.contentWindow){a.setTimeout(function(){Z.el.contentWindow.document.copyTo(aa.contentWindow.document)},1)}E.copyAttrs(Z.el,aa)})}function s(Z,Q){if(Q&&Q[Z]===false){return false}return Q&&Q[Z]||o[Z]}function x(Z,ai){var ae=[],ad=s("proxyGetElementById",ai),ag=s("writeOnGetElementById",ai),Q={write:j.write,writeln:j.writeln,finish:function(){},out:""};Z.state=Q;j.write=ah;j.writeln=aa;if(ad||ag){Q.getEl=j.getElementById;j.getElementById=ab;if(ag){findEl=af}else{findEl=ac;Q.finish=function(){I(ae)}}}function ah(aj){Q.out+=aj}function aa(aj){Q.out+=aj+"\n"}function ac(ak){var aj=j.createElement("div");ae.push({id:ak,el:aj});aj.contentWindow={document:new M()};return aj}function af(al){var aj=E.$(Z.target);var ak=j.createElement("div");aj.parentNode.insertBefore(ak,aj);E.replaceWith(ak,Q.out);Q.out="";return e?Q.getEl.call(j,al):Q.getEl(al)}function ab(ak){var aj=e?Q.getEl.call(j,ak):Q.getEl(ak);return aj||findEl(ak)}return Q}function V(Q){j.write=Q.write;j.writeln=Q.writeln;if(Q.getEl){j.getElementById=Q.getEl}return Q.out}function N(Q){return Q&&Q.replace(/^\s*<!(\[CDATA\[|--)/,"").replace(/(\]\]|--)>\s*$/,"")}function b(){}function d(Z,Q){console.error("Error",Q,"executing code:",Z)}var l=v(a.console&&console.error)?d:b;function S(aa,Z,Q){var ab=x(Z,Q);try{A(N(aa))}catch(ac){l(aa,ac)}finally{V(ab)}return ab}function O(Z){var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(Z);return Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)}function T(Q){return new RegExp(Q+"=(?:([\"'])([\\s\\S]*?)\\1|([^\\s>]+))","i")}function k(Q){var Z=T(Q);return function(aa){var ab=Z.exec(aa)||[];return ab[2]||ab[3]}}var r=/(<script[\s\S]*?>)([\s\S]*?)<\/script>/ig,n=T("src"),X=k("src"),q=k("type"),Y=k("language"),C="__document_write_ajax_callbacks__",B="__document_write_ajax_div-",g="window['"+C+"']['%d']();",m=a[C]={},w='<script type="text/javascript">'+g+"<\/script>",H=0;function c(){return(++H).toString()}function G(Z,aa){var Q;if(v(Z)){Q=Z;Z=null}Z=Z||{};Q=Q||Z&&Z.done;Z.done=aa?function(){aa(Q)}:Q;return Z}var z=new i();var y=[];var f=window._debugWriteCapture?function(){}:function(Q,aa,Z){y.push({type:Q,src:aa,data:Z})};var K=window._debugWriteCapture?function(){}:function(){y.push(arguments)};function W(Q){var Z=c();m[Z]=function(){Q();delete m[Z]};return Z}function J(Q){return w.replace(/%d/,W(Q))}function R(ac,ag,aa,ae){var ad=aa&&new i(aa)||z;ag=G(ag);var ab=s("done",ag);var Q="";var Z=s("fixUrls",ag);if(!v(Z)){Z=function(ah){return ah}}if(v(ab)){Q=J(function(){ad.push(ab)})}return ac.replace(r,af)+Q;function af(aj,av,ai){var an=X(av),am=q(av)||"",aB=Y(av)||"",aA=(!am&&!aB)||am.toLowerCase().indexOf("javascript")!==-1||aB.toLowerCase().indexOf("javascript")!==-1;f("replace",an,aj);if(!aA){return aj}var aw=W(ap),ao=B+aw,au,al={target:"#"+ao,parent:ae};function ap(){ad.push(au)}if(an){an=Z(an);av=av.replace(n,"");if(O(an)){au=az}else{if(s("asyncAll",ag)){au=ay()}else{au=at}}}else{au=ax}function ax(){ah(ai)}function at(){E.ajax({url:an,type:"GET",dataType:"text",async:false,success:function(aC){ah(aC)}})}function ak(aE,aC,aD){l("<XHR for "+an+">",aD);ad.resume()}function aq(){return J(function(){ad.resume()})}function ay(){var aE,aD;function aC(aG,aF){if(!aE){aD=aG;return}try{ah(aG,aq())}catch(aH){l(aG,aH)}}E.ajax({url:an,type:"GET",dataType:"text",async:true,success:aC,error:ak});return function(){aE=true;if(aD){ah(aD)}else{ad.pause()}}}function az(aC){var aE=x(al,ag);ad.pause();f("pause",an);E.ajax({url:an,type:"GET",dataType:"script",success:aD,error:ak});function aD(aH,aG,aF){f("out",an,aE.out);ar(V(aE),J(aE.finish)+aq());f("resume",an)}}function ah(aD,aC){var aE=S(aD,al,ag);aC=J(aE.finish)+(aC||"");ar(aE.out,aC)}function ar(aD,aC){E.replaceWith(al.target,R(aD,null,ad,al)+(aC||""))}return'<div style="display: none" id="'+ao+'"></div>'+av+g.replace(/%d/,aw)+"<\/script>"}}function F(Z,aa){var Q=z;P(Z,function(ab){Q.push(ac);function ac(){ab.action(R(ab.html,ab.options,Q),ab)}});if(aa){Q.push(aa)}}function U(Q){var Z=Q;while(Z&&Z.nodeType===1){Q=Z;Z=Z.lastChild;while(Z&&Z.nodeType!==1){Z=Z.previousSibling}}return Q}function h(Q){var aa=j.write,ad=j.writeln,Z,ab=[];j.writeln=function(ae){j.write(ae+"\n")};var ac;j.write=function(af){var ae=U(j.body);if(ae!==Z){Z=ae;ab.push(ac={el:ae,out:[]})}ac.out.push(af)};E.onLoad(function(){var ah,ak,af,aj,ai;Q=G(Q);ai=Q.done;Q.done=function(){j.write=aa;j.writeln=ad;if(ai){ai()}};for(var ag=0,ae=ab.length;ag<ae;ag++){ah=ab[ag].el;ak=j.createElement("div");ah.parentNode.insertBefore(ak,ah.nextSibling);af=ab[ag].out.join("");aj=ae-ag===1?R(af,Q):R(af);E.replaceWith(ak,aj)}})}var t="writeCapture";var o=a[t]={_original:a[t],fixUrls:function(Q){return Q.replace(/&amp;/g,"&")},noConflict:function(){a[t]=this._original;return this},debug:y,proxyGetElementById:false,_forTest:{Q:i,GLOBAL_Q:z,$:E,matchAttr:k,slice:u,capture:x,uncapture:V,captureWrite:S},replaceWith:function(Q,aa,Z){E.replaceWith(Q,R(aa,Z))},html:function(Q,ab,Z){var aa=E.$(Q);aa.innerHTML="<span/>";E.replaceWith(aa.firstChild,R(ab,Z))},load:function(Q,aa,Z){E.ajax({url:aa,dataType:"text",type:"GET",success:function(ab){o.html(Q,ab,Z)}})},autoAsync:h,sanitize:R,sanitizeSerial:F}})(this.writeCaptureSupport,this);(function(g,d,n){var c={html:h};g.each(["append","prepend","after","before","wrap","wrapAll","replaceWith","wrapInner"],function(){c[this]=i(this)});function a(q){return Object.prototype.toString.call(q)=="[object String]"}function p(u,t,s,r){if(arguments.length==0){return o.call(this)}var q=c[u];if(u=="load"){return l.call(this,t,s,r)}if(!q){j(u)}return b.call(this,t,s,q)}g.fn.writeCapture=p;var k="__writeCaptureJsProxied-fghebd__";function o(){if(this[k]){return this}var r=this;function q(){var t=this,s=false;this[k]=true;g.each(c,function(v){var u=r[v];if(!u){return}t[v]=function(y,x,w){if(!s&&a(y)){try{s=true;return p.call(t,v,y,x,w)}finally{s=false}}return u.apply(t,arguments)}});this.pushStack=function(){return o.call(r.pushStack.apply(t,arguments))};this.endCapture=function(){return r}}q.prototype=r;return new q()}function b(t,s,u){var q,r=this;if(s&&s.done){q=s.done;delete s.done}else{if(g.isFunction(s)){q=s;s=null}}d.sanitizeSerial(g.map(this,function(v){return{html:t,options:s,action:function(w){u.call(v,w)}}}),q&&function(){q.call(r)}||q);return this}function h(q){g(this).html(q)}function i(q){return function(r){g(this)[q](r)}}function l(t,s,v){var r=this,q,u=t.indexOf(" ");if(u>=0){q=t.slice(u,t.length);t=t.slice(0,u)}if(g.isFunction(v)){s=s||{};s.done=v}return g.ajax({url:t,type:s&&s.type||"GET",dataType:"html",data:s&&s.params,complete:f(r,s,q)})}function f(r,s,q){return function(u,t){if(t=="success"||t=="notmodified"){var v=m(u.responseText,q);b.call(r,v,s,h)}}}var e=/jquery-writeCapture-script-placeholder-(\d+)-wc/g;function m(s,r){if(!r||!s){return s}var t=0,q={};return g("<div/>").append(s.replace(/<script(.|\s)*?\/script>/g,function(u){q[t]=u;return"jquery-writeCapture-script-placeholder-"+(t++)+"-wc"})).find(r).html().replace(e,function(u,v){return q[v]})}function j(q){throw"invalid method parameter "+q}g.writeCapture=d})(jQuery,writeCapture.noConflict());
/*global sitestat, pageViewReportingUrl */
/*jslint browser: true, sloppy: true, white: true, plusplus: true, evil: true */

var IS24 = IS24 || {};
IS24.STATIC = IS24.STATIC || {};
IS24.isIE = /*@cc_on!@*/0;

IS24.STATIC.showSuperbannerPlaceHolder = function () {
	var bodyTag = jQuery('body');
		bodyTag.addClass('has-ad');
	return true;
};


IS24.STATIC.loadAsyncAdvertisement = function (placementID, sizeID, kvValues, randomID, groupID, destinationID) {
	var myWindow = jQuery(window);	
	var fullWidthBreakPoint = 1000;
	if(myWindow.width() > fullWidthBreakPoint) { 
		var targetDiv = jQuery('#' + destinationID),
			adsScript = '<script type="text/javascript" src="' + IS24.STATIC.getAdsUrl(placementID, sizeID, kvValues, randomID, groupID) + '" ></script>'
			+ '<script type="text/javascript">' + IS24.STATIC.showAdvertisementScript(placementID, destinationID) + '</script>';

		targetDiv = targetDiv.writeCapture();
		targetDiv.html(adsScript);
	}
	return false;
};

IS24.STATIC.getAdsUrl = function (placementID, sizeID, kvValues, randomID, groupID) {
	return 'http://ads.immobilienscout24.de/addyn/3.0/1072/'
		+ placementID
		+ '/0/' +
		sizeID
		+ '/ADTECH;loc=100;target=_blank;'
		+ kvValues
		+ 'grp=' + groupID + ';'
		+ 'misc=' + randomID + ';'
		+ 'asfunc=1';
};

IS24.STATIC.showAdvertisementScript = function (placementID, destinationID) {
	var functionCampaignIdCheck = "cu_" + placementID + "_getAdId",
		functionLoadBanner = "cu_" + placementID,
		superBannerscript = '';
	if (destinationID === 'is24-ad') {
		superBannerscript = 'IS24.STATIC.showSuperbannerPlaceHolder();';
	}

	return 'if(window.' + functionCampaignIdCheck + ') {'
		+ 'if(' + functionCampaignIdCheck + '() > 0) {'
		+ superBannerscript
		+ functionLoadBanner + '();}} else {'
		+ superBannerscript
		+ '}';
};
