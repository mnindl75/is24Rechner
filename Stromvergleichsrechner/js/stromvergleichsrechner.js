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
            var slider = de.is24.slider.initSlider("#strom-vergleichs-rechner #verbrauchs-slider", 1, 8, 1, "#strom-vergleichs-rechner #personen-value", 1),
                $verbrauch = $('#strom-vergleichs-rechner input#verbrauch'),
                VERBRAUCHS_MAP = [0, 2000, 3500, 4250, 5000, 5750, 6500, 7250, 8000],
                STROM_ANBIETER_SUCHE_URL = "http://www.immobilienscout24.de/umzug/umzugsunternehmen/stromanbieter.html?"

            function  setVisualAndVerbrauchAndUrLParams() {
                var value = slider.value,
                    i = 0;
                $verbrauch.val(VERBRAUCHS_MAP[value] + " kWh");
                $('#strom-vergleichs-rechner .btn-action')
                    .attr("href", STROM_ANBIETER_SUCHE_URL + "zip=" + $('#zip').val() + "&usg=" + VERBRAUCHS_MAP[value])
                $('#strom-vergleichs-rechner .visual').removeClass("active");
                for (i; i <= value; i = i + 1 ) {
                    $('#strom-vergleichs-rechner #visual-' + i).addClass("active");
                }
            }
            slider.changeHandler = function () {
                setVisualAndVerbrauchAndUrLParams();
            };
            $('#zip').change(function() {
                setVisualAndVerbrauchAndUrLParams();
            })
            setVisualAndVerbrauchAndUrLParams();
        }



        function init() {
            initSlider();
        }

        $(document).ready(function () {
            init();
        });

    }(jQuery));