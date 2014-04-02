/*
For help:
    $ node bigtime -h

Usage example:
    Compare the time taken by the Decimal plus method and the BigDecimal add method.
    Time 10000 calls to each.
    Use operands of up to 40 random digits (each unique for each iteration).
    Check that the Decimal results match the BigDecimal results.

    $ node bigtime plus 10000 40
*/

var arg, i, j, max, mc, method, methodIndex, precision, rounding, reps, start,
     timesEqual, xs, ys, prevRss, prevHeapUsed, prevHeapTotal, showMemory,
    bdM, bdT, bdR, bdRs, dM, dT, dR, dRs,
    args = process.argv.splice(2),
    bigdecimal = require('./lib/bigdecimal_GWT/bigdecimal'),
    BigDecimal = bigdecimal.BigDecimal,
    MathContext = bigdecimal.MathContext,
    Decimal = require('../../decimal'),
    bdMs = ['add', 'subtract', 'multiply', 'divide', 'remainder', 'compareTo', 'pow', 'negate', 'abs'],
    dMs1 = ['plus', 'minus', 'times', 'dividedBy', 'modulo', 'comparedTo', 'toPower', 'negated', 'abs'],
    dMs2 = ['', '', '', 'div', 'mod', 'cmp', '', 'neg', ''],
    Ms = [bdMs, dMs1, dMs2],
    allMs = [].concat.apply([], Ms),
    bdTotal = 0,
    dTotal = 0,
    BD = {},
    BN = {},
    modes = ['UP', 'DOWN', 'CEILING', 'FLOOR', 'HALF_UP', 'HALF_DOWN', 'HALF_EVEN'],

    ALWAYS_SHOW_MEMORY = false,
    DEFAULT_MAX_DIGITS = 20,
    DEFAULT_POW_MAX_DIGITS = 20,
    DEFAULT_REPS = 1e4,
    DEFAULT_POW_REPS = 1e2,
    DEFAULT_PRECISION = 20,
    MAX_POWER = 50,
    MAX_RANDOM_EXPONENT = 100,

    getRandom = function (maxDigits) {
        var z,
            i = 0,
            // number of digits - 1
            n = Math.random() * ( maxDigits || 1 ) | 0,
            // No numbers between 0 and 1 or BigDecimal remainder operation may fail with 'Division impossible' error.
            r = ( ( bdM == 'remainder' ? Math.random() * 9 + 1 : Math.random() * 10 ) | 0 ) + '';
            //r = ( Math.random() * 10 | 0 ) + '';

        if (n) {

            if ( z = r === '0' ) {
                r += '.';
            }

            for ( ; i++ < n; r += Math.random() * 10 | 0 ) {
            }

            // 20% chance of integer
            if ( !z && Math.random() > 0.2 ) {
                r = r.slice( 0, i = ( Math.random() * n | 0 ) + 1 ) + '.' + r.slice(i);
            }
        }

        // Avoid 'division by zero' error with division and modulo.
        if ((bdM == 'divide' || bdM == 'remainder') && parseFloat(r) === 0) {
            r = ( ( Math.random() * 9 | 0 ) + 1 ) + '';
        }

        // 50% chance of negative
        return Math.random() > 0.5 ? r : '-' + r;
    },

    /*
    // Returns exponential notation.
    getRandom = function (maxDigits) {
        var i = 0,
            // n is the number of significant digits - 1
            n = Math.random() * (maxDigits || 1) | 0,
            r = ( ( Math.random() * 9 | 0 ) + 1 ) + ( n ? '.' : '' );

        for (; i++ < n; r += Math.random() * 10 | 0 ) {}

        // Add exponent.
        r += 'e' + ( Math.random() > 0.5 ? '+' : '-' ) +
                   ( Math.random() * MAX_RANDOM_EXPONENT | 0 );

        // 50% chance of being negative.
        return Math.random() > 0.5 ? r : '-' + r
    },
     */

    getFastest = function (d, bd) {
        var r;

        if (Math.abs(d - bd) > 2) {
            r = ((d < bd)
              ? 'Decimal was ' + (d ? parseFloat((bd / d).toFixed(1)) : bd)
              : 'BigDecimal was ' + (bd ? parseFloat((d / bd).toFixed(1)) : d)) + ' times faster';
        } else {
            timesEqual = 1;
            r = 'Times approximately equal';
        }

        return r;
    },

    getMemory = function (obj) {

        if (showMemory) {
            var mem = process.memoryUsage(),
                rss = mem.rss,
                heapUsed = mem.heapUsed,
                heapTotal = mem.heapTotal;

            if (obj) {
                obj.rss += (rss - prevRss);
                obj.hU += (heapUsed - prevHeapUsed);
                obj.hT += (heapTotal - prevHeapTotal);
            }
            prevRss = rss;
            prevHeapUsed = heapUsed;
            prevHeapTotal = heapTotal;
        }
    },

    toKB = function (m) { return parseFloat((m / 1024).toFixed(1)) },

    getMemoryTotals = function (obj) {

        return '\trss: ' + toKB(obj.rss) + '\thU: ' + toKB(obj.hU) + '\thT: ' + toKB(obj.hT);
    };

