var count = (function constructor(Decimal) {
    var start = +new Date(),
        log,
        error,
        undefined,
        passed = 0,
        total = 0;

    if (typeof window === 'undefined') {
        log = console.log;
        error = console.error;
    } else {
        log = function (str) { document.body.innerHTML += str.replace('\n', '<br>') };
        error = function (str) { document.body.innerHTML += '<div style="color: red">' +
          str.replace('\n', '<br>') + '</div>' };
    }

    if (!Decimal && typeof require === 'function') Decimal = require('../decimal');

    function assert(expected, actual) {
        total++;

        if (expected !== actual) {
           error('\n Test number: ' + total + ' failed');
           error(' Expected: ' + expected);
           error(' Actual:   ' + actual);
           //process.exit();
        } else {
            passed++;
            //log('\n Expected and actual: ' + actual);
        }
    }

    log('\n Testing constructor...');

    Decimal.config({
        precision: 10,
        rounding: 4,
        toExpNeg: -7,
        toExpPos: 21,
        minE: -9e15,
        maxE: 9e15,
        errors: true
    });

    var D1 = Decimal.constructor({ precision: 1 });
    var D2 = Decimal.constructor({ precision: 2 });
    var D3 = Decimal.constructor({ precision: 3 });
    var D4 = Decimal.constructor({ precision: 4 });
    var D5 = Decimal.constructor({ precision: 5 });
    var D6 = Decimal.constructor({ precision: 6 });
    var D7 = Decimal.constructor({ precision: 7 });
    var D8 = Decimal.constructor();
    D8.config({ precision: 8 });
    var D9 = Decimal.constructor({ precision: 9 });

    assert(true, Decimal.prototype === D9.prototype);
    assert(false, Decimal === D9);

    var x = new Decimal(5);
    var x1 = new D1(5);
    var x2 = new D2(5);
    var x3 = new D3(5);
    var x4 = new D4(5);
    var x5 = new D5(5);
    var x6 = new D6(5);
    var x7 = new D7(5);
    var x8 = new D8(5);
    var x9 = new D9(5);

    assert(true, x1.div(3).eq(2));
    assert(true, x2.div(3).eq(1.7));
    assert(true, x3.div(3).eq(1.67));
    assert(true, x4.div(3).eq(1.667));
    assert(true, x5.div(3).eq(1.6667));
    assert(true, x6.div(3).eq(1.66667));
    assert(true, x7.div(3).eq(1.666667));
    assert(true, x8.div(3).eq(1.6666667));
    assert(true, x9.div(3).eq(1.66666667));
    assert(true,  x.div(3).eq(1.666666667));

    var y = new Decimal(3);
    var y1 = new D1(3);
    var y2 = new D2(3);
    var y3 = new D3(3);
    var y4 = new D4(3);
    var y5 = new D5(3);
    var y6 = new D6(3);
    var y7 = new D7(3);
    var y8 = new D8(3);
    var y9 = new D9(3);

    assert(true, x1.div(y1).eq(2));
    assert(true, x2.div(y2).eq(1.7));
    assert(true, x3.div(y3).eq(1.67));
    assert(true, x4.div(y4).eq(1.667));
    assert(true, x5.div(y5).eq(1.6667));
    assert(true, x6.div(y6).eq(1.66667));
    assert(true, x7.div(y7).eq(1.666667));
    assert(true, x8.div(y8).eq(1.6666667));
    assert(true, x9.div(y9).eq(1.66666667));
    assert(true,  x.div(y).eq(1.666666667));

    assert(true, x1.div(y9).eq(2));
    assert(true, x2.div(y8).eq(1.7));
    assert(true, x3.div(y7).eq(1.67));
    assert(true, x4.div(y6).eq(1.667));
    assert(true, x5.div(y5).eq(1.6667));
    assert(true, x6.div(y4).eq(1.66667));
    assert(true, x7.div(y3).eq(1.666667));
    assert(true, x8.div(y2).eq(1.6666667));
    assert(true, x9.div(y1).eq(1.66666667));

    assert(true, Decimal.precision == 10);
    assert(true, D9.precision == 9);
    assert(true, D8.precision == 8);
    assert(true, D7.precision == 7);
    assert(true, D6.precision == 6);
    assert(true, D5.precision == 5);
    assert(true, D4.precision == 4);
    assert(true, D3.precision == 3);
    assert(true, D2.precision == 2);
    assert(true, D1.precision == 1);

    assert(false, new Decimal(9.99).eq(new D3('-9.99')));
    assert(true, new Decimal(9.99).eq(new D5('9.99')));
    assert(false, new Decimal(123.456789).toSD().eq(new D3('123.456789').toSD()));
    assert(true, new Decimal(123.456789).round().eq(new D3('123.456789').round()));

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.Decimal);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
