var time = new Date(),
  passed = 0,
  total = 0;

console.log('\n Testing decimal.js\n');

[
  'abs',
  'acos',
  'acosh',
  'asin',
  'asinh',
  'atan',
  'atan2',
  'atanh',
  'cbrt',
  'ceil',
  'clamp',
  'clone',
  'cmp',
  'config',
  'cos',
  'cosh',
  'Decimal',
  'div',
  'divToInt',
  'dpSd',
  'exp',
  'floor',
  'hypot',
  'immutability',
  'intPow',
  'isFiniteEtc',
  'ln',
  'log',
  'log10',
  'log2',
  'minAndMax',
  'minus',
  'mod',
  'neg',
  'plus',
  'pow',
  'random',
  'round',
  'sign',
  'sin',
  'sinh',
  'sqrt',
  'sum',
  'tan',
  'tanh',
  'times',
  'toBinary',
  'toDP',
  'toExponential',
  'toFixed',
  'toFraction',
  'toHex',
  'toNearest',
  'toNumber',
  'toOctal',
  'toPrecision',
  'toSD',
  'toString',
  'trunc',
  'valueOf'
]
.forEach(function (module) {
  require('./modules/' + module);
  passed += T.result[0];
  total += T.result[1];
});

time = new Date() - time;
console.log('\n In total, ' + passed + ' of ' + total + ' tests passed in ' + (time / 1e3) + ' secs.\n');
