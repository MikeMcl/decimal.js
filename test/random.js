var count = (function random(Decimal) {
    var start = +new Date(),
        dp, error, i, j, k, log, m, r,
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
        Decimal = require('../decimal.js');
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

    log('\n Testing random...');

    Decimal.config({ errors: true, crypto: false });

    for ( i = 0; i < 9996; i++ ) {

        //Decimal.crypto = false;
        //Decimal.crypto = true;
        // 50% chance that Decimal.crypto is true.
        //Decimal.crypto = Math.random() > 0.5;

        if ( Math.random() > 0.5 ) {
            dp = Decimal.precision = Math.random() * 10 + 1 | 0;
            r = Decimal.random();
        } else {
            dp = Math.random() * 10 | 0;
            r = Decimal.random(dp);
        }

        //log(r.toString());

        if ( r.c[0] ) {
            j = r.c.length;
            k = r.c[j - 1];
            j *= 7;

            // Decrement for trailing zeros in last element of r.c.
            for ( ; k % 10 === 0; k /= 10, j-- );
        } else {
            j = 0;
        }

        // Check number of decimal places (j is actual dp).
        if ( j > dp ) {
            m = ' r.c.length - r.e - 1 > dp';

        // Check 0 <= r < 1
        } else if ( r.lt(0) || r.gte(1) ) {
            m = ' r.lt(0) || r.gte(1)';

        // Check that the attributes of r are formed correctly.
        } else if ( !r.eq( new Decimal(r) ) || !r.eq( new Decimal( r.toString() ) ) ) {
            m = ' !r.eq( new Decimal(r) ) || !r.eq( new Decimal( r.toString() ) )';
        }

        total++;

        if (m) {
            error('\n Test number: ' + total + ' failed');
            error(m);
            error(' r: ' + r);
            error(' r.c: ' + r.c);
            error(' r.e: ' + r.e);
            error(' r.s: ' + r.s);
            error(' dp: ' + dp);
            m = null;
        } else {
            passed++;
        }
    }

    assertException(function () { Decimal.random(Infinity) }, 'Infinity');
    assertException(function () { Decimal.random('-Infinity') }, "'-Infinity'");
    assertException(function () { Decimal.random(NaN) }, 'NaN');
    assertException(function () { Decimal.random('nanny') }, "'nanny'");

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.Decimal);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
