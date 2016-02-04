// Adds global: T

T = (function () {
  var passed, start, testNumber, write, writer, writeError;

  function T(name) {
    write('\n Testing ' + name + '...');
    start = +new Date();
    passed = testNumber = 0;
    T.result = null;
  }

  if (typeof window != 'undefined') {
    writer = function (str, className) {
      document.body.innerHTML += '<div class="' + className + '">' +
        str.replace('\n', '<br>') + '</div>';
    };
    write = function (str) { writer(str, 'pass'); };
    writeError = function (str) { writer(str, 'fail'); };
  } else {
    Decimal = require('../decimal');
    write = console.log;
    writeError = console.error;
  }

  T.assert = function (actual) {
    ++testNumber;
    if (actual === true) {
      ++passed;
      //write('\n Expected and actual: ' + actual);
    } else {
      writeError('\n Test number ' + testNumber + ' failed: assert');
      writeError(' Expected: true');
      writeError(' Actual:   ' + actual);
      //process.exit();
    }
  };

  T.assertEqual = function (expected, actual) {
    ++testNumber;
    if (expected === actual || expected !== expected && actual !== actual) {
      ++passed;
    } else {
      writeError('\n Test number ' + testNumber + ' failed: assertEqual');
      writeError(' Expected: ' + expected);
      writeError(' Actual:   ' + actual);
    }
  };

  T.assertEqualDecimal = function (x, y) {
    ++testNumber;
    if (x.eq(y) || x.isNaN() && y.isNaN()) {
      ++passed;
    } else {
      writeError('\n Test number ' + testNumber + ' failed: assertEqualDecimal');
      writeError(' x: ' + x.valueOf());
      writeError(' y: ' + y.valueOf());
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
      writeError('\n Test number ' + testNumber + ' failed: assertEqualProps');
      writeError(' Expected digits:   ' + digits);
      writeError(' Expected exponent: ' + exponent);
      writeError(' Expected sign:     ' + sign);
      writeError(' Actual digits:     ' + n.d);
      writeError(' Actual exponent:   ' + n.e);
      writeError(' Actual sign:       ' + n.s);
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
      writeError('\n Test number ' + testNumber + ' failed: assertException');
      writeError(' Expected: ' + msg + ' to raise a [DecimalError].');
      writeError(' Actual:   ' + (actual || 'no exception'));
    }
  };

  T.stop = function () {
    var duration = +new Date() - start;
    write('\n ' + passed + ' of ' + testNumber + ' tests passed in ' + duration + ' ms \n');
    T.result = [passed, testNumber, duration];
  };

  T.write = write;

  return T;
})();
