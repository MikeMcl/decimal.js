if (typeof T === 'undefined') require('../setup');

T('sign', function () {

  function t(n, expected) {
    T.assertEqual(expected, Decimal.sign(n));
  }

  t(NaN, NaN);
  t('NaN', NaN);
  t(Infinity, 1);
  t(-Infinity, -1);
  t('Infinity', 1);
  t('-Infinity', -1);

  T.assert(1 / Decimal.sign('0') === Infinity);
  T.assert(1 / Decimal.sign(new Decimal('0')) === Infinity);
  T.assert(1 / Decimal.sign('-0') === -Infinity);
  T.assert(1 / Decimal.sign(new Decimal('-0')) === -Infinity);

  t('0', 0);
  t('-0', -0);
  t('1', 1);
  t('-1', -1);
  t('9.99', 1);
  t('-9.99', -1);
});
