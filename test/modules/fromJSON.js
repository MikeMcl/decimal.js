if (typeof T === 'undefined') require('../setup');

T('fromJSON', function () {

  Decimal.config({
    precision: Math.random() * 40 + 1 | 0,
    rounding: Math.random() * 9 | 0,
    toExpNeg: -7,
    toExpPos: 21,
    minE: -9e15,
    maxE: 9e15
  });

  var e, fromJ, i, r, toJ;
  var maxDigits = 100;

  for ( i = 0; i < 100000; ) {

    // Get a random value in the range [0,1) with a random number of significant digits
    // in the range [1, maxDigits], as a string in exponential format.
    e = Decimal.random( Math.random() * maxDigits + 1 | 0 ).toExponential();

    // Change exponent to a non-zero value of random length in the range (-9e15, 9e15).
    r = new Decimal(e.slice(0, e.indexOf('e') + 1) + ( Math.random() < 0.5 ? '-' : '' ) +
      ( n = Math.floor( Math.random() * 9e15 ) + '' ).slice( Math.random() * n.length | 0 ));
    //console.log(r.toString());

    toJ = r.toJSON();
    //console.log(' toJSON:   ' + toJ);

    fromJ = Decimal.fromJSON(toJ);
    //console.log(' fromJSON: ' + fromJ);

    /*
    if (!r.eq(fromJ)) {
      console.error(' r:        ' + r);
      console.error(' toJSON:   ' + toJ);
      console.error(' fromJSON: ' + fromJ);
    }
    */
    T.assert(r.eq(fromJ));
  }
});
