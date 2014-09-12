var de = de || {};
de.is24 = de.is24 || {};
de.is24.STATIC = de.is24.STATIC || {};
de.is24.STATIC.umzugskostenrechner = de.is24.STATIC.umzugskostenrechner || {};

de.is24.STATIC.umzugskostenrechner = (function ($) {
    "use strict";

    var MAX_INPUT_VALUE = 12,
        ERROR_TEXT_MORE_ROOMS = "max. 12 Zimmer",
        ERROR_TEXT_0_ROOMS = "1 - 12 Zimmer",
        ERROR_TEXT_MORE_PEOPLE = "max. 12 Personen",
        ERROR_TEXT_0_PEOPLE = "1 - 12 Personen";

    function addDecimalSeparatorsToNumberString(result) {
        while (result.match(/^(\d+)(\d{3}\b)/)) {
            result = result.replace(/^(\d+)(\d{3}\b)/, RegExp.$1 + '.' + RegExp.$2);
        }
        return result;
    }

    function removeSpaceAndDotAndCommaFromText(text) {
        return text.toString().replace(/\s/g, "").replace(/\./g, "").replace(/\,/g, "");
    }

    function calculateRemovalCompanyCosts() {
        var square_meter = parseInt($('#square-meter-value').text(), 10),
            distance = parseInt(removeSpaceAndDotAndCommaFromText($('#distance-value').text()), 10),
            people = parseInt($('#people').val(), 10),
            rooms =  parseInt($('#rooms').val(), 10),
            number_boxes = (people * 4) + (rooms * 14.7) + (people * 0.6),
            cbm = ((rooms * 9 + 12) * 0.4) + ((square_meter / 2) * 0.6) + (number_boxes * 0.06),
            price = (cbm * 25) + (distance * 0.8) + ((3 * (2 * cbm)) + (cbm * 2));
        if ($('.error').length > 0) {
            return null;
        }
        $('#no-price-calculate').hide();
        $('#price span#price-result').text(addDecimalSeparatorsToNumberString(price.toFixed(0)));
    }

    function setError($this) {
        var $no_price_calculate = $('#no-price-calculate'),
            $no_price_calculate_spez_error = $no_price_calculate.find('span');
        $this.addClass("error").next().addClass("error");
        $('#price span').text("0");
        if ($this.is('#people')) {
            if ($this.val() < 1) {
                $no_price_calculate_spez_error.text(ERROR_TEXT_0_PEOPLE);
            } else {
                $no_price_calculate_spez_error.text(ERROR_TEXT_MORE_PEOPLE);
            }
        } else {
            if ($this.val() < 1) {
                $no_price_calculate_spez_error.text(ERROR_TEXT_0_ROOMS);
            } else {
                $no_price_calculate_spez_error.text(ERROR_TEXT_MORE_ROOMS);
            }
        }
        $no_price_calculate.show();
    }

    function inputValidate($this) {
        var input_value = $this.val();
        if (input_value.match(/\D/) || (parseInt(input_value, 10) > MAX_INPUT_VALUE) || input_value.length < 1 || input_value == "0") {
            setError($this);
        } else {
            $this.removeClass("error").next().removeClass("error");
            if ($('.error').length > 0) {
                return null;
            }
            calculateRemovalCompanyCosts();
        }
    }

    function initTextInputs() {
        $('#people').keyup(function () {
            inputValidate($(this));
        });
        $('#rooms').keyup(function () {
            inputValidate($(this));
        });
    }

    function initSelecter() {
        var $selecter_holder = $('.selecter-holder');
        $selecter_holder.each(function() {
            var $this = $(this),
                $selecter_hidden_value_input = $('.selecter-value', $this),
                $selecter = $('.selecter', $this),
                $select_options = $('.select-options', $this),
                current_value = $selecter_hidden_value_input.val(),
                $current_option = $select_options.find('p[data-options-value="' + current_value + '"]');
            $selecter.text($current_option.text());
            $current_option.addClass("selected");
            $selecter.click(function() {
                $('.selecter.open').each(function() {
                    $(this).removeClass("open").next().fadeOut("fast");
                });
                $(this).toggleClass("open").next().fadeToggle("fast");
            });
            $('p', $select_options).click(function() {
                var $this = $(this),
                    $this_all_options = $this.siblings(),
                    $this_selecter_hidden_value_input = $($this.parent().parent().find('.selecter-value')),
                    $this_select_options = $($this.parent()),
                    $this_selecter = $($this_select_options.prev());
                $this_all_options.removeClass("selected");
                $this.addClass("selected");
                $this_selecter_hidden_value_input.val($this.attr("data-options-value")).trigger("change");
                $this_selecter.removeClass("open").text($this.text());
                $this_select_options.fadeToggle("fast");
            });

            $selecter_holder.mouseleave(function() {
                $(this).find('.selecter').removeClass("open").next().fadeOut("fast");
            });
        });
    }

    function initSliders() {
        var square_meter_slider = initSlider("#square_meter_slider", 10, 200, 50, "#square-meter-value", 10),
            distance_slider = initSlider("#distance_slider", 5, 1000, 50, "#distance-value", 5);
        square_meter_slider.changeHandler = function () {
            calculateRemovalCompanyCosts();
        };
        distance_slider.changeHandler = function () {
            calculateRemovalCompanyCosts();
        };
    }

    function init() {
        $('#no-price-calculate').hide();
        initSliders();
        initTextInputs();
        initSelecter();
        calculateRemovalCompanyCosts();
    }

    return {
        init: function () {
            return init();
        }
    };
})(jQuery);
/*funktioniert leider nicht immer bei ready*/
jQuery(window).load(function () {
    "use strict";
    de.is24.STATIC.umzugskostenrechner.init();
});

