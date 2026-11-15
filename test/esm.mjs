// Tests the ES module, decimal.mjs: runs the test suite against it, then tests its function exports
// and the DecimalLite constructor.

import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import * as decimal from '../decimal.mjs';

var require = createRequire(import.meta.url),
  Decimal = decimal.Decimal,
  DecimalLite = decimal.DecimalLite,
  names = Object.keys(decimal).filter(function (k) {
    return !/^(default|Decimal|DecimalLite)$/.test(k);
  });

globalThis.Decimal = Decimal;
require('./test.js');

console.log(' Testing function exports and DecimalLite...');

// Undo the configuration changes of the test suite.
Decimal.set({ defaults: true });

assert.equal(decimal.default, Decimal);

// Each function export is equivalent to the prototype method of the same name in decimal.js.
var DecimalJs = require('../decimal.js');

names.forEach(function (name) {
  var fn = decimal[name],
    args = [1, 4].slice(0, fn.length - 1);

  assert.equal(typeof DecimalJs.prototype[name], 'function', name);

  ['0.5', '-7.25', '12345.678', '0', '-0', 'NaN', 'Infinity'].forEach(function (v) {
    [Decimal, DecimalLite].forEach(function (Ctor) {
      var expected, actual,
        x = new Ctor(v);

      try {
        expected = DecimalJs.prototype[name].apply(new DecimalJs(v), args);
      } catch (e) {
        assert.throws(function () { fn.apply(null, [x].concat(args)); }, { message: e.message }, name);
        return;
      }

      actual = fn.apply(null, [x].concat(args));
      assert.equal(String(actual), String(expected), name + '(' + v + ')');
      if (actual instanceof Decimal || actual instanceof DecimalLite) assert.equal(actual.constructor, Ctor, name);
    });
  });
});

// DecimalLite only has `toString`, `valueOf` and `toJSON`, and no static methods except config etc.
var x = new DecimalLite('-1.5e-10');
assert.deepEqual(Object.keys(Object.getPrototypeOf(x)).sort(), ['constructor', 'toJSON', 'toString', 'toStringTag', 'valueOf']);
assert.equal(x.plus, undefined);
assert.equal(DecimalLite.add, undefined);
assert.equal(x.toString(), '-1.5e-10');
assert.equal(x.valueOf(), '-1.5e-10');
assert.equal(JSON.stringify(x), '"-1.5e-10"');
assert.equal(DecimalLite('2').toString(), '2');
assert.equal(new DecimalLite('0x1p100').toString(), '1.2676506002282294015e+30');

// Instances of either constructor are Decimals.
assert.ok(Decimal.isDecimal(x) && DecimalLite.isDecimal(new Decimal(1)));
assert.ok(new Decimal(1) instanceof DecimalLite && !(x instanceof Decimal));
assert.equal(new Decimal(x).plus(new DecimalLite(1)).toString(), '0.99999999985');

// Clones inherit the prototype and static methods of their parent.
var D = Decimal.clone({ precision: 3 }), L = DecimalLite.clone({ precision: 3 });
assert.equal(D.div(1, 3).toString(), '0.333');
assert.equal(new D(2).sqrt().toString(), '1.41');
assert.equal(L.div, undefined);
assert.equal(new L(1).div, undefined);
assert.equal(decimal.div(new L(1), 3).toString(), '0.333');

// Configuration is per constructor.
DecimalLite.set({ precision: 5 });
assert.equal(decimal.div(new DecimalLite(1), 3).toString(), '0.33333');
assert.equal(decimal.div(new Decimal(1), 3).toString(), '0.33333333333333333333');
DecimalLite.set({ defaults: true });

console.log(' ' + names.length + ' function exports and DecimalLite passed.\n');
