####5.0.8
* 09/03/2016
* Add newline to single test results.
* Correct year.

####5.0.7
* 29/02/2016
* Add decimal.js-light link.
* Remove outdated example from docs.

####5.0.6
* 22/02/2016
* Add bower.json.

####5.0.5
* 20/02/2016
* Bugfix: #26 wrong precision applied.

####5.0.4
* 14/02/2016
* Bugfix: #26 clone.

####5.0.3
* 06/02/2016
* Refactor tests.

####5.0.2
* 05/02/2016
* Added immutability tests.
* Minor *decimal.js* clean-up.

####5.0.1
* 28/01/2016
* Bugfix: #20 cos mutates value.
* Add pi info to docs.

####5.0.0
* 25/01/2016
* Added trigonometric functions and `cubeRoot` method.
* Added most of JavaScript's `Math` object methods as Decimal methods.
* Added `toBinary`, `toHexadecimal` and `toOctal` methods.
* Added `isPositive` method.
* Removed the 15 significant digit limit for numbers.
* `toFraction` now returns an array of two Decimals, not two strings.
* String values containing whitespace or a plus sign are no longer accepted.
* `valueOf` now returns `'-0'` for minus zero.
* `comparedTo` now returns `NaN` not `null` for comparisons with `NaN`.
* `Decimal.max` and `Decimal.min` no longer accept an array.
* The Decimal constructor and `toString` no longer accept a base argument.
* Binary, hexadecimal and octal prefixes are now recognised for string values.
* Removed `Decimal.errors` configuration property.
* Removed `toFormat` method.
* Removed `Decimal.ONE`.
* Renamed `exponential` method to `naturalExponential`.
* Renamed `Decimal.constructor` method to `Decimal.clone`.
* Simplified error handling and amended error messages.
* Refactored the test suite.
* `Decimal.crypto` is now `undefined` by default, and the `crypto` object will be used if available.
* Major internal refactoring.
* Removed *bower.json*.

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
