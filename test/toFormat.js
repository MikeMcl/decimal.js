var count = (function toFormat(Decimal) {
    var start = +new Date(),
        log,
        error,
        u,
        passed = 0,
        total = 0;

    if (typeof window === 'undefined') {
        log = console.log;
        error = console.error;
    } else {
        log = function (str) { document.body.innerHTML += str.replace('\n', '<br>') };
        error = function (str) { document.body.innerHTML += '<div style="color: red">' +
          str.replace('\n', '<br>') + '</div>' };
    }

    if (!Decimal && typeof require === 'function') Decimal = require('../decimal');

    function assert(expected, actual) {
        total++;
        if (expected !== actual) {
           error('\n Test number: ' + total + ' failed');
           error(' Expected: ' + expected);
           error(' Actual:   ' + actual);
           //process.exit();
        } else {
            passed++;
            //log('\n Expected and actual: ' + actual);
        }
    }

    function assertException(func, message) {
        var actual;
        total++;
        try {
            func();
        } catch (e) {
            actual = e;
        }
        if (actual && actual.name == 'Decimal Error') {
            passed++;
            //log('\n Expected and actual: ' + actual);
        } else {
            error('\n Test number: ' + total + ' failed');
            error('\n Expected: ' + message + ' to raise a Decimal Error.');
            error(' Actual:   ' + (actual || 'no exception'));
            //process.exit();
        }
    }

    function T(expected, value, sep1, dp, sep2){
        assert(String(expected), new Decimal(value).toFormat(sep1, dp, sep2));
    }

    log('\n Testing toFormat...');

    Decimal.config({
        precision: 20,
        rounding: 4,
        toExpNeg: -9e15,
        toExpPos: 9e15,
        minE: -9e15,
        maxE: 9e15,
        errors: true
    });

    T(0, 0);
    T(1, 1);
    T(-1, -1);
    T(123.456, 123.456);
    T(NaN, NaN);
    T(Infinity, 1/0);
    T(-Infinity, -1/0);

    T(0, 0, ' ');
    T(1, 1, ' ');
    T(-1, -1, ' ');
    T(123.456, 123.456, ' ');
    T(NaN, NaN, ' ');
    T(Infinity, 1/0, ' ');
    T(-Infinity, -1/0, ' ');

    T('0.0', 0, ' ', 1);
    T('1.00', 1, ' ', 2);
    T('-1.000', -1, ' ', 3);
    T('123.4560', 123.456, ' ', 4);
    T(NaN, NaN, ' ', 5);
    T(Infinity, 1/0, ' ', 6);
    T(-Infinity, -1/0, ' ', 7);

    T('9,876.54321', 9876.54321);
    T('4,018,736,400,000,000,000,000', '4.0187364e+21');

    T('999,999,999,999,999', 999999999999999);
    T('99,999,999,999,999',  99999999999999);
    T('9,999,999,999,999',   9999999999999);
    T('999,999,999,999',     999999999999);
    T('99,999,999,999',      99999999999);
    T('9,999,999,999',       9999999999);
    T('999,999,999',         999999999);
    T('99,999,999',          99999999);
    T('9,999,999',           9999999);
    T('999,999',             999999);
    T('99,999',              99999);
    T('9,999',               9999);
    T('999',                 999);
    T('99',                  99);
    T('9',                   9);

    T('999 999 999 999 999',  999999999999999, ' ', 0, ' ');
    T('99 999 999 999 999.0', 99999999999999, ' ', 1, ' ');
    T('9 999 999 999 999.00', 9999999999999, ' ', 2, ' ');
    T('999 999 999 999.000',  999999999999, ' ', 3, ' ');
    T('99 999 999 999.0000',  99999999999, ' ', 4, ' ');
    T('9 999 999 999.00000',  9999999999, ' ', 5, ' ');
    T('999 999 999.00000 0',  999999999, ' ', 6, ' ');
    T('99 999 999.00000 00',  99999999, ' ', 7, ' ');
    T('9 999 999.00000 000',  9999999, ' ', 8, ' ');
    T('999 999.00000 0000',   999999, ' ', 9, ' ');
    T('99 999.00000 00000',   99999, ' ', 10, ' ');
    T('9 999.00000 00000 0',  9999, ' ', 11, ' ');
    T('999.00000 00000 00',   999, ' ', 12, ' ');
    T('99.00000 00000 000',   99, ' ', 13, ' ');
    T('9.00000 00000 0000',   9, ' ', 14, ' ');

    T('1.00000 00000 00000', 1, ' ', 15, ' ');
    T('1.00000 00000 0000', 1, ' ', 14, ' ');
    T('1.00000 00000 000', 1, ' ', 13, ' ');
    T('1.00000 00000 00', 1, ' ', 12, ' ');
    T('1.00000 00000 0', 1, ' ', 11, ' ');
    T('1.00000 00000', 1, ' ', 10, ' ');
    T('1.00000 0000', 1, ' ', 9, ' ');

    T('76,852.342091', '7.6852342091e+4');
    T('4 018 736 400 000 000 000 000', '4.0187364e+21', ' ');
    T('76 852.342091', '7.6852342091e+4', ' ');
    T('76 852.34', '7.6852342091e+4', ' ', 2);

    T('76 852.34209 10871 45832 64089', '7.685234209108714583264089e+4', ' ', 20, ' ');
    T('76 852.34209 10871 45832 64089 7', '7.6852342091087145832640897e+4', ' ', 21, ' ');
    T('76 852.34209 10871 45832 64089 70000', '7.6852342091087145832640897e+4', ' ', 25, ' ');
    T('76 852.34', '7.6852342091087145832640897e+4', ' ', 2, ' ');

    T('1,234,560,000.00000 00000 08', '1.23456000000000000000789e+9', ',', 12, ' ');
    T('1-234-560-000.00000-00000-0789', '1.23456000000000000000789e+9', '-', 14, '-');

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.Decimal);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
