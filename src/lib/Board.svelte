<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import type { State, Colors } from "./core";
  import * as core from "./core";
  import Letters from "./Letters.svelte";
  import Row from "./Row.svelte";
  export let state: State;
  export let colors: Colors;
  export let onVictory: (state: State) => void;
  export let onDefeat: (state: State) => void;

  $: empties = [...Array(Math.max(core.numGuesses - state.lockedGuesses.length - 1, 0)).keys()];

  let statusMessage: string | null = null;

  const handleGuess = (guess: string) => {
    const checked = core.scoreGuess(guess, state);
    if (checked.t === "valid") {
      statusMessage = null;
      state = core.commitGuess(checked, state);
      if (state.result === "win") {
        onVictory(state);
        statusMessage = "Succès!";
      } else if (state.result === "loss") {
        onDefeat(state);
        statusMessage = state.target;
      }
    } else {
      const spacesShown = guess.replace(" ", "_");
      statusMessage = `Mot invalide: ${spacesShown}`;
    }
  };
  onMount(() => {
    state = core.newState();
    if (state.result === "loss") {
      statusMessage = state.target;
    } else if (state.result === "win") {
      statusMessage = "Succès!";
    }
    document.getElementById("active_0")?.focus();
  });

  afterUpdate(() => {
    if (statusMessage === null) {
      document.getElementById("active_0")?.focus();
    }
  });
</script>

<div class="board">
  {#each state.lockedGuesses as lck}
    <Row guess={lck.guess} active={false} {colors} statuses={lck.result} {handleGuess} />
  {/each}
  {#if state.result === "in-progress"}
    <Row
      guess={state.currRow.guess}
      active={true}
      {colors}
      statuses={core.allUnknown}
      {handleGuess}
    />
  {:else if state.lockedGuesses.length < core.numGuesses}
    <Row guess="    " active={false} {colors} statuses={core.allUnknown} {handleGuess} />
  {/if}
  {#each empties as e}
    <Row guess="    " active={false} {colors} statuses={core.allUnknown} {handleGuess} />
  {/each}
  {#if statusMessage !== null}
    <div class="status">{statusMessage}</div>
  {:else}
    <div class="spacer" />
  {/if}
  <Letters {state} {colors} />
</div>

<style>
  .board {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .status {
    color: #ddd;
    min-height: 32px;
  }
  .spacer {
    margin-bottom: 32px;
  }
</style>
