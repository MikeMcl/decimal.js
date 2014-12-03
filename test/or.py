import random
from decimal import *

header_str = """var count = (function plus(Decimal) {
    var start = +new Date(),
        log,
        error,
        undefined,
        passed = 0,
        total = 0,
        n = 'null',
        N = 'NaN',
        I = 'Infinity';

    if (typeof window === 'undefined') {
        log = console.log;
        error = console.error;
    } else {
        log = function (str) { document.body.innerHTML += str.replace('\\n', '<br>') };
        error = function (str) { document.body.innerHTML += '<div style="color: red">' +
          str.replace('\\n', '<br>') + '</div>' };
    }

    if (!Decimal && typeof require === 'function') Decimal = require('../decimal');

    function assert(expected, actual) {
        total++;
        if (expected !== actual) {
           error('\\n Test number: ' + total + ' failed');
           error(' Expected: ' + expected);
           error(' Actual:   ' + actual);
           //process.exit();
        } else {
            passed++;
            //log('\\n Expected and actual: ' + actual);
        }
    }

    function T(orendA, orendB, expected, sd, rm) {

        if ( sd != null ) {
            Decimal.precision = sd;
            Decimal.rounding = rm;
        }
        assert(String(expected), String(new Decimal(orendA).or(orendB)));
    }

    log('\\n Testing or...');

    Decimal.config({
        precision: 20,
        rounding: 4,
        toExpNeg: -9e15,
        toExpPos: 9e15,
        minE: -9e15,
        maxE: 9e15,
        errors: false
    });

    T(1, 0, 1);
    T(1, -0, 1);
    T(-1, 0, -1);
    T(-1, -0, -1);
    T(1, N, N);
    T(-1, N, N);
    T(1, I, I);
    T(1, -I, -I);
    T(-1, I, -1);
    T(-1, -I, -1);
    T(0, 1, 1);
    T(0, -1, -1);
    T(-0, 1, 1);
    T(-0, -1, -1);

    T(0, N, N);
    T(-0, N, N);
    T(0, I, I);
    T(0, -I, -I);
    T(-0, I, I);
    T(-0, -I, -I);
    T(N, 1, N);
    T(N, -1, N);
    T(N, 0, N);
    T(N, -0, N);
    T(N, N, N);
    T(N, I, N);
    T(N, -I, N);
    T(I, 1, I);
    T(I, -1, -1);
    T(-I, 1, -I);
    T(-I, -1, -1);
    T(I, 0, I);
    T(I, -0, I);
    T(-I, 0, -I);
    T(-I, -0, -I);
    T(I, N, N);
    T(-I, N, N);
    T(I, I, I);
    T(I, -I, -1);
    T(-I, I, -1);
    T(-I, -I, -I);

    T(1, '0', '1');
    T(1, '1', '1');
    T(1, '-45', '-45');
    T(1, '22', '23');
    T(1, '0144', '145');
    T(1, '6.1915', '7');
    T(1, '-1.02', '-1');

"""

modes = [
'ROUND_UP',
'ROUND_DOWN',
'ROUND_CEILING',
'ROUND_FLOOR',
'ROUND_HALF_UP',
'ROUND_HALF_DOWN',
'ROUND_HALF_EVEN',
'ROUND_05UP'
]

def getRand(i,d):
    return Decimal('%d.%0*d' % (random.randint(0, 10**i-1), d, random.randint(0, 10**d-1)))

def getRandExp(max_digits=20, max_exp=3):
    s = '' if random.randint(1, 2) == 1 else '-'
    s += str(random.randint(1, 9)) + '.'

    for i in range(random.randint(0, max_digits - 1)):
        s += str(random.randint(0, 9))

    s += 'e-' if random.randint(1, 4) == 1 else 'e+'

    for i in range(random.randint(1, max_exp)):
        s += str(random.randint(0, 9))

    try:
        d = Decimal(s)
    except Exception, e:
        d = getRandExp(max_digits, max_exp)

    return d

def sci_str(dec):
    return ('{:.' + str(len(str(dec)) - 1) + 'e}').format(dec)

file = open('or.js', 'w')
file.write(header_str + '\n')


ctx = getcontext()
ctx.Emax = 9000000000000000
ctx.Emin = -9000000000000000
max = Decimal('9.9e+300')
min = Decimal('-9.9e300')
i = 0
biggest = Decimal('0')

while i < 200000:
    x = getRandExp()
    y = getRandExp()

    if ((x < min or x > max or x == Decimal('0')) or
            (y < min or y > max or y == Decimal('0'))):
        continue

    # Maximum precision of result.
    pr = random.randint(1, 100)

    # Rounding mode
    rm = random.randint(0, 6)
    result_rm = modes[rm]

    ctx.prec = pr
    ctx.rounding = result_rm

    try:
        result = Decimal(int(x) | int(y))
    except Exception, e:
        print(e.message)
        print( str(i) + ':  sqrt(' + str(x) + ')' )
        continue

    if result < min or result > max or result == Decimal('0') or result == Decimal('1'):
        continue

    result = ( "    T('" + str(x) + "', '" + str(y) + "', '" + str(result) + "', " + str(pr) + ", " + str(rm) + ");\n" )

    if x > biggest:
        biggest = x

    if i % 100 == 0:
        print(i)

    file.write(result)
    #print(result)

    i += 1

print('biggest: ' + sci_str(biggest))
file.write("""
    log('\\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \\n');
    return [passed, total];
})(this.Decimal);
if (typeof module !== 'undefined' && module.exports) module.exports = count;""")
file.close()
