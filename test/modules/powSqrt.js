if (typeof T === 'undefined') require('../setup');

T('pow against sqrt', function () {

  Decimal.config({
    toExpNeg: -7,
    toExpPos: 21,
    minE: -9e15,
    maxE: 9e15
  });

  for (var e, n, p, r, s; total < 10000; ) {

    // Get a random value in the range [0,1) with a random number of significant digits
    // in the range [1, 40], as a string in exponential format.
    e = Decimal.random( Math.random() * 40 + 1 | 0 ).toExponential();

    // Change exponent to a non-zero value of random length in the range (-9e15, 9e15).
    r = new Decimal(e.slice(0, e.indexOf('e') + 1) + ( Math.random() < 0.5 ? '-' : '' ) +
      ( n = Math.floor( Math.random() * 9e15 ) + '' ).slice( Math.random() * n.length | 0 ));
    //console.log(' r:          ' + r);

    // Random rounding mode.
    Decimal.rounding = Math.random() * 9 | 0;

    // Random precision in the range [1, 40].
    Decimal.precision = Math.random() * 40 + 1 | 0;

    p = r.pow(0.5);
    //console.log(' r.pow(0.5): ' + p);

    // sqrt is much faster than pow(0.5)
    s = r.sqrt();
    //console.log(' r.sqrt():   ' + s);

    T.assertEqual(p.valueOf(), s.valueOf());
  }
});

