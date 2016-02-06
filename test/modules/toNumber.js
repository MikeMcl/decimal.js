if (typeof T === 'undefined') require('../setup');

T('toNumber', function () {

  Decimal.config({
    precision: 20,
    rounding: 4,
    toExpNeg: -7,
    toExpPos: 21,
    minE: -9e15,
    maxE: 9e15
  });

  // Positive zero
  var t = function (n) {
    T.assert(1 / new Decimal(n).toNumber() === Infinity);
  }

  t('0');
  t('0.0');
  t('0.000000000000');
  t('0e+0');
  t('0e-0');
  t('1e-9000000000000000')

  // Negative zero
  t = function (n) {
    T.assert(1 / new Decimal(n).toNumber() === -Infinity);
  }

  t('-0');
  t('-0.0');
  t('-0.000000000000');
  t('-0e+0');
  t('-0e-0');
  t('-1e-9000000000000000')

  t = function (n, expected) {
    T.assertEqual(expected, new Decimal(n).toNumber());
  }

  t(Infinity, 1 / 0);
  t('Infinity', 1 / 0);
  t(-Infinity, -1 / 0);
  t('-Infinity', -1 / 0);
  t(NaN, NaN);
  t('NaN', NaN);

  t(1, 1);
  t('1', 1);
  t('1.0', 1);
  t('1e+0', 1);
  t('1e-0', 1);

  t(-1, -1);
  t('-1', -1);
  t('-1.0', -1);
  t('-1e+0', -1);
  t('-1e-0', -1);

  t('123.456789876543', 123.456789876543);
  t('-123.456789876543', -123.456789876543);

  t('1.1102230246251565e-16', 1.1102230246251565e-16);
  t('-1.1102230246251565e-16', -1.1102230246251565e-16);

  t('9007199254740991', 9007199254740991);
  t('-9007199254740991', -9007199254740991);

  t('5e-324', 5e-324);
  t('1.7976931348623157e+308', 1.7976931348623157e+308);

  t('9.999999e+9000000000000000', 1 / 0);
  t('-9.999999e+9000000000000000', -1 / 0);
  t('1e-9000000000000000', 0);
  t('-1e-9000000000000000', -0);
});
