var de = de || {};
de.is24 = de.is24 || {};
de.is24.STATIC = de.is24.STATIC || {};
de.is24.STATIC.kartonrechner_sidebar = de.is24.STATIC.kartonrechner_sidebar || {};

de.is24.STATIC.kartonrechner_sidebar = (function ($) {
    "use strict";

    var MAX_INPUT_VALUE_LIVING_YEARS = 99,
        ERROR_TEXT_0_LIVING_YEARS = "1 - 99 Wohnjahre",
        ERROR_TEXT_0_METER_BOOKSHELF = "1 - 99 Meter",
        MAX_INPUT_VALUE = 12,
        ERROR_TEXT_MORE_ROOMS = "max. 12 Zimmer",
        ERROR_TEXT_0_ROOMS = "1 - 12 Zimmer",
        ERROR_TEXT_MORE_PEOPLE = "max. 12 Personen",
        ERROR_TEXT_0_PEOPLE = "1 - 12 Personen",
        SHOP_START_URL = "http://www.umzug.de/shop/shopware.php?sViewport=checkout&reqType=basketlink&sAction=addAccessories&swRed=Campaign/index/emotionId/14&sAddAccessories=HH1103&sAddAccessoriesQuantity=";

    function addDecimalSeparatorsToNumberString(result) {
        while (result.match(/^(\d+)(\d{3}\b)/)) {
            result = result.replace(/^(\d+)(\d{3}\b)/, RegExp.$1 + '.' + RegExp.$2);
        }
        return result;
    }

    function calculateBoxes() {
        var people =  parseInt($('#people').val(), 10),
            rooms = parseInt($('#rooms').val(), 10),
            living_years =  parseInt($('#living-years').val(), 10),
            num_boxes = ((people * 4) + (rooms * 14.7) + (rooms * living_years * 0.6)).toFixed(0);
        if ($('.error').length > 0) {
            return null;
        }
        $('.no-calculate').fadeOut(1000);
        $('#boxes').text(addDecimalSeparatorsToNumberString(num_boxes));
        $('#to-removal-shop a').attr("href", SHOP_START_URL + num_boxes);
    }


    function setErrorMessages($this) {
        var $no_calculate = $this.prev().prev(),
            $no_calculate_spez_error = $no_calculate.find('span');
        if ($this.is('#people')) {
            if ($this.val() < 1) {
                $no_calculate_spez_error.text(ERROR_TEXT_0_PEOPLE);
            } else {
                $no_calculate_spez_error.text(ERROR_TEXT_MORE_PEOPLE);
            }
        } else if ($this.is('#rooms')) {
            if ($this.val() < 1) {
                $no_calculate_spez_error.text(ERROR_TEXT_0_ROOMS);
            } else {
                $no_calculate_spez_error.text(ERROR_TEXT_MORE_ROOMS);
            }
        } else {
            $no_calculate_spez_error.text(ERROR_TEXT_0_LIVING_YEARS);
        }
        $no_calculate.fadeIn(1000);
    }

    function setError($this) {
        $this.addClass("error").prev().addClass("error");
        $('#boxes').text("0");
        setErrorMessages($this);
    }

    function inputValidate($this) {
        var input_value = $this.val();
        if (input_value.match(/\D/) ||  input_value == "0") {
            setError($this);
        } else if (input_value.length < 1 && !($this.is(":focus"))) {
            setError($this);
        } else if ($this.attr("id") !== "living-years" && (parseInt(input_value, 10) > MAX_INPUT_VALUE)){
            setError($this);
        } else {
            $this.removeClass("error").prev().removeClass("error").prev().fadeOut(1000);
            if ($('.error').length > 0) {
                $('input.error').each(function() {
                    setErrorMessages($(this));
                });
                return null;
            }
            if ((input_value.length > 0)) {
                calculateBoxes();
            } else {
                $('#boxes').text("0");
            }

        }
    }

    function initTextInputs() {
        $('#living-years').bind("keyup change", function () {
            inputValidate($(this));
        });
        $('#people').bind("keyup change", function () {
            inputValidate($(this));
        });
        $('#rooms').bind("keyup change", function () {
            inputValidate($(this));
        });
    }

    function init() {
        $('.no-calculate').hide();
        initTextInputs();
        calculateBoxes();
    }

    return {
        init: function () {
            return init();
        }
    };
})(jQuery);
jQuery(document).ready(function () {
    "use strict";
    de.is24.STATIC.kartonrechner_sidebar.init();
});

