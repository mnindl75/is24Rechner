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
            $('#purchasePrice_slider').slider();
            $('#ownFunds_slider').slider(slider_opt_own_funds);
           /* $('#purchasePrice_slider').slider("value", current_purchase_price_for_slider);*/
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