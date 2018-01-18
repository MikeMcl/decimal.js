if (typeof T === 'undefined') require('../setup');

T('nthRoot', function () {

  function t(expected, root, n, sd, rm) {
    Decimal.precision = sd;
    Decimal.rounding = rm;
    T.assertEqual(expected, new Decimal(n).nthRoot(new Decimal(root)).valueOf());
  }

  Decimal.config({
    precision: 20,
    rounding: 4,
    toExpNeg: -9e15,
    toExpPos: 9e15,
    minE: -9e15,
    maxE: 9e15
  });

  for (var root = 3; root < 10; root++){
    for (var i = 0; i < 500; i++) {
      var j = Math.floor(Math.random() * Math.pow(2, Math.floor(Math.random() * 26) + 1));
      j = Math.pow(j, root);
      t(Math.pow(j, 1/root).toString(), root, j.toString(), 20, 4);
    }
  }

});
