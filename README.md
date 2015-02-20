![decimal.js](https://raw.githubusercontent.com/MikeMcl/decimal.js/gh-pages/decimaljs.png)

An arbitrary-precision Decimal type for JavaScript.
<br>   
[![Build Status](https://travis-ci.org/MikeMcl/decimal.js.svg)](https://travis-ci.org/MikeMcl/decimal.js)

## Features

  - Faster, smaller, and perhaps easier to use than JavaScript versions of Java's BigDecimal
  - Simple API but full-featured
  - Replicates the `toExponential`, `toFixed`, `toPrecision` and `toString` methods of JavaScript's Number type
  - Includes a `toFraction` and correctly-rounded `exp`, `ln`, `log` and `sqrt` functions
  - Supports non-integer powers
  - Works with numbers with or without fraction digits in bases from 2 to 64 inclusive
  - No dependencies
  - Wide platform compatibility: uses JavaScript 1.5 (ECMAScript 3) features only
  - Comprehensive [documentation](http://mikemcl.github.io/decimal.js/) and test set
  - 8 KB minified and gzipped

![API](https://raw.githubusercontent.com/MikeMcl/decimal.js/gh-pages/API.png)

The library is similar to [bignumber.js](https://github.com/MikeMcl/bignumber.js/), but here
precision is specified in terms of significant digits instead of decimal places, and all
calculations are rounded to the precision (similar to Python's decimal module) rather than just
those involving division.

This library also adds `exp`, `ln` and `log` functions, among others, and supports non-integer powers.

Another major difference is that this library enables multiple Decimal constructors to be created
 each with their own configuration. This is, however, a significantly larger library than
 *bignumber.js* and the even smaller [big.js](https://github.com/MikeMcl/big.js/).

## Load

The library is the single JavaScript file *decimal.js* (or minified, *decimal.min.js*).

It can be loaded via a script tag in an HTML document for the browser

    <script src='./relative/path/to/decimal.js'></script>

or as a CommonJS, [Node.js](http://nodejs.org) or AMD module using `require`.

For Node, the library is also available from the [npm](https://npmjs.org/) registry

    $ npm install decimal.js

To load with AMD loader libraries such as [requireJS](http://requirejs.org/):

    require(['decimal'], function(Decimal) {
        // Use Decimal here in local scope. No global Decimal.
    });

## Use

*In all examples below, `var`, semicolons and `toString` calls are not shown.
If a commented-out value is in quotes it means `toString` has been called on the preceding expression.*

The library exports a single function object, `Decimal`, the constructor of Decimal numbers.

It accepts a value of type number *(up to 15 significant digits only)*, string or Decimal.

    x = new Decimal(123.4567)
    y = new Decimal('123456.7e-3')
    z = new Decimal(x)
    x.equals(y) && y.equals(z) && x.equals(z)        // true

A base from 2 to 36 inclusive can also be specified.

    x = new Decimal(1011, 2)             // '11'
    y = new Decimal('zz.9', 36)          // '1295.25'
    z = x.plus(y)                        // '1306.25'

A Decimal is immutable in the sense that it is not changed by its methods.

    0.3 - 0.1                     // 0.19999999999999998
    x = new Decimal(0.3)
    x.minus(0.1)                  // '0.2'
    x                             // '0.3'

The methods that return a Decimal can be chained.

    x.dividedBy(y).plus(z).times(9).floor()
    x.times('1.23456780123456789e+9').plus(9876.5432321).dividedBy('4444562598.111772').ceil()

Many method names have a shorter alias.

    x.squareRoot().dividedBy(y).toPower(3).equals(x.sqrt().div(y).pow(3))         // true
    x.cmp(y.mod(z).neg()) == 1 && x.comparedTo(y.modulo(z).negated()) == 1        // true

Like JavaScript's Number type, there are `toExponential`, `toFixed` and `toPrecision` methods

    x = new Decimal(255.5)
    x.toExponential(5)              // '2.55500e+2'
    x.toFixed(5)                    // '255.50000'
    x.toPrecision(5)                // '255.50'

 and a base can be specified for `toString`.

    x.toString(16)                  // 'ff.8'
    
There is a `toFormat` method,

    y = new Decimal(1e6)
    y.toFormat(2)                // '1,000,000.00'
    
a `toFraction` method with an optional *maximum denominator* argument

    z = new Decimal(355)
    pi = z.dividedBy(113)        // '3.1415929204'
    pi.toFraction()              // [ '7853982301', '2500000000' ]
    pi.toFraction(1000)          // [ '355', '113' ]

and `isNaN` and `isFinite` methods, as `NaN` and `Infinity` are valid `Decimal` values.

    x = new Decimal(NaN)                                           // 'NaN'
    y = new Decimal(Infinity)                                      // 'Infinity'
    x.isNaN() && !y.isNaN() && !x.isFinite() && !y.isFinite()      // true

All calculations are rounded according to the number of significant digits and rounding mode
 specified by the `precision` and `rounding` properties of the Decimal constructor.

As mentioned above, multiple Decimal constructors can be created, each with their own independent
 configuration which applies to all Decimal numbers created from it.

    // Set the precision and rounding of the default Decimal constructor
    Decimal.config({ precision: 5, rounding: 4 })

    // Create another Decimal constructor, optionally passing in a configuration object
    Decimal10 = Decimal.constructor({ precision: 10, rounding: 1 })    

    x = new Decimal(5)
    y = new Decimal10(5)

    x.div(3)                           // '1.6667'
    y.div(3)                           // '1.666666666'

    Decimal.precision                  // 5
    Decimal10.precision                // 10

Many of the methods of JavaScript's Math object are also replicated

    Decimal.sqrt('6.98372465832e+9823')      // '8.3568682281821340204e+4911'
    Decimal.pow(2, 0.0979843)                // '1.0702770511687781839'

The value of a Decimal is stored in a floating point format in terms of a coefficient, exponent and sign.

    x = new Decimal(-12345.67);
    x.c                            // [ 12345, 6700000 ]    coefficient (base 10000)
    x.e                            // 4                     exponent (base 10)
    x.s                            // -1                    sign

For further information see the [API](http://mikemcl.github.io/decimal.js/) reference in the *doc* directory.

## Test

The *test* directory contains the test scripts for each method.

The tests can be run with Node or a browser.

To test a single method use, from a command-line shell in the root directory, for example

    $ node test/toFraction

To test all the methods

    $ node test/every-test

or

    $ npm test

For the browser, see *single-test.html* and *every-test.html* in the *test/browser* directory,


## Build

For Node, if [uglify-js](https://github.com/mishoo/UglifyJS2) is installed

    npm install uglify-js -g

then

    npm run build

will create *decimal.min.js*.

A source map will also be created in the *doc* directory.

## Feedback

Open an issue, or email
Michael <a href='mailto:M8ch88l@gmail.com'>M8ch88l@gmail.com</a>

[Bitcoin](https://bitcoin.org/en/getting-started) donation gratefully received:
**1PjzRBjGJycti49AXTiKsdC4PRCnTbyUyf**

Thank you

## Licence

MIT Expat.

See LICENCE.

## Change Log

####4.0.2
* 20/02/2015 Add bower.json. Add source map. Amend travis CI. Amend doc/comments.

####4.0.1
* 11/12/2014 Assign correct constructor when duplicating a Decimal.

####4.0.0
* 10/11/2014 `toFormat` amended to use `Decimal.format` object for more flexible configuration.

####3.0.1
* 8/06/2014 Surround crypto require in try catch. See issue #5

####3.0.0
* 4/06/2014 `random` simplified. Major internal changes mean the properties of a Decimal must now be considered read-only

####2.1.0
* 4/06/2014 Amend UMD

####2.0.3
* 8/05/2014 Fix NaN toNumber

####2.0.2
* 30/04/2014 Correct doc links

####2.0.1
* 10/04/2014 Update npmignore

####2.0.0
* 10/04/2014 Add `toSignificantDigits`
* Remove `toInteger`
* No arguments to `ceil`, `floor`, `round` and `trunc`

####1.0.1
* 07/04/2014 Minor documentation clean-up

####1.0.0
* 02/04/2014 Initial release
