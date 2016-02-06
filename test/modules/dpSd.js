if (typeof T === 'undefined') require('../setup');

T('decimalPlaces and precision', function () {

  function t(n, dp, sd, zs) {
    T.assertEqual(dp, new Decimal(n).dp());
    T.assertEqual(dp, new Decimal(n).decimalPlaces());
    T.assertEqual(sd, new Decimal(n).sd(zs));
    T.assertEqual(sd, new Decimal(n).precision(zs));
  }

  function tx(fn, msg) {
    T.assertException(fn, msg);
  }

  Decimal.config({
    precision: 20,
    rounding: 4,
    toExpNeg: -7,
    toExpPos: 21,
    minE: -9e15,
    maxE: 9e15
  });

  t(0, 0, 1);
  t(-0, 0, 1);
  t(NaN, NaN, NaN);
  t(Infinity, NaN, NaN);
  t(-Infinity, NaN, NaN);
  t(1, 0, 1);
  t(-1, 0, 1);

  t(100, 0, 1);
  t(100, 0, 1, 0);
  t(100, 0, 1, false);
  t(100, 0, 3, 1);
  t(100, 0, 3, true);

  t('0.0012345689', 10, 8);
  t('0.0012345689', 10, 8, 0);
  t('0.0012345689', 10, 8, false);
  t('0.0012345689', 10, 8, 1);
  t('0.0012345689', 10, 8, true);

  t('987654321000000.0012345689000001', 16, 31, 0);
  t('987654321000000.0012345689000001', 16, 31, 1);

  t('1e+123', 0, 1);
  t('1e+123', 0, 124, 1);
  t('1e-123', 123, 1);
  t('1e-123', 123, 1, 1);

  t('9.9999e+9000000000000000', 0, 5, false);
  t('9.9999e+9000000000000000', 0, 9000000000000001, true);
  t('-9.9999e+9000000000000000', 0, 5, false);
  t('-9.9999e+9000000000000000', 0, 9000000000000001, true);

  t('1e-9000000000000000', 9e15, 1, false);
  t('1e-9000000000000000', 9e15, 1, true);
  t('-1e-9000000000000000', 9e15, 1, false);
  t('-1e-9000000000000000', 9e15, 1, true);

  t('55325252050000000000000000000000.000000004534500000001', 21, 53);

  tx(function () {new Decimal(1).precision(null)}, "new Decimal(1).precision(null)");
  tx(function () {new Decimal(1).sd(null)}, "new Decimal(1).sd(null)");
  tx(function () {new Decimal(1).sd(2)}, "new Decimal(1).sd(2)");
  tx(function () {new Decimal(1).sd('3')}, "new Decimal(1).sd('3')");
  tx(function () {new Decimal(1).sd({})}, "new Decimal(1).sd({})");
});
