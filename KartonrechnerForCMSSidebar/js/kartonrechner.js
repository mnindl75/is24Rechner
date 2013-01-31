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

    function removeSpaceAndDotAndCommaFromText(text) {
        return text.toString().replace(/\s/g, "").replace(/\./g, "").replace(/\,/g, "");
    }

    function calculateBoxes() {
        var people =  parseInt($('#people-value').text(), 10),
            rooms = parseInt($('#rooms-value').text(), 10),
            living_years =  parseInt($('#living-years').val(), 10),
            meter_bookshelf =  parseInt($('#meter-bookshelf').val(), 10),
            num_boxes = ((people * 4) + (rooms * 14.7) + (rooms * living_years * 0.6)).toFixed(0),
            num_book_boxes = (meter_bookshelf / 2).toFixed(0);
        if ($('.error').length > 0) {
            return null;
        }
        $('#no-calculate').hide();
        $('#boxes').text(addDecimalSeparatorsToNumberString(num_boxes));
        $('#book-boxes').text(addDecimalSeparatorsToNumberString(num_book_boxes));
        $('.btn-action').attr("href", SHOP_START_URL + num_boxes + ";" + num_book_boxes);
    }

    function setError($this) {
        var $no_calculate = $('#no-calculate'),
            $no_calculate_spez_error = $no_calculate.find('span');
        $this.addClass("error").next().addClass("error");
        $('#boxes').text("0");
        if ($this.is('#living-years')) {
            $no_calculate_spez_error.text(ERROR_TEXT_0_LIVING_YEARS);
        } else {
            $no_calculate_spez_error.text(ERROR_TEXT_0_METER_BOOKSHELF);
        }
        $no_calculate.show();
    }

    function inputValidate($this) {
        var input_value = $this.val();
        if (input_value.match(/\D/) || input_value.length < 1 || input_value == "0") {
            setError($this);
        } else if ($this.not("living-years") && (parseInt(input_value, 10) > MAX_INPUT_VALUE)){
            setError($this);
        } else {
            $this.removeClass("error").next().removeClass("error");
            if ($('.error').length > 0) {
                return null;
            }
            calculateBoxes();
        }
    }

    function initTextInputs() {
        $('#living-years').keyup(function () {
            inputValidate($(this));
        });
        $('#people').keyup(function () {
            inputValidate($(this));
        });
        $('#rooms').keyup(function () {
            inputValidate($(this));
        });
    }

    function init() {
        $('#no-calculate').hide();
        initTextInputs();
        calculateBoxes();
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

