if (typeof T === 'undefined') require('../setup');

T('clamp', function () {

  function t(x, min, max, expected) {
    //T.assertEqual(expected, new Decimal(x).clampedTo(min, max).valueOf());
    T.assertEqual(expected, new Decimal(x).clamp(min, max).valueOf());
    //T.assertEqual(expected, Decimal.clamp(x, min, max).valueOf());
  }

  t('-0', '0', '0', '-0');
  t('-0', '-0', '0', '-0');
  t('-0', '0', '-0', '-0');
  t('-0', '-0', '-0', '-0');
  
  t('0', '0', '0', '0');
  t('0', '-0', '0', '0');
  t('0', '0', '-0', '0');
  t('0', '-0', '-0', '0');
  
  t(0, 0, 1, '0');
  t(-1, 0, 1, '0');
  t(-2, 0, 1, '0');
  t(1, 0, 1, '1');
  t(2, 0, 1, '1');
  
  t(1, 1, 1, '1');
  t(-1, 1, 1, '1');
  t(-1, -1, 1, '-1');
  t(2, 1, 2, '2');
  t(3, 1, 2, '2');
  t(1, 0, 1, '1');
  t(2, 0, 1, '1');
  
  t(Infinity, 0, 1, '1');
  t(0, -Infinity, 0, '0');
  t(-Infinity, 0, 1, '0');
  t(-Infinity, -Infinity, Infinity, '-Infinity');
  t(Infinity, -Infinity, Infinity, 'Infinity');
  t(0, 1, Infinity, '1');
  
  t(0, NaN, 1, 'NaN');
  t(0, 0, NaN, 'NaN');
  t(NaN, 0, 1, 'NaN');
});