var count = (function config(Decimal) {
    var start = +new Date(),
        log,
        error,
        obj,
        undefined,
        passed = 0,
        total = 0,
        state,
        T;

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

    function assertException(func, message) {
        var actual;
        total++;
        try {
            func();
        } catch (e) {
            actual = e;
        }
        if (actual && actual.name == 'Decimal Error') {
            passed++;
            //log('\n Expected and actual: ' + actual);
        } else {
            error('\n Test number: ' + total + ' failed');
            error('\n Expected: ' + message + ' to raise a Decimal Error.');
            error(' Actual:   ' + (actual || 'no exception'));
            //process.exit();
        }
    }

    log('\n Testing config...');

    Decimal.config({
        precision: 20,
        rounding: 4,
        toExpNeg: -7,
        toExpPos: 21,
        minE: -9e15,
        maxE: 9e15,
        errors: false,
        crypto: false,
        modulo: 1
    });

    assert(
        true,
        Decimal.precision === 20 &&
        Decimal.rounding === 4 &&
        Decimal.toExpNeg === -7 &&
        Decimal.toExpPos === 21 &&
        Decimal.minE === -9e15 &&
        Decimal.maxE === 9e15 &&
        Decimal.errors === false &&
        Decimal.crypto === false &&
        Decimal.modulo === 1
    );

    Decimal.config({
        precision: 40,
        rounding : 4,
        toExpNeg: -1000,
        toExpPos: 1000,
        minE: -1e9,
        maxE: 1e9,
        errors: true,
        crypto: true,
        modulo: 4
    });

    assert(true, Decimal.config() === Decimal);
    assert(true, Decimal.config(undefined) === Decimal);
    assert(true, Decimal.config(null) === Decimal);

    // Throw if not an object object.
    assertException(function () {Decimal.config('')}, "config('')");
    assertException(function () {Decimal.config('hi')}, "config('hi')");
    assertException(function () {Decimal.config(4)}, "config(4)");

    assert(true, Decimal.precision === 40);
    assert(true, Decimal.rounding === 4);
    assert(true, Decimal.toExpNeg === -1000);
    assert(true, Decimal.toExpPos === 1000);
    assert(true, Decimal.minE === -1e9);
    assert(true, Decimal.maxE === 1e9);
    assert(true, Decimal.errors === true);
    assert(true, Decimal.crypto === true || Decimal.crypto === false);
    assert(true, Decimal.modulo === 4);

    Decimal.config({
        toExpNeg: -7,
        toExpPos: 21,
        minE: -324,
        maxE: 308
    });

    // precision

    T = function (expected, obj) {
        Decimal.config(obj);
        assert(String(expected), String(Decimal.precision));
    }

    T(1, {precision: 1});
    T(20, {precision: 20});
    T(300000,{precision: 300000});
    T(4e+8, {precision: 4e8});
    T(123456789, {precision: '123456789'});
    T(1e9, {precision: 1e9});
    T(1e9, {precision: null});
    T(1e9, {precision: undefined});

    assertException(function () {Decimal.config({precision: -1})}, "precision: -1");
    assertException(function () {Decimal.config({precision: 0.1})}, "precision: 0.1");
    assertException(function () {Decimal.config({precision: 1.1})}, "precision: 1.1");
    assertException(function () {Decimal.config({precision: -1.1})}, "precision: -1.1");
    assertException(function () {Decimal.config({precision: 8.1})}, "precision: 8.1");
    assertException(function () {Decimal.config({precision: 1e+9 + 1})}, "precision: 1e9 + 1");
    assertException(function () {Decimal.config({precision: []})}, "precision: []");
    assertException(function () {Decimal.config({precision: {}})}, "precision: {}");
    assertException(function () {Decimal.config({precision: ''})}, "precision: ''");
    assertException(function () {Decimal.config({precision: ' '})}, "precision: '  '");
    assertException(function () {Decimal.config({precision: 'hi'})}, "precision: 'hi'");
    assertException(function () {Decimal.config({precision: '1e+9'})}, "precision: '1e+9'");
    assertException(function () {Decimal.config({precision: NaN})}, "precision: NaN");
    assertException(function () {Decimal.config({precision: Infinity})}, "precision: Infinity");

    Decimal.config({ errors: false });

    T(1e9, {precision: -1});
    T(1e9, {precision: 0.1});
    T(1, {precision: 1.99});
    T(1, {precision: -1.1});
    T(8, {precision: 8.7654321});
    T(8, {precision: 1e9 + 1});
    T(8, {precision: []});
    T(8, {precision: {}});
    T(8, {precision: ''});
    T(8, {precision: ' '});
    T(8, {precision: 'hi'});
    T(1e9, {precision: '1e+9'});
    T(1e9, {precision: NaN});
    T(1e9, {precision: Infinity});
    T(1e9, {precision: new Date});
    T(1e9, {precision: null});
    T(1e9, {precision: undefined});

    // rounding

    T = function (expected) {
        assert(expected, Decimal.rounding);
    }

    Decimal.config({ rounding: 8, errors: 0 });

    Decimal.config({rounding: -1}); T(8);
    Decimal.config({rounding: 0.1}); T(0);
    Decimal.config({rounding: 1.99}); T(1);
    Decimal.config({rounding: -1.1}); T(1);
    Decimal.config({rounding: 8.01}); T(1);
    Decimal.config({rounding: 7.99}); T(7);
    Decimal.config({rounding: 1e9 + 1}); T(7);
    Decimal.config({rounding: []}); T(7);
    Decimal.config({rounding: {}}); T(7);
    Decimal.config({rounding: ''}); T(7);
    Decimal.config({rounding: ' '}); T(7);
    Decimal.config({rounding: 'hi'}); T(7);
    Decimal.config({rounding: '1e+0'}); T(1);
    Decimal.config({rounding: NaN}); T(1);
    Decimal.config({rounding: Infinity}); T(1);
    Decimal.config({rounding: new Date}); T(1);
    Decimal.config({rounding: null}); T(1);
    Decimal.config({rounding: undefined}); T(1);

    Decimal.config({ errors: true });

    T = function (expected, rm) {
        Decimal.config(rm);
        assert(String(expected), String(Decimal.rounding));
    }

    T(0, {rounding: 0});
    T(1, {rounding: 1});
    T(2, {rounding: 2});
    T(3, {rounding: 3});
    T(4, {rounding: 4});
    T(5, {rounding: 5});
    T(6, {rounding: 6});
    T(7, {rounding: 7});
    T(8, {rounding: 8});

    T(8, {rounding: null});
    T(8, {rounding: undefined});

    assertException(function () {Decimal.config({rounding: -1})}, "rounding : -1");
    assertException(function () {Decimal.config({rounding: 0.1})}, "rounding : 0.1");
    assertException(function () {Decimal.config({rounding: 1.1})}, "rounding : 1.1");
    assertException(function () {Decimal.config({rounding: -1.1})}, "rounding : -1.1");
    assertException(function () {Decimal.config({rounding: 8.1})}, "rounding : 8.1");
    assertException(function () {Decimal.config({rounding: 9})}, "rounding : 9");
    assertException(function () {Decimal.config({rounding: 11})}, "rounding : 11");
    assertException(function () {Decimal.config({rounding: []})}, "rounding : []");
    assertException(function () {Decimal.config({rounding: {}})}, "rounding : {}");
    assertException(function () {Decimal.config({rounding: ''})}, "rounding : ''");
    assertException(function () {Decimal.config({rounding: ' '})}, "rounding : '  '");
    assertException(function () {Decimal.config({rounding: 'hi'})}, "rounding : 'hi'");
    assertException(function () {Decimal.config({rounding: NaN})}, "rounding : NaN");
    assertException(function () {Decimal.config({rounding: Infinity})}, "rounding : Infinity");

    // toExpNeg, toExpPos

    assert(true, Decimal.toExpNeg === -7);
    assert(true, Decimal.toExpPos === 21);

    assertException(function () {Decimal.config({toExpNeg: 0.1})}, "toExpNeg: 0.1");
    assertException(function () {Decimal.config({toExpPos: -0.1})}, "toExpPos: -0.1");
    assertException(function () {Decimal.config({toExpNeg: 1})}, "toExpNeg: 1");
    assertException(function () {Decimal.config({toExpPos: -1})}, "toExpPos: -1");
    assertException(function () {Decimal.config({toExpNeg: 1e9 + 1})},  "toExpNeg: 1e9 + 1");
    assertException(function () {Decimal.config({toExpPos: -1e9 - 1})}, "toExpPos: -1e9 - 1");
    assertException(function () {Decimal.config({toExpNeg: Infinity})}, "toExpNeg: Infinity");
    assertException(function () {Decimal.config({toExpPos: -Infinity})}, "toExpPos: -Infinity");

    assert(true, Decimal.toExpNeg === -7);
    assert(true, Decimal.toExpPos === 21);

    Decimal.config({toExpNeg: -1});
    assert(-1, Decimal.toExpNeg);
    Decimal.config({toExpPos: 1});
    assert(1, Decimal.toExpPos);

    Decimal.config({toExpNeg: 0});
    assert(true, Decimal.toExpNeg === 0);
    assert(false, Decimal.toExpPos === 0);

    Decimal.config({toExpNeg: -1});
    assert(true, Decimal.toExpNeg === -1 && Decimal.toExpPos !== -1);

    Decimal.config({ errors: true });

    // minE, maxE

    assert(true, Decimal.minE === -324);
    assert(true, Decimal.maxE === 308);

    assertException(function () {Decimal.config({minE: -0.9})}, "minE: -0.9");
    assertException(function () {Decimal.config({maxE: 0.9})}, "maxE: 0.9");
    assertException(function () {Decimal.config({maxE: -1})}, "maxE: -1");
    assertException(function () {Decimal.config({minE: 1})}, "minE: 1");
    assertException(function () {Decimal.config({minE: -9e16})},  "minE: -9e16");
    assertException(function () {Decimal.config({maxE: -1e9})}, "maxE: -1e9");
    assertException(function () {Decimal.config({minE: 1e9})},  "minE: 1e9");
    assertException(function () {Decimal.config({maxE: 9e16})}, "maxE: 9e16");
    assertException(function () {Decimal.config({minE: Infinity})}, "minE: Infinity");
    assertException(function () {Decimal.config({maxE: Infinity})}, "maxE: Infinity");
    assertException(function () {Decimal.config({minE: "-Infinity"})}, "minE: '-Infinity'");
    assertException(function () {Decimal.config({maxE: "-Infinity"})}, "maxE: '-Infinity'");

    assert(true, Decimal.minE === -324);
    assert(true, Decimal.maxE === 308);

    Decimal.config({minE: -1});
    assert(true, Decimal.minE === -1 && Decimal.maxE !== 1);
    Decimal.config({maxE: 1});
    assert(true, Decimal.minE !== 1 && Decimal.maxE === 1);

    // errors

    Decimal.config({errors: 0});
    assert(false, Decimal.errors);
    Decimal.config({errors: 1});
    assert(true,  Decimal.errors);
    Decimal.config({errors: false});
    assert(false, Decimal.errors);
    Decimal.config({errors: true});
    assert(true,  Decimal.errors);
    Decimal.config({errors: null});
    assert(true,  Decimal.errors);
    Decimal.config({errors: undefined});
    assert(true,  Decimal.errors);

    assertException(function () {Decimal.config({errors: 'hiya'})}, "errors: 'hiya'");
    assertException(function () {Decimal.config({errors: 'true'})}, "errors: 'true'");
    assertException(function () {Decimal.config({errors: 'false'})}, "errors: 'false'");
    assertException(function () {Decimal.config({errors: '0'})}, "errors: '0'");
    assertException(function () {Decimal.config({errors: '1'})}, "errors: '1'");
    assertException(function () {Decimal.config({errors: -1})}, "errors: -1");
    assertException(function () {Decimal.config({errors: 0.1})}, "errors: 0.1");
    assertException(function () {Decimal.config({errors: 1.1})}, "errors: 1.1");
    assertException(function () {Decimal.config({errors: []})}, "errors: []");
    assertException(function () {Decimal.config({errors: {}})}, "errors: {}");
    assertException(function () {Decimal.config({errors: ''})}, "errors: ''");
    assertException(function () {Decimal.config({errors: ' '})}, "errors: '  '");
    assertException(function () {Decimal.config({errors: NaN})}, "errors: NaN");
    assertException(function () {Decimal.config({errors: Infinity})}, "errors: Infinity");

    assert(true, Decimal.errors);

    Decimal.config({ errors: false });

    T = function (expected, err) {
        Decimal.config(err);
        assert(String(expected), String(Decimal.errors));
    }

    T(false, {errors: null});
    T(false, {errors: undefined});
    T(false, {errors: NaN});
    T(false, {errors: 'd'});
    T(false, {errors: []});
    T(false, {errors: {}});
    T(false, {errors: new Date});
    T(true, {errors: Boolean(1)});
    T(true, {errors: Boolean(true)});
    T(false, {errors: Boolean(0)});
    T(false, {errors: Boolean(false)});
    T(true, {errors: Boolean('false')});

    // crypto

    T = function (expected, obj) {
        Decimal.config(obj);
        assert(String(expected), String(Decimal.crypto));
    }

    Decimal.config({ crypto: true });
    state = Decimal.crypto;

    assertException(function () {Decimal.config({crypto: 'hiya'})}, "crypto: 'hiya'");
    assertException(function () {Decimal.config({crypto: 'true'})}, "crypto: 'true'");
    assertException(function () {Decimal.config({crypto: 'false'})}, "crypto: 'false'");
    assertException(function () {Decimal.config({crypto: '0'})}, "crypto: '0'");
    assertException(function () {Decimal.config({crypto: '1'})}, "crypto: '1'");
    assertException(function () {Decimal.config({crypto: -1})}, "crypto: -1");
    assertException(function () {Decimal.config({crypto: 0.1})}, "crypto: 0.1");
    assertException(function () {Decimal.config({crypto: 1.1})}, "crypto: 1.1");
    assertException(function () {Decimal.config({crypto: []})}, "crypto: []");
    assertException(function () {Decimal.config({crypto: {}})}, "crypto: {}");
    assertException(function () {Decimal.config({crypto: ''})}, "crypto: ''");
    assertException(function () {Decimal.config({crypto: ' '})}, "crypto: '  '");
    assertException(function () {Decimal.config({crypto: NaN})}, "crypto: NaN");
    assertException(function () {Decimal.config({crypto: Infinity})}, "crypto: Infinity");

    Decimal.config({ errors: false });

    T(state, {crypto: null});
    T(state, {crypto: undefined});
    T(state, {crypto: NaN});
    T(state, {crypto: 'd'});
    T(state, {crypto: []});
    T(state, {crypto: {}});
    T(state, {crypto: new Date});
    T(state, {crypto: Boolean(1)});
    T(state, {crypto: Boolean(true)});
    T(false, {crypto: Boolean(0)});
    T(false, {crypto: Boolean(false)});
    T(state, {crypto: Boolean('false')});
    T(false, {crypto: false});
    T(state, {crypto: 1});
    T(false, {crypto: 0});
    T(state, {crypto: true});

    // modulo

    Decimal.config({ errors: true });

    T = function (expected, rm) {
        Decimal.config(rm);
        assert(String(expected), String(Decimal.modulo));
    }

    T(0, {modulo: 0});
    T(1, {modulo: 1});
    T(2, {modulo: 2});
    T(3, {modulo: 3});
    T(4, {modulo: 4});
    T(5, {modulo: 5});
    T(6, {modulo: 6});
    T(7, {modulo: 7});
    T(8, {modulo: 8});
    T(9, {modulo: 9});

    T(9, {modulo: null});
    T(9, {modulo: undefined});

    assertException(function () {Decimal.config({modulo: -1})}, "modulo: -1");
    assertException(function () {Decimal.config({modulo: 0.1})}, "modulo: 0.1");
    assertException(function () {Decimal.config({modulo: 1.1})}, "modulo: 1.1");
    assertException(function () {Decimal.config({modulo: -1.1})}, "modulo: -1.1");
    assertException(function () {Decimal.config({modulo: 8.1})}, "modulo: 8.1");
    assertException(function () {Decimal.config({modulo: 10})}, "modulo: 10");
    assertException(function () {Decimal.config({modulo: -11})}, "modulo: -11");
    assertException(function () {Decimal.config({modulo: []})}, "modulo: []");
    assertException(function () {Decimal.config({modulo: {}})}, "modulo: {}");
    assertException(function () {Decimal.config({modulo: ''})}, "modulo: ''");
    assertException(function () {Decimal.config({modulo: ' '})}, "modulo: '  '");
    assertException(function () {Decimal.config({modulo: 'hi'})}, "modulo: 'hi'");
    assertException(function () {Decimal.config({modulo: NaN})}, "modulo: NaN");
    assertException(function () {Decimal.config({modulo: Infinity})}, "modulo: Infinity");

    assert(9, Decimal.modulo);

    // Test constructor parsing.

    Decimal.config({
        precision: 40,
        rounding: 4,
        toExpNeg: -7,
        toExpPos: 21,
        minE: -9e15,
        maxE: 9e15,
        errors: true,
        crypto: false,
        modulo: 1
    });

    T = function (expected, n) {
        assert(String(expected), String(new Decimal(n).toString()));
    }

    T('123.456789', 123.456789);
    T('123.456789', '123.456789');

    var N = 'NaN';

    T(N, NaN);
    T(N, 'NaN');
    T(N, ' NaN');
    T(N, 'NaN ');
    T(N, ' NaN ');
    T(N, '+NaN');
    T(N, ' +NaN');
    T(N, '+NaN ');
    T(N, ' +NaN ');
    T(N, '-NaN');
    T(N, ' -NaN');
    T(N, '-NaN ');
    T(N, ' -NaN ');

    assertException(function () {new Decimal('+ NaN')}, "+ NaN");
    assertException(function () {new Decimal('- NaN')}, "- NaN");
    assertException(function () {new Decimal(' + NaN')}, " + NaN");
    assertException(function () {new Decimal(' - NaN')}, " - NaN");
    assertException(function () {new Decimal('. NaN')}, ". NaN");
    assertException(function () {new Decimal('.-NaN')}, ".-NaN");
    assertException(function () {new Decimal('.+NaN')}, ".+NaN");
    assertException(function () {new Decimal('-.NaN')}, "-.NaN");
    assertException(function () {new Decimal('+.NaN')}, "+.NaN");

    var I = 'Infinity';

    T(I, Infinity);
    T(I, 'Infinity');
    T(I, ' Infinity');
    T(I, 'Infinity ');
    T(I, ' Infinity ');
    T(I, '+Infinity');
    T(I, ' +Infinity');
    T(I, '+Infinity ');
    T(I, ' +Infinity ');
    T('-Infinity', '-Infinity');
    T('-Infinity', ' -Infinity');
    T('-Infinity', '-Infinity ');
    T('-Infinity', ' -Infinity ');

    assertException(function () {new Decimal('+ Infinity')}, "+ Infinity");
    assertException(function () {new Decimal(' + Infinity')}, " + Infinity");
    assertException(function () {new Decimal('- Infinity')}, "- Infinity");
    assertException(function () {new Decimal(' - Infinity')}, " - Infinity");
    assertException(function () {new Decimal('.Infinity')}, ".Infinity");
    assertException(function () {new Decimal('. Infinity')}, ". Infinity");
    assertException(function () {new Decimal('.-Infinity')}, ".-Infinity");
    assertException(function () {new Decimal('.+Infinity')}, ".+Infinity");
    assertException(function () {new Decimal('-.Infinity')}, "-.Infinity");
    assertException(function () {new Decimal('+.Infinity')}, "+.Infinity");

    var Z = '0';

    T(Z, 0);
    T(Z, -0);
    T(Z, '.0');
    T(Z, '0.');
    T(Z, '0.00000000');
    T(Z, '-0.');
    T(Z, '+0.');
    T(Z, '+0');
    T(Z, '-0');
    T(Z, ' +0');
    T(Z, ' -0');
    T(Z, ' +0 ');
    T(Z, ' -0 ');
    T(Z, '+.0');
    T(Z, '-.0');
    T(Z, ' +.0');
    T(Z, ' -.0');
    T(Z, ' +.0 ');
    T(Z, ' -.0 ');

    assertException(function () {new Decimal('+-0')}, "+-0");
    assertException(function () {new Decimal('-+0')}, "-+0");
    assertException(function () {new Decimal('--0')}, "--0");
    assertException(function () {new Decimal('++0')}, "++0");
    assertException(function () {new Decimal('.-0')}, ".-0");
    assertException(function () {new Decimal('.+0')}, ".+0");
    assertException(function () {new Decimal('0 .')}, "0 .");
    assertException(function () {new Decimal('. 0')}, ". 0");
    assertException(function () {new Decimal('..0')}, "..0");
    assertException(function () {new Decimal('+.-0')}, "+.-0");
    assertException(function () {new Decimal('-.+0')}, "-.+0");
    assertException(function () {new Decimal('+. 0')}, "+. 0");
    assertException(function () {new Decimal('-. 0')}, "-. 0");

    T('2', '+2');
    T('-2', '-2');
    T('2', ' +2');
    T('-2', ' -2');
    T('2', ' +2 ');
    T('-2', ' -2 ');
    T('0.2', '.2');
    T('2', '2.');
    T('-2', '-2.');
    T('2', '+2.');
    T('0.2', '+.2');
    T('-0.2', '-.2');
    T('0.2', ' +.2');
    T('-0.2', ' -.2');
    T('0.2', ' +.2 ');
    T('-0.2', ' -.2 ');

    assertException(function () {new Decimal('+-2')}, "+-2");
    assertException(function () {new Decimal('-+2')}, "-+2");
    assertException(function () {new Decimal('--2')}, "--2");
    assertException(function () {new Decimal('++2')}, "++2");
    assertException(function () {new Decimal('.-2')}, ".-2");
    assertException(function () {new Decimal('.+2')}, ".+2");
    assertException(function () {new Decimal('2 .')}, "2 .");
    assertException(function () {new Decimal('. 2')}, ". 2");
    assertException(function () {new Decimal('..2')}, "..2");
    assertException(function () {new Decimal('+.-2')}, "+.-2");
    assertException(function () {new Decimal('-.+2')}, "-.+2");
    assertException(function () {new Decimal('+. 2')}, "+. 2");
    assertException(function () {new Decimal('-. 2')}, "-. 2");

    assertException(function () {new Decimal('+2..')}, "+2..");
    assertException(function () {new Decimal('-2..')}, "-2..");
    assertException(function () {new Decimal('-.2.')}, "-.2.");
    assertException(function () {new Decimal('+.2.')}, "+.2.");
    assertException(function () {new Decimal('.-20.')}, ".-20.");
    assertException(function () {new Decimal('.+20.')}, ".+20.");
    assertException(function () {new Decimal('. 20.')}, ". 20.");

    assertException(function () {new Decimal(undefined)}, "undefined");
    assertException(function () {new Decimal([])}, "[]");
    assertException(function () {new Decimal('')}, "''");
    assertException(function () {new Decimal(null)}, "null");
    assertException(function () {new Decimal(' ')}, "' '");
    assertException(function () {new Decimal('nan')}, "nan");
    assertException(function () {new Decimal('23er')}, "23er");
    assertException(function () {new Decimal('e4')}, "e4");
    assertException(function () {new Decimal('0x434')}, "0x434");
    assertException(function () {new Decimal('--45')}, "--45");
    assertException(function () {new Decimal('+-2')}, "+-2");
    assertException(function () {new Decimal('0 0')}, "0 0");

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.Decimal);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
