from decimal import Decimal, getcontext
import json
import subprocess
import hypothesis
from hypothesis import given, settings
from hypothesis.strategies import decimals, integers, tuples
from mpmath import mp

mp.prec = 500

node = subprocess.Popen(
    ["node", "evaluate.mjs"], stdout=subprocess.PIPE, stdin=subprocess.PIPE
)


def get_decimal(func: str, args: list, config: dict):
    arg = json.dumps({"func": func, "args": args, "config": config}).encode() + b"\r"
    node.stdin.write(arg)
    node.stdin.flush()
    return Decimal(node.stdout.readline().strip().decode())


def to_precision(x, precision=14):
    getcontext().prec = precision
    return Decimal(str(x)) * Decimal("1.0")


decimal_fixed_precision = tuples(
    decimals(
        allow_nan=False, allow_infinity=False, min_value=-1, max_value=1, places=14
    ),
    integers(min_value=-99, max_value=99),
).map(lambda tup: tup[0] * Decimal(10) ** tup[1])

decimal_positive = tuples(
    decimals(
        allow_nan=False, allow_infinity=False, min_value=1e-13, max_value=1, places=14
    ),
    integers(min_value=-99, max_value=99),
).map(lambda tup: tup[0] * Decimal(10) ** tup[1])


@given(decimal_fixed_precision)
@settings(max_examples=100)
def test_tangent(x):
    y = to_precision(mp.tan(x))
    z = get_decimal("tan", [str(x)], {"precision": 14})
    assert y == z


@given(decimal_fixed_precision)
@settings(max_examples=100)
def test_cosine(x):
    y = to_precision(mp.cos(x))
    z = get_decimal("cos", [str(x)], {"precision": 14})
    assert y == z


@given(decimal_fixed_precision)
@settings(max_examples=100)
def test_sine(x):
    y = to_precision(mp.sin(x))
    z = get_decimal("sin", [str(x)], {"precision": 14})
    assert y == z


@given(decimal_positive)
@settings(max_examples=100)
def test_log(x):
    y = to_precision(mp.log10(x))
    z = get_decimal("log", [str(x)], {"precision": 14})
    assert y == z


inverse_trig_strat = decimals(
    allow_nan=False, allow_infinity=False, min_value=-1, max_value=1, places=14
)


@given(inverse_trig_strat)
@settings(max_examples=100)
def test_acos(x):
    y = to_precision(mp.acos(x))
    z = get_decimal("acos", [str(x)], {"precision": 14})
    assert y == z


@given(inverse_trig_strat)
@settings(max_examples=100)
def test_asin(x):
    y = to_precision(mp.asin(x))
    z = get_decimal("asin", [str(x)], {"precision": 14})
    assert y == z


@given(decimal_fixed_precision)
@settings(max_examples=100)
def test_atan(x):
    y = to_precision(mp.atan(x))
    z = get_decimal("atan", [str(x)], {"precision": 14})
    assert y == z


@given(decimal_fixed_precision)
@settings(max_examples=10)
def test_cosh(x):
    y = to_precision(mp.cosh(x))
    z = get_decimal("cosh", [str(x)], {"precision": 14})
    assert y == z


@given(decimal_fixed_precision)
@settings(max_examples=4)
def test_sinh(x):
    y = to_precision(mp.sinh(x))
    z = get_decimal("sinh", [str(x)], {"precision": 14})
    assert y == z


@given(decimal_fixed_precision)
@settings(max_examples=4)
def test_tanh(x):
    y = to_precision(mp.tanh(x))
    z = get_decimal("tanh", [str(x)], {"precision": 14})
    assert y == z
