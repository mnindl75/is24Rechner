/*global window */
/*global document */
/*global $ */
/*global alert */
/*global google */
/*global jQuery */
var de = de || {};
de.is24 = de.is24 || {};
de.is24.newBiz = de.is24.newBiz || {};
de.is24.newBiz.gasVergleichsRechner = de.is24.newBiz.gasVergleichsRechner ||
    (function ($) {
        "use strict";
        function initGasVergleichsRechner() {
            var slider = de.is24.slider.initSlider("#gas-vergleichs-rechner #verbrauchs-slider", 1, 5, 1, null, 1),
                $verbrauch = $('#gas-vergleichs-rechner input#verbrauch'),
                $zip = $('#gas-vergleichs-rechner input#zip'),
                $action_button = $('#gas-vergleichs-rechner .btn-action'),
                VERBRAUCHS_MAP = [0, 3500, 5000, 12000, 20000, 35000],
                VERBRAUCHS_DECLARATION = ["", "bei einer 30m&sup2; Wohnung", "bei einer 50&sup2; Wohnung",
                    "bei einer 100&sup2; Wohnung", "bei einem Reihenhaus", "bei einem Einfamilienhaus"],
                GAS_ANBIETER_SUCHE_URL = "http://www.immobilienscout24.de/umzug/umzugsunternehmen/gasanbieter.html?";

            function  setVisualAndVerbrauchAndUrLParams() {
                var value = slider.value,
                    i = 0;
                $('#gas-vergleichs-rechner #verbrauchs-declaration').html(VERBRAUCHS_DECLARATION[value]);
                $verbrauch.val(VERBRAUCHS_MAP[value] + " kWh");
                $action_button.attr("href", GAS_ANBIETER_SUCHE_URL + "zip=" + $zip.val() + "&usg=" + VERBRAUCHS_MAP[value])
                $('#gas-vergleichs-rechner .visual').removeClass("active");
                for (i; i <= value; i = i + 1 ) {
                    $('#gas-vergleichs-rechner #visual-' + i).addClass("active");
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

            $('#gas-vergleichs-rechner .visual').click(function() {
                    slider.setValue(parseInt($(this).attr("id").substring(7), 10));
                    setVisualAndVerbrauchAndUrLParams();
            });

            $verbrauch.keyup(function() {
                $action_button.attr("href", GAS_ANBIETER_SUCHE_URL + "zip=" + $zip.val() + "&usg=" + $(this).val());
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
            initGasVergleichsRechner();
        }
        $(document).ready(function () {
            init();
        });
    }(jQuery));