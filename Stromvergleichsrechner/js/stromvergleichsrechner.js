/*global window */
/*global document */
/*global $ */
/*global alert */
/*global google */
/*global jQuery */
var de = de || {};
de.is24 = de.is24 || {};
de.is24.newBiz = de.is24.newBiz || {};
de.is24.newBiz.stromVergleichsRechner = de.is24.newBiz.stromVergleichsRechner ||
    (function ($) {
        "use strict";

        function initSlider() {
            var slider = de.is24.slider.initSlider("#verbrauchs-slider", 1, 8, 1, "#personen-value", 1),
                $verbrauch = $('input#verbrauch');

            function  setVisualAndHiddenInput() {
                var value = slider.value,
                    i = 0;
                $verbrauch.val(value);
                $('.helper-visual').removeClass("active");
                for (i; i <= value; i = i + 1 ) {
                    $('#helper-visual-' + i).addClass("active");
                }
            }
            slider.changeHandler = function () {
                setVisualAndHiddenInput();
            };
            setVisualAndHiddenInput();
        }



        function init() {
            initSlider();
        }

        $(document).ready(function () {
            init();
        });

    }(jQuery));