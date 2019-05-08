if (typeof T === 'undefined') require('../setup');

T('Decimal', function () {

  Decimal.config({
    precision: 40,
    rounding: 4,
    toExpNeg: -9e15,
    toExpPos: 9e15,
    maxE: 9e15,
    minE: -9e15,
    crypto: false,
    modulo: 1
  });

  var t = function (coefficient, exponent, sign, n) {
    T.assertEqualProps(coefficient, exponent, sign, new Decimal(n));
  }

  t([0], 0, 1, 0);
  t([0], 0, -1, -0);
  t([1], 0, -1, -1);
  t([10], 1, -1, -10);

  t([1], 0, 1, 1);
  t([10], 1, 1, 10);
  t([100], 2, 1, 100);
  t([1000], 3, 1, 1000);
  t([10000], 4, 1, 10000);
  t([100000], 5, 1, 100000);
  t([1000000], 6, 1, 1000000);

  t([1], 7, 1, 10000000);
  t([10], 8, 1, 100000000);
  t([100], 9, 1, 1000000000);
  t([1000], 10, 1, 10000000000);
  t([10000], 11, 1, 100000000000);
  t([100000], 12, 1, 1000000000000);
  t([1000000], 13, 1, 10000000000000);

  t([1], 14, -1, -100000000000000);
  t([10], 15, -1, -1000000000000000);
  t([100], 16, -1, -10000000000000000);
  t([1000], 17, -1, -100000000000000000);
  t([10000], 18, -1, -1000000000000000000);
  t([100000], 19, -1, -10000000000000000000);
  t([1000000], 20, -1, -100000000000000000000);

  t([1000000], -1, 1, 1e-1);
  t([100000], -2, -1, -1e-2);
  t([10000], -3, 1, 1e-3);
  t([1000], -4, -1, -1e-4);
  t([100], -5, 1, 1e-5);
  t([10], -6, -1, -1e-6);
  t([1], -7, 1, 1e-7);

  t([1000000], -8, 1, 1e-8);
  t([100000], -9, -1, -1e-9);
  t([10000], -10, 1, 1e-10);
  t([1000], -11, -1, -1e-11);
  t([100], -12, 1, 1e-12);
  t([10], -13, -1, -1e-13);
  t([1], -14, 1, 1e-14);

  t([1000000], -15, 1, 1e-15);
  t([100000], -16, -1, -1e-16);
  t([10000], -17, 1, 1e-17);
  t([1000], -18, -1, -1e-18);
  t([100], -19, 1, 1e-19);
  t([10], -20, -1, -1e-20);
  t([1], -21, 1, 1e-21);

  t([9], 0, 1, '9');
  t([99], 1, -1, '-99');
  t([999], 2, 1, '999');
  t([9999], 3, -1, '-9999');
  t([99999], 4, 1, '99999');
  t([999999], 5, -1, '-999999');
  t([9999999], 6, 1, '9999999');

  t([9, 9999999], 7, -1, '-99999999');
  t([99, 9999999], 8, 1, '999999999');
  t([999, 9999999], 9, -1, '-9999999999');
  t([9999, 9999999], 10, 1, '99999999999');
  t([99999, 9999999], 11, -1, '-999999999999');
  t([999999, 9999999], 12, 1, '9999999999999');
  t([9999999, 9999999], 13, -1, '-99999999999999');

  t([9, 9999999, 9999999], 14, 1, '999999999999999');
  t([99, 9999999, 9999999], 15, -1, '-9999999999999999');
  t([999, 9999999, 9999999], 16, 1, '99999999999999999');
  t([9999, 9999999, 9999999], 17, -1, '-999999999999999999');
  t([99999, 9999999, 9999999], 18, 1, '9999999999999999999');
  t([999999, 9999999, 9999999], 19, -1, '-99999999999999999999');
  t([9999999, 9999999, 9999999], 20, 1, '999999999999999999999');

  // Test base conversion.

  t = function (expected, n) {
    T.assertEqual(expected, new Decimal(n).valueOf());
  }

  function randInt() {
    return Math.floor(Math.random() * 0x20000000000000 / Math.pow(10, Math.random() * 16 | 0));
  }

  // Test random integers against Number.prototype.toString(base).
  for (var k, i = 0; i < 127; i++) {
    k = randInt();
    t(k.toString(), '0b' + k.toString(2));
    k = randInt();
    t(k.toString(), '0B' + k.toString(2));
    k = randInt();
    t(k.toString(), '0o' + k.toString(8));
    k = randInt();
    t(k.toString(), '0O' + k.toString(8));
    k = randInt();
    t(k.toString(), '0x' + k.toString(16));
    k = randInt();
    t(k.toString(), '0X' + k.toString(16));
  }

  // Binary.
  t('0', '0b0');
  t('0', '0B0');
  t('-5', '-0b101');
  t('5', '+0b101');
  t('1.5', '0b1.1');
  t('-1.5', '-0b1.1');

  t('18181', '0b100011100000101.00');
  t('-12.5', '-0b1100.10');
  t('343872.5', '0b1010011111101000000.10');
  t('-328.28125', '-0b101001000.010010');
  t('-341919.144535064697265625', '-0b1010011011110011111.0010010100000000010');
  t('97.10482025146484375', '0b1100001.000110101101010110000');
  t('-120914.40625', '-0b11101100001010010.01101');
  t('8080777260861123367657', '0b1101101100000111101001111111010001111010111011001010100101001001011101001');

  // Octal.
  t('8', '0o10');
  t('-8.5', '-0O010.4');
  t('8.5', '+0O010.4');
  t('-262144.000000059604644775390625', '-0o1000000.00000001');
  t('572315667420.390625', '0o10250053005734.31');

  // Hex.
  t('1', '0x00001');
  t('255', '0xff');
  t('-15.5', '-0Xf.8');
  t('15.5', '+0Xf.8');
  t('-16777216.00000000023283064365386962890625', '-0x1000000.00000001');
  t('325927753012307620476767402981591827744994693483231017778102969592507', '0xc16de7aa5bf90c3755ef4dea45e982b351b6e00cd25a82dcfe0646abb');

  // Test parsing.

  var tx = function (fn, msg) {
    T.assertException(fn, msg);
  }

  t('NaN', NaN);
  t('NaN', -NaN);
  t('NaN', 'NaN');
  t('NaN', '-NaN');
  t('NaN', '+NaN');

  tx(function () {new Decimal(' NaN')}, "' NaN'");
  tx(function () {new Decimal('NaN ')}, "'NaN '");
  tx(function () {new Decimal(' NaN ')}, "' NaN '");
  tx(function () {new Decimal(' -NaN')}, "' -NaN'");
  tx(function () {new Decimal(' +NaN')}, "' +NaN'");
  tx(function () {new Decimal('-NaN ')}, "'-NaN '");
  tx(function () {new Decimal('+NaN ')}, "'+NaN '");
  tx(function () {new Decimal('.NaN')}, "'.NaN'");
  tx(function () {new Decimal('NaN.')}, "'NaN.'");

  t('Infinity', Infinity);
  t('-Infinity', -Infinity);
  t('Infinity', 'Infinity');
  t('-Infinity', '-Infinity');
  t('Infinity', '+Infinity');

  tx(function () {new Decimal(' Infinity')}, "' Infinity '");
  tx(function () {new Decimal('Infinity ')}, "'Infinity '");
  tx(function () {new Decimal(' Infinity ')}, "' Infinity '");
  tx(function () {new Decimal(' -Infinity')}, "' -Infinity'");
  tx(function () {new Decimal(' +Infinity')}, "' +Infinity'");
  tx(function () {new Decimal('.Infinity')}, "'.Infinity'");
  tx(function () {new Decimal('Infinity.')}, "'Infinity.'");

  t('0', 0);
  t('-0', -0);
  t('0', '0');
  t('-0', '-0');
  t('0', '0.');
  t('-0', '-0.');
  t('0', '0.0');
  t('-0', '-0.0');
  t('0', '0.00000000');
  t('-0', '-0.0000000000000000000000');

  tx(function () {new Decimal(' 0')}, "' 0'");
  tx(function () {new Decimal('0 ')}, "'0 '");
  tx(function () {new Decimal(' 0 ')}, "' 0 '");
  tx(function () {new Decimal('0-')}, "'0-'");
  tx(function () {new Decimal(' -0')}, "' -0'");
  tx(function () {new Decimal('-0 ')}, "'-0 '");
  tx(function () {new Decimal('+0 ')}, "'+0 '");
  tx(function () {new Decimal(' +0')}, "' +0'");
  tx(function () {new Decimal(' .0')}, "' .0'");
  tx(function () {new Decimal('0. ')}, "'0. '");
  tx(function () {new Decimal('+-0')}, "'+-0'");
  tx(function () {new Decimal('-+0')}, "'-+0'");
  tx(function () {new Decimal('--0')}, "'--0'");
  tx(function () {new Decimal('++0')}, "'++0'");
  tx(function () {new Decimal('.-0')}, "'.-0'");
  tx(function () {new Decimal('.+0')}, "'.+0'");
  tx(function () {new Decimal('0 .')}, "'0 .'");
  tx(function () {new Decimal('. 0')}, "'. 0'");
  tx(function () {new Decimal('..0')}, "'..0'");
  tx(function () {new Decimal('+.-0')}, "'+.-0'");
  tx(function () {new Decimal('-.+0')}, "'-.+0'");
  tx(function () {new Decimal('+. 0')}, "'+. 0'");
  tx(function () {new Decimal('.0.')}, "'.0.'");

  t('1', 1);
  t('-1', -1);
  t('1', '1');
  t('-1', '-1');
  t('0.1', '.1');
  t('0.1', '.1');
  t('-0.1', '-.1');
  t('0.1', '+.1');
  t('1', '1.');
  t('1', '1.0');
  t('-1', '-1.');
  t('1', '+1.');
  t('-1', '-1.0000');
  t('1', '1.0000');
  t('1', '1.00000000');
  t('-1', '-1.000000000000000000000000');
  t('1', '+1.000000000000000000000000');

  tx(function () {new Decimal(' 1')}, "' 1'");
  tx(function () {new Decimal('1 ')}, "'1 '");
  tx(function () {new Decimal(' 1 ')}, "' 1 '");
  tx(function () {new Decimal('1-')}, "'1-'");
  tx(function () {new Decimal(' -1')}, "' -1'");
  tx(function () {new Decimal('-1 ')}, "'-1 '");
  tx(function () {new Decimal(' +1')}, "' +1'");
  tx(function () {new Decimal('+1 ')}, "'+1'");
  tx(function () {new Decimal('.1.')}, "'.1.'");
  tx(function () {new Decimal('+-1')}, "'+-1'");
  tx(function () {new Decimal('-+1')}, "'-+1'");
  tx(function () {new Decimal('--1')}, "'--1'");
  tx(function () {new Decimal('++1')}, "'++1'");
  tx(function () {new Decimal('.-1')}, "'.-1'");
  tx(function () {new Decimal('.+1')}, "'.+1'");
  tx(function () {new Decimal('1 .')}, "'1 .'");
  tx(function () {new Decimal('. 1')}, "'. 1'");
  tx(function () {new Decimal('..1')}, "'..1'");
  tx(function () {new Decimal('+.-1')}, "'+.-1'");
  tx(function () {new Decimal('-.+1')}, "'-.+1'");
  tx(function () {new Decimal('+. 1')}, "'+. 1'");
  tx(function () {new Decimal('-. 1')}, "'-. 1'");
  tx(function () {new Decimal('1..')}, "'1..'");
  tx(function () {new Decimal('+1..')}, "'+1..'");
  tx(function () {new Decimal('-1..')}, "'-1..'");
  tx(function () {new Decimal('-.1.')}, "'-.1.'");
  tx(function () {new Decimal('+.1.')}, "'+.1.'");
  tx(function () {new Decimal('.-10.')}, "'.-10.'");
  tx(function () {new Decimal('.+10.')}, "'.+10.'");
  tx(function () {new Decimal('. 10.')}, "'. 10.'");

  t('123.456789', 123.456789);
  t('-123.456789', -123.456789);
  t('-123.456789', '-123.456789');
  t('123.456789', '123.456789');
  t('123.456789', '+123.456789');

  tx(function () {new Decimal(void 0)}, "void 0");
  tx(function () {new Decimal('undefined')}, "'undefined'");
  tx(function () {new Decimal(null)}, "null");
  tx(function () {new Decimal('null')}, "'null'");
  tx(function () {new Decimal({})}, "{}");
  tx(function () {new Decimal([])}, "[]");
  tx(function () {new Decimal(function () {})}, "function () {}");
  tx(function () {new Decimal(new Date)}, "new Date");
  tx(function () {new Decimal(new RegExp)}, "new RegExp");
  tx(function () {new Decimal('')}, "''");
  tx(function () {new Decimal(' ')}, "' '");
  tx(function () {new Decimal('nan')}, "'nan'");
  tx(function () {new Decimal('23e')}, "'23e'");
  tx(function () {new Decimal('e4')}, "'e4'");
  tx(function () {new Decimal('ff')}, "'ff'");
  tx(function () {new Decimal('0xg')}, "'oxg'");
  tx(function () {new Decimal('0Xfi')}, "'0Xfi'");
  tx(function () {new Decimal('++45')}, "'++45'");
  tx(function () {new Decimal('--45')}, "'--45'");
  tx(function () {new Decimal('9.99--')}, "'9.99--'");
  tx(function () {new Decimal('9.99++')}, "'9.99++'");
  tx(function () {new Decimal('0 0')}, "'0 0'");
});
