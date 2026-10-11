if (typeof T === 'undefined') require('../setup');

T('random', function () {
  var i, sd, maxDigits;

  function tx(fn, msg) {
    T.assertException(fn, msg);
  }

  maxDigits = 100;

  for (i = 0; i < 996; i++) {
    sd = Math.random() * maxDigits + 1 | 0;

    if (Math.random() > 0.5) {
      Decimal.precision = sd;
      r = Decimal.random();
    } else {
      r = Decimal.random(sd);
    }

    T.assert(r.sd() <= sd && r.gte(0) && r.lt(1) && r.eq(r) && r.eq(r.valueOf()));
  }

  // Web Crypto limits each getRandomValues call to 65536 bytes.
  if (typeof crypto != 'undefined' && crypto && crypto.getRandomValues) {
    var CryptoDecimal = Decimal.clone({ crypto: true, precision: 114689 }),
      sizes = [114681, 114688, 114689, 114695, 229376, 229377];

    for (i = 0; i < sizes.length; i++) {
      sd = sizes[i];
      r = CryptoDecimal.random(sd);
      T.assert(r.dp() <= sd && r.gte(0) && r.lt(1));
    }

    r = CryptoDecimal.random();
    T.assert(r.dp() <= CryptoDecimal.precision && r.gte(0) && r.lt(1));
  }

  tx(function () { Decimal.random(Infinity) }, 'Infinity');
  tx(function () { Decimal.random('-Infinity') }, "'-Infinity'");
  tx(function () { Decimal.random(NaN) }, 'NaN');
  tx(function () { Decimal.random(null) }, 'null');
});
