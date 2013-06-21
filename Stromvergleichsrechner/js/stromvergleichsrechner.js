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
        function initStromvergleichsrechner() {
            var slider = de.is24.slider.initSlider("#strom-vergleichs-rechner #verbrauchs-slider", 1, 8, 1, "#strom-vergleichs-rechner #personen-value", 1),
                $verbrauch = $('#strom-vergleichs-rechner input#verbrauch'),
                $zip = $('#strom-vergleichs-rechner input#zip'),
                $action_button = $('#strom-vergleichs-rechner .btn-action'),
                VERBRAUCHS_MAP = [0, 2000, 3500, 4250, 5000, 5750, 6500, 7250, 8000],
                STROM_ANBIETER_SUCHE_URL = "http://www.immobilienscout24.de/umzug/umzugsunternehmen/stromanbieter.html?";

            function  setVisualAndVerbrauchAndUrLParams() {
                var value = slider.value,
                    i = 0;
                $verbrauch.val(VERBRAUCHS_MAP[value] + " kWh");
                $action_button.attr("href", STROM_ANBIETER_SUCHE_URL + "zip=" + $zip.val() + "&usg=" + VERBRAUCHS_MAP[value])
                $('#strom-vergleichs-rechner .visual').removeClass("active");
                for (i; i <= value; i = i + 1 ) {
                    $('#strom-vergleichs-rechner #visual-' + i).addClass("active");
                }
            }
            function checkZipField() {
                if ($zip.val().length === 5) {
                    setVisualAndVerbrauchAndUrLParams();
                    $action_button.removeClass("dsbld");
                } else {
                    $action_button.addClass("dsbld");
                }
            }
            slider.changeHandler = function () {
                setVisualAndVerbrauchAndUrLParams();
            };
            $zip.bind("keyup change", function() {
                checkZipField();
            });

            $('#strom-vergleichs-rechner .visual').click(function() {
                    slider.setValue(parseInt($(this).attr("id").substring(7), 10));
                    setVisualAndVerbrauchAndUrLParams();
            });

            $verbrauch.keyup(function() {
                $action_button.attr("href", STROM_ANBIETER_SUCHE_URL + "zip=" + $zip.val() + "&usg=" + $(this).val());
            })
            $verbrauch.focus(function() {
                $(this).val("");
            })
            $action_button.click(function(e) {
                if ($zip.val().length < 5) {
                    e.preventDefault();
                }
            });
            checkZipField();
            setVisualAndVerbrauchAndUrLParams();
        }
        function init() {
            initStromvergleichsrechner();
        }
        $(document).ready(function () {
            init();
        });
    }(jQuery));