// Tests immutability of operand[s] for all applicable methods.
// Also tests each Decimal.prototype method against its equivalent Decimal method where applicable.
if (typeof T === 'undefined') require('../setup');

T('immutability', function () {

  Decimal.config({
    precision: 20,
    rounding: 4,
    toExpNeg: -7,
    toExpPos: 21,
    minE: -9e15,
    maxE: 9e15
  });

  // Integer [0, 9e15), with each possible number of digits, [1, 16], equally likely.
  function randInt() {
    return Math.floor(Math.random() * 9e15 / Math.pow(10, Math.random() * 16 | 0));
  }

  var a, aa, b, bb, i, k, n, t, v, x, y, z;

  t = T.assertEqualDecimal;

  v = [
    0,
    NaN,
    Infinity,
    -Infinity,
    0.5,
    -0.5,
    1,
    -1,
    (x = Decimal.random()),
    x.neg(),
    (x = randInt()),
    -x,
    (x = Decimal.random().plus(randInt())),
    x.neg()
  ];

  for (i = 0; i < v.length; i++) {
    a = new Decimal(v[i]);
    aa = new Decimal(v[i]);
    k = (Math.random() * 10 | 0) / 10;
    b = k == 0.5 ? new Decimal(a) : a[k < 0.5 ? 'plus' : 'minus'](Decimal.random().plus(randInt()));
    bb = new Decimal(b);
    n = Math.random() * 20 + 1 | 0;

    x = a.absoluteValue();
    t(a, aa);
    y = a.abs();
    t(a, aa);
    z = Decimal.abs(a);
    t(a, aa);

    t(x, y);
    t(y, z);

    x = a.ceil();
    t(a, aa);
    y = Decimal.ceil(a);
    t(a, aa);

    t(x, y);

    x = a.comparedTo(b);
    t(a, aa);
    t(b, bb);
    y = a.cmp(b);
    t(a, aa);
    t(b, bb);

    T.assertEqual(x, y);

    x = a.cosine();
    t(a, aa);
    y = a.cos();
    t(a, aa);
    z = Decimal.cos(a);
    t(a, aa);

    t(x, y);
    t(y, z);

    x = a.cubeRoot();
    t(a, aa);
    y = a.cbrt();
    t(a, aa);
    z = Decimal.cbrt(a);
    t(a, aa);

    t(x, y);
    t(y, z);

    x = a.decimalPlaces();
    t(a, aa);
    y = a.dp();
    t(a, aa);

    T.assertEqual(x, y);

    x = a.dividedBy(b);
    t(a, aa);
    t(b, bb);
    y = a.div(b);
    t(a, aa);
    t(b, bb);
    z = Decimal.div(a, b);
    t(a, aa);
    t(b, bb);

    t(x, y);
    t(y, z);

    x = a.dividedToIntegerBy(b);
    t(a, aa);
    t(b, bb);
    y = a.divToInt(b);
    t(a, aa);
    t(b, bb);

    t(x, y);

    x = a.equals(b);
    t(a, aa);
    t(b, bb);
    y = a.eq(b);
    t(a, aa);
    t(b, bb);

    T.assertEqual(x, y);

    x = a.floor();
    t(a, aa);
    y = Decimal.floor(a);
    t(a, aa);

    t(x, y);

    x = a.greaterThan(b);
    t(a, aa);
    t(b, bb);
    y = a.gt(b);
    t(a, aa);
    t(b, bb);

    T.assertEqual(x, y);

    x = a.greaterThanOrEqualTo(b);
    t(a, aa);
    t(b, bb);
    y = a.gte(b);
    t(a, aa);
    t(b, bb);

    T.assertEqual(x, y);

    // Omit hyperbolic methods if a is large, as they are too time-consuming.
    if (a.abs().lt(1000)) {
      x = a.hyperbolicCosine();
      t(a, aa);
      y = a.cosh();
      t(a, aa);
      z = Decimal.cosh(a);
      t(a, aa);

      t(x, y);
      t(y, z);

      x = a.hyperbolicSine();
      t(a, aa);
      y = a.sinh();
      t(a, aa);
      z = Decimal.sinh(a);
      t(a, aa);

      t(x, y);
      t(y, z);

      x = a.hyperbolicTangent();
      t(a, aa);
      y = a.tanh();
      t(a, aa);
      z = Decimal.tanh(a);
      t(a, aa);

      t(x, y);
      t(y, z);
    }

    // a [-1, 1]
    x = a.inverseCosine();
    t(a, aa);
    y = a.acos();
    t(a, aa);
    z = Decimal.acos(a);
    t(a, aa);

    t(x, y);
    t(y, z);

    // a [1, Infinity]
    x = a.inverseHyperbolicCosine();
    t(a, aa);
    y = a.acosh();
    t(a, aa);
    z = Decimal.acosh(a);
    t(a, aa);

    t(x, y);
    t(y, z);

    x = a.inverseHyperbolicSine();
    t(a, aa);
    y = a.asinh();
    t(a, aa);
    z = Decimal.asinh(a);
    t(a, aa);

    t(x, y);
    t(y, z);

    // a [-1, 1]
    x = a.inverseHyperbolicTangent();
    t(a, aa);
    y = a.atanh();
    t(a, aa);
    z = Decimal.atanh(a);
    t(a, aa);

    t(x, y);
    t(y, z);

    // a [-1, 1]
    x = a.inverseSine();
    t(a, aa);
    y = a.asin();
    t(a, aa);
    z = Decimal.asin(a);
    t(a, aa);

    t(x, y);
    t(y, z);

    x = a.inverseTangent();
    t(a, aa);
    y = a.atan();
    t(a, aa);
    z = Decimal.atan(a);
    t(a, aa);

    t(x, y);
    t(y, z);

    a.isFinite();
    t(a, aa);

    x = a.isInteger();
    t(a, aa);
    y = a.isInt();
    t(a, aa);

    T.assertEqual(x, y);

    a.isNaN();
    t(a, aa);

    x = a.isNegative();
    t(a, aa);
    y = a.isNeg();
    t(a, aa);

    T.assertEqual(x, y);

    x = a.isPositive();
    t(a, aa);
    y = a.isPos();
    t(a, aa);

    T.assertEqual(x, y);

    a.isZero();
    t(a, aa);

    x = a.lessThan(b);
    t(a, aa);
    t(b, bb);
    y = a.lt(b);
    t(a, aa);
    t(b, bb);

    T.assertEqual(x, y);

    x = a.lessThanOrEqualTo(b);
    t(a, aa);
    t(b, bb);
    y = a.lte(b);
    t(a, aa);
    t(b, bb);

    T.assertEqual(x, y);

    x = a.logarithm();
    t(a, aa);
    y = a.log();
    t(a, aa);
    z = Decimal.log(a);
    t(a, aa);

    t(x, y);
    t(y, z);

    x = a.minus(b);
    t(a, aa);
    t(b, bb);
    y = a.sub(b);
    t(a, aa);
    t(b, bb);
    z = Decimal.sub(a, b);
    t(a, aa);
    t(b, bb);

    t(x, y);
    t(y, z);

    x = a.modulo(b);
    t(a, aa);
    t(b, bb);
    y = a.mod(b);
    t(a, aa);
    t(b, bb);
    z = Decimal.mod(a, b);
    t(a, aa);
    t(b, bb);

    t(x, y);
    t(y, z);

    x = a.naturalExponential();
    t(a, aa);
    y = a.exp();
    t(a, aa);
    z = Decimal.exp(a);
    t(a, aa);

    t(x, y);
    t(y, z);

    x = a.naturalLogarithm();
    t(a, aa);
    y = a.ln();
    t(a, aa);
    z = Decimal.ln(a);
    t(a, aa);

    t(x, y);
    t(y, z);

    x = a.negated();
    t(a, aa);
    y = a.neg();
    t(a, aa);

    t(x, y);

    x = a.plus(b);
    t(a, aa);
    t(b, bb);
    y = a.add(b);
    t(a, aa);
    t(b, bb);
    z = Decimal.add(a, b);
    t(a, aa);
    t(b, bb);

    t(x, y);
    t(y, z);

    x = a.precision();
    t(a, aa);
    y = a.sd();
    t(a, aa);

    T.assertEqual(x, y);

    x = a.round();
    t(a, aa);
    y = Decimal.round(a);
    t(a, aa);

    t(x, y);

    x = a.sine();
    t(a, aa);
    y = a.sin();
    t(a, aa);
    z = Decimal.sin(a);
    t(a, aa);

    t(x, y);
    t(y, z);

    x = a.squareRoot();
    t(a, aa);
    y = a.sqrt();
    t(a, aa);
    z = Decimal.sqrt(a);
    t(a, aa);

    t(x, y);
    t(y, z);

    x = a.tangent();
    t(a, aa);
    y = a.tan();
    t(a, aa);
    z = Decimal.tan(a);
    t(a, aa);

    t(x, y);
    t(y, z);

    x = a.times(b);
    t(a, aa);
    t(b, bb);
    y = a.mul(b);
    t(a, aa);
    t(b, bb);
    z = Decimal.mul(a, b);
    t(a, aa);
    t(b, bb);

    t(x, y);
    t(y, z);

    a.toBinary();
    t(a, aa);

    x = a.toDecimalPlaces(n);
    t(a, aa);
    y = a.toDP(n);
    t(a, aa);

    t(x, y);

    a.toExponential(n);
    t(a, aa);

    a.toFixed(n);
    t(a, aa);

    a.toFraction();
    t(a, aa);

    x = a.toHexadecimal();
    t(a, aa);
    y = a.toHex();
    t(a, aa);

    T.assertEqual(x, y);

    a.toJSON();
    t(a, aa);

    a.toNearest(b);
    t(a, aa);
    t(b, bb);

    a.toNumber();
    t(a, aa);

    a.toOctal();
    t(a, aa);

    x = a.toPower(b);
    t(a, aa);
    t(b, bb);
    y = a.pow(b);
    t(a, aa);
    t(b, bb);
    z = Decimal.pow(a, b);
    t(a, aa);
    t(b, bb);

    t(x, y);
    t(y, z);

    a.toPrecision(n);
    t(a, aa);

    x = a.toSignificantDigits(n);
    t(a, aa);
    y = a.toSD(n);
    t(a, aa);

    t(x, y);

    a.toString();
    t(a, aa);

    x = a.truncated();
    t(a, aa);
    y = a.trunc();
    t(a, aa);
    z = Decimal.trunc(a);
    t(a, aa);

    t(x, y);
    t(y, z);

    a.valueOf();
    t(a, aa);

    Decimal.atan2(a, b);
    t(a, aa);
    t(b, bb);


    Decimal.hypot(a, b);
    t(a, aa);
    t(b, bb);

    x = Decimal.log(a, 10);
    t(a, aa);
    y = Decimal.log10(a);
    t(a, aa);

    t(x, y);

    x = Decimal.log(a, 2);
    t(a, aa);
    y = Decimal.log2(a);
    t(a, aa);

    t(x, y);

    Decimal.max(a, b);
    t(a, aa);
    t(b, bb);

    Decimal.min(a, b);
    t(a, aa);
    t(b, bb);

    Decimal.sign(a);
    t(a, aa);
  }
});

/*
// All methods tested above except:
Decimal.clone();
Decimal.config();
Decimal.noConflict();
Decimal.random();
*/
