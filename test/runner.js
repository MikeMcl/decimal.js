var assert = require('assert'),
  spawnSync = require('child_process').spawnSync;

function run(code) {
  var result = spawnSync(process.execPath, ['-e', code], {
    cwd: __dirname,
    encoding: 'utf8',
    timeout: 30000
  });
  assert.ifError(result.error);
  assert.strictEqual(result.signal, null);
  return result;
}

function summary(result) {
  var match = result.stdout.match(/In total, (\d+) of (\d+) tests passed/);
  assert.ok(match, result.stdout + result.stderr);
  return { passed: +match[1], total: +match[2] };
}

var success = run("require('./test');"),
  successSummary = summary(success);

assert.strictEqual(successSummary.passed, successSummary.total);
assert.ok(success.stdout.indexOf('Testing valueOf...') !== -1);
assert.strictEqual(success.status, 0);

var failure = run([
    "require('./setup');",
    'var assertEqual = T.assertEqual, injected = false;',
    'T.assertEqual = function (expected, actual) {',
    '  if (!injected) {',
    '    injected = true;',
    "    return assertEqual('runner expected', 'runner actual');",
    '  }',
    '  return assertEqual(expected, actual);',
    '};',
    "require('./test');",
    "if (!injected) throw Error('No assertion was intercepted');"
  ].join('\n')),
  failureSummary = summary(failure);

assert.strictEqual(failureSummary.total - failureSummary.passed, 1);
assert.ok(failure.stdout.indexOf('runner expected') !== -1);
assert.ok(failure.stdout.indexOf('Testing valueOf...') !== -1);
assert.strictEqual(failure.status, 1);

console.log('Node test runner exit status tests passed.');
