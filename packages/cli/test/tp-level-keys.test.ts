import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseTpLevel } from "../src/parser.js";

// Parser-only tests: no CLI entry point, credentials, files or API clients.
describe("parseTpLevel key allowlist", () => {
  for (const key of ["constructor", "toString", "__proto__", "hasOwnProperty", "valueOf"]) {
    it(`rejects inherited Object.prototype key ${key}`, () => {
      assert.throws(() => parseTpLevel(`${key}:1,sz:0.5`), /Unknown --tpLevel key/);
    });
  }

  it("preserves every documented key and string value", () => {
    assert.deepEqual(
      parseTpLevel("px:78000,sz:0.5,kind:limit,triggerPx:75000,triggerPxType:mark,amendPxOnTrigger:1,clOrdId:mytp1"),
      {
        tpOrdPx: "78000", sz: "0.5", tpOrdKind: "limit", tpTriggerPx: "75000",
        tpTriggerPxType: "mark", amendPxOnTriggerType: "1", attachAlgoClOrdId: "mytp1",
      },
    );
  });
});
