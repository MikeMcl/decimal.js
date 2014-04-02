var count = (function random(Decimal) {
    var start = +new Date(),
        error, i, j, limit, log, pr, u,
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

    if (!Decimal && typeof require === 'function') {
        Decimal = require('../decimal');
    }

    function assert(result, r, message) {
        total++;
        if (result === true) {
            passed++;
            //log('\n r: ' + r);
        } else {
           error('\n Test number: ' + total + ' failed');
           error(' r: ' + r);
           error(' ' + message);
           //process.exit();
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

    function T(limit, pr){
        var i, r, d;

        if ( !limit ) {
            limit = new Decimal(1);
            pr = Decimal.precision;
        }

        for ( i = 0; i < 17; i++ ) {
            r = Decimal.random(limit, pr);
            //log(r.toString());
            d = r.c.length;

            if ( pr == null ) {
                d = Math.max(d, r.e + 1) - r.e - 1;
                assert(d === 0, r, 'dp is not 0: ' + d);
            } else {
                assert(d <= pr, r, 'sd: ' + d + ' > pr: ' + pr);
            }

            assert(r.gte(0), r, 'r < 0');
            assert(r.lt(limit), r, 'r >= limit: ' + limit);
        }
    }

    log('\n Testing random...');

    // First iteration crypto: false, second iteration crypto: true.
    Decimal.config({ crypto: false, errors: true });

    for ( i = 0; i < 2; i++ ) {
        //log( '\n crypto: ' + Decimal.crypto );

        Decimal.precision = Math.random() * 100 + 1 | 0;
        //log( Decimal.precision );

        for ( j = 0; j < 10; j++ ) {

            T();
            T(u);
            T(null);
            T(1);
            T(1, u);
            T(1, null);
            T(10);
            T(1000);

            // limit will have 1 - 17 integer digits and 1 - 17 fraction digits.
            limit = +(Math.random() + '').slice(2, Math.random() * 17 + 3 | 0) +
                     (Math.random() + '').slice(1, Math.random() * 17 + 3 | 0);

            if ( +limit == 0 ) {
                limit = 1;
            }

            //log(' limit: ' + limit);

            T(limit);

            // Precision. Integer 1 - 80.
            pr = Math.random() * 80 + 1 | 0;

            //log(' pr: ' + pr);

            T(limit, pr);
        }

        Decimal.config({ crypto: true });
    }

    assertException(function () { Decimal.random(Infinity) }, 'Infinity');
    assertException(function () { Decimal.random('-Infinity') }, "'-Infinity'");
    assertException(function () { Decimal.random(NaN) }, 'NaN');
    assertException(function () { Decimal.random('nanny') }, "'nanny'");

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.Decimal);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
