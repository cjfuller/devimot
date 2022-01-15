<script lang="ts">
  import type { Colors, Statuses } from "./core";

  export let guess: string = "     ";
  export let active: boolean = false;
  export let statuses: Statuses;
  export let colors: Colors;
  export let handleGuess: (guess: string) => void;
  export let boxSize: number = 65;
  export let fontSize: number = 38;
  export let tweakVertical: number = 5;

  import Box from "./Box.svelte";
  const modifyGuess = (at: number, newGuess: string | null) => {
    if (newGuess == null || newGuess === "") {
      newGuess = " ";
    }
    guess = guess.slice(0, at) + newGuess[0].toLowerCase() + guess.slice(at + 1, 5);
  };

  const handleEnter = () => {
    if (active) {
      handleGuess(guess);
    }
  };
  const clearPrevious = (idx) => () => active && idx > 0 ? modifyGuess(idx - 1, null) : null;
</script>

<div class="row">
  {#each [0, 1, 2, 3, 4] as cIdx}
    <Box
      id={active ? `active_${cIdx}` : undefined}
      letter={guess.charAt(cIdx) === " " ? null : guess.charAt(cIdx)}
      {active}
      {colors}
      status={statuses[cIdx]}
      onLetterChange={(newLetter) => modifyGuess(cIdx, newLetter)}
      onClearPrevious={clearPrevious(cIdx)}
      onEnter={handleEnter}
      {boxSize}
      {fontSize}
      {tweakVertical}
    />
  {/each}
</div>

<style>
  .row {
    display: flex;
    margin-bottom: 4px;
  }
</style>
