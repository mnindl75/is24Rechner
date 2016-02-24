var de = de || {};
de.is24 = de.is24 || {};
de.is24.STATIC = de.is24.STATIC || {};
de.is24.STATIC.umzugskostenrechner = de.is24.STATIC.umzugskostenrechner || {};

de.is24.STATIC.umzugskostenrechner = (function ($) {
    "use strict";

    function addDecimalSeparatorsToNumberString(result) {
        while (result.match(/^(\d+)(\d{3}\b)/)) {
            result = result.replace(/^(\d+)(\d{3}\b)/, RegExp.$1 + '.' + RegExp.$2);
        }
        return result;
    }

    function removeSpaceAndDotAndCommaFromText(text) {
        return text.toString().replace(/\s/g, "").replace(/\./g, "").replace(/\,/g, "");
    }

    function changeRemovalCompaniesLinkParams(square_meter, people, rooms) {
        var button = $('#result .button-primary'),
            $button_link = button.attr("data-original-href");
        $button_link = $button_link + "&qm=" + square_meter + "&zimmer=" + rooms + "&personen=" + people;
        button.attr("href", $button_link);
    }

    function calculateRemovalCompanyCosts() {
        var square_meter = parseInt($('#square-meter-value').text(), 10),
            distance = parseInt(removeSpaceAndDotAndCommaFromText($('#distance-value').text()), 10),
            people = parseInt($('#people').val(), 10),
            rooms =  parseInt($('#rooms').val(), 10),
            number_boxes = (people * 4) + (rooms * 14.7) + (people * 0.6),
            cbm = ((rooms * 9 + 12) * 0.4) + ((square_meter / 2) * 0.6) + (number_boxes * 0.06),
            price = (cbm * 25) + (distance * 0.8) + ((3 * (2 * cbm)) + (cbm * 2));
        price = Math.round(price / 25)*25;
        $('#price span#price-result').text(addDecimalSeparatorsToNumberString(price.toFixed(0)));
        changeRemovalCompaniesLinkParams(square_meter, people, rooms);
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
                calculateRemovalCompanyCosts();
                if (isTeliumActivated()) {
                    IS24.TEALIUM.tracking.report({evt_event: "umz_calculate", ns_type: "hidden"});
                }
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

    function initMoehrmannStyle() {
        $('.magic-border-nomobile').css("overflow", "visible");
    }

    function initSliderTracking() {
        var using = false;
        $('#removalcost-calculator .slider-thumb').mousedown(function() {
            using = true;
        })
        $('#removalcost-calculator .slider-thumb').mouseup(function() {
            if (using && isTeliumActivated()) {
                IS24.TEALIUM.tracking.report({evt_event: "umz_calculate", ns_type: "hidden"});
            }
            using = false;
        })
    }

    function isTeliumActivated() {
        return typeof ( window.IS24 && IS24.TEALIUM && IS24.TEALIUM.tracking && IS24.TEALIUM.tracking.report ) !== 'undefined';
    }

    function init() {
        initMoehrmannStyle();
        initSliders();
        initSelecter();
        setTimeout(function() {
            initSliderTracking();
        }, 1000);
        calculateRemovalCompanyCosts();
    }

    return {
        init: function () {
            return init();
        }
    };
})(jQuery);
jQuery(function () {
    "use strict";
    de.is24.STATIC.umzugskostenrechner.init();
});
