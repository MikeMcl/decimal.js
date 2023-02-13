from decimal import Decimal, getcontext
import json
import subprocess
import hypothesis
from hypothesis import given, settings
from hypothesis.strategies import decimals, integers, tuples
from mpmath import mp
import pytest

mp.prec = 500
getcontext().prec = 14

node = subprocess.Popen(
    ["node", "evaluate.mjs"], stdout=subprocess.PIPE, stdin=subprocess.PIPE
)


def get_decimal(func: str, args: list, config: dict):
    arg = json.dumps({"func": func, "args": args, "config": config}).encode() + b"\r"
    node.stdin.write(arg)
    node.stdin.flush()
    return Decimal(node.stdout.readline().strip().decode())


def assert_matches(x, mpfunc, jsfunc=None):
    if jsfunc is None:
        jsfunc = mpfunc
    y = Decimal(str(getattr(mp, mpfunc)(x))) * Decimal("1.0")
    z = get_decimal(jsfunc, [str(x)], {"precision": 14})
    assert y == z


@pytest.mark.parametrize("fn", "sin cos tan atan".split())
@given(
    x=tuples(
        decimals(
            allow_nan=False, allow_infinity=False, min_value=-1, max_value=1, places=14
        ),
        integers(min_value=-99, max_value=99),
    ).map(lambda tup: tup[0] * Decimal(10) ** tup[1])
)
@settings(max_examples=1000)
def test_matches(x, fn):
    assert_matches(x, fn)


@pytest.mark.parametrize("fn", "ln log10 sqrt".split())
@given(
    x=tuples(
        decimals(
            allow_nan=False,
            allow_infinity=False,
            min_value=1e-13,
            max_value=1,
            places=14,
        ),
        integers(min_value=-99, max_value=99),
    ).map(lambda tup: tup[0] * Decimal(10) ** tup[1])
)
@settings(max_examples=1000)
def test_positive_domain(x, fn):
    assert_matches(x, fn)


@pytest.mark.parametrize("fn", "asin acos".split())
@given(
    x=decimals(
        allow_nan=False, allow_infinity=False, min_value=-1, max_value=1, places=14
    )
)
@settings(max_examples=1000)
def test_inverse_trig(x, fn):
    assert_matches(x, fn)


@pytest.mark.parametrize("fn", "sinh cosh tanh exp".split())
@given(
    x=tuples(
        decimals(
            allow_nan=False, allow_infinity=False, min_value=-1, max_value=1, places=14
        ),
        integers(min_value=-99, max_value=3),
    ).map(lambda tup: tup[0] * Decimal(10) ** tup[1])
)
@settings(max_examples=1000)
def test_small_domain(x, fn):
    assert_matches(x, fn)
