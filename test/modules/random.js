if (typeof T === 'undefined') require('../setup');

(function () {
  T('random');

  function tx(fn, msg) {
    T.assertException(fn, msg);
  }

  var i, sd, maxDigits = 100;

  for (i = 0; i < 996; i++) {
    Decimal.crypto = Math.random() > 0.5;
    sd = Math.random() * maxDigits + 1 | 0;

    if (Math.random() > 0.5) {
      Decimal.precision = sd;
      r = Decimal.random();
    } else {
      r = Decimal.random(sd);
    }

    T.assert(r.sd() <= sd && r.gte(0) && r.lt(1) && r.eq(r) && r.eq(r.valueOf()));
  }

  tx(function () { Decimal.random(Infinity) }, 'Infinity');
  tx(function () { Decimal.random('-Infinity') }, "'-Infinity'");
  tx(function () { Decimal.random(NaN) }, 'NaN');
  tx(function () { Decimal.random(null) }, 'null');

  T.stop();
})();
