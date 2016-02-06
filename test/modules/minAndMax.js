if (typeof T === 'undefined') require('../setup');

T('min and max', function () {

  function t(min, max, arr) {
    T.assertEqual(new Decimal(max).valueOf(), Decimal.max.apply(Decimal, arr).valueOf());
    T.assertEqual(new Decimal(min).valueOf(), Decimal.min.apply(Decimal, arr).valueOf());
  }

  Decimal.config({
    precision: 20,
    rounding: 4,
    toExpNeg: -7,
    toExpPos: 21,
    minE: -9e15,
    maxE: 9e15
  });

  t(NaN, NaN, [NaN]);
  t(NaN, NaN, [-2, 0, -1, NaN]);
  t(NaN, NaN, [-2, NaN, 0, -1]);
  t(NaN, NaN, [NaN, -2, 0, -1]);
  t(NaN, NaN, [NaN, -2, 0, -1]);
  t(NaN, NaN, [-2, 0, -1, new Decimal(NaN)]);
  t(NaN, NaN, [-2, 0, -1, new Decimal(NaN)]);
  t(NaN, NaN, [Infinity, -2, 'NaN', 0, -1, -Infinity]);
  t(NaN, NaN, ['NaN', Infinity, -2, 0, -1, -Infinity]);
  t(NaN, NaN, [Infinity, -2, NaN, 0, -1, -Infinity]);

  t(0, 0, [0, 0, 0]);
  t(-2, Infinity, [-2, 0, -1, Infinity]);
  t(-Infinity, 0, [-2, 0, -1, -Infinity]);
  t(-Infinity, Infinity, [-Infinity, -2, 0, -1, Infinity]);
  t(-Infinity, Infinity, [Infinity, -2, 0, -1, -Infinity]);
  t(-Infinity, Infinity, [-Infinity, -2, 0, new Decimal(Infinity)]);

  t(-2, 0, [-2, 0, -1]);
  t(-2, 0, [-2, -1, 0]);
  t(-2, 0, [0, -2, -1]);
  t(-2, 0, [0, -1, -2]);
  t(-2, 0, [-1, -2, 0]);
  t(-2, 0, [-1, 0, -2]);

  t(-1, 1, [-1, 0, 1]);
  t(-1, 1, [-1, 1, 0]);
  t(-1, 1, [0, -1, 1]);
  t(-1, 1, [0, 1, -1]);
  t(-1, 1, [1, -1, 0]);
  t(-1, 1, [1, 0, -1]);

  t(0, 2, [0, 1, 2]);
  t(0, 2, [0, 2, 1]);
  t(0, 2, [1, 0, 2]);
  t(0, 2, [1, 2, 0]);
  t(0, 2, [2, 1, 0]);
  t(0, 2, [2, 0, 1]);

  t(-1, 1, ['-1', 0, new Decimal(1)]);
  t(-1, 1, ['-1', new Decimal(1)]);
  t(-1, 1, [0, '-1', new Decimal(1)]);
  t(0, 1, [0, new Decimal(1)]);
  t(1, 1, [new Decimal(1)]);
  t(-1, -1, [new Decimal(-1)]);

  t(0.0009999, 0.0010001, [0.001, 0.0009999, 0.0010001]);
  t(-0.0010001, -0.0009999, [-0.001, -0.0009999, -0.0010001]);
  t(-0.000001, 999.001, [2, -0, '1e-9000000000000000', 324.32423423, -0.000001, '999.001', 10]);
  t('-9.99999e+9000000000000000', Infinity, [10, '-9.99999e+9000000000000000', new Decimal(Infinity), '9.99999e+9000000000000000', 0]);
  t('-9.999999e+9000000000000000', '1.01e+9000000000000000', ['-9.99998e+9000000000000000', '-9.999999e+9000000000000000', '9e+8999999999999999', '1.01e+9000000000000000', 1e+300]);
  t(1, Infinity, [1, '1e+9000000000000001', 1e200]);
  t(-Infinity, 1, [1, '-1e+9000000000000001', -1e200]);
  t(0, 1, [1, '1e-9000000000000001', 1e-200]);
  t(-0, 1, [1, '-1e-9000000000000001', 1e-200]);
  t(-3, 3, [1, '2', 3, '-1', -2, '-3']);
});
