var count = (function dpSd(Decimal) {
    var start = +new Date(),
        log,
        error,
        undefined,
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

    function T(value, dp, sd, zs) {
        assert(dp, new Decimal(value).dp());
        assert(sd, new Decimal(value).sd(zs));
        //assert(dp, new Decimal(value).decimalPlaces());
        //assert(sd, new Decimal(value).precision(zs));
    }

    log('\n Testing decimalPlaces and precision...');

    Decimal.config({
        precision: 20,
        rounding: 4,
        toExpNeg: -7,
        toExpPos: 21,
        minE: -9e15,
        maxE: 9e15,
        errors: true
    });

    T(0, 0, 1);
    T(-0, 0, 1);
    T(NaN, null, null);
    T(Infinity, null, null);
    T(-Infinity, null, null);
    T(1, 0, 1);
    T(-1, 0, 1);

    T(100, 0, 1);
    T(100, 0, 1, 0);
    T(100, 0, 1, false);
    T(100, 0, 3, 1);
    T(100, 0, 3, true);

    T('0.0012345689', 10, 8);
    T('0.0012345689', 10, 8, 0);
    T('0.0012345689', 10, 8, false);
    T('0.0012345689', 10, 8, 1);
    T('0.0012345689', 10, 8, true);

    T('987654321000000.0012345689000001', 16, 31, 0);
    T('987654321000000.0012345689000001', 16, 31, 1);

    T('1e+123', 0, 1);
    T('1e+123', 0, 124, 1);

    T('1e-123', 123, 1);
    T('1e-123', 123, 1);
    T('1e-123', 123, 1, 1);

    T('9.9999e+9000000000000000', 0, 5, false);
    T('9.9999e+9000000000000000', 0, 9000000000000001, true);
    T('-9.9999e+9000000000000000', 0, 5, false);
    T('-9.9999e+9000000000000000', 0, 9000000000000001, true);

    T('1e-9000000000000000', 9e15, 1, false);
    T('1e-9000000000000000', 9e15, 1, true);
    T('-1e-9000000000000000', 9e15, 1, false);
    T('-1e-9000000000000000', 9e15, 1, true);

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.Decimal);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
