var count = (function powSqrt(Decimal) {
    var start = +new Date(),
        n, p, pr, r, rm, s, log, error,
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

    log('\n Testing pow(0.5) against sqrt()...');

    Decimal.config({
        toExpNeg: -7,
        toExpPos: 21,
        minE: -9e15,
        maxE: 9e15,
        errors: true
    });

    for ( ; total < 100000; ) {

        // Get a random value in the range [0,1) with a random number of significant digits in the range [1, 40].
        r = Decimal.random( 1, Math.random() * 40 + 1 | 0 );

        // Change its exponent to a non-zero value of random length in the range (-9e15, 9e15).
        r.e = +( ( Math.random() < 0.5 ? '-' : '' ) +
          ( n = Math.floor( Math.random() * 9e15 ) + '' ).slice( Math.random() * n.length | 0 ) );

        // Random rounding mode.
        Decimal.rounding = rm = Math.random() * 9 | 0;

        // Random precision in the range [1, 30].
        Decimal.precision = pr = Math.random() * 30 + 1 | 0;

        //log(' r:          ' + r);

        p = r.pow(0.5);

        // sqrt is much faster than pow(0.5)
        s = r.sqrt();

        //log(' r.pow(0.5): ' + p);
        //log(' r.sqrt():   ' + s);

        if ( !p.eq(s) ) {
            error('\n Test number: ' + total + ' failed');
            error(' r:             ' + r);
            error(' r.pow(0.5):    ' + p);
            error(' r.sqrt():      ' + s);
            error(' precision:     ' + pr);
            error(' rounding mode: ' + rm + '\n');
            process.exit();
        } else {
            passed++;
        }
        total++;

        if ( total % 1000 == 0 ) log(total);
    }

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.Decimal);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
