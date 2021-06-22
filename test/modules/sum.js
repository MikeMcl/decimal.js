if (typeof T === 'undefined') require('../setup');

T('sum', function () {
  var expected;

  function t() {
    T.assertEqualDecimal(expected, Decimal.sum.apply(Decimal, arguments));
  }

  expected = new Decimal(0);

  t('0');
  t('0', new Decimal(0));
  t(1, 0, '-1');
  t(0, new Decimal('-10'), 0, 0, 0, 0, 0, 10);
  t(11, -11);
  t(1, '2', new Decimal(3), new Decimal('4'), -10);
  t(new Decimal(-10), '9', new Decimal(0.01), 0.99);
  
  expected = new Decimal(10);

  t('10');
  t('0', new Decimal('10'));
  t(10, 0);
  t(0, 0, 0, 0, 0, 0, 10);
  t(11, -1);
  t(1, '2', new Decimal(3), new Decimal('4'));
  t('9', new Decimal(0.01), 0.99);

  expected = new Decimal(600);

  t(100, 200, 300);
  t('100', '200', '300');
  t(new Decimal(100), new Decimal(200), new Decimal(300));
  t(100, '200', new Decimal(300));
  t(99.9, 200.05, 300.05);

  expected = new Decimal(NaN);

  t(NaN);
  t('1', NaN);
  t(100, 200, NaN);
  t(NaN, 0, '9', new Decimal(0), 11, Infinity);
  t(0, new Decimal('-Infinity'), '9', new Decimal(NaN), 11);
  t(4, '-Infinity', 0, '9', new Decimal(0), Infinity, 2);

  expected = new Decimal(Infinity);

  t(Infinity);
  t(1, '1e10000000000000000000000000000000000000000', '4');
  t(100, 200, 'Infinity');
  t(0, new Decimal('Infinity'), '9', new Decimal(0), 11);
  t(0, '9', new Decimal(0), 11, Infinity);
  t(4, new Decimal(Infinity), 0, '9', new Decimal(0), Infinity, 2);

  expected = new Decimal(-Infinity);

  t(-Infinity);
  t(1, '-1e10000000000000000000000000000000000000000', '4');
  t(100, 200, '-Infinity');
  t(0, new Decimal('-Infinity'), '9', new Decimal(0), 11);
  t(0, '9', new Decimal(0), 11, -Infinity);
  t(4, new Decimal(-Infinity), 0, '9', new Decimal(0), -Infinity, 2);
});