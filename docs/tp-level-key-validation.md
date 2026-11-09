# Take-profit level key validation

`parseTpLevel` accepts only the seven own properties declared in
`TP_LEVEL_KEY_MAP`. JavaScript prototype properties such as `constructor`,
`toString` and `__proto__` are not valid order fields and must raise the same
unknown-key error as any other unsupported key. A truthiness check on a normal
object lookup does not enforce this allowlist because it traverses the prototype.

Regression coverage: `packages/cli/test/tp-level-keys.test.ts` exercises five
inherited names and verifies all seven documented mappings. It imports only the
parser and Node test/assert modules; no CLI entry point or API client is loaded.
Run with the project's installed tsx runner:

    tsx --test packages/cli/test/tp-level-keys.test.ts packages/cli/test/parser.test.ts

This is input-validation coverage, not evidence of exchange/API compatibility or
trading safety. No prototype-pollution exploit is claimed.
