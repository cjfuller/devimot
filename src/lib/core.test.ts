// TODO(colin): this isn't actually runnable yet; refactor so it is.
import { assertEquals } from "https://deno.land/std@0.122.0/testing/asserts.ts";
import { scoreGuess, newState } from "./core.ts";

Deno.test("correct status when numbers mismatch", () => {
  const target = "coeur";
  const guess = "frère";
  const result = scoreGuess(guess, { ...newState(), target: target });
  assertEquals(result, {
    t: "valid",
    guess: guess,
    statues: ["non", "ailleurs", "non", "non", "ailleurs"],
  });
});