arg = args[0];

if ( typeof arg != 'undefined' && !isFinite(arg) &&
    allMs.indexOf(arg) == -1 && !/^-*m$/i.test(arg)) {
    console.log(
        '\n node bigtime [METHOD] [METHOD CALLS [MAX DIGITS [precision]]]\n' +
        '\n METHOD: The method to be timed and compared with the' +
        '\n \t corresponding method from BigDecimal or Decimal\n' +
        '\n   BigDecimal: add subtract multiply divide remainder compareTo pow' +
        '\n\t\tnegate abs\n\n   Decimal: plus minus times dividedBy modulo comparedTo toPower' +
        '\n\t\tnegated abs (div mod cmp pow neg)' +
        '\n\n METHOD CALLS: The number of method calls to be timed' +
        '\n\n MAX DIGITS: The maximum number of digits of the random ' +
        '\n\t\tnumbers used in the method calls\n\n ' +
        'precision: The maximum number of significant digits of a result' +
        '\n\t\t(The rounding mode is randomly chosen)' +
        '\n\n Default values: METHOD: randomly chosen' +
        '\n\t\t METHOD CALLS: ' + DEFAULT_REPS + '  (pow: ' + DEFAULT_POW_REPS + ')' +
        '\n\t\t MAX DIGITS: ' + DEFAULT_MAX_DIGITS +  '  (pow: ' + DEFAULT_POW_MAX_DIGITS + ')' +
        '\n\t\t precision: ' + DEFAULT_PRECISION + '\n' +
        '\n E.g.   node bigtime\n\tnode bigtime minus\n\tnode bigtime add 100000' +
        '\n\tnode bigtime times 20000 100\n\tnode bigtime div 100000 50 20' +
        '\n\tnode bigtime 9000\n\tnode bigtime 1000000 20\n' +
        '\n To show memory usage, include an argument m or -m' +
        '\n E.g.   node bigtime m add'
    );
} else {


    // INITALISE


    Decimal.config({
        toExpNeg: -9e15,
        toExpPos: 9e15,
        minE: -9e15,
        maxE: 9e15
    });

    Number.prototype.toPlainString = Number.prototype.toString;

    for (i = 0; i < args.length; i++) {
        arg = args[i];

        if (isFinite(arg)) {
            arg = Math.abs(parseInt(arg));

            if (reps == null) reps = arg <= 1e10 ? arg : 0;
            else if (max == null)  max = arg <= 1e6 ? arg : 0;
            else if (precision == null) precision = arg <= 1e6 ? arg : DEFAULT_PRECISION;
        } else if (/^-*m$/i.test(arg)) {
            showMemory = true;
        } else if (method == null) {
            method = arg;
        }
    }

    for (i = 0; i < Ms.length && (methodIndex = Ms[i].indexOf(method)) == -1; i++) {}

    dM = methodIndex == -1
      ? dMs1[methodIndex = Math.floor(Math.random() * bdMs.length)]
      : (Ms[i][0] == 'add' ? dMs1 : Ms[i])[methodIndex];

    bdM = bdMs[methodIndex];

    if (!reps) reps = bdM == 'pow' ? DEFAULT_POW_REPS : DEFAULT_REPS;

    if (!max) max = bdM == 'pow' ? DEFAULT_POW_MAX_DIGITS : DEFAULT_MAX_DIGITS;

    if (precision == null) precision = DEFAULT_PRECISION;

    /*
    BigDecimal remainder needs precision to be >= number of digits of operands:
    "Division impossible: This occurs and signals invalid-operation if the integer result of a
    divide-integer or remainder operation had too many digits (would be longer than precision)."
     */
    if ( bdM == 'remainder' && max > precision ) {
        max = precision;
    }

    // Get random rounding mode.
    rounding = Math.floor(Math.random() * 7);

    xs = [reps], ys = [reps], bdRs = [reps], dRs = [reps];
    BD.rss = BD.hU = BD.hT = BN.rss = BN.hU = BN.hT = 0;
    showMemory = showMemory || ALWAYS_SHOW_MEMORY;

    console.log('\n Decimal %s vs BigDecimal %s\n' +
      '\n Method calls: %d\n\n Random operands: %d', dM, bdM, reps,
        bdM == 'abs' || bdM == 'negate' || bdM == 'abs' ? reps : reps * 2);

    console.log(' Max. digits of operands: %d', max);

    console.log('\n Precision: %d\n Rounding mode: %d', precision, rounding);

    process.stdout.write('\n Testing started');


    // TEST


    outer:
    for (; reps > 0; reps -= 1e4) {

        j = Math.min(reps, 1e4);


        // GENERATE RANDOM OPERANDS


        for (i = 0; i < j; i++) {
            xs[i] = getRandom(max);
        }

        if (bdM == 'pow') {
            for (i = 0; i < j; i++) {
                ys[i] = Math.floor(Math.random() * (MAX_POWER + 1));
            }
        } else if (bdM != 'abs' && bdM != 'negate') {
            for (i = 0; i < j; i++) {
                ys[i] = getRandom(max);
            }
        }

        getMemory();


        // BIGDECIMAL


        /*
         // Rounding modes 0 UP, 1 DOWN, 2 CEILING, 3 FLOOR, 4 HALF_UP, 5 HALF_DOWN, 6 HALF_EVEN

         new BigDecimal('100').divide( new BigDecimal('3') );   // Exception, needs a rounding mode.
         new BigDecimal('100').divide( new BigDecimal('3'), 0 ).toString();    // 34

         var x = new BigDecimal('5');
         var y = new BigDecimal('3');

         // MathContext objects need to be initialised with a string!?
         var mc = new MathContext('precision=5 roundingMode=HALF_UP');
         console.log( x.divide( y, mc ).toString() );                         // '1.6667'

         // UNLIMITED  precision=0 roundingMode=HALF_UP
         // DECIMAL32  precision=7 roundingMode=HALF_EVEN
         // DECIMAL64  precision=16 roundingMode=HALF_EVEN
         // DECIMAL128 precision=34 roundingMode=HALF_EVEN
         // Note that these are functions!
         console.log( x.divide( y, MathContext.DECIMAL64() ).toString() );   // '1.666666666666667'

         // Set scale (i.e. decimal places) and rounding mode.
         console.log( x.divide( y, 2, 4 ).toString() );                       // '1.67'

         // DOWN is a function, ROUND_DOWN is not!
         console.log( x.divide( y, 6, RoundingMode.DOWN() ).toString() );     // '1.666666'
         console.log( x.divide( y, 6, BigDecimal.ROUND_DOWN ).toString() );   // '1.666666'
         */


        mc = new MathContext('precision=' + precision + ' roundingMode=' + modes[rounding] );

        if (bdM == 'pow') {

            start = +new Date();
            for (i = 0; i < j; i++) {
                bdRs[i] = new BigDecimal(xs[i])[bdM](ys[i], mc);
            }
            bdT = +new Date() - start;

        } else if (bdM == 'abs' || bdM == 'negate') {

            start = +new Date();
            for (i = 0; i < j; i++) {
                bdRs[i] = new BigDecimal(xs[i])[bdM]();
            }
            bdT = +new Date() - start;

        } else {

            start = +new Date();
            for (i = 0; i < j; i++) {
                bdRs[i] = new BigDecimal(xs[i])[bdM](new BigDecimal(ys[i]), mc);
            }
            bdT = +new Date() - start;

        }

        getMemory(BD);


        /*
         // Debug: insert the following into the for-loop above.
         try {
             bdRs[i] = new BigDecimal(xs[i])[bdM](new BigDecimal(ys[i]), mc);
         } catch(e) {
             console.log(e);
             console.log('\n Error. Operation number ' + i);
             console.log('\n x: %s\n y: %s', xs[i], ys[i]);
             console.log('\n precision: %d\n rounding: %d', precision, rounding);
             bdRs[i] = { toPlainString: function () { return 'failed' } };
         }
         */


        // BIGNUMBER


        Decimal.config({ precision: precision, rounding: rounding });

        if (bdM == 'abs' || bdM == 'negate') {

            start = +new Date();
            for (i = 0; i < j; i++) {
                dRs[i] = new Decimal(xs[i])[dM]();
            }
            dT = +new Date() - start;

        } else {

            start = +new Date();
            for (i = 0; i < j; i++) {
                dRs[i] = new Decimal(xs[i])[dM](ys[i]);
            }
            dT = +new Date() - start;

        }

        getMemory(BN);


        // CHECK FOR MISMATCHES


        for (i = 0; i < j; i++) {
            dR = dRs[i].toString();
            bdR = bdRs[i].toPlainString();

            // Strip any trailing zeros from non-integer BigDecimals
            if (bdR.indexOf('.') != -1) {
                bdR = bdR.replace(/\.?0+$/, '');
            }

            if (bdR !== dR) {
                console.log(
                  '\n breaking on first mismatch (result number %d):' +
                  '\n\n BigDecimal: %s\n Decimal:    %s', i, bdR, dR
                );

                console.log('\n x: %s\n y: %s', xs[i], ys[i]);
                console.log('\n precision: %d\n rounding: %d', precision, rounding);

                break outer;
            }
        }

        bdTotal += bdT;
        dTotal += dT;

        process.stdout.write(' .');
    }


    // TIMINGS SUMMARY


    if (i == j) {
        console.log(' done\n\n No mismatches.');

        if (showMemory) {
            console.log(
              '\n Change in memory usage (KB):' +
              '\n\tBigDecimal' + getMemoryTotals(BD) +
              '\n\tDecimal ' + getMemoryTotals(BN)
            );
        }

        console.log(
            '\n Time taken:' + '\n\tBigDecimal  ' + (bdTotal || '<1') + ' ms' +
                               '\n\tDecimal     ' + ( dTotal || '<1') + ' ms\n\n ' +
            getFastest(dTotal, bdTotal) + '\n'
        );
    }
}

