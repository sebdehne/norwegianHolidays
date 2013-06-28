/**
 * Simple module which calculates all norwegian holidays.
 *
 * If possible, it exports as an AMD module. Otherwise adds 'norwegianHolidays' to 'this' (typical global scope).
 *
 * This module has the following methods:
 *
 * genHolidaysForYear(year) - Creates and returns an array of date objects, each of them representing a valid holiday
 * isHoliDay(date)          - Returns true if the provided date object is a holiday, otherwise false
 * isWeekendDay(date)       - Returns true if the provided date object is a weekend day
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.norwegianHolidays = factory();
    }
}(this, function () {
    'use strict';

    function getHolidaysFor(year) {

        function add(base, days) {
            var tmp = new Date(base.getTime());
            tmp.setDate(tmp.getDate() + days);
            return tmp;
        }

        var easter = calEasterDateForYear(year);
        var holidays = [];

        // 1.1 nyttårsdag
        holidays.push(new Date(year, 0, 1));

        // Palmesøndag (7 days before)
        holidays.push(add(easter, -7));

        // Skjærtorsdag (
        holidays.push(add(easter, -3));

        // Langfredag (
        holidays.push(add(easter, -2));

        // 1. påskedag
        holidays.push(easter);

        // 2. påskedag
        holidays.push(add(easter, 1));

        // 1.5 Offentlig høytidsdag
        holidays.push(new Date(year, 4, 1));

        // Kristi Himmelfartsdag
        holidays.push(add(easter, 39));

        // 17.5 Offentlig høytidsdag
        holidays.push(new Date(year, 4, 17));

        // 1. pinsedag sønndag
        holidays.push(add(easter, 49));

        // 2. pinsedag mandag
        holidays.push(add(easter, 50));

        // jul
        holidays.push(new Date(year, 11, 25));
        holidays.push(new Date(year, 11, 26));

        return holidays;
    }

    // source: http://coderzone.org/library/Get-Easter-Date-for-any-year-in-Javascript_1059.htm
    function calEasterDateForYear(Y) {
        var C = Math.floor(Y / 100);
        var N = Y - 19 * Math.floor(Y / 19);
        var K = Math.floor((C - 17) / 25);
        var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
        I = I - 30 * Math.floor((I / 30));
        I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
        var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
        J = J - 7 * Math.floor(J / 7);
        var L = I - J;
        var M = 3 + Math.floor((L + 40) / 44);
        var D = L + 28 - 31 * Math.floor(M / 4);

        return new Date(Y, M - 1, D);
    }


    return {

        /**
         * Creates and returns an array of date objects, each of them representing a valid holiday
         *
         * @param year number representing a year
         */
        genHolidaysForYear: getHolidaysFor,

        /**
         * Checks whether a provided date object is a holiday
         *
         * @param date
         * @returns {boolean}
         */
        isHoliDay: function (date) {

            var found = false;
            var holidays = getHolidaysFor(date.getFullYear());
            for (var i = 0; i < holidays.length; i++) {
                var holiday = holidays[i];
                if (date.getFullYear() === holiday.getFullYear()
                    && date.getMonth() === holiday.getMonth()
                    && date.getDate() === holiday.getDate()) {
                    found = true;
                }
            }

            return found;

        },

        /**
         * Checks whether a provided date object is a weekend day
         *
         * @param date
         * @returns {boolean}
         */
        isWeekendDay: function (date) {
            return date.getDay() === 0 || date.getDay() === 6;
        }
    };

}));
