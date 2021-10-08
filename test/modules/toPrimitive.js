if (typeof T === 'undefined') require('../setup');

T('Symbol.toPrimitive', function () {

  function D(v) { return new Decimal(v); }

  Decimal.config({
    precision: 20,
    rounding: 4,
    toExpNeg: -9e15,
    toExpPos: 9e15,
    minE: -9e15,
    maxE: 9e15
  });

  T.assert(D('1') < D('2'));
  T.assert(D('100') > D('2'));
  T.assert(D('-435435.232') < D('2.09802'));
  T.assert(D('-1.987234') > D('-2.5473421'));
  T.assert(D('10.3') >= D('10.3'));
  T.assert(D('10.3') <= D('10.3'));
});

