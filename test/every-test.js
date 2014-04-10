var arr,
    passed = 0,
    total = 0,
    start = +new Date();

console.log( '\n STARTING TESTS...\n' );

[
  'abs',
  'baseIn',
  'baseOut',
  'ceil',
  'cmp',
  'config',
  'constructor',
  'div',
  'divToInt',
  'dpSd',
  'exp',
  'floor',
  'intPow',
  'isFiniteEtc',
  'ln',
  'log',
  'log10',
  'minAndMax',
  'minus',
  'mod',
  'neg',
  'plus',
  'pow',
  'random',
  'round',
  'sqrt',
  'times',
  'toDP',
  'toExponential',
  'toFixed',
  'toFormat',
  'toFraction',
  'toNearest',
  'toNumber',
  'toPrecision',
  'toSD',
  'toStringEtc',
  'trunc'
]
.forEach( function (method) {
    arr = require('./' + method);
    passed += arr[0];
    total += arr[1];
});

console.log( '\n IN TOTAL: ' + passed + ' of ' + total + ' tests passed in ' +
    ( (+new Date() - start) / 1000 ) + ' secs.\n' );















