/*
BigDecimal notes:
Java standard class library: java.math.BigDecimal

Exports:
  RoundingMode
  MathContext
  BigDecimal
  BigInteger

BigDecimal properties:
  ROUND_CEILING
  ROUND_DOWN
  ROUND_FLOOR
  ROUND_HALF_DOWN
  ROUND_HALF_EVEN
  ROUND_HALF_UP
  ROUND_UNNECESSARY
  ROUND_UP
  __init__
  valueOf
  log
  logObj
  ONE
  TEN
  ZERO

BigDecimal instance properties/methods:
( for (var i in new BigDecimal('1').__gwt_instance.__gwtex_wrap) {...} )

  byteValueExact
  compareTo
  doubleValue
  equals
  floatValue
  hashCode
  intValue
  intValueExact
  max
  min
  movePointLeft
  movePointRight
  precision
  round
  scale
  scaleByPowerOfTen
  shortValueExact
  signum
  stripTrailingZeros
  toBigInteger
  toBigIntegerExact
  toEngineeringString
  toPlainString
  toString
  ulp
  unscaledValue
  longValue
  longValueExact
  abs
  add
  divide
  divideToIntegralValue
  multiply
  negate
  plus
  pow
  remainder
  setScale
  subtract
  divideAndRemainder
*/
