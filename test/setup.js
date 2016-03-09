// Adds global: T

T = (function () {
  var passed, testNumber, write;

  function T(name, tests) {
    var time;
    write(' Testing ' + name + '...');
    passed = testNumber = 0;
    time = new Date();
    tests();
    time = new Date() - time;
    T.result = [passed, testNumber, time];
    if (passed !== testNumber) write('\n');
    write(' ' + passed + ' of ' + testNumber + ' tests passed in ' + time + ' ms\n');
  }

  if (typeof window != 'undefined') {
    write = function (str) {
      document.body.innerHTML += str.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
    };
  } else {
    Decimal = require('../decimal');
    write = process.stdout.write.bind(process.stdout);
  }

  T.assert = function (actual) {
    ++testNumber;
    if (actual === true) {
      ++passed;
      //write('\n Expected and actual: ' + actual);
    } else {
      write(
        '\n  Test number ' + testNumber + ' failed: assert' +
        '\n  Expected: true' +
        '\n  Actual:   ' + actual
      );
      //process.exit();
    }
  };

  T.assertEqual = function (expected, actual) {
    ++testNumber;
    // If expected and actual are both NaN, consider them equal.
    if (expected === actual || expected !== expected && actual !== actual) {
      ++passed;
    } else {
      write(
        '\n  Test number ' + testNumber + ' failed: assertEqual' +
        '\n  Expected: ' + expected +
        '\n  Actual:   ' + actual
      );
    }
  };

  T.assertEqualDecimal = function (x, y) {
    ++testNumber;
    if (x.eq(y) || x.isNaN() && y.isNaN()) {
      ++passed;
    } else {
      write(
        '\n  Test number ' + testNumber + ' failed: assertEqualDecimal' +
        '\n  x: ' + x.valueOf() +
        '\n  y: ' + y.valueOf()
      );
    }
  };

  T.assertEqualProps = function (digits, exponent, sign, n) {
    var i = 0,
      len = digits.length;
    ++testNumber;
    while (i < len && digits[i] === n.d[i]) ++i;
    if (i === len && i === n.d.length && exponent === n.e && sign === n.s) {
      ++passed;
    } else {
      write(
        '\n  Test number ' + testNumber + ' failed: assertEqualProps' +
        '\n  Expected digits:   ' + digits +
        '\n  Expected exponent: ' + exponent +
        '\n  Expected sign:     ' + sign +
        '\n  Actual digits:     ' + n.d +
        '\n  Actual exponent:   ' + n.e +
        '\n  Actual sign:       ' + n.s
      );
    }
  };

  T.assertException = function (func, msg) {
    var actual;
    ++testNumber;
    try {
      func();
    } catch (e) {
      actual = e;
    }
    if (actual instanceof Error && /DecimalError/.test(actual.message)) {
      ++passed;
    } else {
      write(
        '\n  Test number ' + testNumber + ' failed: assertException' +
        '\n  Expected: ' + msg + ' to raise a DecimalError.' +
        '\n  Actual:   ' + (actual || 'no exception')
      );
    }
  };

  return T;
})();
